import styles from "../styles/Form.module.css";
import LoginCard from "@/src/components/LoginCard/loginCard";
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import RegisterSchema from "@/schemas/RegisterSchema";
import axios from "axios";
import { useRouter } from 'next/router'

export default function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(RegisterSchema)
      });
    const router = useRouter();
    
    const onSubmit = async data => {
        const res = await axios.get('http://localhost:5000/users', data.email, data.password);
        const checkUser = res.data?.filter((user) => user.email === data.email);
        if (checkUser?.length) {            
            alert('Usuário ja existe');
            return;
        } else {
            const response = await axios.post('http://localhost:5000/register', data);
            const newRegister = response.data.user;
            alert('Usuário ' + newRegister.name + ' cadastrado com sucesso!!');
            router.push('/login')    
        };        
    };
    
    return (
        <div className={styles.background}>        
            <LoginCard title='Register Page'>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <input className={styles.input} placeholder="Type your name" {...register("name")} />
                <span className={styles.error}>{errors.name?.message}</span>
                <input className={styles.input} placeholder="Type your e-mail" {...register("email")} />
                <span className={styles.error}>{errors.email?.message}</span>
                <input className={styles.input} placeholder="Type your password" {...register("password")} />
                <span className={styles.error}>{errors.password?.message}</span>
                <button className={styles.button}>Login</button>
                <Link href="/login" className={styles.link}>
                    Login Page
                </Link>
            </form>
        </LoginCard>
      </div>
    )
}