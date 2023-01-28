import styles from "../styles/Form.module.css";
import LoginCard from "@/src/components/LoginCard/LoginCard";
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import RegisterSchema from "@/schemas/RegisterSchema";
import { useRouter } from 'next/router'
import axios from 'axios';

export default function RegisterPage() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(RegisterSchema)
      });
    
    const onSubmit = async data => {
        const body =  data;
        try {        
            const res = await axios.get('/api/user/login');
            const checkUser = res.data?.filter((user) => user.email === data.email);
            if (checkUser?.length) {    
                alert('User already exists!');
                return;
            } else {                       
                await axios.post('/api/user/register', body);
                alert('Successfully registered user!')
                await router.push("/login");
            }            
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={styles.background}>        
            <LoginCard title='Register Page'>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <input className={styles.input} placeholder="Type your name" {...register("name")} />
                <span className={styles.error}>{errors.name?.message}</span>
                <input className={styles.input} placeholder="Type your e-mail" {...register("email")} />
                <span className={styles.error}>{errors.email?.message}</span>
                <input type="password" className={styles.input} placeholder="Type your password" {...register("password")} />
                <span className={styles.error}>{errors.password?.message}</span>
                <button className={styles.button}>Register</button>
                <Link href="/login" className={styles.link}>
                    Login Page
                </Link>
            </form>
        </LoginCard>
      </div>
    )
}