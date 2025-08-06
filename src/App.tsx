import { Routes ,Route} from 'react-router-dom'
import './App.css'
import Products from './Components/Products'
import Login from './Components/Login'


function App() {
 

  return (
    <>
    
    <Routes>
      
   <Route path="/Products" element={<Products/>} />
   <Route path="/" element={<Login/>} />
        
         
   </Routes> 
   
      
    </>
  )
}

export default App
