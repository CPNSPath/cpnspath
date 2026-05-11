"use client"

import { useState,useEffect } from "react"
import { useRouter } from "next/navigation"
import { saveTryoutResult } from "@/lib/saveResult"
import { supabase } from "@/lib/supabase"

const shuffledQuestions = [

{
question:"GETIR = ...",
options:["Manis","Sakit","Pedas","Nyeri","Pahit"],
answer:4
},

{
question:"BANDELA = ...",
options:["Peti kemas","Bendera","Lambang","Simbol","Umbul-umbul"],
answer:0
},

{
question:"MUKADIMAH = ...",
options:["Atas","Pengantar","Penutup","Isi","Pembukaan"],
answer:4
},

{
question:"SINKRON >< ...",
options:["Selaras","Serasi","Berbeda","Harmonis","Sesuai"],
answer:2
},

{
question:"NEKAT >< ...",
options:["Niat","Motif","Maksud","Berani","Takut"],
answer:4
},

{
question:"ELEKTRIK >< ...",
options:["Tunjuk","Campur","Kolot","Pilih","Tak pilih-pilih"],
answer:4
},

{
question:"BURUNG : SARANG = ... : ...",
options:[
"Orang : Rumah",
"Murid : Sekolah",
"Dompet : Uang",
"Kandang : Kambing",
"Rapat : Gedung"
],
answer:0
},

{
question:"SELASA : KAMIS = ... : ...",
options:[
"Januari : Maret",
"Menit : Jam",
"Jam : Hari",
"Mei : Agustus",
"Gelap : Terang"
],
answer:0
},

{
question:"DINAR : SENA = ... : ...",
options:[
"Kakak : Anak",
"Barat : Selatan",
"Siang : Malam",
"Sepatu : Tas",
"Menit : Detik"
],
answer:4
},

{
question:"BURUNG : EKOR = ... : ...",
options:[
"Gajah : Belalai",
"Kapal : Buritan",
"Kucing : Bulu",
"Harimau : Taring",
"Rusa : Tanduk"
],
answer:1
},

{
question:"Kartamarta menjual mobilnya Rp 10.000.000 dan rugi 66 2/3%. Berapakah harga beli mobil tersebut?",
options:[
"Rp 30.000.000",
"Rp 33.000.000",
"Rp 34.000.000",
"Rp 35.000.000",
"Rp 12.000.000"
],
answer:0
},

{
question:"Biaya mengecat dinding tinggi 4 m dan panjang 13 m jika biaya Rp 4.500 per m² adalah ...",
options:[
"Rp 207.000",
"Rp 216.000",
"Rp 225.000",
"Rp 234.000",
"Rp 243.000"
],
answer:3
},

{
question:"Jika bekerja 6 jam mulai pukul 08.00 maka selesai pada pukul ...",
options:["14.45","12.00","13.30","02.00","14.00"],
answer:4
},

{
question:"Volume maksimum selokan berbentuk trapesium dengan panjang 15 m dan tinggi 0,2 m adalah ...",
options:["6750 m³","675 m³","67,5 m³","6,75 m³","0,675 m³"],
answer:3
},

{
question:"Himpunan penyelesaian dari 3x - 4 > 5 + 2x adalah ...",
options:["x < 9","x < 1","x > -9","x > 9","x > -1"],
answer:3
},

{
question:"Jika x = 2,4 − 1,98 + 0,009 dan y = 5,08 maka ...",
options:["x = y","x < y","x > y","x ≠ y","x ≥ y"],
answer:1
},

{
question:"Pada seleksi CPNS terdapat 200 peserta dengan perbandingan tertentu. Persentase perempuan di kehutanan adalah ...",
options:["10%","15%","20%","34%","41%"],
answer:2
},

{
question:"Jika nilai 90 belajar 12 jam/hari, maka nilai 60 belajar ...",
options:["112,5 jam","24 jam","18 jam","8 jam","6 jam"],
answer:3
},

{
question:"Durna berjalan 2 jam menempuh 8,7 km. Pada setengah jam ke-4 jarak yang ditempuh adalah ...",
options:["25 m","50 m","100 m","150 m","200 m"],
answer:4
},

{
question:"Mobil menempuh 7 km dalam 15 menit. Rata-rata jarak dalam 1 jam adalah ...",
options:["20 km","22 km","24 km","26 km","28 km"],
answer:4
},

{
question:"Jika rata-rata nilai 100 dan jumlah siswa berubah maka nilai kelas I adalah ...",
options:["83,33","125","60","40","50"],
answer:2
},

{
question:"Berapakah nilai x dari (1/2 + 1/3 − x)/3 = 16?",
options:["1/3","1/4","1/5","1/2","3/4"],
answer:0
},

{
question:"A C E G I ...",
options:["K dan M","J dan L","K dan N","J dan N","K dan J"],
answer:0
},

{
question:"A B D G K ...",
options:["O dan V","M dan O","O dan N","N dan O","O"],
answer:0
},

{
question:"212, 101, 111, 212, -101, -111, -212, ...",
options:[
"111, -212",
"-111, 101",
"-101, 111",
"-111, -212",
"-101, 111"
],
answer:3
},

{
question:"Semua pohon bercabang dan berakar. Tanaman A berakar tetapi tidak bercabang. Kesimpulan ...",
options:[
"A adalah pohon",
"A bukan pohon",
"A pohon tidak bercabang",
"A pohon tidak berakar",
"A bukan pohon bercabang"
],
answer:1
},

{
question:"Semua santri pandai bahasa Arab. Sebagian santri pandai pidato. Kesimpulan ...",
options:[
"Sebagian santri tidak suka matematika",
"Sebagian santri suka matematika",
"Sebagian santri suka matematika tetapi tidak pandai bahasa Arab",
"Sebagian santri suka matematika dan tidak pandai bahasa Arab",
"Sebagian santri suka matematika tetapi tidak suka bahasa Arab"
],
answer:0
},

{
question:"Semua wanita senang perhiasan dan kosmetik. A tidak senang kosmetik tetapi senang perhiasan. Maka ...",
options:[
"A wanita tidak senang kosmetik",
"A wanita senang perhiasan",
"A wanita tidak senang kosmetik meskipun senang perhiasan",
"A bukan wanita meskipun senang perhiasan",
"A bukan wanita tetapi senang kosmetik"
],
answer:3
},

{
question:"Ada ada kecil pun ada. Makna peribahasa adalah ...",
options:[
"Harta benda bukan yang utama",
"Bersenang hati dengan apa yang didapat",
"Uang sedikit lebih baik daripada tidak ada",
"Memberi manfaat walaupun sedikit",
"Bersyukur atas nikmat"
],
answer:1
},

{
question:"Seperti anjing menggonggong tulang. Maknanya ...",
options:[
"Orang loba tidak pernah puas",
"Keserakahan membuat manusia seperti hewan",
"Manusia selalu tidak puas",
"Manusia selalu ingin mendapatkan sesuatu",
"Orang yang ingin menunjukkan kelebihan"
],
answer:0
}

]

