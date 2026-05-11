"use client"

import { useState,useEffect } from "react"
import { useRouter } from "next/navigation"
import { saveTryoutResult } from "@/lib/saveResult"
import { supabase } from "@/lib/supabase"

const shuffledQuestions = [

{
question:"Ketika saya mengalami kegagalan, saya cenderung ...",
options:[
"Merasa bodoh dan putus asa",
"Merasa sedih dan marah",
"Mencari sumber kegagalan saya",
"Biasa saja seperti tidak terjadi apa-apa",
"Melupakan kegagalan dan menatap ke depan"
],
score:[2,3,5,4,1]
},

{
question:"Teman-teman senang menceritakan masalah mereka kepada saya karena menurut mereka saya ...",
options:[
"Mampu menjaga rahasia",
"Pendengar yang baik",
"Memberikan solusi terbaik",
"Bisa melihat masalah dari berbagai sudut pandang",
"Mampu menumbuhkan semangat mereka"
],
score:[4,5,3,2,1]
},

{
question:"Di kantor saya ditugaskan di bagian pelayanan dan ada tamu yang sangat rewel. Saya akan ...",
options:[
"Melayani dengan malas-malasan",
"Meminta teman lain melayaninya",
"Melayani dengan sabar dan memberi yang terbaik",
"Melaporkan kepada atasan",
"Melayani sebisanya saja"
],
score:[1,2,5,4,3]
},

{
question:"Saya sudah bekerja lama tetapi belum mendapat promosi jabatan. Sikap saya ...",
options:[
"Menganggap ada ketidakadilan",
"Menunggu kesempatan datang",
"Meningkatkan kinerja agar mendapat kesempatan",
"Bekerja seperti biasa",
"Memutuskan keluar"
],
score:[1,3,5,4,2]
},

{
question:"Saya sangat senang dengan atasan yang ...",
options:[
"Dekat dengan bawahan",
"Disiplin dan mempunyai etos kerja tinggi",
"Bertanggung jawab",
"Mau mendengarkan masukan bawahan",
"Memberi arahan yang jelas"
],
score:[3,5,4,2,1]
},

{
question:"Saat hari libur atasan menghubungi saya terkait pekerjaan penting. Saya akan ...",
options:[
"Mengabaikan telepon",
"Mengangkat telepon jika penting",
"Mengangkat telepon dan membantu",
"Menunda membalas",
"Menyuruh orang lain menjawab"
],
score:[1,3,5,2,4]
},

{
question:"Ketika suasana hati saya sedang tidak baik biasanya saya ...",
options:[
"Mudah marah",
"Menjadi malas bekerja",
"Tetap bekerja sebaik mungkin",
"Sering melamun",
"Bercerita kepada teman"
],
score:[1,2,5,3,4]
},

{
question:"Orang tua menyarankan saya pindah kerja karena gaji lebih besar. Saya akan ...",
options:[
"Mencari pekerjaan lain",
"Mempertimbangkan saran",
"Tetap bekerja dan memberi penjelasan",
"Meminta saran teman",
"Meminta pertimbangan atasan"
],
score:[4,3,5,2,1]
},

{
question:"Teman saya mengingkari janji untuk mengembalikan uang yang dipinjam. Saya akan ...",
options:[
"Memarahinya",
"Mengingatkannya dengan baik",
"Tidak meminjamkan lagi",
"Tidak berteman lagi",
"Mencari penjelasan"
],
score:[1,4,3,2,5]
},

{
question:"Di kantor saya termasuk orang yang ...",
options:[
"Supel dan mudah akrab",
"Disiplin dan pekerja keras",
"Ulet dan pantang menyerah",
"Pintar dan cepat bekerja",
"Bertanggung jawab"
],
score:[3,5,4,2,1]
},

{
question:"Saya sangat membutuhkan buku mahal untuk pekerjaan saya. Saya akan ...",
options:[
"Menabung untuk membelinya",
"Meminta kantor membelikan",
"Menunggu sampai ada uang",
"Meminjam uang teman",
"Mencari pekerjaan tambahan"
],
score:[5,4,2,3,1]
},

{
question:"Sahabat lama datang ingin menginap di rumah saya yang sederhana. Saya akan ...",
options:[
"Menolak dengan alasan rumah kecil",
"Mengizinkan sebentar",
"Menjelaskan kondisi rumah",
"Menyarankan hotel",
"Menerima dengan apa adanya"
],
score:[1,3,4,2,5]
},

{
question:"Saat ada pekerjaan kelompok biasanya ...",
options:[
"Semua anggota aktif",
"Tidak semua bekerja",
"Saya yang menyelesaikan",
"Saling mengandalkan",
"Pekerjaan selesai jika ada yang mulai"
],
score:[5,2,4,1,3]
},

{
question:"Saat menerima pekerjaan besar saya ...",
options:[
"Berusaha menyelesaikan sebaik mungkin",
"Merasa malas",
"Takut tidak selesai",
"Meminta bantuan teman",
"Menganggap biasa"
],
score:[5,1,2,4,3]
},

{
question:"Saat presentasi saya mendapat kabar anak sakit. Saya akan ...",
options:[
"Tetap melanjutkan presentasi",
"Mencari tahu kondisi anak",
"Menghentikan presentasi",
"Menyerahkan pada rekan",
"Menelepon keluarga"
],
score:[4,5,1,3,2]
},

{
question:"Atasan memberi informasi rahasia. Saya akan ...",
options:[
"Menceritakan ke teman",
"Memberi tahu tanpa isi informasi",
"Menyimpannya",
"Menghindari membicarakan",
"Memberi tahu sebagian"
],
score:[1,3,5,4,2]
},

{
question:"Cara mencapai sukses dalam pekerjaan adalah ...",
options:[
"Bekerja dengan sepenuh hati",
"Mematuhi perintah atasan",
"Bekerja dengan giat",
"Menyingkirkan pesaing",
"Bekerja tanpa mengenal waktu"
],
score:[5,4,3,1,2]
},

{
question:"Jika terjadi perombakan direksi perusahaan saya ...",
options:[
"Tidak peduli",
"Cuma pegawai biasa",
"Percaya keputusan direksi",
"Bekerja lebih giat",
"Mendukung kemajuan perusahaan"
],
score:[2,1,4,3,5]
},

{
question:"Atasan memindahkan saya ke bagian lain. Saya ...",
options:[
"Mengerjakan tugas saja",
"Menolak pindah",
"Menerima tapi kecewa",
"Mengenal rekan baru",
"Menerima dengan baik"
],
score:[3,1,2,4,5]
},

{
question:"Menurut saya orang baik adalah ...",
options:[
"Menepati janji",
"Menolong orang",
"Memaafkan kesalahan",
"Tidak berbuat jahat",
"Mengemban amanah"
],
score:[3,4,2,1,5]
},

{
question:"Pimpinan kantor sangat mendikte karyawan. Saya ...",
options:[
"Mengajak demonstrasi",
"Bukan urusan saya",
"Menyurati pimpinan",
"Berdiskusi dengan pimpinan",
"Mengajak melawan"
],
score:[1,2,3,5,4]
},

{
question:"Dalam pekerjaan saya biasanya ...",
options:[
"Menunggu perintah",
"Mengambil keputusan sendiri",
"Bertanggung jawab",
"Mendengar saran",
"Mengambil keputusan tepat"
],
score:[2,3,5,4,1]
},

{
question:"Saat rapat ada teman yang membuat gaduh. Saya ...",
options:[
"Marah",
"Mengingatkan",
"Menghentikan rapat",
"Menunda rapat",
"Melanjutkan rapat"
],
score:[1,5,2,3,4]
},

{
question:"Teman baru memiliki bayi dan saya tidak punya uang membeli kado. Saya ...",
options:[
"Tidak memberi kado",
"Mengunjungi tanpa kado",
"Memberi kado nanti",
"Tidak mengunjungi",
"Meminjam uang"
],
score:[3,5,4,1,2]
},

{
question:"Tempat kerja saya mengalami pergantian kepala kantor. Saya ...",
options:[
"Mendukung kepala kantor baru",
"Tidak peduli",
"Kurang semangat",
"Menyesuaikan diri",
"Tidak mempermasalahkan"
],
score:[5,2,1,4,3]
},

{
question:"Dalam bekerja saya sangat senang jika ...",
options:[
"Tempat kerja nyaman",
"Mendapat penghargaan",
"Rekan kerja kompak",
"Pimpinan memahami bawahan",
"Gaji besar"
],
score:[4,3,5,2,1]
},

{
question:"Atasan memberi pekerjaan berat. Saya ...",
options:[
"Menolak",
"Menerima terpaksa",
"Minta dipertimbangkan",
"Tertarik menyelesaikan",
"Mendelegasikan"
],
score:[1,2,3,5,4]
},

{
question:"Saya mendapatkan keberhasilan karena ...",
options:[
"Tidak menyerah",
"Bernasib baik",
"Berani mengambil risiko",
"Lingkungan mendukung",
"Berusaha keras"
],
score:[4,1,3,2,5]
},

{
question:"Ketika menghadapi masalah saya ...",
options:[
"Tidak bersemangat",
"Mudah marah",
"Bercerita pada teman",
"Bingung",
"Tetap tenang"
],
score:[2,1,3,4,5]
},

{
question:"Atasan meminta lembur saat saya ada janji pribadi. Saya ...",
options:[
"Menolak",
"Menerima dan membatalkan janji",
"Menyarankan orang lain",
"Menerima dan meminta bantuan",
"Menyelesaikan urusan dulu lalu kembali"
],
score:[1,3,2,4,5]
},

{
question:"Saya mendapat penghargaan kerja. Saya ...",
options:[
"Memamerkannya",
"Bekerja seperti biasa",
"Meningkatkan kinerja",
"Memotivasi rekan kerja",
"Menjaga kepercayaan"
],
score:[1,3,4,5,2]
},

{
question:"Saya bekerja dalam tim yang anggotanya berbeda pendapat. Saya ...",
options:[
"Mengalah",
"Mencari solusi bersama",
"Diam saja",
"Membela pendapat saya",
"Mengikuti mayoritas"
],
score:[2,5,1,3,4]
},

{
question:"Ketika tugas menumpuk saya ...",
options:[
"Panik",
"Mengeluh",
"Menyusun prioritas",
"Menunda",
"Mengerjakan sedikit"
],
score:[1,2,5,3,4]
},

{
question:"Jika rekan kerja kesulitan pekerjaan saya ...",
options:[
"Membantu jika sempat",
"Membiarkan",
"Membantu sampai selesai",
"Menyarankan solusi",
"Menyuruhnya belajar sendiri"
],
score:[3,1,5,4,2]
},

{
question:"Jika target kerja sulit dicapai saya ...",
options:[
"Menyerah",
"Mencari alasan",
"Berusaha lebih keras",
"Mencari bantuan",
"Mengerjakan seadanya"
],
score:[1,2,5,4,3]
}

]

