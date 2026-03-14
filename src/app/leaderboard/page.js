import Navbar from "../../components/Navbar"

export default function Leaderboard(){

const users=[
{name:"Andi",score:260},
{name:"Budi",score:250},
{name:"Rina",score:240}
]

return(

<div>

<Navbar/>

<div className="max-w-xl mx-auto py-20">

<h1 className="text-4xl font-bold text-center">
Leaderboard
</h1>

<div className="mt-12 space-y-4">

{users.map((u,i)=>(

<div
key={i}
className="flex justify-between border border-gray-800 p-4 rounded-xl"
>

<span>#{i+1} {u.name}</span>

<span>{u.score}</span>

</div>

))}

</div>

</div>

</div>

)

}