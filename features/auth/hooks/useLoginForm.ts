'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { minString } from "@/lib/utils"

const loginSchema = z.object({
    email: z.email('Email is not valid'),
    password: minString("Password", 8),
})

type LoginValues = z.infer<typeof loginSchema>

export function useLoginForm(onSuccess?: (data: unknown) => void) {
    const form = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    })

    const onSubmit = form.handleSubmit(async (values) => {
        try {
            // TODO: ganti dengan call API login kamu
            console.log('login', values)
            onSuccess?.(values)
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Something went wrong'
            form.setError('root', { message: msg })
        }
    })

    return { form, onSubmit }
}
