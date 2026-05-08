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
console.error("Save result error:", err)
}

router.push(`/tryout/${slug}/result`)
}

// ==========================
// LOADING
// ==========================

if(loading || !allowed){
return(
<div className="min-h-screen bg-[#0F172A] text-white flex items-center justify-center">
    <p className="text-[#94A3B8]">Memuat soal...</p>
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
          disabled={submitted}
          className={`px-5 py-2.5 rounded-lg text-sm border transition-colors ${
            submitted
              ? "bg-[#6B7280] border-[#6B7280] opacity-60 cursor-not-allowed"
              : "bg-[#16A34A] border-[#15803D] hover:bg-[#15803D]"
          }`}
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