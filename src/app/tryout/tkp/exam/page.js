"use client"

import { useState,useEffect } from "react"

const shuffledQuestions = [

{
question:"Anda melihat rekan kerja melakukan kesalahan dalam laporan yang akan segera dikirim ke atasan. Apa yang Anda lakukan?",
options:[
"Membiarkan saja karena itu bukan tugas saya",
"Langsung melaporkan ke atasan",
"Mengingatkan rekan tersebut secara baik-baik agar diperbaiki",
"Mengoreksi sendiri tanpa memberitahu",
"Menunggu jika ada yang menyadari kesalahan tersebut"
],
answer:2
},

{
question:"Anda diberi tugas tambahan oleh atasan padahal pekerjaan Anda sendiri belum selesai. Sikap Anda adalah...",
options:[
"Menolak karena pekerjaan saya sudah banyak",
"Mengerjakan tugas tambahan setelah pekerjaan utama selesai",
"Mengerjakan keduanya dengan mengatur prioritas",
"Menyerahkan tugas tambahan ke rekan kerja",
"Mengerjakan yang lebih mudah saja"
],
answer:2
},

{
question:"Di kantor terjadi perbedaan pendapat yang cukup keras dalam tim. Apa yang Anda lakukan?",
options:[
"Membiarkan mereka berdebat sampai selesai",
"Memihak salah satu pihak",
"Mencoba menengahi dan mencari solusi terbaik",
"Meninggalkan diskusi tersebut",
"Melaporkan semua kepada pimpinan"
],
answer:2
},

{
question:"Anda menemukan ide baru yang dapat meningkatkan efisiensi pekerjaan. Apa yang Anda lakukan?",
options:[
"Menyimpannya sendiri",
"Menyampaikan ide tersebut kepada atasan",
"Mengabaikannya karena belum tentu diterima",
"Menyuruh orang lain menyampaikan ide tersebut",
"Menggunakan ide itu hanya untuk pekerjaan pribadi"
],
answer:1
},

{
question:"Seorang rekan kerja sering datang terlambat sehingga mempengaruhi kinerja tim. Sikap Anda adalah...",
options:[
"Membiarkan saja",
"Menggosipkan kepada rekan lain",
"Mengingatkan secara baik-baik",
"Melaporkan langsung ke pimpinan tanpa bicara dengannya",
"Menghindari bekerja dengannya"
],
answer:2
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

if(answers[i]===q.answer){
score++
}

})

alert("Skor TKP: "+score+" / "+shuffledQuestions.length)

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