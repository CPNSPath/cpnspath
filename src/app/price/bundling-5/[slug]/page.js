import { bundling5, satuanTO } from "@/lib/packages"

export default function DetailBundling5({ params }) {

const slug = params.slug

const paket = bundling5.find((item) => item.slug === slug)

if (!paket) {
return <div>Paket tidak ditemukan: {slug}</div>
}

const daftarTO = satuanTO.filter((to) =>
paket.tos.includes(to.slug)
)

return (

<div className="container">

<h1>{paket.title}</h1>

<div className="card">

<p>Total Tryout : {paket.jumlahTO}</p>

<h2>Rp {paket.price.toLocaleString()}</h2>

<button className="buy-button">
Beli Paket
</button>

</div>

<h2>Daftar Tryout</h2>

<div className="to-list">

{daftarTO.map((to) => (

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