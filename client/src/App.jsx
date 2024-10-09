import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet
} from "react-router-dom";
import Register from "./pages/Register"
import Login from "./pages/Login"
import Single from "./pages/Single"
import Write from "./pages/Write"
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './style.scss'
import 'react-image-gallery/styles/css/image-gallery.css';

const Layout = () => {
  return (
    <>
    <Navbar/>
<Outlet/> 
<Footer/>
   </>
  )
}



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/write",
        element: <Write/>
      },
      {
        path: "/post/:id",
        element: <Single/>
      }
    ]
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  
  
]);


function App() {
  return <div className="app">
    <div className="container">
      <RouterProvider router={router}/></div>
      </div>;
}


export default App;
