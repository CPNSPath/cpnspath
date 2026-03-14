"use client"

import { useState,useEffect } from "react"

const questions = [

{
question:"Pancasila sebagai dasar negara ditetapkan pada tanggal?",
options:[
"1 Juni 1945",
"18 Agustus 1945",
"17 Agustus 1945",
"22 Juni 1945",
"20 Mei 1908"
],
answer:1
},

{
question:"Semboyan negara Indonesia adalah?",
options:[
"Tut Wuri Handayani",
"Bhinneka Tunggal Ika",
"Garuda Pancasila",
"Satyameva Jayate",
"NKRI Harga Mati"
],
answer:1
},

{
question:"UUD 1945 disahkan pada tanggal?",
options:[
"17 Agustus 1945",
"18 Agustus 1945",
"1 Juni 1945",
"22 Juni 1945",
"20 Mei 1908"
],
answer:1
},

{
question:"Lambang negara Indonesia adalah?",
options:[
"Bintang",
"Garuda Pancasila",
"Rajawali",
"Elang",
"Merpati"
],
answer:1
},

{
question:"Sila pertama Pancasila adalah?",
options:[
"Kemanusiaan yang adil dan beradab",
"Ketuhanan Yang Maha Esa",
"Persatuan Indonesia",
"Kerakyatan yang dipimpin hikmat",
"Keadilan sosial"
],
answer:1
},

{
question:"Sila kedua Pancasila berbunyi?",
options:[
"Ketuhanan Yang Maha Esa",
"Kemanusiaan yang adil dan beradab",
"Persatuan Indonesia",
"Kerakyatan yang dipimpin hikmat",
"Keadilan sosial"
],
answer:1
},

{
question:"Dasar hukum tertinggi di Indonesia adalah?",
options:[
"Pancasila",
"UUD 1945",
"UU",
"Perpres",
"Perda"
],
answer:1
},

{
question:"Indonesia adalah negara?",
options:[
"Kerajaan",
"Serikat",
"Kesatuan",
"Federasi",
"Koloni"
],
answer:2
},

{
question:"Bentuk negara Indonesia adalah?",
options:[
"Republik",
"Monarki",
"Kerajaan",
"Imperium",
"Kesultanan"
],
answer:0
},

{
question:"Bendera Indonesia berwarna?",
options:[
"Merah putih",
"Biru putih",
"Merah biru",
"Putih biru",
"Merah kuning"
],
answer:0
},

{
question:"Ibukota Indonesia saat ini adalah?",
options:[
"Bandung",
"Jakarta",
"Surabaya",
"Yogyakarta",
"Medan"
],
answer:1
},

{
question:"Bahasa nasional Indonesia adalah?",
options:[
"Jawa",
"Melayu",
"Indonesia",
"Sunda",
"Batak"
],
answer:2
},

{
question:"Hari kemerdekaan Indonesia adalah?",
options:[
"1 Juni 1945",
"17 Agustus 1945",
"18 Agustus 1945",
"20 Mei 1908",
"28 Oktober 1928"
],
answer:1
},

{
question:"Peristiwa Sumpah Pemuda terjadi pada tahun?",
options:[
"1908",
"1928",
"1945",
"1930",
"1950"
],
answer:1
},

{
question:"BPUPKI dibentuk oleh Jepang pada tahun?",
options:[
"1942",
"1943",
"1944",
"1945",
"1946"
],
answer:3
},

{
question:"Ketua BPUPKI adalah?",
options:[
"Soekarno",
"Hatta",
"Radjiman Wedyodiningrat",
"Supomo",
"Moh Yamin"
],
answer:2
},

{
question:"Tokoh yang merumuskan Pancasila 1 Juni 1945 adalah?",
options:[
"Soekarno",
"Hatta",
"Supomo",
"Moh Yamin",
"Radjiman"
],
answer:0
},

{
question:"Pembukaan UUD 1945 terdiri dari berapa alinea?",
options:[
"2",
"3",
"4",
"5",
"6"
],
answer:2
},

{
question:"Pasal dalam UUD 1945 sebelum amandemen berjumlah?",
options:[
"27",
"37",
"45",
"50",
"65"
],
answer:1
},

{
question:"Indonesia menganut sistem pemerintahan?",
options:[
"Parlementer",
"Presidensial",
"Monarki",
"Kerajaan",
"Kolonial"
],
answer:1
},

{
question:"Presiden pertama Indonesia adalah?",
options:[
"Soekarno",
"Soeharto",
"Habibie",
"Gus Dur",
"Megawati"
],
answer:0
},

{
question:"Wakil presiden pertama Indonesia adalah?",
options:[
"Ahmad Yani",
"Moh Hatta",
"Sutan Sjahrir",
"Agus Salim",
"Ki Hajar Dewantara"
],
answer:1
},

{
question:"Garuda Pancasila diresmikan pada tahun?",
options:[
"1945",
"1950",
"1951",
"1955",
"1960"
],
answer:1
},

{
question:"Jumlah provinsi Indonesia saat ini sekitar?",
options:[
"34",
"35",
"36",
"37",
"38"
],
answer:4
},

{
question:"Sistem demokrasi Indonesia berdasarkan?",
options:[
"Pancasila",
"Kerajaan",
"Kolonial",
"Militer",
"Federasi"
],
answer:0
},

{
question:"Bhinneka Tunggal Ika artinya?",
options:[
"Bersatu kita teguh",
"Berbeda beda tetapi tetap satu",
"Indonesia merdeka",
"Gotong royong",
"Satu bangsa"
],
answer:1
},

{
question:"Hari Kebangkitan Nasional diperingati setiap?",
options:[
"20 Mei",
"1 Juni",
"17 Agustus",
"28 Oktober",
"10 November"
],
answer:0
},

{
question:"Hari Sumpah Pemuda diperingati?",
options:[
"20 Mei",
"1 Juni",
"17 Agustus",
"28 Oktober",
"10 November"
],
answer:3
},

{
question:"Hari Pahlawan diperingati?",
options:[
"20 Mei",
"1 Juni",
"17 Agustus",
"28 Oktober",
"10 November"
],
answer:4
},

{
question:"Negara Indonesia berdasar atas hukum terdapat dalam UUD 1945 pasal?",
options:[
"1 ayat 3",
"2 ayat 1",
"3 ayat 1",
"4 ayat 1",
"5 ayat 1"
],
answer:0
},

{
question:"Kedaulatan berada di tangan rakyat terdapat pada pasal?",
options:[
"1 ayat 2",
"2 ayat 1",
"3 ayat 2",
"4 ayat 1",
"5 ayat 1"
],
answer:0
},

{
question:"Presiden memegang kekuasaan pemerintahan menurut pasal?",
options:[
"4 ayat 1",
"3 ayat 1",
"2 ayat 1",
"1 ayat 1",
"5 ayat 1"
],
answer:0
},

{
question:"Lembaga pembentuk undang-undang adalah?",
options:[
"MPR",
"DPR",
"Presiden",
"MA",
"BPK"
],
answer:1
},

{
question:"Mahkamah Konstitusi berfungsi untuk?",
options:[
"Mengadili sengketa konstitusi",
"Membuat UU",
"Mengawasi presiden",
"Mengatur pajak",
"Mengatur daerah"
],
answer:0
},

{
question:"Indonesia merdeka pada tahun?",
options:[
"1942",
"1943",
"1944",
"1945",
"1946"
],
answer:3
}

]

