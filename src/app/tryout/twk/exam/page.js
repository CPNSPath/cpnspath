"use client"

import { useState,useEffect } from "react"
import { useRouter } from "next/navigation"
import { saveTryoutResult } from "@/lib/saveResult"
import { supabase } from "@/lib/supabase"

const shuffledQuestions = [

{
question:"Pembukaan UUD 1945 dalam kaitannya dengan HAM adalah ...",
options:[
"Piagam HAM Indonesia",
"Sumber HAM Indonesia",
"Pedoman pelaksanaan jaminan HAM Indonesia",
"Penjelasan pelaksanaan HAM Indonesia",
"Rumusan pelaksanaan HAM"
],
answer:0
},

{
question:"Yang menjadi causal final dari Pancasila adalah ...",
options:[
"Piagam Jakarta",
"Bangsa Indonesia",
"Warga Negara Indonesia",
"BPUPKI",
"PPKI"
],
answer:0
},

{
question:"Yang bukan termasuk prinsip dasar negara yang diusulkan oleh Soekarno pada tanggal 1 Juni 1945 adalah ...",
options:[
"Demokrasi",
"Kekeluargaan",
"Perikemanusiaan",
"Kesejahteraan sosial",
"Kebangsaan"
],
answer:1
},

{
question:"Berdasarkan TAP MPRS No. XX/MPRS/1966, Pancasila menempati tempat tertinggi sebagai hukum dasar negara RI, karena Pancasila merupakan ...",
options:[
"Dokumen historis",
"Alat pemersatu bangsa",
"Nilai luhur dari nenek moyang",
"Landasan perjuangan bangsa",
"Dasar negara dan pandangan hidup bangsa Indonesia"
],
answer:4
},

{
question:"Yang diatur oleh hukum dasar negara adalah ...",
options:[
"Susunan organisasi suatu negara",
"Membatasi tugas dan wewenang badan-badan negara",
"Menjaga/mengatur hubungan vertikal antara badan-badan negara",
"Menjaga/mengatur hubungan horizontal antar badan-badan negara",
"Semua jawaban benar"
],
answer:4
},

{
question:"Yang bukan merupakan dampak/akibat dari Dekrit Presiden 5 Juli 1959 adalah ...",
options:[
"Konstituante dibubarkan",
"UUD tidak berlaku",
"Kembali ke UUD 1945",
"Dibentuk DPRS",
"Dibentuk DPAS"
],
answer:3
},

{
question:"Yang bukan merupakan alat-alat perlengkapan MPR adalah ...",
options:[
"Pimpinan MPR",
"Badan pekerja MPR",
"Pembantu MPR",
"Komisi MPR",
"Panitia Ad Hoc MPR"
],
answer:2
},

{
question:"Menteri-menteri negara adalah pembantu presiden. Hal tersebut diatur dalam UUD 1945, yaitu ...",
options:[
"Pasal 18",
"Pasal 19",
"Pasal 17",
"Pasal 16",
"Pasal 15"
],
answer:2
},

{
question:"Berkenaan dengan perubahan isi dari UUD 1945 sebenarnya telah diatur oleh TAP MPR No. IV/MPR/1983 tentang ...",
options:[
"Interpelasi",
"Budget",
"Referendum",
"Mosi tidak percaya",
"Angket"
],
answer:2
},

{
question:"Penyebab utama menyerahnya Jepang kepada Sekutu adalah ...",
options:[
"Jepang tidak mendapat dukungan rakyat Indonesia",
"Jepang kehabisan bala tentara",
"Kaisar Jepang tidak lagi menginginkan perang",
"Pemimpin Jepang banyak gugur",
"Kota Hiroshima dan Nagasaki dibom atom oleh Amerika Serikat"
],
answer:4
},

{
question:"Sehari setelah proklamasi, PPKI mengadakan sidang pertama, hasil sidang tersebut adalah ...",
options:[
"Mengesahkan UUD menjadi UUD 1945",
"Menetapkan Soekarno dan Hatta sebagai presiden dan wakil presiden",
"Presiden sementara dibantu Komite Nasional",
"Dibentuknya DPR dan MPR",
"A,B, dan C benar"
],
answer:4
},

{
question:"Buku Max Havelaar dikarang oleh ...",
options:[
"Van den Bosch",
"Douwes Dekker",
"Raffles",
"Daendels",
"J.P. Coen"
],
answer:1
},

{
question:"Alasan dikeluarkannya Deklarasi Djuanda adalah ...",
options:[
"Mempertahankan NKRI",
"Menciptakan kawasan damai dalam gagasan Wawasan Nusantara",
"Melindungi kekayaan negara Indonesia",
"Memberikan kenyamanan pemerintah untuk menindak pelanggaran laut",
"Melindungi wilayah kepulauan RI"
],
answer:2
},

{
question:"Untuk mendapatkan keadilan pertama bagi rakyat adalah pada tingkat pengadilan negeri, sedangkan Pengadilan Tinggi dan Mahkamah Agung berfungsi sebagai ...",
options:[
"Peradilan banding dan kasasi",
"Peradilan istimewa",
"Peradilan KKN",
"Peradilan perkara berat",
"Peradilan khusus"
],
answer:0
},

{
question:"Mahkamah Agung mempunyai hak untuk menguji terhadap peraturan perundangan yang berlaku, kecuali ...",
options:[
"Peraturan Pemerintah",
"Keputusan Presiden",
"Keputusan Menteri",
"Peraturan Daerah",
"Undang-undang buatan DPR"
],
answer:3
},

{
question:"Dalam dinamika ketatanegaraan Indonesia berlangsung yang tidak pernah mengalami perubahan adalah ...",
options:[
"Bentuk negara",
"Bentuk pemerintahan",
"Corak pemerintahan",
"Lembaga negara",
"Sistem demokrasi"
],
answer:4
},

{
question:"Sistem pemerintahan kabinet presidensil ditandai oleh ...",
options:[
"Kepala negara seorang presiden",
"Presiden merupakan kepala pemerintahan",
"Kedudukan kabinet sejajar dengan parlemen",
"Presiden memegang kekuasaan tertinggi",
"Adanya wakil presiden"
],
answer:1
},

{
question:"Ada bermacam istilah demokrasi, demokrasi yang menonjolkan kebebasan individu adalah ...",
options:[
"Demokrasi langsung",
"Demokrasi tidak langsung",
"Demokrasi terpimpin",
"Demokrasi liberal",
"Demokrasi Pancasila"
],
answer:3
},

{
question:"Hukum administrasi negara merupakan bagian dari hukum tata negara dalam arti luas, karena hukum administrasi negara adalah ...",
options:[
"Sekumpulan peraturan hukum yang mengikat badan negara",
"Peraturan pelanggaran pegawai negeri",
"Peraturan pemberhentian pegawai negeri",
"Peraturan pengangkatan pegawai negeri",
"Peraturan mengenai tugas pegawai negeri"
],
answer:0
},

{
question:"Proses pembuatan ketetapan MPR tahap II adalah ...",
options:[
"Pembahasan rapat paripurna Majelis",
"Pembahasan keputusan rapat paripurna Majelis",
"Pembahasan oleh Badan Pekerja Majelis",
"Pembahasan komisi/panitia Ad Hoc",
"Pengambilan keputusan rapat paripurna"
],
answer:2
},

{
question:"Karena berhasil mengalahkan Portugis, Fatahillah mengganti nama Sunda Kelapa menjadi ...",
options:[
"Batavia",
"Jakarta",
"Jayakarta",
"Betawi",
"Jawa Barat"
],
answer:2
},

{
question:"Agama Islam di Indonesia berkembang di daerah pesisir Sumatra dan Jawa karena ...",
options:[
"Pesisir udaranya sejuk",
"Daerah pesisir padat penduduk",
"Disebarkan melalui perdagangan laut",
"Penduduk pesisir masih bodoh",
"Merupakan pusat kerajaan"
],
answer:2
},

{
question:"Konferensi Meja Bundar diselenggarakan di kota ...",
options:[
"Amsterdam",
"Den Haag",
"Belgium",
"Kolombo",
"New York"
],
answer:1
},

{
question:"Finalis Tujuh Keajaiban Dunia berikut yang berasal dari negara Spanyol adalah ...",
options:[
"Machu Picchu",
"Acropolis",
"Stonehenge",
"Alhambra",
"Timbuktu"
],
answer:3
},

{
question:"Yang bukan merupakan negara bagian Amerika Serikat adalah ...",
options:[
"Idaho",
"Wyoming",
"Roskilde",
"Delaware",
"Colorado"
],
answer:2
},

{
question:"Lagu daerah Potong Bebek Angsa berasal dari provinsi ...",
options:[
"Nusa Tenggara Barat",
"Nusa Tenggara Timur",
"Maluku",
"Papua",
"Kalimantan Barat"
],
answer:1
},

{
question:"Perang Dunia I berakhir pada tahun ...",
options:[
"1914",
"1916",
"1918",
"1921",
"1924"
],
answer:2
},

{
question:"PBI adalah organisasi nasional untuk olahraga ...",
options:[
"Bowling",
"Bridge",
"Bulu tangkis",
"Baseball",
"Berkuda"
],
answer:0
},

{
question:"Kerajaan Sriwijaya terkenal sebagai kerajaan maritim karena ...",
options:[
"Mempunyai armada laut kuat",
"Mengadakan hubungan dagang",
"Menjadi pusat perdagangan Asia Tenggara",
"Letak persimpangan perdagangan",
"Memiliki raja berkuasa"
],
answer:0
},

{
question:"Tujuan diselenggarakannya Konferensi Asia Afrika di antaranya ...",
options:[
"Ikut mengawasi perdamaian dunia",
"Mempererat persatuan Asia",
"Mempersatukan kerja sama Asia",
"Mempererat persatuan dan mengawasi perdamaian dunia",
"Meredakan ketegangan blok Barat dan Timur"
],
answer:2
},

{
question:"Setelah Perang Dunia II berakhir muncul dua kekuatan yaitu Blok Barat dan Blok Timur. Blok Barat dipimpin oleh ...",
options:[
"Inggris",
"Perancis",
"Amerika Serikat",
"Kanada",
"Belanda"
],
answer:2
},

{
question:"Sebagian naskah kuno dari Provinsi Lampung diketahui tersimpan di lembaga luar negeri. Unsur what pada teks tersebut adalah ...",
options:[
"Keprihatinan terhadap naskah kuno Lampung",
"Museum Negeri Lampung menyimpan naskah kuno",
"Naskah kuno Lampung sebagian tersimpan di luar negeri",
"Naskah kuno Lampung memakai bahasa kuno",
"Penyesalan karena naskah kuno Lampung ada di luar negeri"
],
answer:2
},

{
question:"Kalimat berikut ini adalah baku, kecuali ...",
options:[
"Berdasarkan data Pemprov Lampung naskah kuno tersebar di Belanda Denmark Inggris dan Jerman",
"Di Leiden setidaknya ada 5 naskah kuno",
"Anggaran pengadaan koleksi baru benda bersejarah di museum hanya Rp 40-70 juta setahun",
"Penambahan koleksi benda bersejarah di museum negeri Lampung terkendala dana",
"Ia mencontohkan suatu ketika pernah membeli uang kuno eks Karasidenan Lampung"
],
answer:2
},

{
question:"Akar tanaman bakau melengkung besar-besar. Kata reduplikasi yang bermakna sama adalah ...",
options:[
"Program KB membatasi jumlah anak-anak dalam keluarga",
"Lulusan Perguruan Tinggi dalam negeri tidak kalah pintar",
"Aku tidak menerima telepon malam-malam",
"Pada jam istirahat kami makan-makan",
"Bila ada uang adik kecil itu berbelanja"
],
answer:1
},

{
question:"Penulisan nama dan gelar yang benar adalah ...",
options:[
"Sutinah Pertiwi, S.E",
"Moh Indrawan Setyo Hadi M.Pd",
"Hj Rusti Saringsih",
"Dr Laila Sari Devi",
"Rusti Hadiningrat, S.S"
],
answer:3
}

]

