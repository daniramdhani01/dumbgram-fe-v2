import { FormInput } from '@/components/shared/FormInput'
import { Button } from '@/components/ui/button'
import Alert from '@/components/shared/Alert'
import { useRegisterForm } from '../hooks/useRegisterForm'

type RegisterFormProps = {
    setOpen: (mode: 'login' | 'register' | null) => void
}

export default function RegisterForm({ setOpen }: RegisterFormProps) {
    const { form, onSubmit } = useRegisterForm()
    const { control, formState: { errors, isSubmitting } } = form
  return (
    <>
    <form className="grid gap-4" onSubmit={onSubmit}>
        <FormInput control={control} name="email" type="email" placeholder="Email" />
        <FormInput control={control} name="name" type="text" placeholder="Name" />
        <FormInput control={control} name="username" type="text" placeholder="Username" />
        <FormInput control={control} name="password" type="password" placeholder="Password" />
        {errors.root?.message && (
            <Alert>{errors.root.message}</Alert>
        )}
        <Button variant="rainbow" disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Loading...' : 'Register'}
        </Button>
    </form>
    <span>
        {`Already have an account ?  Klik `}
        <Button variant="link" className="p-0 m-0 text-base font-extrabold" onClick={()=>setOpen("login")}>Here</Button>
    </span>
    </>
  )
}
