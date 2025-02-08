import React, { useEffect, useState } from 'react'
import { LuSparkles } from "react-icons/lu";
import { quotes } from '../MockDB';
import axios from 'axios'; 
import { API_URL } from '../App';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [quote, setQuote] = useState(null)
    const [posts, setPosts] = useState(null)

    useEffect(()=>{
        const setQ = async ()=>{
            setQuote(quotes[Math.floor(Math.random() * 100) ])
            const sidebarContent = await axios.get(`${API_URL}/sidebar`)
            await setPosts(sidebarContent.data.data)
             console.log(sidebarContent.data.data)
        }
        setQ()
    },[])


    const tipColor =()=>{
        const colors = ['bg-tip', 'bg-tip2', 'bg-tip3', 'bg-tip4', 'bg-tip5']
        return colors[Math.floor(Math.random() * 5) + 1]
    }

  return (
    <div className='sm:pt-5'>
        
        <div className={`${tipColor()} border-2 border-black rounded-sm`}>
            <div className='justify-center border-b-2 border-black flex flex-row'>
                <p className='text-lg'>Tip of the day</p>
                <LuSparkles className='mt-1 ml-3' size={20} />
            </div>
            <div className='p-2'>
                <p className='text-left text-sm pb-2'>
                    {quote? quote.saying: 'It takes courage to grow up and become who you really are.'} </p>
                <p className='text-right text-sm'>- {quote? quote.sayer: ' E.E. Cummings'}</p>
            </div>
        </div>
        <> 
        <h3 className='pt-5 pb-3 font-semibold'>Other posts you may like..</h3>
        {posts? 
        posts.map(item=>{
            if(item){
                return (
                <div className='py-2 flex flex-col'>
                <Link to={`/post/${item._id}/${item.slug}`}><img src={item.image} className='h-full w-full object-cover'/></Link>
                <p className=''>{item.title}</p>
            </div>)
            }
        })
        :
        <p>Loading</p>
        }
        </>
    </div>
  )
}

export default Sidebar