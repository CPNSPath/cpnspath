"use client"

import { useState,useEffect } from "react"

const shuffledQuestions = [

{
question:"Pembukaan UUD 1945 dalam kaitannya dengan HAM adalah ...",
options:[
"Piagam HAM Indonesia",
"Sumber HAM Indonesia",
"Pedoman pelaksanaan jaminan HAM Indonesia",
"Penjelasan pelaksanaan HAM Indonesia",
"Rumusan pelaksanaan HAM"
],
answer:0
},

{
question:"Yang menjadi causal final dari Pancasila adalah ...",
options:[
"Piagam Jakarta",
"Bangsa Indonesia",
"Warga Negara Indonesia",
"BPUPKI",
"PPKI"
],
answer:0
},

{
question:"Yang bukan termasuk prinsip dasar negara yang diusulkan oleh Soekarno pada tanggal 1 Juni 1945 adalah ...",
options:[
"Demokrasi",
"Kekeluargaan",
"Perikemanusiaan",
"Kesejahteraan sosial",
"Kebangsaan"
],
answer:1
},

{
question:"Berdasarkan TAP MPRS No. XX/MPRS/1966, Pancasila menempati tempat tertinggi sebagai hukum dasar negara RI, karena Pancasila merupakan ...",
options:[
"Dokumen historis",
"Alat pemersatu bangsa",
"Nilai luhur dari nenek moyang",
"Landasan perjuangan bangsa",
"Dasar negara dan pandangan hidup bangsa Indonesia"
],
answer:4
},

{
question:"Yang diatur oleh hukum dasar negara adalah ...",
options:[
"Susunan organisasi suatu negara",
"Membatasi tugas dan wewenang badan-badan negara",
"Menjaga/mengatur hubungan vertikal antara badan-badan negara",
"Menjaga/mengatur hubungan horizontal antar badan-badan negara",
"Semua jawaban benar"
],
answer:4
},

{
question:"Yang bukan merupakan dampak/akibat dari Dekrit Presiden 5 Juli 1959 adalah ...",
options:[
"Konstituante dibubarkan",
"UUD tidak berlaku",
"Kembali ke UUD 1945",
"Dibentuk DPRS",
"Dibentuk DPAS"
],
answer:3
},

{
question:"Yang bukan merupakan alat-alat perlengkapan MPR adalah ...",
options:[
"Pimpinan MPR",
"Badan pekerja MPR",
"Pembantu MPR",
"Komisi MPR",
"Panitia Ad Hoc MPR"
],
answer:2
},

{
question:"Menteri-menteri negara adalah pembantu presiden. Hal tersebut diatur dalam UUD 1945, yaitu ...",
options:[
"Pasal 18",
"Pasal 19",
"Pasal 17",
"Pasal 16",
"Pasal 15"
],
answer:2
},

{
question:"Berkenaan dengan perubahan isi dari UUD 1945 sebenarnya telah diatur oleh TAP MPR No. IV/MPR/1983 tentang ...",
options:[
"Interpelasi",
"Budget",
"Referendum",
"Mosi tidak percaya",
"Angket"
],
answer:2
},

{
question:"Penyebab utama menyerahnya Jepang kepada Sekutu adalah ...",
options:[
"Jepang tidak mendapat dukungan rakyat Indonesia",
"Jepang kehabisan bala tentara",
"Kaisar Jepang tidak lagi menginginkan perang",
"Pemimpin Jepang banyak gugur",
"Kota Hiroshima dan Nagasaki dibom atom oleh Amerika Serikat"
],
answer:4
},

{
question:"Sehari setelah proklamasi, PPKI mengadakan sidang pertama, hasil sidang tersebut adalah ...",
options:[
"Mengesahkan UUD menjadi UUD 1945",
"Menetapkan Soekarno dan Hatta sebagai presiden dan wakil presiden",
"Presiden sementara dibantu Komite Nasional",
"Dibentuknya DPR dan MPR",
"A,B, dan C benar"
],
answer:4
},

{
question:"Buku Max Havelaar dikarang oleh ...",
options:[
"Van den Bosch",
"Douwes Dekker",
"Raffles",
"Daendels",
"J.P. Coen"
],
answer:1
},

{
question:"Alasan dikeluarkannya Deklarasi Djuanda adalah ...",
options:[
"Mempertahankan NKRI",
"Menciptakan kawasan damai dalam gagasan Wawasan Nusantara",
"Melindungi kekayaan negara Indonesia",
"Memberikan kenyamanan pemerintah untuk menindak pelanggaran laut",
"Melindungi wilayah kepulauan RI"
],
answer:2
},

{
question:"Untuk mendapatkan keadilan pertama bagi rakyat adalah pada tingkat pengadilan negeri, sedangkan Pengadilan Tinggi dan Mahkamah Agung berfungsi sebagai ...",
options:[
"Peradilan banding dan kasasi",
"Peradilan istimewa",
"Peradilan KKN",
"Peradilan perkara berat",
"Peradilan khusus"
],
answer:0
},

{
question:"Mahkamah Agung mempunyai hak untuk menguji terhadap peraturan perundangan yang berlaku, kecuali ...",
options:[
"Peraturan Pemerintah",
"Keputusan Presiden",
"Keputusan Menteri",
"Peraturan Daerah",
"Undang-undang buatan DPR"
],
answer:3
},

{
question:"Dalam dinamika ketatanegaraan Indonesia berlangsung yang tidak pernah mengalami perubahan adalah ...",
options:[
"Bentuk negara",
"Bentuk pemerintahan",
"Corak pemerintahan",
"Lembaga negara",
"Sistem demokrasi"
],
answer:4
},

{
question:"Sistem pemerintahan kabinet presidensil ditandai oleh ...",
options:[
"Kepala negara seorang presiden",
"Presiden merupakan kepala pemerintahan",
"Kedudukan kabinet sejajar dengan parlemen",
"Presiden memegang kekuasaan tertinggi",
"Adanya wakil presiden"
],
answer:1
},

{
question:"Ada bermacam istilah demokrasi, demokrasi yang menonjolkan kebebasan individu adalah ...",
options:[
"Demokrasi langsung",
"Demokrasi tidak langsung",
"Demokrasi terpimpin",
"Demokrasi liberal",
"Demokrasi Pancasila"
],
answer:3
},

{
question:"Hukum administrasi negara merupakan bagian dari hukum tata negara dalam arti luas, karena hukum administrasi negara adalah ...",
options:[
"Sekumpulan peraturan hukum yang mengikat badan negara",
"Peraturan pelanggaran pegawai negeri",
"Peraturan pemberhentian pegawai negeri",
"Peraturan pengangkatan pegawai negeri",
"Peraturan mengenai tugas pegawai negeri"
],
answer:0
},

{
question:"Proses pembuatan ketetapan MPR tahap II adalah ...",
options:[
"Pembahasan rapat paripurna Majelis",
"Pembahasan keputusan rapat paripurna Majelis",
"Pembahasan oleh Badan Pekerja Majelis",
"Pembahasan komisi/panitia Ad Hoc",
"Pengambilan keputusan rapat paripurna"
],
answer:2
},

{
question:"Karena berhasil mengalahkan Portugis, Fatahillah mengganti nama Sunda Kelapa menjadi ...",
options:[
"Batavia",
"Jakarta",
"Jayakarta",
"Betawi",
"Jawa Barat"
],
answer:2
},

{
question:"Agama Islam di Indonesia berkembang di daerah pesisir Sumatra dan Jawa karena ...",
options:[
"Pesisir udaranya sejuk",
"Daerah pesisir padat penduduk",
"Disebarkan melalui perdagangan laut",
"Penduduk pesisir masih bodoh",
"Merupakan pusat kerajaan"
],
answer:2
},

{
question:"Konferensi Meja Bundar diselenggarakan di kota ...",
options:[
"Amsterdam",
"Den Haag",
"Belgium",
"Kolombo",
"New York"
],
answer:1
},

{
question:"Finalis Tujuh Keajaiban Dunia berikut yang berasal dari negara Spanyol adalah ...",
options:[
"Machu Picchu",
"Acropolis",
"Stonehenge",
"Alhambra",
"Timbuktu"
],
answer:3
},

{
question:"Yang bukan merupakan negara bagian Amerika Serikat adalah ...",
options:[
"Idaho",
"Wyoming",
"Roskilde",
"Delaware",
"Colorado"
],
answer:2
},

{
question:"Lagu daerah Potong Bebek Angsa berasal dari provinsi ...",
options:[
"Nusa Tenggara Barat",
"Nusa Tenggara Timur",
"Maluku",
"Papua",
"Kalimantan Barat"
],
answer:1
},

{
question:"Perang Dunia I berakhir pada tahun ...",
options:[
"1914",
"1916",
"1918",
"1921",
"1924"
],
answer:2
},

{
question:"PBI adalah organisasi nasional untuk olahraga ...",
options:[
"Bowling",
"Bridge",
"Bulu tangkis",
"Baseball",
"Berkuda"
],
answer:0
},

{
question:"Kerajaan Sriwijaya terkenal sebagai kerajaan maritim karena ...",
options:[
"Mempunyai armada laut kuat",
"Mengadakan hubungan dagang",
"Menjadi pusat perdagangan Asia Tenggara",
"Letak persimpangan perdagangan",
"Memiliki raja berkuasa"
],
answer:0
},

{
question:"Tujuan diselenggarakannya Konferensi Asia Afrika di antaranya ...",
options:[
"Ikut mengawasi perdamaian dunia",
"Mempererat persatuan Asia",
"Mempersatukan kerja sama Asia",
"Mempererat persatuan dan mengawasi perdamaian dunia",
"Meredakan ketegangan blok Barat dan Timur"
],
answer:2
},

{
question:"Setelah Perang Dunia II berakhir muncul dua kekuatan yaitu Blok Barat dan Blok Timur. Blok Barat dipimpin oleh ...",
options:[
"Inggris",
"Perancis",
"Amerika Serikat",
"Kanada",
"Belanda"
],
answer:2
},

{
question:"Sebagian naskah kuno dari Provinsi Lampung diketahui tersimpan di lembaga luar negeri. Unsur what pada teks tersebut adalah ...",
options:[
"Keprihatinan terhadap naskah kuno Lampung",
"Museum Negeri Lampung menyimpan naskah kuno",
"Naskah kuno Lampung sebagian tersimpan di luar negeri",
"Naskah kuno Lampung memakai bahasa kuno",
"Penyesalan karena naskah kuno Lampung ada di luar negeri"
],
answer:2
},

{
question:"Kalimat berikut ini adalah baku, kecuali ...",
options:[
"Berdasarkan data Pemprov Lampung naskah kuno tersebar di Belanda Denmark Inggris dan Jerman",
"Di Leiden setidaknya ada 5 naskah kuno",
"Anggaran pengadaan koleksi baru benda bersejarah di museum hanya Rp 40-70 juta setahun",
"Penambahan koleksi benda bersejarah di museum negeri Lampung terkendala dana",
"Ia mencontohkan suatu ketika pernah membeli uang kuno eks Karasidenan Lampung"
],
answer:2
},

{
question:"Akar tanaman bakau melengkung besar-besar. Kata reduplikasi yang bermakna sama adalah ...",
options:[
"Program KB membatasi jumlah anak-anak dalam keluarga",
"Lulusan Perguruan Tinggi dalam negeri tidak kalah pintar",
"Aku tidak menerima telepon malam-malam",
"Pada jam istirahat kami makan-makan",
"Bila ada uang adik kecil itu berbelanja"
],
answer:1
},

{
question:"Penulisan nama dan gelar yang benar adalah ...",
options:[
"Sutinah Pertiwi, S.E",
"Moh Indrawan Setyo Hadi M.Pd",
"Hj Rusti Saringsih",
"Dr Laila Sari Devi",
"Rusti Hadiningrat, S.S"
],
answer:3
}

]

export default function TWKExam(){

const [current,setCurrent]=useState(0)
const [answers,setAnswers]=useState({})
useEffect(()=>{
    useEffect(()=>{

localStorage.setItem("twk_answers",JSON.stringify(answers))

},[answers])
const savedAnswers = localStorage.getItem("twk_answers")

if(savedAnswers){
setAnswers(JSON.parse(savedAnswers))
}

},[])
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

localStorage.setItem("twk_answers",JSON.stringify(answers))

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

alert("Skor TWK: "+score+" / "+shuffledQuestions.length)

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