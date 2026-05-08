"use client"

import { useState,useEffect } from "react"
import { useRouter } from "next/navigation"

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

function submitExam(force=false){

if(!force){
if(!confirm("Apakah Anda yakin ingin mengakhiri ujian?")) return
}

let score=0
let correct=0
let wrong=0
let empty=0

shuffledQuestions.forEach((q,i)=>{

if(answers[i]===undefined){
empty++
}
else if(answers[i]===q.answer){
score += 5
correct++
}
else{
wrong++
}

})

const resultData={
score,
correct,
wrong,
empty,
total:shuffledQuestions.length,
answers,
questions:shuffledQuestions
}

localStorage.setItem("tiu_result",JSON.stringify(resultData))

router.push("/tryout/tiu/result")

}

return (
  <div className="min-h-screen bg-[#0F172A] text-white flex flex-col lg:flex-row lg:h-screen lg:overflow-hidden">

    {/* Question area */}
    <div className="flex-1 flex flex-col lg:overflow-y-auto">

      <div className="flex items-center px-6 lg:px-10 py-5 border-b border-[#1F2937]">
        <h2 className="text-lg font-semibold">Soal {current + 1} / {shuffledQuestions.length}</h2>
      </div>

      <div className="mx-6 lg:mx-10 mt-6 mb-4 bg-[#020617] border border-[#1F2937] rounded-lg p-4">
        <p className="text-sm text-[#94A3B8] mb-2">Progress {progressPercent}%</p>
        <div className="h-2 bg-[#1F2937] rounded-full overflow-hidden">
          <div className="h-full bg-[#2563EB] transition-all duration-300 rounded-full" style={{width:`${progressPercent}%`}} />
        </div>
      </div>

      <div className="mx-6 lg:mx-10 mb-6 bg-[#1E293B] border border-[#1F2937] rounded-xl p-6 lg:p-8">
        <p className="text-base lg:text-lg leading-relaxed mb-6 lg:mb-8">{shuffledQuestions[current].question}</p>

        <div className="space-y-3">
          {shuffledQuestions[current].options.map((opt, i) => (
            <button
              key={i}
              onClick={() => selectAnswer(i)}
              className={`w-full text-left px-4 lg:px-5 py-3 rounded-lg border text-sm transition-colors ${
                answers[current] === i
                  ? "bg-[#2563EB] border-[#1D4ED8] text-white"
                  : "bg-[#0F172A] border-[#1F2937] text-[#CBD5E1] hover:border-[#2563EB]"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-6 lg:mx-10 mb-8 pt-5 border-t border-[#1F2937] flex flex-wrap gap-3">
        <button
          onClick={prev}
          className="px-5 py-2.5 bg-[#374151] border border-[#4B5563] rounded-lg text-sm hover:bg-[#4B5563] transition-colors"
        >
          Previous
        </button>
        <button
          onClick={next}
          className="px-5 py-2.5 bg-[#2563EB] border border-[#1D4ED8] rounded-lg text-sm hover:bg-[#1D4ED8] transition-colors"
        >
          Next
        </button>
        <button
          onClick={toggleDoubt}
          className="px-5 py-2.5 bg-[#EAB308] border border-[#CA8A04] rounded-lg text-sm text-black hover:bg-[#CA8A04] transition-colors"
        >
          Ragu-ragu
        </button>
        <button
          onClick={() => submitExam(false)}
          className="px-5 py-2.5 bg-[#16A34A] border border-[#15803D] rounded-lg text-sm hover:bg-[#15803D] transition-colors"
        >
          Submit
        </button>
      </div>
    </div>

    {/* Sidebar */}
    <div className="lg:w-72 bg-[#111827] border-t lg:border-t-0 lg:border-l border-[#1F2937] flex flex-col p-6 lg:overflow-y-auto">

      <div className="bg-[#020617] border border-[#1F2937] rounded-lg p-4 mb-4">
        <p className="text-xs text-[#94A3B8] mb-1">Waktu Tersisa</p>
        <p className="text-2xl font-bold">{formatTime()}</p>
      </div>

      <div className="bg-[#020617] border border-[#1F2937] rounded-lg p-4 mb-5 space-y-1 text-sm">
        <p>Dijawab: <span className="font-semibold text-[#4ADE80]">{answeredCount}</span></p>
        <p>Ragu: <span className="font-semibold text-[#EAB308]">{doubtCount}</span></p>
        <p>Kosong: <span className="font-semibold text-[#94A3B8]">{emptyCount}</span></p>
      </div>

      <h3 className="text-sm font-semibold mb-3 pb-2 border-b border-[#1F2937]">Daftar Soal</h3>
      <div className="grid grid-cols-5 gap-2">
        {shuffledQuestions.map((q, i) => {
          let bg = "bg-[#374151]"
          if (i === current) bg = "bg-[#2563EB]"
          else if (doubts[i]) bg = "bg-[#EAB308]"
          else if (answers[i] != null) bg = "bg-[#16A34A]"

          return (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`${bg} border border-[#1F2937] rounded-md py-2 text-xs font-bold text-white hover:opacity-80 transition-opacity`}
            >
              {i + 1}
            </button>
          )
        })}
      </div>
    </div>

  </div>
)

}