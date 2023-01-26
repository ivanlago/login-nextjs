import styles from "../styles/Form.module.css";
import LoginCard from "@/src/components/LoginCard/loginCard";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import loginSchema from "@/schemas/loginSchema";
import axios from 'axios';
import { setCookie } from "cookies-next";
import { useRouter } from 'next/router'

export default function LoginPage() {  
  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema)
  });

  const onSubmit = async data => {
      try {        
        const response = await axios.post('http://localhost:5000/login', data);
        if (response.status === 200) {
          const token = response.data.accessToken;
          setCookie('authorization', token)
          router.push('/');
        } 
      } catch (err) {
        console.log(err.message);
        return alert('Usuário ou senha inválidos')
      }    
  };

  return (
    <div className={styles.background}>
      <LoginCard title="Login Page">
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input className={styles.input} placeholder="Type your e-mail" {...register("email")} />
          <span className={styles.error}>{errors.email?.message}</span>
          <input className={styles.input} placeholder="Type your password" {...register("password")} />
          <span className={styles.error}>{errors.password?.message}</span>
          <button className={styles.button}>Login</button>
          <Link href="/register" className={styles.link}>
            Register Page
          </Link>
        </form>
      </LoginCard>
    </div>
  );
}