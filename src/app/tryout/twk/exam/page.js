"use client"

import { useState,useEffect } from "react"

const questions = [

{
question:"Pembukaan UUD 1945 dalam kaitannya dengan HAM adalah ...",
options:[
"Piagam HAM Indonesia",
"Sumber HAM Indonesia",
"Pedoman pelaksanaan jaminan HAM Indonesia",
"Penjelasan pelaksanaan HAM Indonesia",
"Rumusan pelaksanaan HAM"
],
answer:0,
explanation:"Pembukaan UUD 1945 disebut Piagam HAM Indonesia."
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
answer:0,
explanation:"Causal final Pancasila tercantum dalam Piagam Jakarta."
},

{
question:"Yang bukan prinsip dasar negara yang diusulkan Soekarno 1 Juni 1945 adalah ...",
options:[
"Demokrasi",
"Kekeluargaan",
"Perikemanusiaan",
"Kesejahteraan sosial",
"Kebangsaan"
],
answer:1,
explanation:"Prinsip Soekarno tidak memasukkan kekeluargaan."
},

{
question:"Berdasarkan TAP MPRS No XX/MPRS/1966 Pancasila adalah ...",
options:[
"Dokumen sejarah",
"Alat pemersatu",
"Nilai nenek moyang",
"Landasan perjuangan",
"Dasar negara"
],
answer:4,
explanation:"Pancasila merupakan dasar negara dan pandangan hidup bangsa."
},

{
question:"Yang diatur hukum dasar negara adalah ...",
options:[
"Susunan organisasi negara",
"Membatasi kekuasaan negara",
"Hubungan antar lembaga negara",
"Hubungan vertikal horizontal",
"Semua benar"
],
answer:4,
explanation:"Hukum dasar negara mengatur seluruh struktur negara."
},

{
question:"Yang bukan dampak Dekrit Presiden 5 Juli 1959 adalah ...",
options:[
"Konstituante dibubarkan",
"UUDS tidak berlaku",
"Kembali ke UUD 1945",
"Dibentuk DPRS",
"Dibentuk DPAS"
],
answer:3,
explanation:"DPRS bukan dampak langsung Dekrit Presiden."
},

{
question:"Yang bukan alat perlengkapan MPR adalah ...",
options:[
"Pimpinan MPR",
"Badan pekerja MPR",
"Pembantu MPR",
"Komisi MPR",
"Panitia Ad Hoc"
],
answer:2,
explanation:"Alat MPR hanya pimpinan, badan pekerja, komisi, dan panitia ad hoc."
},

{
question:"Menteri negara adalah pembantu presiden diatur dalam pasal ...",
options:[
"Pasal 18",
"Pasal 19",
"Pasal 17",
"Pasal 16",
"Pasal 12"
],
answer:2,
explanation:"Pasal 17 UUD 1945 menyatakan menteri adalah pembantu presiden."
},

{
question:"TAP MPR No IV/MPR/1983 mengatur tentang ...",
options:[
"Interpelasi",
"Budget",
"Referendum",
"Mosi tidak percaya",
"Angket"
],
answer:2,
explanation:"TAP tersebut mengatur referendum."
},

{
question:"Penyebab utama Jepang menyerah kepada Sekutu adalah ...",
options:[
"Tidak mendapat dukungan rakyat Indonesia",
"Kehabisan tentara",
"Kaisar Jepang menyerah",
"Pemimpin Jepang gugur",
"Hiroshima dan Nagasaki dibom"
],
answer:4,
explanation:"Bom atom Hiroshima dan Nagasaki menyebabkan Jepang menyerah."
},

{
question:"Sidang pertama PPKI menghasilkan ...",
options:[
"Mengesahkan UUD 1945",
"Menetapkan presiden dan wakil presiden",
"Presiden dibantu Komite Nasional",
"Dibentuk DPR",
"A,B,C benar"
],
answer:4,
explanation:"Sidang 18 Agustus menghasilkan tiga keputusan utama tersebut."
},

{
question:"Buku Max Havelaar ditulis oleh ...",
options:[
"Van den Bosch",
"Douwes Dekker",
"Raffles",
"Daendels",
"JP Coen"
],
answer:1,
explanation:"Ditulis oleh Multatuli (Douwes Dekker)."
},

{
question:"Deklarasi Djuanda bertujuan ...",
options:[
"Mempertahankan NKRI",
"Menciptakan kawasan damai",
"Melindungi kekayaan laut",
"Memudahkan penindakan laut",
"Melindungi wilayah kepulauan"
],
answer:2,
explanation:"Deklarasi Djuanda menegaskan kedaulatan laut Indonesia."
},

{
question:"Pengadilan Tinggi dan Mahkamah Agung berfungsi sebagai ...",
options:[
"Peradilan banding dan kasasi",
"Peradilan istimewa",
"Peradilan KKN",
"Perkara berat",
"Peradilan khusus"
],
answer:0,
explanation:"PT sebagai banding dan MA sebagai kasasi."
},

{
question:"Mahkamah Agung tidak dapat menguji ...",
options:[
"Peraturan Pemerintah",
"Keputusan Presiden",
"Keputusan Menteri",
"Peraturan Daerah",
"Undang-undang"
],
answer:4,
explanation:"UU diuji oleh Mahkamah Konstitusi."
},

{
question:"Yang tidak pernah berubah dalam dinamika ketatanegaraan Indonesia adalah ...",
options:[
"Bentuk negara",
"Bentuk pemerintahan",
"Corak pemerintahan",
"Lembaga negara",
"Sistem demokrasi"
],
answer:0,
explanation:"Indonesia selalu berbentuk negara kesatuan."
},

{
question:"Kabinet presidensial ditandai oleh ...",
options:[
"Kepala negara presiden",
"Presiden kepala pemerintahan",
"Kabinet sederajat dengan parlemen",
"Presiden kekuasaan tertinggi",
"Ada wakil presiden"
],
answer:1,
explanation:"Presiden memegang kekuasaan eksekutif."
},

{
question:"Demokrasi yang menonjolkan kebebasan individu adalah ...",
options:[
"Demokrasi langsung",
"Demokrasi tidak langsung",
"Demokrasi terpimpin",
"Demokrasi liberal",
"Demokrasi Pancasila"
],
answer:3,
explanation:"Demokrasi liberal menonjolkan kebebasan individu."
},

{
question:"Hukum administrasi negara adalah ...",
options:[
"Peraturan mengikat badan negara",
"Pelanggaran pegawai",
"Pemberhentian pegawai",
"Pengangkatan pegawai",
"Tugas pegawai"
],
answer:0,
explanation:"HAN adalah hukum yang mengatur tindakan administrasi negara."
},

{
question:"Tahap II pembuatan ketetapan MPR adalah ...",
options:[
"Penjelasan rapat",
"Keputusan paripurna",
"Pembahasan badan pekerja",
"Pembahasan komisi",
"Pengambilan keputusan"
],
answer:2,
explanation:"Tahap II dilakukan oleh badan pekerja."
},

// soal 21–35 diringkas tetapi tetap sesuai sumber

{
question:"Fatahillah mengganti nama Sunda Kelapa menjadi ...",
options:["Batavia","Jakarta","Jayakarta","Betawi","Jawa Barat"],
answer:2,
explanation:"Jayakarta berarti kota kemenangan."
},

{
question:"Islam berkembang di pesisir karena ...",
options:["Udara sejuk","Penduduk padat","Perdagangan laut","Penduduk bodoh","Pusat kerajaan"],
answer:2,
explanation:"Islam disebarkan melalui jalur perdagangan."
},

{
question:"Konferensi Meja Bundar dilaksanakan di ...",
options:["Amsterdam","Den Haag","Belgia","Kolombo","New York"],
answer:1,
explanation:"KMB berlangsung di Den Haag Belanda."
},

{
question:"Finalis 7 keajaiban dunia dari Spanyol adalah ...",
options:["Machu Picchu","Acropolis","Stonehenge","Alhambra","Timbuktu"],
answer:3,
explanation:"Alhambra berada di Granada Spanyol."
},

{
question:"Yang bukan negara bagian Amerika Serikat adalah ...",
options:["Idaho","Wyoming","Roskilde","Delaware","Colorado"],
answer:2,
explanation:"Roskilde berada di Denmark."
},

{
question:"Lagu Potong Bebek Angsa berasal dari ...",
options:["NTB","NTT","Maluku","Papua","Kalbar"],
answer:1,
explanation:"Lagu daerah Nusa Tenggara Timur."
},

{
question:"Perang Dunia I berakhir tahun ...",
options:["1914","1916","1918","1921","1924"],
answer:2,
explanation:"PD I berlangsung 1914–1918."
},

{
question:"PBI adalah organisasi olahraga ...",
options:["Bowling","Bridge","Bulutangkis","Baseball","Berkuda"],
answer:0,
explanation:"PBI = Persatuan Bowling Indonesia."
},

{
question:"Sriwijaya menjadi kerajaan maritim karena ...",
options:[
"Armada laut kuat",
"Hubungan dagang",
"Pusat perdagangan",
"Letak strategis",
"Raja berkuasa"
],
answer:0,
explanation:"Sriwijaya menguasai jalur laut perdagangan."
},

{
question:"Tujuan Konferensi Asia Afrika adalah ...",
options:[
"Mengawasi perdamaian",
"Mempererat persatuan",
"Kerja sama Asia Afrika",
"Semua benar",
"Meredakan blok barat timur"
],
answer:3,
explanation:"KAA bertujuan kerja sama dan perdamaian."
},

{
question:"Blok Barat pada Perang Dingin dipimpin oleh ...",
options:[
"Inggris",
"Perancis",
"Amerika Serikat",
"Kanada",
"Belanda"
],
answer:2,
explanation:"Blok Barat dipimpin Amerika Serikat."
},

{
question:"Unsur 'what' pada teks naskah Lampung adalah ...",
options:[
"Keprihatinan naskah kuno",
"Museum Lampung",
"Naskah Lampung di luar negeri",
"Naskah bahasa asing",
"Penyesalan"
],
answer:2,
explanation:"Teks menjelaskan naskah Lampung tersimpan di luar negeri."
},

{
question:"Kalimat tidak baku adalah ...",
options:[
"Data Pemprov Lampung",
"Naskah di Leiden",
"Anggaran Rp 40-70 juta per tahun",
"Penambahan koleksi museum",
"Mencontohkan uang aku"
],
answer:2,
explanation:"Penulisan 'per tahun' seharusnya 'pertahun'."
},

{
question:"Reduplikasi bermakna kualitas adalah ...",
options:[
"anak-anak",
"malam-malam",
"pintar-pintar",
"lauk pauk",
"bermanja-manja"
],
answer:2,
explanation:"'Pintar-pintar' menunjukkan kualitas."
},

{
question:"Penulisan nama dan gelar yang benar adalah ...",
options:[
"Sutinah Pertiwi, S.H.",
"Moh Indrawan M.Pd",
"Hj Rusti Sariringsih",
"Dr. Laila Sari Devi",
"Rusli Hadiningrat, S.S"
],
answer:3,
explanation:"Penulisan gelar yang benar: Dr. Laila Sari Devi."
}

]

