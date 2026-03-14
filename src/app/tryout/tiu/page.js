"use client"

export default function TIU(){

  return(

    <div style={{
      minHeight:"100vh",
      background:"#070d1a",
      color:"white",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      flexDirection:"column",
      fontFamily:"Arial"
    }}>

      <h1>Tryout TIU</h1>

      <p>Halaman TIU sedang dibuat</p>

      <a href="/tryout">
        <button style={{
          padding:"10px 20px",
          marginTop:"20px",
          background:"#2563eb",
          border:"none",
          borderRadius:"8px",
          color:"white",
          cursor:"pointer"
        }}>
          Kembali ke Tryout
        </button>
      </a>

    </div>

  )

}