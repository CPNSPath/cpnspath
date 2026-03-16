import Link from "next/link"

export default function PricePage(){

return(

<div className="pricing-page">

<h1>Pilih Paket Try Out</h1>

<div className="category-grid">

<Link href="/price/satuan" className="category-card">

<h2>Paket Satuan</h2>

<p>Latihan tryout satuan sesuai kebutuhan</p>

</Link>

<Link href="/price/bundling-5" className="category-card">

<h2>Bundling 5 TO</h2>

<p>Latihan 5 tryout dengan harga hemat</p>

</Link>

<Link href="/price/bundling-10" className="category-card">

<h2>Bundling 10 TO</h2>

<p>Latihan maksimal dengan 10 tryout</p>

</Link>

</div>

</div>

)

}