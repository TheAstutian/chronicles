import React, { useState, useEffect,useContext } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'; 
import { API_URL } from '../App';
import { MdDelete,MdEdit } from "react-icons/md";
import { AuthContext } from '../Contexts';
import moment from 'moment';
import parse from 'html-react-parser';
import Sidebar from '../components/Sidebar';


const Post = () => {
  const [post, setPost]= useState(null)

const location = useLocation()
const postLocation = location.pathname.split("/")[2]
const navigate = useNavigate()

  useEffect(()=>{
    const findPost = async () =>{
      try{
        const fetchPost = await axios.get(`${API_URL}/posts/${postLocation}`)
        if(fetchPost){
          setPost(fetchPost.data.data)
        }
      }catch(err){
        console.log(err)
      }
    }
    findPost()
 
  }, [postLocation])

  const {currentUser} = useContext(AuthContext)

  const deletePost= async ()=>{
    const confirmation = window.confirm('Do you want to delete this post?')
    if(confirmation) {
    try{
     await axios.delete(`${API_URL}/delete/posts/${postLocation}`)
     
      alert('Post deleted')
      navigate("/")
    } catch(err){
      console.log(err)
    }

    }
    
  }

  return (
   <>
    {post? (
      <div className='flex flex-col sm:flex-row px-10'>
        <div className='sm:basis-4/5 pt-10 sm:pl-20'>
          <h1 className='text-xl sm:text-3xl text-left pl-2 sm:pl-10'>{post.title}</h1>
         
          <div className='mt-5 mb-1 h-48 sm:h-64 md:h-72 lg:h-96'>
          <img className='w-full h-full object-cover ' src={`${post.image}`} />
          </div>
          <div className='flex flex-row '>
          <span className='text-sm text-text text-left pl-3  font-semibold'> Posted {moment(post.date).fromNow()}</span>
          <span className='text-sm text-text text-left  ml-1 font-semibold '> in {post.category}</span>
          {currentUser? 
          <>
          <Link to ="/write" state={post}><MdEdit  className='ml-3 cursor-pointer' size={20} /></Link>
          <MdDelete className='ml-1 cursor-pointer' size={20} onClick={deletePost}/>
          </>: 
          <></>}
          </div>
          <div className='my-5'>
          < section className='text-left text-lg'>{parse(post.content)}</section>
          </div>

        <div className='object-left mb-10 text-left'>
        Tags: {post.tags&&post.tags.split(',').map((tag)=>(
            <span className='border border-black-500 mr-2 bg-tertiary'> {tag} </span>
          ))}
        </div>
        </div>
        <div className='sm:basis-1/5 sm:ml-3 sm:pt-20'>
          <Sidebar />
        </div>
      </div>
    ):
    (<h1>Loading</h1>)}
   </>
  )
}

export default Post