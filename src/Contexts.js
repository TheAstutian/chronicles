import {createContext, useState, useEffect} from 'react';
import axios from 'axios';
import {API_URL} from "./App";
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(); 

export const AuthContextProvider = ({children}) =>{
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user') || null))
    
    const login = async(inputs)=>{

        const res = await axios.post(`${API_URL}/login`, inputs)
        

        if (res.data.status==='SUCCESS'){
            setCurrentUser(res.data.data)
        } 
        return res.data
    }
    const logout = async(inputs)=>{
        setCurrentUser(null)
        
    }

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])

    return(
        <AuthContext.Provider value={{currentUser,login,logout}}>{children}</AuthContext.Provider>
    )
}


export const AppProvider = ({children})=>{
    return(
        <AuthContextProvider>
            {children}
        </AuthContextProvider>
    )
}