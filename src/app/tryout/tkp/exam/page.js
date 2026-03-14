"use client"

import { useState } from "react"

const questions = [

{
id:1,
question:"Anda diminta membantu rekan kerja yang kesulitan menyelesaikan tugas. Apa yang Anda lakukan?",
options:[
"Membantu sebisa mungkin",
"Menolak karena bukan tugas saya",
"Menyuruh orang lain membantu",
"Mengabaikan saja",
"Menunda bantuan"
],
answer:"Membantu sebisa mungkin"
},

{
id:2,
question:"Jika terjadi konflik dalam tim kerja Anda akan?",
options:[
"Mencari solusi bersama",
"Diam saja",
"Menyalahkan orang lain",
"Meninggalkan tim",
"Menghindar"
],
answer:"Mencari solusi bersama"
}

]

export default function TKP(){

const [current,setCurrent] = useState(0)
const [answers,setAnswers] = useState({})
const [doubt,setDoubt] = useState({})

const question = questions[current]

function selectAnswer(opt){

setAnswers({
...answers,
[question.id]:opt
})

}

function next(){

if(current < questions.length-1){
setCurrent(current+1)
}

}

function prev(){

if(current > 0){
setCurrent(current-1)
}

}

function toggleDoubt(){

setDoubt({
...doubt,
[question.id]:!doubt[question.id]
})

}

return(

<div style={{
minHeight:"100vh",
background:"#0f172a",
color:"white",
display:"flex",
padding:"40px",
gap:"40px"
}}>

<div style={{
flex:3,
background:"#111827",
padding:"30px",
borderRadius:"10px"
}}>

<h2>TKP Soal {current+1}</h2>

<h3 style={{marginTop:"20px"}}>
{question.question}
</h3>

<div style={{
marginTop:"30px",
display:"flex",
flexDirection:"column",
gap:"10px"
}}>

{question.options.map((opt,i)=>{

const selected = answers[question.id] === opt

return(

<button
key={i}
onClick={()=>selectAnswer(opt)}
style={{
padding:"12px",
textAlign:"left",
background:selected ? "#2563eb" : "#1f2937",
border:"none",
borderRadius:"6px",
color:"white",
cursor:"pointer"
}}
>

{String.fromCharCode(65+i)}. {opt}

</button>

)

})}

</div>

<div style={{
marginTop:"30px",
display:"flex",
gap:"20px"
}}>

<button onClick={prev}>Prev</button>

<button onClick={toggleDoubt}>
Tandai Ragu
</button>

<button onClick={next}>Next</button>

</div>

</div>

<div style={{
flex:1,
background:"#111827",
padding:"20px",
borderRadius:"10px"
}}>

<h3>Navigator</h3>

<div style={{
display:"grid",
gridTemplateColumns:"repeat(5,1fr)",
gap:"10px",
marginTop:"20px"
}}>

{questions.map((q,index)=>{

const answered = answers[q.id]
const ragu = doubt[q.id]

let color="#1f2937"

if(answered) color="#2563eb"
if(ragu) color="#facc15"

return(

<button
key={q.id}
onClick={()=>setCurrent(index)}
style={{
height:"40px",
background:color,
border:"none",
borderRadius:"6px",
color:"white"
}}
>

{index+1}

</button>

)

})}

</div>

</div>

</div>

)

}