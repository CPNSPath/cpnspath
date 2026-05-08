"use client"

import { useState,useEffect } from "react"
import { useRouter } from "next/navigation"

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

function submitExam(force=false){

if(!force){
if(!confirm("Apakah Anda yakin ingin mengakhiri ujian?")) return
}

let score=0
let answered=0
let empty=0

shuffledQuestions.forEach((q,i)=>{

if(answers[i]===undefined){
empty++
}
else{
score += q.score[answers[i]]
answered++
}

})

const resultData={
score,
answered,
empty,
total:shuffledQuestions.length,
answers,
questions:shuffledQuestions
}

localStorage.setItem("tkp_result",JSON.stringify(resultData))

router.push("/tryout/tkp/result")

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