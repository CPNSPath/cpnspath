import Navbar from "../../components/Navbar"

export default function ClassPage(){

const courses = [

{
title:"TWK Mastery",
desc:"Strategi memahami Tes Wawasan Kebangsaan.",
link:"/Class/twk"
},

{
title:"TIU Logic Training",
desc:"Latihan logika dan numerik untuk skor tinggi.",
link:"/Class/tiu"
},

{
title:"TKP Psychological Strategy",
desc:"Strategi menjawab soal karakteristik pribadi.",
link:"/Class/tkp"
}

]

return(

<div>

<Navbar/>

<div className="px-10 py-20">

<h1 className="text-4xl font-bold mb-10">
Program Belajar CPNS
</h1>

<div className="grid md:grid-cols-3 gap-8">

{courses.map((course,index)=>(
<div key={index} className="border border-gray-800 rounded-xl p-6">

<h3 className="text-xl font-semibold">
{course.title}
</h3>

<p className="text-gray-400 mt-3">
{course.desc}
</p>

<a href={course.link}>
<button className="mt-6 bg-blue-600 px-4 py-2 rounded-lg">
Masuk Kelas
</button>
</a>

</div>
))}

</div>

</div>

</div>

)

}