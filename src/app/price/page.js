import Navbar from "../../components/Navbar"

export default function Pricing(){

return(

<div>

<Navbar/>

<div className="max-w-5xl mx-auto py-20 text-center">

<h1 className="text-4xl font-bold">
Pricing
</h1>

<div className="grid md:grid-cols-3 gap-8 mt-16">

<div className="border border-gray-800 p-8 rounded-xl">

<h2 className="text-2xl font-bold">Free Trial</h2>

<p className="mt-4 text-gray-400">
1 Tryout
</p>

<p className="mt-6 text-3xl font-bold">
Rp0
</p>

</div>

<div className="border border-gray-800 p-8 rounded-xl">

<h2 className="text-2xl font-bold">TO 1</h2>

<p className="mt-4 text-gray-400">
Full Tryout Package
</p>

<p className="mt-6 text-3xl font-bold">
Rp29k
</p>

</div>

<div className="border border-gray-800 p-8 rounded-xl">

<h2 className="text-2xl font-bold">TO Bundle</h2>

<p className="mt-4 text-gray-400">
5 Tryout
</p>

<p className="mt-6 text-3xl font-bold">
Rp99k
</p>

</div>

</div>

</div>

</div>

)

}