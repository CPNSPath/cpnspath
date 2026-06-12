"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DashboardLayout from "@/components/DashboardLayout";

export default function TIUResultPage() {
  const router = useRouter();
  const [result, setResult] = useState(null);
  const [filter, setFilter] = useState("all"); // all, wrong, empty

  useEffect(() => {
    const saved = localStorage.getItem("free-trial-tiu_result");
    if (!saved) {
      router.replace("/tryout/tiu");
      return;
    }
    setResult(JSON.parse(saved));
  }, [router]);

  if (!result) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="text-center">Memuat hasil...</div>
        </div>
      </DashboardLayout>
    );
  }

  const { score, correct, wrong, empty, total, answers, questions } = result;
  const passingGrade = 80;
  const lulus = score >= passingGrade;

  // Membuat review items
  const reviewItems = questions.map((q, i) => {
    const userAns = answers[i];
    const isEmpty = userAns === undefined || userAns === null;
    const isCorrect = !isEmpty && userAns === q.answer;
    return { i, q, userAns, isEmpty, status: isEmpty ? "empty" : isCorrect ? "correct" : "wrong" };
  });

  const wrongCount = reviewItems.filter((r) => r.status === "wrong").length;
  const emptyCount = reviewItems.filter((r) => r.status === "empty").length;

  const filtered = reviewItems.filter((r) => {
    if (filter === "wrong") return r.status === "wrong";
    if (filter === "empty") return r.status === "empty";
    return true;
  });

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto py-8 px-4">
        <div className="mb-6">
          <Link
            href="/tryout/tiu"
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-navy mb-2"
          >
            ← Kembali ke Tryout TIU
          </Link>
          <h1 className="text-2xl font-bold text-navy">Hasil Free Trial TIU</h1>
          <p className="text-gray-500">{lulus ? "Selamat! Anda memenuhi passing grade." : "Belum mencapai passing grade, tetap semangat!"}</p>
        </div>

        {/* Card utama */}
        <div className={`bg-white rounded-xl border-l-8 shadow-sm p-6 mb-6 ${lulus ? "border-l-green-500" : "border-l-red-500"}`}>
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <p className="text-sm text-gray-500">Skor TIU</p>
              <p className="text-5xl font-bold text-navy">{score}</p>
              <p className="text-sm text-gray-500 mt-1">{correct} benar, {wrong} salah, {empty} kosong</p>
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-bold ${lulus ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {lulus ? "✅ LULUS" : "❌ TIDAK LULUS"}
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
            Passing grade TIU: {passingGrade}
          </div>
        </div>

        {/* Rincian sederhana */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <h2 className="text-lg font-semibold text-navy mb-4">Ringkasan TIU</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-green-50 p-3 rounded-lg"><p className="text-2xl font-bold text-green-600">{correct}</p><p className="text-xs text-gray-500">Benar</p></div>
            <div className="bg-red-50 p-3 rounded-lg"><p className="text-2xl font-bold text-red-600">{wrong}</p><p className="text-xs text-gray-500">Salah</p></div>
            <div className="bg-gray-100 p-3 rounded-lg"><p className="text-2xl font-bold text-gray-600">{empty}</p><p className="text-xs text-gray-500">Kosong</p></div>
          </div>
        </div>

        {/* Review Jawaban dengan filter */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <h2 className="text-lg font-semibold text-navy">📖 Review Jawaban</h2>
            <div className="flex gap-2">
              <button onClick={() => setFilter("all")} className={`px-3 py-1 rounded-full text-xs font-semibold ${filter === "all" ? "bg-navy text-white" : "bg-gray-100 text-gray-600"}`}>Semua ({total})</button>
              <button onClick={() => setFilter("wrong")} className={`px-3 py-1 rounded-full text-xs font-semibold ${filter === "wrong" ? "bg-navy text-white" : "bg-gray-100 text-gray-600"}`}>Salah ({wrongCount})</button>
              <button onClick={() => setFilter("empty")} className={`px-3 py-1 rounded-full text-xs font-semibold ${filter === "empty" ? "bg-navy text-white" : "bg-gray-100 text-gray-600"}`}>Kosong ({emptyCount})</button>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-10 text-gray-400">Tidak ada soal yang sesuai filter</div>
          ) : (
            <div className="space-y-4">
              {filtered.map((r) => {
                const statusBadge = r.status === "correct" ? { text: "✓ Benar", bg: "bg-green-100 text-green-700" } :
                                    r.status === "wrong" ? { text: "✗ Salah", bg: "bg-red-100 text-red-700" } :
                                    { text: "○ Kosong", bg: "bg-gray-100 text-gray-500" };
                return (
                  <div key={r.i} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-7 h-7 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-bold">{r.i + 1}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${statusBadge.bg}`}>{statusBadge.text}</span>
                    </div>
                    <p className="font-medium text-gray-800 mb-2">{r.q.question}</p>
                    <div className="space-y-1 text-sm">
                      {r.q.options.map((opt, idx) => {
                        const isUser = r.userAns === idx;
                        const isCorrect = idx === r.q.answer;
                        let bg = "bg-white";
                        let border = "border-gray-200";
                        let textColor = "text-gray-700";
                        let label = "";
                        if (isUser && isCorrect) { bg = "bg-green-50"; border = "border-green-300"; textColor = "text-green-700"; label = "✓ Jawaban Anda (benar)"; }
                        else if (isUser && !isCorrect) { bg = "bg-red-50"; border = "border-red-300"; textColor = "text-red-700"; label = "✗ Jawaban Anda"; }
                        else if (isCorrect) { bg = "bg-green-50/30"; border = "border-green-200"; textColor = "text-green-600"; label = "Jawaban benar"; }
                        return (
                          <div key={idx} className={`p-2 rounded-lg border ${bg} ${border} flex justify-between items-center`}>
                            <div><span className="font-mono mr-2">{String.fromCharCode(65+idx)}.</span> {opt}</div>
                            {label && <span className="text-xs font-semibold">{label}</span>}
                          </div>
                        );
                      })}
                    </div>
                    {r.q.explanation && (
                      <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
                        💡 {r.q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Tombol aksi */}
        <div className="mt-6 flex gap-3">
          <Link href="/tryout/tiu" className="flex-1 text-center border border-gray-300 rounded-lg py-3 text-gray-700 hover:bg-gray-50">← Ulang Tryout TIU</Link>
          <Link href="/dashboard" className="flex-1 text-center bg-navy text-white rounded-lg py-3 hover:bg-navy/90">Lihat Dashboard</Link>
        </div>
      </div>
    </DashboardLayout>
  );
}