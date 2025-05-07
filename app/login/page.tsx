"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/app/contexts/AuthContext"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { LogIn } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function LoginPage() {
  const { user, loading, login, signInWithGoogle } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [err, setErr] = useState("")

  useEffect(() => {
    if (!loading && user) {
      router.replace("/")
    }
  }, [user, loading, router])

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault()
    setErr("")
    try {
      await login(email, pass)
      router.push("/")
    } catch (err: any) {
      toast({ title: "Erro ao entrar", description: err.message || "Falha no login" })
    }
  }

  async function handleGoogleLogin() {
    setErr("")
    try {
      await signInWithGoogle()
    } catch (e: any) {
      setErr(e.message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md space-y-6 p-6">
        <CardHeader>
          <CardTitle>Faça login</CardTitle>
        </CardHeader>

        {err && <p className="text-red-500 text-center">{err}</p>}

        <CardContent className="space-y-4">
          {/* Botão de Login com Google */}
          <Button
            onClick={handleGoogleLogin}
            className="w-full gap-2 bg-white text-black border hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="h-5 w-5"
            >
              <path
                fill="#4285F4"
                d="M24 9.5c3.2 0 6.1 1.2 8.2 3.2l6.1-6.1C34.7 2.5 29.7 0 24 0 14.9 0 7.2 5.4 3.5 13.1l7.1 5.5C12.6 13.2 17.9 9.5 24 9.5z"
              />
              <path
                fill="#34A853"
                d="M46.1 24.6c0-1.5-.1-2.6-.3-3.7H24v7.1h12.5c-.5 2.9-2 5.3-4.2 7l6.5 5.1c3.8-3.5 6.3-8.7 6.3-15.5z"
              />
              <path
                fill="#FBBC05"
                d="M10.6 28.9c-1-2.9-1-6 .1-8.9l-7.1-5.5c-2.5 4.9-2.5 10.9 0 15.8l7-5.4z"
              />
              <path
                fill="#EA4335"
                d="M24 48c5.7 0 10.5-1.9 14-5.3l-6.5-5.1c-1.8 1.3-4.3 2.1-7.5 2.1-5.7 0-10.5-3.9-12.2-9.1l-7.1 5.5C7.2 42.6 14.9 48 24 48z"
              />
              <path fill="none" d="M0 0h48v48H0z" />
            </svg>
            Entrar com Google
          </Button>

          {/* Login com email e senha
          <form onSubmit={handleEmailLogin} className="space-y-4 pt-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              <LogIn className="mr-2 h-4 w-4" />
              Entrar
            </Button>
          </form> */}
        </CardContent>

        {/* <CardFooter className="text-center">
          <Link href="/register" className="text-primary hover:underline">
            Não tem conta? Registre‑se
          </Link>
        </CardFooter> */}
      </Card>
    </div>
  )
}
