import styles from "../styles/Form.module.css";
import LoginCard from "@/src/components/LoginCard/LoginCard";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import loginSchema from "@/schemas/loginSchema";
import axios from 'axios';
import { loginToken } from "@/services/user";
import { setCookie } from "cookies-next";
import { useRouter } from 'next/router';

export default function LoginPage() { 
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema)
  });

  const onSubmit = async data => {
    const body =  data;
    try {        
        const res = await axios.get('/api/user/login');
        const checkUser = res.data?.find((user) => user.email === data.email);
        if (!checkUser) {
          alert('User not found!')
          return; 
        } else {
          
          if (checkUser.password === data.password) {
            setCookie('authorization', loginToken({name: checkUser.name, email: checkUser.email}));              
            localStorage.setItem('user', JSON.stringify(checkUser));
            await router.push('/');
            alert('User authenticated successfully!')            
          } else {
            alert('Invalid password')
          }
        }
       
    } catch (error) {
        console.error(error);
    }
}

  return (
    <div className={styles.background}>
      <LoginCard title="Login Page">
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input className={styles.input} placeholder="Type your e-mail" {...register("email")} />
          <span className={styles.error}>{errors.email?.message}</span>
          <input type="password" className={styles.input} placeholder="Type your password" {...register("password")} />
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
