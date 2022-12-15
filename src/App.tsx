import { Route, Routes } from 'react-router-dom'
import Dashboard from './components/view/Dashboard/Dashboard'
import Friends from './components/view/Friends/Friends'
import Header from './components/view/Header/Header'
import Login from './components/view/Login/Login'
import Messages from './components/view/Messages/Messages'
import Navbar from './components/view/Navbar/Navbar'
import Profile from './components/view/Profile/Profile'

function App() {
  return (
    <div className='text-white '>
      {/* <Login/> */}
      <Header/>
      <div className='w-full bg-black  min-h-[90vh] grid grid-cols-12'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/friends' element={<Friends/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/messages' element={<Messages/>}/>
        {/* <Route path='/login' element={<Login/>}/> */}
      </Routes>
      </div>
    </div>
  )
}

export default App
