export default function QuestionNavigation({total,current,setCurrent}){

return(

<div className="grid grid-cols-10 gap-2 mt-10">

{Array.from({length:total}).map((_,i)=>(

<button
key={i}
onClick={()=>setCurrent(i)}
className={`p-2 rounded ${
current===i ? "bg-blue-600":"bg-gray-800"
}`}
>

{i+1}

</button>

))}

</div>

)

}