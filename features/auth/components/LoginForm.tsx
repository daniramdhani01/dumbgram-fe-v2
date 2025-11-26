import { FormInput } from '@/components/shared/FormInput'
import { Button } from '@/components/ui/button'
import Alert from '@/components/shared/Alert'
import { useLoginForm } from '../hooks/useLoginForm'

type LoginFormProps = {
    setOpen: (mode: 'login' | 'register' | null) => void
}

export default function LoginForm({ setOpen }: LoginFormProps) {
    const { form, onSubmit } = useLoginForm()
    const { control, formState: { errors, isSubmitting } } = form
  return (
    <>
    <form className="grid gap-4" onSubmit={onSubmit}>
        <FormInput control={control} name="email" type="email" placeholder="Email" />
        <FormInput control={control} name="password" type="password" placeholder="Password" />
        {errors.root?.message && (
            <Alert>{errors.root.message}</Alert>
        )}
        <Button variant="rainbow" disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Loading...' : 'Login'}
        </Button>
    </form>
    <span>
        {`Don't have an account ? Klik `}
        <Button variant="link" className="p-0 m-0 text-base font-extrabold" onClick={()=>setOpen("register")}>Here</Button>
    </span>
    </>
  )
}
