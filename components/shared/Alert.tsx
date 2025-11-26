import { ReactNode } from "react"
import { cn } from "@/lib/utils"

type AlertProps = {
    children: ReactNode
    className?: string
}

export default function Alert({ children, className }: AlertProps) {
    return (
        <div
            role="alert"
            className={cn(
                "mb-2 flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/10 px-4 py-2 text-sm text-destructive",
                className
            )}
        >
            {children}
        </div>
    )
}
