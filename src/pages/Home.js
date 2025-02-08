import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import axios from 'axios';
import { API_URL } from '../App';
import moment from 'moment';
import { GrInstagram } from "react-icons/gr";
import { BiLogoTiktok } from "react-icons/bi";
import { MdEmail } from "react-icons/md";

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
    <div>
        <div>
            <Hero />
        </div>
        <div className='flex flex-col bg-white sm:flex-row'>
            <div className='sm:basis-4/5 bg-background mx-2 sm:pt-10'>
                <h2 className='font-bold text-lg sm:text-2xl md:text-3xl lg:text-4xl'>Latest Entries </h2>
                <div className='p-2 sm:pl-20 sm:pr-20 mt-5 mx-10 '>

                    {database? (
                             database.map((item)=>(
                                <div className='flex flex-row pb-5 mb-5 h-56 '>
                                        <div className='basis-2/5  border border-button'>
                                            <Link to={`/post/${item._id}/${item.slug}`}><img src={item.image} className='h-full w-full object-cover'/></Link>
                                        </div>

                                        <div className='basis-3/5 pt-3 pl-10 '>
                                        <Link to={`/post/${item._id}/${item.slug}`}><h2 className='font-normal text-lg sm:text-2xl text-left text-text'>{item.title}</h2></Link>
                                            <p className='text-left text-tertiary text-xs'>{moment(item.date).fromNow() }</p>
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
            <h2 className='font-medium mt-5 text-lg sm:text-2xl '>About Oyin </h2>
            <div className='pt-5 px-5 text-sm text-left gap-1 '>
                <img src='https://img.freepik.com/premium-vector/dark-skinned-girl-with-curly-hair-black-fashion-woman-with-glasses_641602-510.jpg?w=740' />
                <p className='pt-3'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type and scrambled it to make a type
                     specimen book. It has survived not only five centuries, but also the leap into
                      electronic typesetting, remaining essentially unchanged. 
                      </p>
                <p className='pt-3 pb-3'>It was popularised in the 1960s with the release of Letraset sheets containing 
                      Lorem Ipsum passages, and more recently with desktop publishing software
                       like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
            <div className=' border border-black pt-5 mt-5 pb-10 flex flex-col'>
                <h3 className='flex mx-auto p-3'>My Links</h3>
                <div className='flex gap-3 flex-row mx-auto'>
                    <MdEmail size={30} />
                    <BiLogoTiktok size={30} />
                    <GrInstagram size={30}/>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Home