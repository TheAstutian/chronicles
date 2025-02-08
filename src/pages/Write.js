import React, { useEffect, useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import moment from 'moment';
import DB from '../MockDB';
import { API_URL } from '../App';

const Write = () => {
  const state = useLocation().state;
   
  console.log(state)
  
  
    const [title, setTitle]= useState(state?.title|| '')
    const [cat, setCat]= useState(state?.category ||'')
    const [image, setImage] = useState(state?.image|| '')
    const [tags, setTags]= useState(state?.tags|| '')
    const [content, setContent]= useState(state?.content|| '')

    const api = process.env.REACT_APP_API_KEY 
    const navigate = useNavigate()

    useEffect(()=>{
          
      const theSlug = slugify(title)
      
    },[title])

    const modules = {
      toolbar: [
        [{'header':[1,2,3,4,false]}],
        ['bold', 'italic', 'underline'],
        ['link', 'image'],
        [{'align':[]}]
      ]
    }

    const imageUpload = async(image)=>{
      try{
        if(!image){
          return 'https://thumbs.dreamstime.com/b/web-324671699.jpg'
        } else if (image.name){
          const imageupload = new FormData();
          imageupload.set('key', api)
          imageupload.append('image',image)
          const response = await axios.post('https://api.imgbb.com/1/upload', imageupload)
          return response.data.data.image.url; 
        }
      } catch(err){
        console.log(err)
      }
    } 

    const slugify = (str)=>{
      str = str.replace(/^\s+|\s+$/g, ''); //trim leading or trailing white spaces
      str = str.toLowerCase();
      str = str.replace(/[^a-z0-9 -]/g, '') //removes non-alphanumeric characters
                .replace(/\s+/g, '-') //replaces spaces with hyphens
                .replace(/-+/g, '-') //removes consecutive hyphens 
      return str
    } 


    const onSubmit = async()=>{

      if(state){
        var img; 
        if (typeof (image) ==='String'){
         img = image
        } else {
          img = await imageUpload (image)
        }

        const updatedPost = {
          
          title: title, 
          slug: slugify(title),
          category: cat,
          tags: tags,
          content: content, 
          image: img
        }
        
         const newPost= await axios.put(`${API_URL}/edit/${state._id.toString()}`, updatedPost)

         if(!newPost){
          alert('An error occured. Try again')
         } else if (newPost){
          alert('Post successfully updated')
          navigate(`/post/${state._id}/${slugify(title)}`)
         }
         return
      }
      const imageLink = await imageUpload(image)
      const newItem = {
        title: title,
        slug: slugify(title),
        category: cat,
        image: imageLink,
        tags: tags,
        content: content,
        //date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
      }
      
      try{
        const sendPost = await axios.post(`${API_URL}/write`, newItem)
        if (sendPost){
          alert('New chronicle added')
          navigate(`/post/${sendPost.data.data._id}/${sendPost.data.data.slug}`)
        }
    
      } catch(err){
        console.log(err)
      }
       
    /*  const imageLink = imageUpload(image)
      DB.push({
        id: DB.length+1,
        title: title,
        slug: slugify(title),
        category: cat,
        image: imageLink,
        tags:'',
        content: content,
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
      })*/
    }


  return (
    <div className='mx-5 sm:mx-20 sm:px-20 pt-3 sm:pt-10'>
         <h1 className='text-xl sm:text-3xl text-left pl-2 pb-5 sm:pl-10'>Add a new entry to your chronicles...</h1>

         <div className='grid gap-4 sm:grid-cols-2 sm:gap-6 sm:w-full pt-3 pb-3 sm:py-10  border border-black-100 '>
             <div className="w-full sm:col-span-2 flex flex-col sm:px-10">                  
                  <input type="text" value={title} name="title" id="title" onChange={e=>setTitle(e.target.value)} className="bg-gray-50 border border-gray-300 mb-3 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Title" required=""/>
              </div>
              <div className='w-full sm:col-span-2 sm:px-10 sm:flex sm:flex-row'>
              <input type="text" value={cat} name="category" id="category" onChange={e=>setCat(e.target.value)} className="sm:mr-5 bg-gray-50 border border-gray-300 mb-3 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Category" required=""/>
              <input type="text" value={tags} name="tags" id="tags" onChange={e=>setTags(e.target.value)} className="bg-gray-50 border border-gray-300 mb-3  text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Enter tags, separated by a comma" required=""/>
              </div>
            
              {state && state.image && <div className='w-full px-3 sm:col-span-2 sm:px-10 text-left flex flex-row'>
                <img className=' sm:max-h-40 block' src={state.image} alt="Post Image" />
              </div>
              }

              <div className='w-full px-3 sm:px-10 text-left flex flex-row'>
                
                <label className=' text-normal font-medium text-gray-900 mr-5 ' htmlFor='file'>{state?.image? 'Change image': 'Add an image'}</label>
                <input type='file' name='' id="image"  onChange={e=>setImage(e.target.files[0])} />
            </div>  
              <div className='w-full sm:col-span-2 flex flex-col sm:px-10 text-left pb-5 sm:mb-10'>
                <ReactQuill theme='snow' modules ={modules} className='min-h-80 bg-white ' value={content} onChange={setContent} />
              </div>
              <div className='w-full sm:col-span-2 '>
              <button type="submit"   onClick = {onSubmit} className="inline-flex items-center px-7 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-button  rounded-lg border-2 border-white  focus:ring-4 focus:ring-primary-200 hover:text-button hover:bg-secondary">Submit</button>
              </div>
         </div>
    </div>
  )
}

export default Write