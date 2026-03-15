"use client"

import { useState,useEffect } from "react"

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

submitExam()

return 0

}

return prev-1

})

},1000)

return()=>clearInterval(timer)

},[])

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

function submitExam(){

if(!confirm("Apakah Anda yakin ingin mengakhiri ujian?")) return

let score=0

shuffledQuestions.forEach((q,i)=>{

if(answers[i]!=null){
score += q.score[answers[i]]
}

})

alert("Skor TKP: "+score)

}

return(

<div style={{
display:"flex",
height:"100vh",
background:"#0f172a",
color:"white",
fontFamily:"Arial",
overflow:"hidden"
}}>

{/* AREA SOAL */}

<div style={{
flex:1,
padding:"40px 50px",
display:"flex",
flexDirection:"column",
borderRight:"1px solid #1f2937",
overflowY:"auto"
}}>

<div style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:"25px",
borderBottom:"1px solid #1f2937",
paddingBottom:"15px"
}}>

<h2 style={{fontSize:"22px"}}>
Soal {current+1} / {shuffledQuestions.length}
</h2>

</div>

{/* PROGRESS BAR */}

<div style={{
marginBottom:"30px",
border:"1px solid #1f2937",
padding:"12px 16px",
borderRadius:"8px",
background:"#020617"
}}>

<div style={{
fontSize:"14px",
marginBottom:"8px",
opacity:"0.8"
}}>
Progress {progressPercent}%
</div>

<div style={{
height:"10px",
background:"#1f2937",
borderRadius:"6px",
overflow:"hidden"
}}>

<div style={{
width:`${progressPercent}%`,
height:"100%",
background:"#2563eb",
transition:"0.3s"
}}/>

</div>

</div>

{/* SOAL */}

<div style={{
background:"#1e293b",
padding:"35px",
borderRadius:"10px",
border:"1px solid #1f2937"
}}>

<p style={{
fontSize:"20px",
marginBottom:"30px",
lineHeight:"1.7"
}}>
{shuffledQuestions[current].question}
</p>

{shuffledQuestions[current].options.map((opt,i)=>(

<div key={i} style={{marginBottom:"16px"}}>

<label style={{
cursor:"pointer",
display:"flex",
alignItems:"center"
}}>

<input
type="radio"
checked={answers[current]===i}
onChange={()=>selectAnswer(i)}
/>

<span style={{
marginLeft:"12px",
fontSize:"16px"
}}>
{opt}
</span>

</label>

</div>

))}

</div>

{/* BUTTON */}

<div style={{
marginTop:"35px",
display:"flex",
gap:"12px",
borderTop:"1px solid #1f2937",
paddingTop:"20px"
}}>

<button
onClick={prev}
style={{
padding:"10px 22px",
background:"#374151",
border:"1px solid #4b5563",
borderRadius:"6px",
color:"white",
cursor:"pointer"
}}
>
Previous
</button>

<button
onClick={next}
style={{
padding:"10px 22px",
background:"#2563eb",
border:"1px solid #1d4ed8",
borderRadius:"6px",
color:"white",
cursor:"pointer"
}}
>
Next
</button>

<button
onClick={toggleDoubt}
style={{
padding:"10px 22px",
background:"#eab308",
border:"1px solid #ca8a04",
borderRadius:"6px",
color:"black",
cursor:"pointer"
}}
>
Ragu-ragu
</button>

<button
onClick={submitExam}
style={{
padding:"10px 22px",
background:"#16a34a",
border:"1px solid #15803d",
borderRadius:"6px",
color:"white",
cursor:"pointer"
}}
>
Submit
</button>

</div>

</div>

<div style={{
width:"300px",
background:"#111827",
padding:"25px",
borderLeft:"1px solid #1f2937",
display:"flex",
flexDirection:"column",
justifyContent:"flex-start"
}}>

<h3 style={{
marginBottom:"15px",
borderBottom:"1px solid #1f2937",
paddingBottom:"10px"
}}>
Daftar Soal
</h3>

<div style={{
display:"grid",
gridTemplateColumns:"repeat(5,1fr)",
gap:"10px",
marginBottom:"25px"
}}>

{shuffledQuestions.map((q,i)=>{

let color="#374151"

if(i===current) color="#2563eb"
else if(doubts[i]) color="#eab308"
else if(answers[i]!=null) color="#16a34a"

return(

<button
key={i}
onClick={()=>setCurrent(i)}
style={{
padding:"10px",
background:color,
border:"1px solid #1f2937",
borderRadius:"6px",
color:"white",
fontWeight:"bold",
cursor:"pointer"
}}
>
{i+1}
</button>

)

})}

</div>

{/* TIMER */}

<div style={{
border:"1px solid #1f2937",
borderRadius:"8px",
padding:"14px",
marginBottom:"20px",
background:"#020617"
}}>

<div style={{
fontSize:"13px",
opacity:"0.7"
}}>
Waktu Tersisa
</div>

<div style={{
fontSize:"26px",
fontWeight:"bold",
marginTop:"4px"
}}>
{formatTime()}
</div>

</div>

{/* STATISTIK */}

<div style={{
background:"#020617",
padding:"15px",
borderRadius:"8px",
fontSize:"14px",
lineHeight:"1.9",
border:"1px solid #1f2937"
}}>

<div>Dijawab : {answeredCount}</div>
<div>Ragu : {doubtCount}</div>
<div>Kosong : {emptyCount}</div>

</div>

</div>

</div>

)

}