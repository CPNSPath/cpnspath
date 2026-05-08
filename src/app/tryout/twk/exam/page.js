"use client"

import { useState,useEffect } from "react"
import { useRouter } from "next/navigation"

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
const router = useRouter()
const [current,setCurrent]=useState(0)
const [answers,setAnswers]=useState({})
useEffect(()=>{

try{

const savedAnswers = localStorage.getItem("twk_answers")

if(savedAnswers){
setAnswers(JSON.parse(savedAnswers))
}

}catch(err){

console.error(err)
localStorage.removeItem("twk_answers")

}

},[])
useEffect(()=>{

localStorage.setItem("twk_answers",JSON.stringify(answers))

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

submitExam(true)

return 0

}

return prev-1

})

},1000)

return()=>clearInterval(timer)

},[answers])

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

function submitExam(force=false){

if(!force){
if(!confirm("Apakah Anda yakin ingin mengakhiri ujian?")) return
}

let score=0
let correct=0
let wrong=0
let empty=0

shuffledQuestions.forEach((q,i)=>{

if(answers[i]===undefined){
empty++
}
else if(answers[i]===q.answer){
score += 5
correct++
}
else{
wrong++
}

})

const resultData={
score,
correct,
wrong,
empty,
total:shuffledQuestions.length,
answers,
questions:shuffledQuestions
}

localStorage.setItem("twk_result",JSON.stringify(resultData))

router.push("/tryout/twk/result")

}

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
          className="px-5 py-2.5 bg-[#16A34A] border border-[#15803D] rounded-lg text-sm hover:bg-[#15803D] transition-colors"
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