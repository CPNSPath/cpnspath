import { bundling10, satuanTO } from "@/lib/packages"

export default function DetailBundling10({ params }) {

const paket = bundling10.find(
(item) => item.slug === params.slug
)

if (!paket) {
return <div>Paket tidak ditemukan</div>
}

const daftarTO = satuanTO.filter(to =>
paket.tos.includes(to.slug)
)

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

<h2>Daftar Tryout</h2>

<div className="to-list">

{daftarTO.map((to)=>(
<div key={to.slug} className="card">

<h3>{to.title}</h3>

<p>{to.soal} soal</p>

<p>{to.durasi}</p>

<button className="btn-primary">
Mulai Tryout
</button>

</div>
))}

</div>

</div>

)

}