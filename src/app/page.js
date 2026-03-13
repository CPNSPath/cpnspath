import Navbar from "../components/Navbar"

export default function Home() {

return(

<div>

<Navbar/>

<section className="min-h-screen flex flex-col justify-center items-center text-center px-6">

<h1 className="text-7xl font-bold tracking-tight">
CPNSPath
</h1>

<p className="text-2xl text-gray-400 mt-6 max-w-2xl">
Platform belajar CPNS modern untuk menaklukkan TWK, TIU, dan TKP.
</p>

<div className="flex gap-6 mt-10">

<button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl text-lg">
Mulai Belajar
</button>

<button className="border border-gray-600 px-8 py-4 rounded-xl text-lg">
Lihat Program
</button>

</div>

</section>

{/* STATISTICS */}

<section className="grid md:grid-cols-3 text-center py-20 px-10 border-t border-gray-800">

<div>
<h2 className="text-4xl font-bold">50K+</h2>
<p className="text-gray-400 mt-2">Peserta Belajar</p>
</div>

<div>
<h2 className="text-4xl font-bold">500+</h2>
<p className="text-gray-400 mt-2">Soal Latihan</p>
</div>

<div>
<h2 className="text-4xl font-bold">92%</h2>
<p className="text-gray-400 mt-2">Kelulusan Pengguna</p>
</div>

</section>

{/* COURSE PREVIEW */}

<section className="py-20 px-10">

<h2 className="text-4xl font-bold mb-10 text-center">
Program Belajar CPNS
</h2>

<div className="grid md:grid-cols-3 gap-8">

<div className="border border-gray-800 p-6 rounded-xl hover:scale-105 transition">

<h3 className="text-xl font-semibold">
TWK Mastery
</h3>

<p className="text-gray-400 mt-3">
Strategi memahami Tes Wawasan Kebangsaan secara mendalam.
</p>

<button className="mt-6 bg-blue-600 px-4 py-2 rounded-lg">
Mulai
</button>

</div>

<div className="border border-gray-800 p-6 rounded-xl hover:scale-105 transition">

<h3 className="text-xl font-semibold">
TIU Logic Training
</h3>

<p className="text-gray-400 mt-3">
Latihan logika dan numerik untuk skor tinggi.
</p>

<button className="mt-6 bg-blue-600 px-4 py-2 rounded-lg">
Mulai
</button>

</div>

<div className="border border-gray-800 p-6 rounded-xl hover:scale-105 transition">

<h3 className="text-xl font-semibold">
TKP Psychological Strategy
</h3>

<p className="text-gray-400 mt-3">
Strategi menjawab soal karakteristik pribadi.
</p>

<button className="mt-6 bg-blue-600 px-4 py-2 rounded-lg">
Mulai
</button>

</div>

</div>

</section>

</div>

)

}