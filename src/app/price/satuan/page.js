import Link from "next/link"
import { satuanTO } from "@/lib/packages"

export default function SatuanPage(){

return(

<div className="pricing-page">

<h1>Paket Try Out Satuan</h1>

<div className="pricing-grid">

{satuanTO.map((item)=>(

<Link
key={item.slug}
href={`/price/satuan/${item.slug}`}
className="pricing-card"
>

<h3>{item.title}</h3>

<p>{item.soal} soal</p>

<p>{item.durasi}</p>

<strong>
Rp {item.price.toLocaleString()}
</strong>

</Link>

))}

</div>

</div>

)

}