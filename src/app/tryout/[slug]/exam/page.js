"use client"

import { useState,useEffect } from "react"
import { useRouter,useParams } from "next/navigation"
import { getQuestions } from "@/lib/questions"
import { useAttempt } from "@/lib/checkAccess"
import { saveTryoutResult } from "@/lib/saveResult"

export default function TryoutExam(){

const router = useRouter()
const params = useParams()
const slug = params.slug

const [shuffledQuestions,setShuffledQuestions] = useState([])
const [loading,setLoading] = useState(true)

const [current,setCurrent]=useState(0)
const [answers,setAnswers]=useState({})
const [doubts,setDoubts]=useState({})
const [time,setTime]=useState(100*60) // 100 menit
const [allowed,setAllowed] = useState(false)
const [submitted,setSubmitted] = useState(false)

// ==========================
// LOAD QUESTIONS FROM DB
// ==========================

useEffect(()=>{

if(!allowed) return // ⬅️ INI KUNCI

async function load(){

const data = await getQuestions(slug)

const formatted = data.map(q=>({
question:q.question,
options:[
q.option_a,
q.option_b,
q.option_c,
q.option_d,
q.option_e
],
answer:q.correct_answer
}))

setShuffledQuestions(formatted)
setLoading(false)

}

load()

},[slug, allowed])

// ==========================
// 🔥 USE ATTEMPT (VERSI BENAR)
// ==========================

useEffect(()=>{

const startAttempt = async()=>{

const ok = await useAttempt(slug)

if(!ok){
alert("Jatah tryout sudah habis!")
router.replace("/dashboard")
return
}

setAllowed(true)

}

startAttempt()

},[slug])

// ==========================
// LOCAL STORAGE SAVE
// ==========================

useEffect(()=>{

const handleBeforeUnload = (e)=>{
e.preventDefault()
e.returnValue = ""
}

window.addEventListener("beforeunload", handleBeforeUnload)

return ()=>{
window.removeEventListener("beforeunload", handleBeforeUnload)
}

},[])

useEffect(()=>{

try{

const savedAnswers = localStorage.getItem(slug+"_answers")

if(savedAnswers){
setAnswers(JSON.parse(savedAnswers))
}

}catch(err){

console.error(err)
localStorage.removeItem(slug+"_answers")

}

},[slug])

useEffect(()=>{
localStorage.setItem(slug+"_answers",JSON.stringify(answers))
},[answers,slug])

// ==========================
// TIMER
// ==========================

useEffect(()=>{

if(!shuffledQuestions.length || submitted) return

const timer=setInterval(()=>{

setTime(prev=>{

if(prev<=1){
if(!submitted){
submitExam(true)
}
clearInterval(timer)
return 0
}

return prev-1

})

},1000)

return()=>clearInterval(timer)

},[shuffledQuestions, submitted])

// ==========================
// HELPER
// ==========================

function formatTime(){

const m=Math.floor(time/60)
const s=time%60

return m+":"+(s<10?"0"+s:s)

}

function selectAnswer(i){
setAnswers(prev=>({
...prev,
[current]:i
}))
}

function toggleDoubt(){
setDoubts({...doubts,[current]:!doubts[current]})
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

// ==========================
// SUBMIT
// ==========================

async function submitExam(force=false){

// 🚨 BLOCK DOUBLE SUBMIT
if(submitted) return

if(!force){
if(!confirm("Apakah Anda yakin ingin mengakhiri ujian?")) return
}

setSubmitted(true)

let twk = 0
let tiu = 0
let tkp = 0

let correct = 0
let wrong = 0
let empty = 0

shuffledQuestions.forEach((q,i)=>{

const userAnswer = answers[i]

// kosong
if(userAnswer === undefined){
empty++
return
}

// ======================
// TWK (0–29)
// ======================
if(i < 30){
if(userAnswer === q.answer){
twk += 5
correct++
}else{
wrong++
}
}

// ======================
// TIU (30–64)
// ======================
else if(i < 65){
if(userAnswer === q.answer){
tiu += 5
correct++
}else{
wrong++
}
}

// ======================
// TKP (65–109)
// ======================
else{

// 🔥 PENTING
// diasumsikan q.answer = nilai (1–5)
tkp += q.answer

correct++ // TKP selalu "benar" (ga ada salah)
}

})

const lulus_twk = twk >= 65
const lulus_tiu = tiu >= 80
const lulus_tkp = tkp >= 166

const total = twk + tiu + tkp

const resultData={
  total, // nilai total
  twk,
  tiu,
  tkp,
  correct,
  wrong,
  empty,
  lulus_twk,
  lulus_tiu,
  lulus_tkp
}

localStorage.setItem(slug+"_result",JSON.stringify(resultData))

try{

await saveTryoutResult({
toSlug: slug,
score: total,
correct,
wrong,
twk,
tiu,
tkp,
lulus_twk,
lulus_tiu,
lulus_tkp
})

}catch(err){
console.log("Save error:", err)
}

router.push(`/tryout/${slug}/result`)
}

// ==========================
// LOADING
// ==========================

if(loading || !allowed){
return(
<div style={{color:"white",padding:"40px"}}>
Memuat soal...
</div>
)
}

// ==========================
// STATS
// ==========================

const answeredCount = Object.keys(answers).length
const doubtCount = Object.keys(doubts).length
const emptyCount = shuffledQuestions.length - answeredCount
const progressPercent = Math.round((answeredCount/shuffledQuestions.length)*100)

// ==========================
// UI
// ==========================

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

{/* PROGRESS */}

<div style={{
marginBottom:"30px",
border:"1px solid #1f2937",
padding:"12px 16px",
borderRadius:"8px",
background:"#020617"
}}>

<div style={{fontSize:"14px",marginBottom:"8px",opacity:"0.8"}}>
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

{/* QUESTION */}

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

<span style={{marginLeft:"12px",fontSize:"16px"}}>
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

<button onClick={prev} style={{
padding:"10px 22px",
background:"#374151",
border:"1px solid #4b5563",
borderRadius:"6px",
color:"white"
}}>Previous</button>

<button onClick={next} style={{
padding:"10px 22px",
background:"#2563eb",
border:"1px solid #1d4ed8",
borderRadius:"6px",
color:"white"
}}>Next</button>

<button onClick={toggleDoubt} style={{
padding:"10px 22px",
background:"#eab308",
border:"1px solid #ca8a04",
borderRadius:"6px",
color:"black"
}}>Ragu-ragu</button>

<button
onClick={()=>submitExam(false)}
disabled={submitted} // ⬅️ TAMBAH DI SINI
style={{
padding:"10px 22px",
background: submitted ? "#6b7280" : "#16a34a",
border:"1px solid #15803d",
borderRadius:"6px",
color:"white",
opacity: submitted ? 0.6 : 1, // ⬅️ opsional biar keliatan disable
cursor: submitted ? "not-allowed" : "pointer"
}}>
Submit
</button>

</div>

</div>

{/* SIDEBAR */}

<div style={{
width:"300px",
background:"#111827",
padding:"25px",
borderLeft:"1px solid #1f2937"
}}>

<h3 style={{marginBottom:"15px",borderBottom:"1px solid #1f2937",paddingBottom:"10px"}}>
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

<button key={i}
onClick={()=>setCurrent(i)}
style={{
padding:"10px",
background:color,
border:"1px solid #1f2937",
borderRadius:"6px",
color:"white",
fontWeight:"bold"
}}>
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

<div style={{fontSize:"13px",opacity:"0.7"}}>
Waktu Tersisa
</div>

<div style={{fontSize:"26px",fontWeight:"bold"}}>
{formatTime()}
</div>

</div>

{/* STAT */}

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