export default function TKPExam(){
const router = useRouter()
const [current,setCurrent]=useState(0)
const [answers,setAnswers]=useState({})

useEffect(() => {
  async function checkAlreadyDone() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.replace("/login?redirect=/tryout/tkp")
      return
    }
    const { data } = await supabase
      .from("results")
      .select("id")
      .eq("user_id", user.id)
      .eq("tryout_slug", "free-trial-tkp")
      .maybeSingle()
    if (data) {
      router.replace("/tryout/tkp/result")
    }
  }
  checkAlreadyDone()
}, [])

useEffect(()=>{

try{

const savedAnswers = localStorage.getItem("tkp_answers")

if(savedAnswers){
setAnswers(JSON.parse(savedAnswers))
}

}catch(err){

console.error(err)
localStorage.removeItem("tkp_answers")

}

},[])
useEffect(()=>{

localStorage.setItem("tkp_answers",JSON.stringify(answers))

},[answers])
const [doubts,setDoubts]=useState({})
const [time,setTime]=useState(30*60)

const answeredCount = Object.keys(answers).length
const doubtCount = Object.keys(doubts).length
const emptyCount = shuffledQuestions.length - answeredCount
const progressPercent = Math.round((answeredCount/shuffledQuestions.length)*100)

useEffect(()=>{

const timer=setInterval(()=>{

setTime(prev=>{

if(prev<=1){

clearInterval(timer)

localStorage.setItem("tkp_answers",JSON.stringify(answers))

submitExam(true)

return 0

}

return prev-1

})

},1000)

return()=>clearInterval(timer)

},[answers])

