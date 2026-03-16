import { bundling5 } from "@/lib/packages"

export default function DetailBundling5({ params }) {

const paket = bundling5.find(
(item) => item.slug === params.slug
)

if (!paket) {
return <div>Paket tidak ditemukan</div>
}

return (

<div className="detail-page">

<h1>{paket.title}</h1>

<div className="detail-card">

<p>Total Tryout : {paket.jumlahTO}</p>

<h2>Rp {paket.price.toLocaleString()}</h2>

<button className="buy-button">
Beli Paket
</button>

</div>

</div>

)

}