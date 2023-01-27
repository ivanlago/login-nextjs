import { useContext } from "react";
import styles from "../styles/Form.module.css";
import LoginCard from "@/src/components/LoginCard/LoginCard";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import loginSchema from "@/schemas/loginSchema";
import { AuthContext } from '../contexts/auth';

export default function LoginPage() { 
  const { login } = useContext(AuthContext); 
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema)
  });

  const onSubmit = async data => await login(data);

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
