import { satuanTO } from "@/lib/packages"

export default function DetailSatuan({ params }) {

const paket = satuanTO.find(
(item) => item.slug === params.slug
)

if (!paket) {
return <div>Paket tidak ditemukan</div>
}

return (

<div className="detail-page">

<h1>{paket.title}</h1>

<div className="detail-card">

<p>Jumlah soal : {paket.soal}</p>

<p>Durasi : {paket.durasi}</p>

<h2>Rp {paket.price.toLocaleString()}</h2>

<button className="buy-button">
Beli Paket
</button>

</div>

</div>

)

}