export default function TWKExam(){

const [current,setCurrent]=useState(0)
const [answers,setAnswers]=useState({})
const [doubts,setDoubts]=useState({})
const [time,setTime]=useState(30*60)

useEffect(()=>{

const timer=setInterval(()=>{

setTime(prev=>{

if(prev<=1){

clearInterval(timer)
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

if(current<questions.length-1){
setCurrent(current+1)
}

}

function prev(){

if(current>0){
setCurrent(current-1)
}

}

function submitExam(){

let score=0

questions.forEach((q,i)=>{

if(answers[i]===q.answer){
score++
}

})

alert("Skor TWK: "+score+" / "+questions.length)

}

return(

<div style={{
display:"flex",
height:"100vh",
background:"#0f172a",
color:"white",
fontFamily:"Arial"
}}>

{/* NAVIGATOR */}

<div style={{
width:"260px",
background:"#111827",
padding:"20px"
}}>

<h3 style={{marginBottom:"10px"}}>Daftar Soal</h3>

<div style={{
display:"grid",
gridTemplateColumns:"repeat(5,1fr)",
gap:"8px"
}}>

{questions.map((q,i)=>{

let color="#374151"

if(doubts[i]) color="#eab308"
else if(answers[i]!=null) color="#16a34a"

return(

<button
key={i}
onClick={()=>setCurrent(i)}
style={{
padding:"10px",
background:color,
border:"none",
borderRadius:"6px",
color:"white",
fontWeight:"bold"
}}
>
{i+1}
</button>

)

})}

</div>

{/* TIMER */}

<div style={{marginTop:"25px"}}>

<div style={{fontSize:"14px",opacity:0.7}}>
Waktu Tersisa
</div>

<div style={{
fontSize:"28px",
fontWeight:"bold",
marginTop:"5px"
}}>
{formatTime()}
</div>

</div>

</div>

{/* AREA SOAL */}

<div style={{
flex:1,
padding:"40px"
}}>

<div style={{
display:"flex",
justifyContent:"space-between",
marginBottom:"20px"
}}>

<h2>Soal {current+1} / {questions.length}</h2>

</div>

<div style={{
background:"#1e293b",
padding:"25px",
borderRadius:"10px"
}}>

<p style={{
fontSize:"18px",
marginBottom:"20px"
}}>
{questions[current].question}
</p>

{questions[current].options.map((opt,i)=>(

<div key={i} style={{marginBottom:"12px"}}>

<label style={{cursor:"pointer"}}>

<input
type="radio"
checked={answers[current]===i}
onChange={()=>selectAnswer(i)}
/>

<span style={{marginLeft:"10px"}}>

{opt}

</span>

</label>

</div>

))}

</div>

{/* BUTTONS */}

<div style={{
marginTop:"30px",
display:"flex",
gap:"10px"
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
Previous
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

<button
onClick={toggleDoubt}
style={{
padding:"10px 20px",
background:"#eab308",
border:"none",
borderRadius:"6px",
color:"black"
}}
>
Ragu-ragu
</button>

<button
onClick={submitExam}
style={{
padding:"10px 20px",
background:"#16a34a",
border:"none",
borderRadius:"6px",
color:"white"
}}
>
Submit
</button>

</div>

</div>

</div>

)

}