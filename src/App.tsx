import Header from './components/view/Header/Header'
import Navbar from './components/view/Navbar/Navbar'

function App() {

  return (
    <div className='text-white'>
      <Header/>
      <div className='w-full bg-black  min-h-[90vh] grid grid-cols-12'>
      <Navbar />
      </div>
    </div>
  )
}

export default App
