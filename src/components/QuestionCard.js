export default function QuestionCard({question,options,selected,onSelect}){

return(

<div>

<h1 className="text-xl mb-6">
{question}
</h1>

<div className="space-y-3">

{options.map((opt,i)=>(

<button
key={i}
onClick={()=>onSelect(i)}
className={`block w-full text-left p-4 border rounded-lg ${
selected===i ? "bg-blue-600 border-blue-600":"border-gray-700"
}`}
>

{opt}

</button>

))}

</div>

</div>

)

}