"use client"

import { useEffect } from 'react'
import {login} from '../../lib/action'
import styles from './login.module.css'
import {useFormState} from 'react-dom'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const LoginForm = () => {
    const [state, formAction] = useFormState(login, undefined)
    const router = useRouter();

    useEffect(() => {
        state?.success && router.push("/login");
    }, [state?.success, router]);

    
  return (
         <form className={styles.form} action={formAction}>
            <input type="text" name="email" placeholder="email"/>
            <input type="password" name="password" placeholder="password"/>
            <button>Login</button>

            {state?.error && <p className={styles.error}>{state.error}</p>}

            <Link href="/register">
             Don't have an account? <b>Register</b>
            </Link>

          </form>
  )
}

export default LoginForm