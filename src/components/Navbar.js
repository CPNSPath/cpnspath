export default function Navbar() {
  return (

    <nav style={{
      display:"flex",
      justifyContent:"space-between",
      alignItems:"center",
      padding:"20px",
      background:"#1e3a8a",
      color:"white"
    }}>

      <h2>CPNSPath</h2>

      <div style={{display:"flex", gap:"20px"}}>

        <a href="/" style={{color:"white"}}>Home</a>
        <a href="/Class" style={{color:"white"}}>Kelas</a>
        <a href="/login" style={{color:"white"}}>Login</a>

      </div>

    </nav>

  )
}