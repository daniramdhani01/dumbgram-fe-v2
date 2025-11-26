'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { minString } from "@/lib/utils"

const registerSchema = z.object({
    email: z.email("Email is not valid"),
    name: minString("Name", 2),
    username: minString("Username", 2),
    password: minString("Password", 8),
})

type RegisterValues = z.infer<typeof registerSchema>

export function useRegisterForm(onSuccess?: (data: unknown) => void) {
    const form = useForm<RegisterValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: { email: "", name: "", username: "", password: "" },
    })

    const onSubmit = form.handleSubmit(async (values) => {
        try {
            // TODO: ganti dengan call API register kamu
            console.log('register', values)
            onSuccess?.(values)
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Something went wrong'
            form.setError('root', { message: msg })
        }
    })

    return { form, onSubmit }
}
