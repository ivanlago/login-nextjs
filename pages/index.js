import styles from "../styles/Form.module.css";
import { useEffect, useState } from "react";
import axios from 'axios';
import { readToken } from "@/services/user";
import { useRouter } from 'next/router';
import { deleteCookie, getCookie } from "cookies-next";

export default function Home() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataUser, setDataUser] = useState(null);
  const userToken = getCookie('authorization');
  const nameUser = dataUser ? dataUser.name : null;

  useEffect(() => {
    (async () => {
      const response = await axios.get('/api/user/login');
      setUsers(response.data);
      setDataUser(readToken(userToken));
      setLoading(false);
    })();
  }, []);

  const handleLogout = async () => {
    deleteCookie('authorization');
    localStorage.removeItem('user');  
    setDataUser(null);
    await router.push('/login');
  }

  if (loading) {
    return <div>Carregando dados...</div>
  }

  return (
    <div className={styles.container}>
      <h1>HOME PAGE</h1>
      <p className={styles.user}>Logado por: {nameUser}</p>
      <button className={styles.button} onClick={handleLogout}>Logout</button>
      <hr />
      <h2 className={styles.list}>Lista de Usuários</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.id} - {user.email} - {user.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export const getServerSideProps = async ({req, res}) => {
  try {
    const token = getCookie('authorization', {req, res})
    if (!token) throw new Error('Token inválido!')

    return {
      props: {}
    }
  } catch (error) {
    return {
      redirect: {
       permanent: false,
       destination: '/login',
      },
      props: {}
    }
  }
}