export default function TIUExam(){
const router = useRouter()
const [current,setCurrent]=useState(0)
const [answers,setAnswers]=useState({})
const [checking, setChecking] = useState(true)

useEffect(() => {
  async function checkAlreadyDone() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.replace("/login?redirect=/tryout/tiu"); return }
    const { data } = await supabase.from("results").select("id").eq("user_id", user.id).eq("tryout_slug", "free-trial-tiu").maybeSingle()
    if (data) { router.replace("/tryout/tiu/result"); return }
    setChecking(false)
  }
  checkAlreadyDone()
}, [])

useEffect(()=>{

try{

const savedAnswers = localStorage.getItem("tiu_answers")

if(savedAnswers){
setAnswers(JSON.parse(savedAnswers))
}

}catch(err){

console.error(err)
localStorage.removeItem("tiu_answers")

}

},[])

useEffect(()=>{
localStorage.setItem("tiu_answers",JSON.stringify(answers))
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
  let correct=0
  let wrong=0
  let empty=0

  shuffledQuestions.forEach((q,i)=>{
    if(answers[i]===undefined){ empty++ }
    else if(answers[i]===q.answer){ score += 5; correct++ }
    else{ wrong++ }
  })

  const resultData={
    score, correct, wrong, empty,
    total: shuffledQuestions.length,
    answers, questions: shuffledQuestions
  }

  localStorage.setItem("tiu_result", JSON.stringify(resultData))

  // Simpan ke Supabase
  await saveTryoutResult({
    toSlug: "free-trial-tiu",
    score,
    correct,
    wrong,
    twk: null,
    tiu: score,
    tkp: null,
    lulus_twk: null,
    lulus_tiu: score >= 80,
    lulus_tkp: null,
  })

  router.push("/tryout/tiu/result")
}

if (checking) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F8FAFC", flexDirection: "column", gap: 16 }}>
      <div style={{ width: 40, height: 40, border: "4px solid #e2e8f0", borderTop: "4px solid #172554", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <p style={{ color: "#64748b", fontSize: "0.9rem" }}>Memeriksa akses...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
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