"use client"

import Navbar from "@/components/Navbar"
import HeroBanner from "@/components/HeroBanner"

export default function Home(){

return(

<div
style={{
minHeight:"100vh",
background:"var(--dark)",
color:"white"
}}
>

{/* NAVBAR */}
<Navbar/>

{/* MAIN CONTENT */}

<div
style={{
maxWidth:"1800px",
margin:"auto",
padding:"30px"
}}
>

{/* HERO */}
<HeroBanner/>

{/* INFORMASI SKD */}

<section className="info-section">

<h2>Informasi SKD CPNS</h2>

<div className="info-grid">

{/* CARD 1 */}
<div className="info-card">
<h3>Seleksi Kompetensi Dasar (SKD)</h3>
<p>
Seleksi Kompetensi Dasar (SKD) CPNS dilaksanakan dengan metode 
Computer Assisted Test (CAT) BKN. Peserta akan mengerjakan 
110 soal dalam 100 menit. Soal dibagi menjadi tiga jenis yaitu 
Tes Wawasan Kebangsaan (TWK), Tes Intelegensi Umum (TIU), 
dan Tes Karakteristik Pribadi (TKP).
</p>
</div>

{/* CARD 2 */}
<div className="info-card">
<h3>Passing Grade</h3>
<p>
Untuk formasi umum nilai ambang batas SKD adalah 
TWK ≥ 65, TIU ≥ 80, dan TKP ≥ 166. 
Beberapa kategori seperti lulusan Cumlaude, penyandang 
disabilitas, dan putra-putri Papua memiliki ketentuan 
nilai khusus sesuai kebijakan pemerintah.
</p>
</div>

{/* CARD 3 */}
<div className="info-card">
<h3>Peluang Karir PNS</h3>
<p>
Karier PNS memiliki jalur yang jelas melalui promosi jabatan,
rotasi jabatan setara, dan lintas jalur sesuai PermenPANRB
No.22 Tahun 2021. ASN juga memperoleh gaji tetap,
tunjangan kinerja, dan jaminan pensiun.
</p>
</div>

{/* CARD BESAR */}
<div className="info-card info-wide">

<h3>Simulasi CAT dan Materi Ujian</h3>

<p>
Untuk mempersiapkan ujian SKD, BKN rutin menyelenggarakan simulasi
CAT yang memungkinkan peserta berlatih langsung mengerjakan soal
TWK, TIU, dan TKP menggunakan komputer.
</p>
</div>

{/* CARD 5 */}
<div className="info-card">
<h3>Materi TWK</h3>
<p>
TWK mengukur pemahaman peserta terhadap nilai nasionalisme,
integritas, bela negara, serta pemahaman terhadap
Pancasila, UUD 1945, NKRI, dan Bhinneka Tunggal Ika.
</p>
</div>

{/* CARD 6 */}
<div className="info-card">
<h3>Materi TIU</h3>
<p>
TIU menguji kemampuan berpikir logis dan analitis
melalui soal verbal, numerik, serta figural
seperti pola, perhitungan, dan analisis logika.
</p>
</div>

{/* CARD 7 */}
<div className="info-card">
<h3>Materi TKP</h3>
<p>
TKP menilai karakteristik pribadi peserta
seperti kemampuan pelayanan publik,
kerja sama tim, adaptasi sosial budaya,
serta profesionalisme dalam bekerja.
</p>
</div>

</div>

</section>

</div>

</div>

)

}