function formatTime(){

const m=Math.floor(time/60)
const s=time%60

return m+":"+(s<10?"0"+s:s)

}

function selectAnswer(i){

setAnswers({...answers,[current]:i})

}

function toggleDoubt(){

setDoubts({
...doubts,
[current]:!doubts[current]
})

}

function next(){

if(current<shuffledQuestions.length-1){
setCurrent(current+1)
}

}

function prev(){

if(current>0){
setCurrent(current-1)
}

}

async function submitExam(force=false){
  if(!force){
    if(!confirm("Apakah Anda yakin ingin mengakhiri ujian?")) return
  }

  let score=0
  let answered=0
  let empty=0

  shuffledQuestions.forEach((q,i)=>{
    if(answers[i]===undefined){ empty++ }
    else{ score += q.score[answers[i]]; answered++ }
  })

  const resultData={
    score, answered, empty,
    total: shuffledQuestions.length,
    answers, questions: shuffledQuestions
  }

  localStorage.setItem("tkp_result", JSON.stringify(resultData))

  // Simpan ke Supabase
  await saveTryoutResult({
    toSlug: "free-trial-tkp",
    score,
    correct: answered,
    wrong: empty,
    twk: null,
    tiu: null,
    tkp: score,
    lulus_twk: null,
    lulus_tiu: null,
    lulus_tkp: score >= 166,
  })

  router.push("/tryout/tkp/result")
}

