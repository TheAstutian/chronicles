import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Route,
} from "react-router-dom";

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Post from './pages/Post';
import Posts from './pages/Posts';
import Write from './pages/Write';
import Login from './pages/Login';
import Register from './pages/Register';


const Layout =()=>{
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
        path:"/",
        element: <Home/>,
      },
      {
        path:"/posts",
        element:<Posts/>
      },
      {
        path:"/write",
        element:<Write />
      },
      {
        path:"/post/:id/:slug",
        element:<Post/>
      },
    ]

  },
  
  {
    path:"/oykk",
    element:<Login/>
  },
  
  {
    path:"/register",
    element:<Register/>
  }
])

function App() {
  return (
    <div className="App bg-background">
      <RouterProvider router={router} />
     </div>
  );
}

export const API_URL = process.env.REACT_APP_API_URL
export default App;
 