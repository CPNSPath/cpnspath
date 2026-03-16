"use client"

import { useEffect,useState } from "react"
import { getLeaderboard } from "@/lib/leaderboard"

export default function Leaderboard(){

const [data,setData] = useState([])

useEffect(()=>{

const load = async ()=>{

const result = await getLeaderboard()

setData(result)

}

load()

},[])

return(

<div className="container">

<h1>Leaderboard Nasional</h1>

<table>

<thead>
<tr>
<th>Rank</th>
<th>User</th>
<th>Score</th>
</tr>
</thead>

<tbody>

{data.map((item,index)=>(
<tr key={index}>
<td>{index+1}</td>
<td>{item.users?.email}</td>
<td>{item.score}</td>
</tr>
))}

</tbody>

</table>

</div>

)

}