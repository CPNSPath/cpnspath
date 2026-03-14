"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

const questions = [
{
id:1,
question:"Pancasila sebagai dasar negara ditetapkan pada tanggal?",
options:[
"1 Juni 1945",
"18 Agustus 1945",
"17 Agustus 1945",
"22 Juni 1945",
"20 Mei 1908"
],
answer:"18 Agustus 1945"
},
{
id:2,
question:"Semboyan negara Indonesia adalah?",
options:[
"Tut Wuri Handayani",
"Bhinneka Tunggal Ika",
"Garuda Pancasila",
"Satyameva Jayate",
"NKRI Harga Mati"
],
answer:"Bhinneka Tunggal Ika"
},
{
id:3,
question:"Tujuan negara menurut Pembukaan UUD 1945 adalah?",
options:[
"Melindungi segenap bangsa Indonesia",
"Meningkatkan ekonomi negara",
"Memperkuat militer",
"Menguasai SDA",
"Memperluas wilayah"
],
answer:"Melindungi segenap bangsa Indonesia"
},
{
id:4,
question:"Lambang negara Indonesia adalah?",
options:[
"Bintang",
"Garuda Pancasila",
"Burung Rajawali",
"Elang Jawa",
"Burung Merpati"
],
answer:"Garuda Pancasila"
},
{
id:5,
question:"UUD 1945 disahkan pada tanggal?",
options:[
"17 Agustus 1945",
"18 Agustus 1945",
"1 Juni 1945",
"22 Juni 1945",
"20 Mei 1908"
],
answer:"18 Agustus 1945"
}
]

export default function TWK(){

const [current,setCurrent] = useState(0)
const [answers,setAnswers] = useState({})
const [doubt,setDoubt] = useState({})
const [time,setTime] = useState(1800)

const question = questions[current]

function selectAnswer(opt){

setAnswers({
...answers,
[question.id]:opt
})

}

function toggleDoubt(){

setDoubt({
...doubt,
[question.id]:!doubt[question.id]
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

useEffect(()=>{

const timer = setInterval(()=>{

setTime(prev=>{

if(prev<=1){
clearInterval(timer)
alert("Waktu habis")
return 0
}

return prev-1

})

},1000)

return ()=>clearInterval(timer)

},[])

function calculateScore(){

let correct = 0

questions.forEach(q=>{
if(answers[q.id] === q.answer){
correct++
}
})

return correct

}

async function submitExam(){

const score = calculateScore()

const name = prompt("Masukkan nama kamu")

if(!name) return

const {error} = await supabase
.from("results")
.insert([
{
name:name,
score:score
}
])

if(error){
alert("Gagal menyimpan skor")
return
}

alert("Skor kamu: "+score)

}

const minutes = Math.floor(time/60)
const seconds = time % 60

const answeredCount = Object.keys(answers).length
const progress = (answeredCount/questions.length)*100

return(

<div style={{
minHeight:"100vh",
background:"#070d1a",
color:"white",
fontFamily:"Arial",
padding:"40px"
}}>

<div style={{maxWidth:"1200px",margin:"auto"}}>

<div style={{
display:"flex",
justifyContent:"space-between",
marginBottom:"20px"
}}>

<h2>TWK Tryout</h2>

<div style={{
background:"#111827",
padding:"10px 20px",
borderRadius:"8px"
}}>
Sisa Waktu: {minutes}:{seconds.toString().padStart(2,"0")}
</div>

</div>

<div style={{
height:"10px",
background:"#1f2937",
borderRadius:"6px",
marginBottom:"30px"
}}>

<div style={{
width:`${progress}%`,
height:"10px",
background:"#2563eb",
borderRadius:"6px"
}}/>

</div>

<div style={{
display:"grid",
gridTemplateColumns:"3fr 1fr",
gap:"30px"
}}>

<div style={{
background:"#111827",
padding:"30px",
borderRadius:"10px"
}}>

<div style={{marginBottom:"20px"}}>
Soal {current+1} dari {questions.length}
</div>

<h2 style={{marginBottom:"30px"}}>
{question.question}
</h2>

<div style={{
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

<button
onClick={toggleDoubt}
style={{
marginTop:"20px",
padding:"10px 20px",
background:doubt[question.id] ? "#facc15" : "#374151",
border:"none",
borderRadius:"6px",
color:"black",
cursor:"pointer"
}}
>
{doubt[question.id] ? "Ragu ✓" : "Tandai Ragu"}
</button>

<div style={{
display:"flex",
justifyContent:"space-between",
marginTop:"30px"
}}>

<button
onClick={prev}
style={{
padding:"10px 20px",
background:"#374151",
border:"none",
borderRadius:"6px",
color:"white"
}}
>
Prev
</button>

<button
onClick={next}
style={{
padding:"10px 20px",
background:"#2563eb",
border:"none",
borderRadius:"6px",
color:"white"
}}
>
Next
</button>

</div>

<button
onClick={submitExam}
style={{
marginTop:"20px",
width:"100%",
padding:"12px",
background:"#22c55e",
border:"none",
borderRadius:"6px",
color:"white",
fontSize:"16px",
cursor:"pointer"
}}
>
Submit Ujian
</button>

</div>

<div style={{
background:"#111827",
padding:"20px",
borderRadius:"10px"
}}>

<h3 style={{marginBottom:"20px"}}>
Daftar Soal
</h3>

<div style={{
display:"grid",
gridTemplateColumns:"repeat(5,1fr)",
gap:"10px"
}}>

{questions.map((q,index)=>{

const answered = answers[q.id]
const ragu = doubt[q.id]
const active = index === current

let color = "#1f2937"

if(answered) color = "#2563eb"
if(ragu) color = "#facc15"
if(active) color = "#4f46e5"

return(

<button
key={q.id}
onClick={()=>setCurrent(index)}
style={{
height:"40px",
background:color,
border:"none",
borderRadius:"6px",
color:"white",
cursor:"pointer"
}}
>

{index+1}

</button>

)

})}

</div>

</div>

</div>

</div>
"use client"

import { useState } from "react"

const questions = [
{
id:1,
question:"Pancasila ditetapkan sebagai dasar negara pada tanggal?",
options:[
"1 Juni 1945",
"18 Agustus 1945",
"17 Agustus 1945",
"22 Juni 1945",
"20 Mei 1908"
],
answer:"18 Agustus 1945"
},
{
id:2,
question:"Semboyan negara Indonesia adalah?",
options:[
"Tut Wuri Handayani",
"Bhinneka Tunggal Ika",
"Garuda Pancasila",
"NKRI Harga Mati",
"Satyameva Jayate"
],
answer:"Bhinneka Tunggal Ika"
}
]

export default function Exam(){

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

{/* soal */}

<div style={{

flex:3,
background:"#111827",
padding:"30px",
borderRadius:"10px"

}}>

<h2>

Soal {current+1}

</h2>

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

{/* navigator */}

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
</div>

)

}