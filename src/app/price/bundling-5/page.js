import Link from "next/link"
import { bundling5 } from "@/lib/packages"

export default function Bundling5Page(){

return(

<div className="pricing-page">

<h1>Paket Bundling 5 Tryout</h1>

<div className="pricing-grid">

{bundling5.map((item)=>(

<Link
key={item.slug}
href={`/price/bundling-5/${item.slug}`}
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