import { getCookie, deleteCookie } from "cookies-next";
import styles from "../styles/Form.module.css";
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  const handleOut = () => {
    deleteCookie('authorization');
    router.push('/login');
  }

  return (
    <div>
      <h1>Página Privada - Perfil do Usuário</h1>
      <button className={styles.button} onClick={handleOut}>Sair</button>
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