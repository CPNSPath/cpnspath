"use client"

import { useEffect,useState } from "react"

export default function Timer({seconds,onFinish}){

const [time,setTime] = useState(seconds)

useEffect(()=>{

if(time<=0){

onFinish()

return

}

const t = setTimeout(()=>setTime(time-1),1000)

return ()=>clearTimeout(t)

},[time])

return(

<p className="text-lg">
Time : {Math.floor(time/60)}:{(time%60).toString().padStart(2,"0")}
</p>

)

}