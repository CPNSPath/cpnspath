"use client"

import { useEffect,useState } from "react"

export default function TKPResult(){

const [data,setData]=useState(null)

useEffect(()=>{

const saved = localStorage.getItem("tkp_result")

if(saved){
setData(JSON.parse(saved))
}

},[])

if(!data){
return <div style={{color:"white"}}>Memuat hasil...</div>
}

return(

<div style={{
minHeight:"100vh",
background:"#070d1a",
color:"white",
padding:"60px",
fontFamily:"Arial"
}}>

<div style={{maxWidth:"900px",margin:"auto"}}>

<h1 style={{marginBottom:"30px"}}>
Hasil TKP
</h1>

{/* STATISTIK */}

<div style={{
background:"#111827",
padding:"25px",
borderRadius:"10px",
marginBottom:"30px"
}}>

<h2 style={{marginBottom:"15px"}}>Statistik</h2>

<div>Skor : {data.score}</div>
<div>Benar : {data.correct}</div>
<div>Salah : {data.wrong}</div>
<div>Kosong : {data.empty}</div>
<div>Total Soal : {data.total}</div>

</div>

{/* PEMBAHASAN */}

<h2 style={{marginBottom:"20px"}}>
Pembahasan Soal
</h2>

{data.questions.map((q,i)=>{

const userAnswer=data.answers[i]
const correctAnswer=q.answer

return(

<div
key={i}
style={{
background:"#111827",
padding:"25px",
borderRadius:"10px",
marginBottom:"20px"
}}
>

<p style={{marginBottom:"15px"}}>
<b>{i+1}. {q.question}</b>
</p>

{q.options.map((opt,index)=>{

let color="#9ca3af"

if(index===correctAnswer) color="#22c55e"

if(index===userAnswer && index!==correctAnswer) color="#ef4444"

return(

<div key={index} style={{marginBottom:"6px",color}}>

{String.fromCharCode(65+index)}. {opt}

{index===correctAnswer && " ✔"}
{index===userAnswer && index!==correctAnswer && " (Jawaban Anda)"}

</div>

)

})}

</div>

)

})}

</div>

</div>

)

}