export default function TWKExam(){
const router = useRouter()
const [current,setCurrent]=useState(0)
const [answers,setAnswers]=useState({})
const [checking, setChecking] = useState(true)

useEffect(() => {
  async function checkAlreadyDone() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.replace("/login?redirect=/tryout/twk"); return }
    const { data } = await supabase.from("results").select("id").eq("user_id", user.id).eq("tryout_slug", "free-trial-twk").maybeSingle()
    if (data) { router.replace("/tryout/twk/result"); return }
    setChecking(false)
  }
  checkAlreadyDone()
}, [])

useEffect(()=>{

try{

const savedAnswers = localStorage.getItem("twk_answers")

if(savedAnswers){
setAnswers(JSON.parse(savedAnswers))
}

}catch(err){

console.error(err)
localStorage.removeItem("twk_answers")

}

},[])
useEffect(()=>{

localStorage.setItem("twk_answers",JSON.stringify(answers))

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

  localStorage.setItem("twk_result", JSON.stringify(resultData))

  // Simpan ke Supabase
  await saveTryoutResult({
    toSlug: "free-trial-twk",
    score,
    correct,
    wrong,
    twk: score,
    tiu: null,
    tkp: null,
    lulus_twk: score >= 65,
    lulus_tiu: null,
    lulus_tkp: null,
  })

  router.push("/tryout/twk/result")
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
  <div className="exam-wrap" style={{ minHeight: "100vh", background: "#F8FAFC", display: "flex", flexDirection: "row", height: "100vh", overflow: "hidden" }}>

    {/* Area Soal */}
    <div className="exam-question" style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC", overflowY: "auto", minWidth: 0 }}>

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
    <div className="exam-sidebar" style={{ width: "280px", flexShrink: 0, background: "#fff", borderLeft: "1px solid #e2e8f0", display: "flex", flexDirection: "column", padding: "24px", overflowY: "auto" }}>

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

  <style>{`
    @media (max-width: 768px) {
      .exam-wrap { flex-direction: column !important; height: auto !important; overflow: visible !important; min-height: 100vh; }
      .exam-question { overflow-y: visible !important; height: auto !important; }
      .exam-sidebar { width: 100% !important; border-left: none !important; border-top: 1px solid #e2e8f0 !important; }
    }
  `}</style>
  </div>
)

}