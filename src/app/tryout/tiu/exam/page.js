"use client"

import { useState,useEffect } from "react"

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

localStorage.setItem("tiu_answers",JSON.stringify(answers))

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

if(answers[i]===q.answer){
score += 5
}

})

alert("Skor TIU: "+score+" / "+shuffledQuestions.length)

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


{/* NAVIGATOR SIDEBAR */}

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