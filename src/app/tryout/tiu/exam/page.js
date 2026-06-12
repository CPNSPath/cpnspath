"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { saveTryoutResult } from "@/lib/saveResult";

const EXAM_SLUG = "free-trial-tiu";
const TIMER_KEY = `${EXAM_SLUG}_start_time`;
const ANSWERS_KEY = `${EXAM_SLUG}_answers`;

export default function TIUExam() {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [doubts, setDoubts] = useState({});
  const [time, setTime] = useState(null);
  const [checking, setChecking] = useState(true);
  const submittedRef = useRef(false);

  useEffect(() => {
    async function init() {
      // Auth check
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        router.replace("/login?redirect=/tryout/tiu/exam");
        return;
      }

      // Cek sudah pernah ngerjain?
      const { data: existing } = await supabase
        .from("results")
        .select("id")
        .eq("user_id", user.id)
        .eq("tryout_slug", EXAM_SLUG)
        .maybeSingle();
      if (existing) {
        router.replace("/tryout/tiu/result");
        return;
      }

      // Fetch soal dari DB (skd-to-1, subtest tiu)
      const { data: soal, error: soalError } = await supabase
        .from("questions")
        .select("question, option_a, option_b, option_c, option_d, option_e, correct_answer")
        .eq("tryout_slug", "skd-to-1")
        .eq("subtest", "tiu")
        .order("question_number", { ascending: true });

      if (soalError || !soal || soal.length === 0) {
        alert("Soal TIU tidak ditemukan. Hubungi admin.");
        router.replace("/tryout/tiu");
        return;
      }

      const mapped = soal.map((q) => ({
        question: q.question,
        options: [q.option_a, q.option_b, q.option_c, q.option_d, q.option_e],
        answer: ["A", "B", "C", "D", "E"].indexOf(q.correct_answer),
      }));
      setQuestions(mapped);

      // Timer persistence
      let startTime = parseInt(localStorage.getItem(TIMER_KEY));
      if (!startTime || isNaN(startTime)) {
        startTime = Date.now();
        localStorage.setItem(TIMER_KEY, startTime.toString());
      }
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = 30 * 60 - elapsed;
      if (remaining <= 0) {
        setTime(0);
        setChecking(false);
        setLoading(false);
        return;
      }
      setTime(remaining);
      setChecking(false);
      setLoading(false);

      // Load saved answers
      const saved = localStorage.getItem(ANSWERS_KEY);
      if (saved) {
        try {
          setAnswers(JSON.parse(saved));
        } catch (e) {}
      }
    }
    init();
  }, []);

  useEffect(() => {
    if (!loading && questions.length > 0) {
      localStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));
    }
  }, [answers, loading, questions.length]);

  // Timer countdown
  useEffect(() => {
    if (checking || loading || time === null) return;
    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          submitExam(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [checking, loading, time]);

  // Anti back button
  useEffect(() => {
    if (checking) return;
    window.history.pushState({ examLock: true }, "");
    const handlePopState = (e) => {
      if (submittedRef.current) return;
      const confirmLeave = window.confirm(
        "⚠️ Jika Anda keluar, ujian akan langsung disubmit dan tidak bisa diulang.\n\nYakin ingin keluar?"
      );
      if (confirmLeave) {
        submitExam(true);
      } else {
        window.history.pushState({ examLock: true }, "");
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [checking]);

  // Anti refresh/close tab
  useEffect(() => {
    if (checking) return;
    const handleBeforeUnload = (e) => {
      if (submittedRef.current) return;
      e.preventDefault();
      e.returnValue = "Jika Anda keluar, ujian akan otomatis diselesaikan. Yakin?";
      return e.returnValue;
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [checking]);

  async function submitExam(force = false) {
    if (submittedRef.current) return;
    if (!force && !confirm("Apakah Anda yakin ingin mengakhiri ujian?")) return;
    submittedRef.current = true;

    let score = 0,
      correct = 0,
      wrong = 0,
      empty = 0;
    questions.forEach((q, i) => {
      const ans = answers[i];
      if (ans === undefined) empty++;
      else if (ans === q.answer) {
        score += 5;
        correct++;
      } else {
        wrong++;
      }
    });

    const resultData = {
      score,
      correct,
      wrong,
      empty,
      total: questions.length,
      answers,
      questions: questions.map((q) => ({ ...q, explanation: null })), // explanation optional
    };
    localStorage.setItem(`${EXAM_SLUG}_result`, JSON.stringify(resultData));

    await saveTryoutResult({
      toSlug: EXAM_SLUG,
      score,
      correct,
      wrong,
      twk: null,
      tiu: score,
      tkp: null,
      lulus_twk: null,
      lulus_tiu: score >= 80,
      lulus_tkp: null,
    });

    localStorage.removeItem(TIMER_KEY);
    router.push("/tryout/tiu/result");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">Memuat soal...</div>
      </div>
    );
  }
  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center text-red-500">Soal tidak tersedia</div>
      </div>
    );
  }

  const answeredCount = Object.keys(answers).length;
  const emptyCount = questions.length - answeredCount;
  const progressPercent = Math.round((answeredCount / questions.length) * 100);
  const formatTime = () => {
    if (time === null) return "--:--";
    const m = Math.floor(time / 60);
    const s = time % 60;
    return `${m}:${s < 10 ? "0" + s : s}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-row h-screen overflow-hidden">
      {/* Left Side: Soal */}
      <div className="flex-1 overflow-auto p-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div className="bg-navy text-white px-3 py-1 rounded-full text-xs font-bold">Free Trial</div>
            <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold">TIU — Soal {current + 1}</div>
            <div className={`px-3 py-1 rounded-full text-xs font-bold ${time !== null && time <= 300 ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"}`}>
              ⏱ {formatTime()}
            </div>
          </div>
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1">
              <span className="font-semibold text-purple-600">TIU</span>
              <span className="text-gray-500">{answeredCount}/{questions.length}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
          <div className="mb-6">
            <div className="flex gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-bold">{current + 1}</div>
              <p className="text-gray-800 font-medium">{questions[current].question}</p>
            </div>
            <div className="space-y-2">
              {questions[current].options.map((opt, idx) => {
                const isSelected = answers[current] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setAnswers({ ...answers, [current]: idx })}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      isSelected
                        ? "border-purple-500 bg-purple-50 text-purple-700 font-medium"
                        : "border-gray-200 hover:border-purple-300 hover:bg-gray-50"
                    }`}
                  >
                    <span className="inline-block w-6 font-bold">{String.fromCharCode(65 + idx)}.</span> {opt}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrent((c) => Math.max(0, c - 1))}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:border-navy hover:text-navy transition"
            >
              ← Prev
            </button>
            <button
              onClick={() => setCurrent((c) => Math.min(questions.length - 1, c + 1))}
              className="px-4 py-2 bg-navy text-white rounded-lg hover:bg-navy/90 transition"
            >
              Next →
            </button>
            <button
              onClick={() => setDoubts({ ...doubts, [current]: !doubts[current] })}
              className={`px-4 py-2 border rounded-lg transition ${
                doubts[current]
                  ? "bg-yellow-100 border-yellow-400 text-yellow-800"
                  : "border-gray-300 text-gray-600 hover:border-yellow-400"
              }`}
            >
              ⚠ Ragu
            </button>
            <button
              onClick={() => submitExam(false)}
              className="ml-auto px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold rounded-lg transition"
            >
              Submit Ujian
            </button>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-auto flex-shrink-0">
        <div className={`text-center p-3 rounded-lg mb-4 ${time !== null && time <= 300 ? "bg-red-50" : "bg-gray-50"}`}>
          <p className="text-xs text-gray-500 uppercase">Waktu Tersisa</p>
          <p className={`text-3xl font-bold ${time !== null && time <= 300 ? "text-red-600" : "text-navy"}`}>{formatTime()}</p>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4 text-center">
          <div className="bg-green-50 p-2 rounded-lg">
            <p className="font-bold text-green-600">{answeredCount}</p>
            <p className="text-xs text-gray-500">Dijawab</p>
          </div>
          <div className="bg-yellow-50 p-2 rounded-lg">
            <p className="font-bold text-yellow-600">{Object.keys(doubts).length}</p>
            <p className="text-xs text-gray-500">Ragu</p>
          </div>
          <div className="bg-gray-100 p-2 rounded-lg">
            <p className="font-bold text-gray-600">{emptyCount}</p>
            <p className="text-xs text-gray-500">Kosong</p>
          </div>
        </div>
        <div className="mb-2">
          <p className="text-xs font-bold text-purple-600 uppercase mb-2">TIU</p>
          <div className="grid grid-cols-5 gap-1">
            {questions.map((_, i) => {
              let bg = "bg-gray-100";
              let text = "text-gray-600";
              if (i === current) {
                bg = "bg-purple-500";
                text = "text-white";
              } else if (answers[i] !== undefined) {
                bg = "bg-green-100";
                text = "text-green-700";
              } else if (doubts[i]) {
                bg = "bg-yellow-100";
                text = "text-yellow-700";
              }
              return (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-8 h-8 rounded text-xs font-bold ${bg} ${text} transition`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </div>
        <div className="mt-4 pt-2 border-t border-gray-100 text-xs text-gray-400">
          <div className="flex items-center gap-2 mb-1"><div className="w-3 h-3 rounded-full bg-purple-500"></div><span>Soal aktif</span></div>
          <div className="flex items-center gap-2 mb-1"><div className="w-3 h-3 rounded-full bg-green-100 border border-green-300"></div><span>Sudah dijawab</span></div>
          <div className="flex items-center gap-2 mb-1"><div className="w-3 h-3 rounded-full bg-yellow-100 border border-yellow-300"></div><span>Ragu-ragu</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-gray-200 border border-gray-300"></div><span>Belum dijawab</span></div>
        </div>
      </div>
    </div>
  );
}