import { getCookie } from "cookies-next";
import styles from "../styles/Form.module.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from '../contexts/auth';

export default function Home() {
  const { logout, user, getUsers } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await getUsers();
      setUsers(response.data);
      setLoading(false);
    })();
  }, []);


  const handleLogout = async () => {
    await logout();
  }

  if (loading) {
    return <div>Carregando dados...</div>
  }

  return (
    <div className="container">
      <h1>HOME PAGE</h1>
      <button className={styles.button} onClick={handleLogout}>Logout</button>
      <p>Logado por: {user.email}</p>
      <hr />
      <h2>Lista de Usuários</h2>
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