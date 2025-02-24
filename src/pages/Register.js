import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../App';



const Register = () => {
const [inputs, setInputs] = useState({
    username: "",
    email:"",
    password:"",
    confirmPassword:""
});
const [errorMessage, setErrorMessage] = useState("")
const [termsChecked, setTermsChecked] = useState(false)

const [error, setError] = useState(null); 
const navigate = useNavigate()

const handleChange = e =>{
    setInputs(prev=>({...prev, [e.target.name]: e.target.value.toLowerCase()}))
    if(errorMessage!==""){
        setErrorMessage("")
    }
}

const checkHandler = ()=>{
    setTermsChecked(!termsChecked)
}

const handleSubmit = async e =>{
    e.preventDefault()
    setErrorMessage("")
    if (!inputs.email||!inputs.password){
        setErrorMessage("Please enter email and passowrd")
    } else if ( !inputs.confirmPassword) {
        setErrorMessage("Error. Confirm password")
    }else if ( inputs.password!==inputs.confirmPassword) {
     setErrorMessage("Error. Passwords do not match")
    } else if (!termsChecked){
        setErrorMessage("Accept terms and conditions")
    } else{
       try{
       const res = await axios.post(`${API_URL}/signup`, {inputs})
       
        if(res.data && res.data.status==="SUCCESS"){    
        alert('Registration successful')
        navigate('/oykk')
        } else if (res.data && res.data.message){
            setErrorMessage(res.data.message)
        }

       }catch(err){
        console.log(err)
       
       }
    }
    
    /* if (res.data && res.data.status === "SUCCESS") { // Check if res.data exists
    alert('Registration successful');
    navigate('/oykk');
  } else if (res.data && res.data.message) {  // Check if res.data and message exist
    setErrorMessage(res.data.message);/*/
}

    return (
        <div>
             <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src="https://www.svgrepo.com/show/528961/feed.svg" alt="logo"/>
                        Oyin's Chronicles    
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create an account
                            </h1> 
                            <form className="space-y-4 md:space-y-3" action="#">
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                    <input type="username" onChange={handleChange} name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g QueenX" required=""/>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input type="email" onChange={handleChange} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g QueenX@gmail.com" required=""/>
                                </div>
                                <div> 
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" onChange={handleChange}  name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                                </div>
                                <div>
                                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                    <input type="password" onChange={handleChange} name="confirmPassword" id="confirmPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="terms" aria-describedby="terms" type="checkbox" checked={termsChecked} onChange={checkHandler}className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <span className="font-medium text-primary-600 hover:underline dark:text-primary-500" >Terms and Conditions</span></label>
                                        <p className='mt-2 pl-2 text-red-500 text-xs text'>{errorMessage&& errorMessage}</p>
                                    </div>
                                </div>
                                <button type="submit" onClick={handleSubmit} className="w-full text-text bg-secondary hover:bg-button focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary">Create an account</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <Link to="/oykk" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
                </section>
    </div>
  )
}

export default Register