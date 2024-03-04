"use client"

import { useEffect } from 'react'
import {register} from '../../lib/action'
import styles from './register.module.css'
import {useFormState} from 'react-dom'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const RegisterForm = () => {
    const [state, formAction] = useFormState(register, undefined)
    const router = useRouter();

    useEffect(() => {
        state?.success && router.push("/login");
    }, [state?.success, router]);

    
  return (
         <form className={styles.form} action={formAction}>
            <input type="text" name="username" placeholder="username"/>
            <input type="text" name="email" placeholder="email"/>
            <input type="password" name="password" placeholder="password"/>
            <input type="password" name="passwordRepeat" placeholder="confirm password"/>
            <button>Register</button>

            {state?.error && <p className={styles.error}>{state.error}</p>}

            <Link href="/login">
             Have an account? <b>Login</b>
            </Link>

          </form>
  )
}

export default RegisterForm