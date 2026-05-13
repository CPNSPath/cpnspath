"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Leaderboard() {
  const router = useRouter()
  useEffect(() => { router.replace("/leaderboard/global") }, [])
  return null
}
