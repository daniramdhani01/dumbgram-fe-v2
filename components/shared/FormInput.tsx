'use client'

import { Input } from "@/components/ui/input"
import { Control, Controller, FieldValues, Path } from "react-hook-form"
import Alert from "./Alert"

type FormInputProps<T extends FieldValues> = {
    control: Control<T>
    name: Path<T>
    type?: string
    placeholder?: string
}

export function FormInput<T extends FieldValues>({ control, name, type = "text", placeholder }: FormInputProps<T>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <div className="grid gap-1">
                    <Input {...field} type={type} placeholder={placeholder} />
                    {fieldState.error && (
                        <Alert>{fieldState.error.message}</Alert>
                    )}
                </div>
            )}
        />
    )
}
