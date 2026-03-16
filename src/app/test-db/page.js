"use client"

import { useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function TestDB(){

useEffect(()=>{

const test = async ()=>{

const { data, error } = await supabase
.from("packages")
.select("*")

console.log(data)
console.log(error)

}

test()

},[])

return(

<div className="container">
<h1>Test Supabase</h1>
</div>

)

}