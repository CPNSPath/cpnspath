// src/app/api/admin/import-questions/route.js
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import * as XLSX from "xlsx"

// Email yang boleh import. Tambah di sini kalau nanti ada admin lain.
const ADMIN_EMAILS = ["3082240019_tito@pknstan.ac.id"]

export async function POST(request) {
  // 1. Pastikan yang request beneran admin
  const authHeader = request.headers.get("authorization")
  const token = authHeader?.replace("Bearer ", "")
  if (!token) {
    return NextResponse.json({ error: "Tidak ada token. Silakan login ulang." }, { status: 401 })
  }

  const supabaseAuth = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  const { data: { user }, error: authErr } = await supabaseAuth.auth.getUser(token)
  if (authErr || !user || !ADMIN_EMAILS.includes(user.email)) {
    return NextResponse.json({ error: "Akses ditolak. Khusus admin." }, { status: 403 })
  }

  // 2. Ambil file dari upload
  const formData = await request.formData()
  const file = formData.get("file")
  if (!file) return NextResponse.json({ error: "File tidak ada." }, { status: 400 })

  // 3. Baca Excel jadi baris-baris
  let rows
  try {
    const buffer = Buffer.from(await file.arrayBuffer())
    const wb = XLSX.read(buffer, { type: "buffer" })
    const sheet = wb.Sheets[wb.SheetNames[0]]
    rows = XLSX.utils.sheet_to_json(sheet, { defval: null })
  } catch (e) {
    return NextResponse.json({ error: "Gagal baca Excel: " + e.message }, { status: 400 })
  }
  if (!rows.length) return NextResponse.json({ error: "File kosong." }, { status: 400 })

  // 4. Validasi tiap baris (kalau ada 1 error, GAK ADA yang disimpan)
  const errors = []
  const clean = []
  rows.forEach((r, idx) => {
    const baris = idx + 2 // baris 1 = header, data mulai baris 2
    const slug = String(r.tryout_slug || "").trim()
    const num = parseInt(r.question_number)
    const subtest = String(r.subtest || "").trim().toLowerCase()

    if (!slug) return errors.push(`Baris ${baris}: tryout_slug kosong`)
    if (!num) return errors.push(`Baris ${baris}: question_number kosong/bukan angka`)
    if (!["twk", "tiu", "tkp"].includes(subtest)) return errors.push(`Baris ${baris}: subtest harus twk/tiu/tkp`)
    if (!r.question) return errors.push(`Baris ${baris}: question kosong`)

    const row = {
      tryout_slug: slug, question_number: num, subtest,
      question: String(r.question),
      option_a: r.option_a != null ? String(r.option_a) : null,
      option_b: r.option_b != null ? String(r.option_b) : null,
      option_c: r.option_c != null ? String(r.option_c) : null,
      option_d: r.option_d != null ? String(r.option_d) : null,
      option_e: r.option_e != null ? String(r.option_e) : null,
      explanation: r.explanation != null ? String(r.explanation) : null,
      correct_answer: null,
      point_a: null, point_b: null, point_c: null, point_d: null, point_e: null,
    }

    if (subtest === "tkp") {
      const pts = ["a", "b", "c", "d", "e"].map(k => r["point_" + k])
      if (pts.some(p => p == null || isNaN(parseInt(p)))) {
        return errors.push(`Baris ${baris} (TKP): point_a–point_e harus angka 1–5`)
      }
      row.point_a = parseInt(r.point_a); row.point_b = parseInt(r.point_b)
      row.point_c = parseInt(r.point_c); row.point_d = parseInt(r.point_d)
      row.point_e = parseInt(r.point_e)
    } else {
      const ca = String(r.correct_answer || "").trim().toUpperCase()
      if (!["A", "B", "C", "D", "E"].includes(ca)) {
        return errors.push(`Baris ${baris} (${subtest.toUpperCase()}): correct_answer harus A/B/C/D/E`)
      }
      row.correct_answer = ca
    }
    clean.push(row)
  })

  if (errors.length) {
    return NextResponse.json(
      { error: "Validasi gagal — tidak ada yang disimpan.", details: errors.slice(0, 50) },
      { status: 422 }
    )
  }

  // 5. Simpan ke DB pakai service_role (upsert, jadi import ulang = nimpa, gak dobel)
  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
  const CHUNK = 500
  let imported = 0
  for (let i = 0; i < clean.length; i += CHUNK) {
    const batch = clean.slice(i, i + CHUNK)
    const { error } = await admin.from("questions").upsert(batch, { onConflict: "tryout_slug,question_number" })
    if (error) {
      return NextResponse.json({ error: `Gagal simpan: ${error.message}`, imported }, { status: 500 })
    }
    imported += batch.length
  }

  return NextResponse.json({ success: true, imported })
}