return (
  <div style={{ minHeight: "100vh", background: "#F8FAFC", display: "flex", flexDirection: "row", height: "100vh", overflow: "hidden" }}>

    {/* Area Soal */}
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC", overflowY: "auto", minWidth: 0 }}>

      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ background: "#172554", color: "#fff", borderRadius: 8, padding: "6px 14px", fontSize: "0.8rem", fontWeight: 700 }}>
            Soal {current + 1} / {shuffledQuestions.length}
          </div>
          {doubts[current] && (
            <span style={{ background: "rgba(234,179,8,0.15)", color: "#ca8a04", borderRadius: 999, padding: "4px 12px", fontSize: "0.72rem", fontWeight: 600 }}>⚠ Ragu-ragu</span>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ background: time <= 300 ? "rgba(220,38,38,0.1)" : "rgba(23,37,84,0.08)", borderRadius: 8, padding: "6px 14px", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: "0.75rem", color: time <= 300 ? "#dc2626" : "#475569" }}>⏱</span>
            <span style={{ fontSize: "1rem", fontWeight: 700, color: time <= 300 ? "#dc2626" : "#172554", fontVariantNumeric: "tabular-nums" }}>{formatTime()}</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ background: "#fff", padding: "12px 32px", borderBottom: "1px solid #f1f5f9" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 500 }}>Progress</span>
          <span style={{ fontSize: "0.72rem", color: "#172554", fontWeight: 700 }}>{progressPercent}%</span>
        </div>
        <div style={{ background: "#e2e8f0", borderRadius: 999, height: 6, overflow: "hidden" }}>
          <div style={{ height: "100%", background: "#172554", borderRadius: 999, width: `${progressPercent}%`, transition: "width 0.3s ease" }} />
        </div>
      </div>

      {/* Soal */}
      <div style={{ flex: 1, padding: "32px" }}>
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: "32px", marginBottom: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 24 }}>
            <span style={{ flexShrink: 0, width: 32, height: 32, borderRadius: "50%", background: "#172554", color: "#fff", fontSize: "0.8rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{current + 1}</span>
            <p style={{ fontSize: "1rem", color: "#0f172a", lineHeight: 1.7, fontWeight: 500, flex: 1, paddingTop: 4 }}>{shuffledQuestions[current].question}</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {shuffledQuestions[current].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => selectAnswer(i)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "14px 18px",
                  borderRadius: 10,
                  border: answers[current] === i ? "2px solid #172554" : "1.5px solid #e2e8f0",
                  background: answers[current] === i ? "#172554" : "#fff",
                  color: answers[current] === i ? "#fff" : "#334155",
                  fontSize: "0.9rem",
                  fontWeight: answers[current] === i ? 600 : 400,
                  cursor: "pointer",
                  transition: "all 0.15s",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
                onMouseEnter={e => { if (answers[current] !== i) { e.currentTarget.style.borderColor = "#172554"; e.currentTarget.style.background = "#f8fafc" } }}
                onMouseLeave={e => { if (answers[current] !== i) { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "#fff" } }}
              >
                <span style={{ flexShrink: 0, width: 26, height: 26, borderRadius: "50%", background: answers[current] === i ? "rgba(255,255,255,0.2)" : "#f1f5f9", color: answers[current] === i ? "#fff" : "#64748b", fontSize: "0.75rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            onClick={prev}
            style={{ padding: "10px 20px", borderRadius: 10, border: "1.5px solid #e2e8f0", background: "#fff", color: "#334155", fontSize: "0.875rem", fontWeight: 500, cursor: "pointer", transition: "all 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#172554"; e.currentTarget.style.color = "#172554" }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.color = "#334155" }}
          >
            ← Previous
          </button>
          <button
            onClick={next}
            style={{ padding: "10px 20px", borderRadius: 10, border: "1.5px solid #172554", background: "#172554", color: "#fff", fontSize: "0.875rem", fontWeight: 500, cursor: "pointer", transition: "all 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#1e3a5f" }}
            onMouseLeave={e => { e.currentTarget.style.background = "#172554" }}
          >
            Next →
          </button>
          <button
            onClick={toggleDoubt}
            style={{ padding: "10px 20px", borderRadius: 10, border: `1.5px solid ${doubts[current] ? "#ca8a04" : "#e2e8f0"}`, background: doubts[current] ? "rgba(234,179,8,0.1)" : "#fff", color: doubts[current] ? "#ca8a04" : "#64748b", fontSize: "0.875rem", fontWeight: 500, cursor: "pointer", transition: "all 0.15s" }}
          >
            ⚠ Ragu-ragu
          </button>
          <button
            onClick={() => submitExam(false)}
            style={{ padding: "10px 24px", borderRadius: 10, border: "1.5px solid #fbbf24", background: "#fbbf24", color: "#78350f", fontSize: "0.875rem", fontWeight: 700, cursor: "pointer", transition: "all 0.15s", marginLeft: "auto" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#f59e0b" }}
            onMouseLeave={e => { e.currentTarget.style.background = "#fbbf24" }}
          >
            Submit Ujian
          </button>
        </div>
      </div>
    </div>

    {/* Sidebar */}
    <div style={{ width: "280px", flexShrink: 0, background: "#fff", borderLeft: "1px solid #e2e8f0", display: "flex", flexDirection: "column", padding: "24px", overflowY: "auto" }}>

      {/* Timer besar */}
      <div style={{ background: time <= 300 ? "rgba(220,38,38,0.06)" : "#f8fafc", border: `1px solid ${time <= 300 ? "rgba(220,38,38,0.2)" : "#e2e8f0"}`, borderRadius: 12, padding: "16px", marginBottom: 16, textAlign: "center" }}>
        <p style={{ fontSize: "0.7rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4, fontWeight: 500 }}>Waktu Tersisa</p>
        <p style={{ fontSize: "2rem", fontWeight: 800, color: time <= 300 ? "#dc2626" : "#172554", fontVariantNumeric: "tabular-nums" }}>{formatTime()}</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
        <div style={{ background: "rgba(22,163,74,0.08)", borderRadius: 10, padding: "10px 8px", textAlign: "center" }}>
          <p style={{ fontSize: "0.65rem", color: "#16a34a", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Dijawab</p>
          <p style={{ fontSize: "1.25rem", fontWeight: 800, color: "#16a34a" }}>{answeredCount}</p>
        </div>
        <div style={{ background: "rgba(234,179,8,0.08)", borderRadius: 10, padding: "10px 8px", textAlign: "center" }}>
          <p style={{ fontSize: "0.65rem", color: "#ca8a04", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Ragu</p>
          <p style={{ fontSize: "1.25rem", fontWeight: 800, color: "#ca8a04" }}>{doubtCount}</p>
        </div>
        <div style={{ background: "rgba(148,163,184,0.08)", borderRadius: 10, padding: "10px 8px", textAlign: "center" }}>
          <p style={{ fontSize: "0.65rem", color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Kosong</p>
          <p style={{ fontSize: "1.25rem", fontWeight: 800, color: "#94a3b8" }}>{emptyCount}</p>
        </div>
      </div>

      {/* Daftar soal */}
      <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#334155", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12, paddingBottom: 8, borderBottom: "1px solid #f1f5f9" }}>Daftar Soal</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6 }}>
        {shuffledQuestions.map((q, i) => {
          let bg = "#f1f5f9"
          let color = "#64748b"
          let border = "1px solid #e2e8f0"
          if (i === current) { bg = "#172554"; color = "#fff"; border = "1px solid #172554" }
          else if (doubts[i]) { bg = "rgba(234,179,8,0.15)"; color = "#ca8a04"; border = "1px solid rgba(234,179,8,0.3)" }
          else if (answers[i] != null) { bg = "rgba(22,163,74,0.12)"; color = "#16a34a"; border = "1px solid rgba(22,163,74,0.3)" }

          return (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{ background: bg, color, border, borderRadius: 6, padding: "7px 4px", fontSize: "0.72rem", fontWeight: 700, cursor: "pointer", transition: "all 0.15s" }}
            >
              {i + 1}
            </button>
          )
        })}
      </div>

      {/* Legend */}
      <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 6 }}>
        {[
          { color: "#172554", bg: "#172554", label: "Soal aktif" },
          { color: "#16a34a", bg: "rgba(22,163,74,0.12)", label: "Sudah dijawab" },
          { color: "#ca8a04", bg: "rgba(234,179,8,0.15)", label: "Ragu-ragu" },
          { color: "#94a3b8", bg: "#f1f5f9", label: "Belum dijawab" },
        ].map(item => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: item.bg, border: `1px solid ${item.color}40`, flexShrink: 0 }} />
            <span style={{ fontSize: "0.7rem", color: "#64748b" }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>

  </div>
)

}