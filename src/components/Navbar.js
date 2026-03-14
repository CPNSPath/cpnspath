export default function Navbar(){

return(

<nav className="flex justify-between items-center px-8 py-5 border-b border-gray-800">

<h1 className="font-bold text-xl">
CPNSPath
</h1>

<div className="flex gap-6 text-sm">

<a href="/">Home</a>
<a href="/tryout">Tryout</a>
<a href="/leaderboard">Leaderboard</a>
<a href="/pricing">Pricing</a>

</div>

</nav>

)

}