export default function TWKExam(){

const [current,setCurrent] = useState(0)
const [answers,setAnswers] = useState({})
const [time,setTime] = useState(90*60)
const [showExplain,setShowExplain] = useState(false)

useEffect(()=>{

const timer = setInterval(()=>{

setTime(prev=>{
if(prev<=1){
clearInterval(timer)
setShowExplain(true)
return 0
}
return prev-1
})

},1000)

return ()=>clearInterval(timer)

},[])

function selectAnswer(i){

setAnswers({...answers,[current]:i})

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

function formatTime(){

const m = Math.floor(time/60)
const s = time%60

return m+":"+(s<10?"0"+s:s)

}

function score(){

let total = 0

questions.forEach((q,i)=>{
if(answers[i]===q.answer){
total++
}
})

alert("Skor TWK: "+total+" / "+questions.length)

setShowExplain(true)

}

return(

<div style={{display:"flex",height:"100vh",background:"#070d1a",color:"white"}}>

<div style={{width:"220px",background:"#111827",padding:"20px"}}>

<h3>Soal</h3>

<div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:"8px"}}>

{questions.map((q,i)=>{

const answered = answers[i]!=null

return(

<button
key={i}
onClick={()=>setCurrent(i)}
style={{
padding:"10px",
background:answered?"#16a34a":"#374151",
border:"none",
color:"white"
}}
>
{i+1}
</button>

)

})}

</div>

<div style={{marginTop:"20px"}}>
<b>Timer</b>
<div style={{fontSize:"22px"}}>{formatTime()}</div>
</div>

</div>

<div style={{flex:1,padding:"40px"}}>

<h2>Soal {current+1}</h2>

<p style={{marginTop:"20px"}}>

{questions[current].question}

</p>

<div style={{marginTop:"20px"}}>

{questions[current].options.map((opt,i)=>(

<div key={i} style={{marginBottom:"10px"}}>

<label>

<input
type="radio"
checked={answers[current]===i}
onChange={()=>selectAnswer(i)}
/>

{" "+opt}

</label>

</div>

))}

</div>

{showExplain && (

<div style={{marginTop:"20px",background:"#111827",padding:"15px"}}>

<b>Pembahasan:</b><br/>

{questions[current].explanation}

</div>

)}

<div style={{marginTop:"40px",display:"flex",gap:"10px"}}>

<button onClick={prev}>Previous</button>

<button onClick={next}>Next</button>

<button onClick={score}>Submit</button>

</div>

</div>

</div>

)

}