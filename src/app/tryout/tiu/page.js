"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import { supabase } from "@/lib/supabase";

export default function TIUIntro() {
  const router = useRouter();
  const [totalSoal, setTotalSoal] = useState(null);

  useEffect(() => {
    async function fetchCount() {
      const { count, error } = await supabase
        .from("questions")
        .select("*", { count: "exact", head: true })
        .eq("tryout_slug", "skd-to-1")
        .eq("subtest", "tiu");
      if (!error) setTotalSoal(count || 0);
      else setTotalSoal(0);
    }
    fetchCount();
  }, []);

  const startExam = () => {
    if (!totalSoal || totalSoal === 0) {
      alert("Soal TIU belum tersedia. Hubungi admin.");
      return;
    }
    const confirm = window.confirm(
      "⏱ Ujian TIU akan berlangsung selama 30 menit.\n\n⚠️ PERHATIAN:\n• Jangan refresh atau keluar halaman.\n• Jika terpaksa keluar, ujian akan otomatis disubmit.\n\nApakah Anda siap?"
    );
    if (confirm) router.push("/tryout/tiu/exam");
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/10 text-navy text-xs font-semibold mb-3">
            🎓 Free Trial
          </div>
          <h1 className="text-2xl font-bold text-navy">Tes Intelegensi Umum (TIU)</h1>
          <p className="text-gray-500 mt-1">Simulasi CAT CPNS — Free Trial</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-100 bg-gray-50/30">
            <h2 className="text-lg font-semibold text-navy">Informasi Ujian</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Durasi</span>
              <span className="font-semibold">30 menit</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Total Soal</span>
              <span className="font-semibold">{totalSoal ?? "..."} soal</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Passing Grade</span>
              <span className="font-semibold text-red-600">80</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-100 bg-gray-50/30">
            <h2 className="text-lg font-semibold text-navy">Materi Ujian</h2>
          </div>
          <div className="p-6">
            <div className="flex items-start gap-3">
              <div className="w-1 h-8 rounded-full bg-purple-500 mt-0.5"></div>
              <div>
                <span className="font-semibold text-purple-600">Tes Intelegensi Umum (TIU)</span>
                <p className="text-sm text-gray-500">Passing grade minimal 80</p>
                <p className="text-sm text-gray-500">{totalSoal ?? "..."} soal</p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={startExam}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg text-lg"
        >
          🚀 Mulai Ujian Sekarang
        </button>
        <p className="text-center text-xs text-gray-400 mt-6">
          Pastikan koneksi internet stabil. Ujian tidak bisa dijeda.
        </p>
      </div>
    </DashboardLayout>
  );
}