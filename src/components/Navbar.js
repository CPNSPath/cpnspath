"use client"
import Link from "next/link"

export default function Navbar(){

return(

<header className="navbar">

<div className="navbar-inner">

<div className="nav-left">
<span className="logo">CPNS PATH</span>
</div>

<nav className="nav-center">

<Link href="/">Beranda</Link>
<Link href="/informasi">Informasi</Link>
<Link href="/contact">Contact Person</Link>
<Link href="/tryout">Free Trial TO</Link>
<Link href="/price">Paket TO</Link>

</nav>

<div className="nav-right">
<button className="login-btn">Masuk</button>
</div>

</div>

</header>

)

}