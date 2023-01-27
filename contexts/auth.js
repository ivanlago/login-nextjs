import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { setCookie, deleteCookie, getCookie } from "cookies-next";
import { useRouter } from 'next/router';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const recoveredUser = localStorage.getItem('user');
        const token = getCookie('authorization')
        if (recoveredUser && token) {
            setUser(JSON.parse(recoveredUser));
        }
        setLoading(false);   
    }, []);

    const newUser = async (data) => {   
        const res = await axios.get('http://localhost:5000/users');
        console.log(res.status)
        console.log(res.data)
        const checkUser = res.data?.filter((user) => user.email === data.email);
       // console.log(user.email -  data.email)
        if (checkUser?.length) {
            console.log(checkUser)  
            alert('Usuário ja existe');
            return;
        } else {
            const response = await axios.post('http://localhost:5000/register', data);
            const newRegister = response.data.user;
            alert('Usuário ' + newRegister.name + ' cadastrado com sucesso!!');
            router.push('/login')    
        };  
    };

    const login = async (data) => {   
        try {        
            const response = await axios.post('http://localhost:5000/login', data);
            if (response.status === 200) {
              const token = response.data.accessToken;
              const loggedUser = response.data.user;

              setCookie('authorization', token);              
              localStorage.setItem('user', JSON.stringify(loggedUser));
              
              setUser(loggedUser);
              router.push('/');
            }  
          } catch (err) {
            console.log(err.message);
            alert('Usuário ou senha inválidos')
            return;
          }            
    };

    const logout = () => {
        deleteCookie('authorization');
        localStorage.removeItem('user');
        setUser(null);
        router.push('/login');        
    };

    const getUsers = async () => {
        return axios.get('http://localhost:5000/users')
    }

    return (
        <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout, newUser, getUsers }}>
            { children }
        </AuthContext.Provider>
    )
};