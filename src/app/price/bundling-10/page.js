import Link from "next/link"
import { bundling10 } from "@/lib/packages"

export default function Bundling10Page(){

return(

<div className="pricing-page">

<h1>Paket Bundling 10 Tryout</h1>

<div className="pricing-grid">

{bundling10.map((item)=>(

<Link
key={item.slug}
href={`/price/bundling-10/${item.slug}`}
className="pricing-card"
>

<h3>{item.title}</h3>

<p>{item.jumlahTO} Tryout</p>

<strong>
Rp {item.price.toLocaleString()}
</strong>

</Link>

))}

</div>

</div>

)

}