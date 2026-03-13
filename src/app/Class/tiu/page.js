"use client"

import { useState } from "react"
import Navbar from "../../../components/Navbar"

export default function TIU(){

const [tab,setTab] = useState(null)

return(

<div>

<Navbar/>

<div className="max-w-4xl mx-auto px-6 py-20">

<h1 className="text-4xl font-bold">
TIU Logic Training
</h1>

<p className="text-gray-400 mt-4">
Latihan logika, numerik, dan analisis untuk seleksi CPNS.
</p>

{/* MENU PILIHAN */}

<div className="flex gap-4 mt-10">

<button
onClick={()=>setTab("video")}
className="bg-blue-600 px-4 py-2 rounded-lg">
Video Pembelajaran
</button>

<button
onClick={()=>setTab("latihan")}
className="bg-gray-800 px-4 py-2 rounded-lg">
Latihan Soal
</button>

<button
onClick={()=>setTab("tryout")}
className="bg-gray-800 px-4 py-2 rounded-lg">
Tryout
</button>

</div>

{/* KONTEN */}

<div className="mt-10">

{tab === null && (
<p className="text-gray-400">
Silakan pilih menu pembelajaran di atas.
</p>
)}

{tab === "video" && (

<div>

<h2 className="text-2xl font-semibold mb-4">
Video Pembelajaran
</h2>

<div className="aspect-video bg-gray-900 rounded-xl flex items-center justify-center">
Video Player
</div>

</div>

)}

{tab === "latihan" && (

<div>

<h2 className="text-2xl font-semibold mb-4">
Latihan Soal TIU
</h2>

<p className="text-gray-400">
Soal latihan TIU akan muncul di sini.
</p>

</div>

)}

{tab === "tryout" && (

<div>

<h2 className="text-2xl font-semibold mb-4">
Tryout TIU
</h2>

<button className="bg-blue-600 px-6 py-3 rounded-lg">
Mulai Tryout
</button>

</div>

)}

</div>

</div>

</div>

)

}