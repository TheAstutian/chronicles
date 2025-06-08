import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import axios from 'axios';
import { API_URL } from '../App';
import moment from 'moment';
import { GrInstagram } from "react-icons/gr";
import { BiLogoTiktok } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import { PiLinkedinLogoFill } from "react-icons/pi";

import { Link } from 'react-router-dom';

const Home = () => {
const [database, setDatabase] = useState(null)

useEffect( ()=>{
    const loadDB = async()=>{
       try{
        const db = await axios.get(`${API_URL}`)
        if (db){
            setDatabase(db.data.data)
        }
    }catch(err){
        console.log(err)
    }
       }
    loadDB()
}, [])


  return (
    <div className=''>
        <div>
            <Hero />
        </div>
        <div className='flex flex-col bg-white sm:flex-row'>
            <div className='sm:basis-4/5 bg-background mx-2 sm:pt-10'>
                {/*<h2 className='font-bold text-lg sm:text-2xl md:text-3xl lg:text-4xl'>Latest Entries </h2>*/}
                <div className='sm:p-2 sm:pl-20 sm:pr-20 mt-5 mx-2 md:mx-10 '>

                    {database? (
                             database.map((item)=>(
                                <div className='flex flex-row pb-5 mb-5 h-72 '>
                                        <div className=' basis-3/5 sm:basis-2/5  hover:border hover:border-button'>
                                            <Link to={`/post/${item._id}/${item.slug}`}><img src={item.image} alt={item._id} className='h-full w-full object-cover'/></Link>
                                        </div>

                                        <div className='basis-2/5 pt-5 pl-7 '>
                                        <Link to={`/post/${item._id}/${item.slug}`}><h2 className='font-normal text-lg sm:text-3xl text-left text-text hover:underline'>{item.title}</h2></Link>
                                            <p className='text-left text-tertiary pt-3 text-xs'>{moment(item.date).fromNow() }</p>
                                        </div>
                                        
                                </div>
                            ))
                    ): (
                        <p>Loading</p>
                    )
                       
                    } 
                </div>
            </div>
            <div className='sm:basis-1/5 bg-secondary rounded-sm sm:pt-10 h-fit'>
            <h2 className='font-medium mt-5 text-lg sm:text-2xl '>About Precious </h2>
            <div className='pt-5 px-5 text-sm text-left gap-1 '>
                <img src='https://img.freepik.com/premium-vector/dark-skinned-girl-with-curly-hair-black-fashion-woman-with-glasses_641602-510.jpg?w=740' />
                <p className='pt-3'>I'm a passionate force of nature. </p>
                <p className='pt-3'>Cool and calm on the outside, happy and fly on the inside. I hold a profonde perspective about life and people's experiences, and that's probably why my pieces are emotive and leave readers with deep meaningful thoughts. </p>
                <p className='pt-3'>However, I'm not all melancholy, I just share that aspect of myself on this site. I'm well-versed in crafting all types of content, to all kinds of audiences, in different tones of voice. </p>

                <p className='pt-3 pb-3'> In essence, I'm a pen for hire. So, if you need my services, hit me up ASAP! </p>
            </div>
            <div className=' border border-black pt-5 mt-5 pb-10 flex flex-col '>
                <h3 className='flex mx-auto pb-3'>My Links</h3>
                <div className='flex gap-3 flex-row mx-auto gap-5'>

                <div className='flex flex-col'>
                <FaFileAlt size={30}/>
                <p className='mx-auto text-xs pt-1.5'>My CV</p>
                </div> 
                <div>
                <MdEmail size={30} />
                <p className='mx-auto text-xs pt-1.5'>Mail me</p>
                </div>
                    
                <div className='flex flex-col'>
                <PiLinkedinLogoFill size={30} />
                <p className='mx-auto text-xs pt-1.5'>Let's Connect</p>
                </div>
                
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Home