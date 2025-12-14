'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useSearchParams, useRouter } from "next/navigation"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

export default function ModalAuth() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const mode = searchParams.get('mode') as 'login' | 'register' | null

    const setMode = (newMode: 'login' | 'register' | null) => {
        if (newMode) {
            router.push(`?mode=${newMode}`)
        } else {
            router.push('/auth')
        }
    }

    const modalTitle = mode === 'login' ? 'Login' : mode === 'register' ? 'Register' : ''

    return (
        <>
            <Dialog
                open={!!modalTitle}
                onOpenChange={(value) => {
                    if (!value) setMode(null)
                }}
            >
                <DialogContent className="max-w-sm" showCloseButton={false}>
                    <DialogHeader>
                        <DialogTitle className="font-bold text-4xl mb-6">{modalTitle}</DialogTitle>
                        {mode === "login" && <LoginForm setOpen={setMode}/>}
                        {mode === "register" && <RegisterForm setOpen={setMode}/>}
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <Button variant="rainbow" className="w-36 font-bold text-lg mr-4" onClick={() => setMode('login')}>
                Login
            </Button>
            <Button variant="secondary" className="w-36 font-bold text-lg bg-transparent" onClick={() => setMode('register')}>
                Register
            </Button>
        </>
    )
}
