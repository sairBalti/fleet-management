
import './App.css'
import Header from './components/Header'
import Contact from './components/Contact'
import Navbar from './components/Navbar'
import Image from './components/Image'
import Summary from './components/Summary'
import Experience from './components/Experience'
import Education from './components/Education'
import Skills from './components/Skills'

function App() {
   return (
    <div className="min-h-screen bg-gray-100 px-2 sm:px-4  py-4 sm:py-6">
      <div className='max-w-[1000px] mx-auto bg-white p-4  sm:p-10 rounded-lg shadow-lg space-y-6'>
      {/* Header */}
      <div className='flex flex-col'>
        <div className='flex justify-between '>
          <div className='pl-12 pt-4'>
            <Image />
          </div>
          <div className='pr-20'>
            <Navbar />
          </div>

        </div>
      </div>
      <div className='flex flex-col'>
        <div className='flex justify-between '>
          <div className='pl-12'>
            <Header />

          </div>
          <div className='pr-20'>
            <Contact />
          </div>

        </div>

      </div>
      <div className='flex flex-row'>
        <div className='pl-12 pt-7'>
        <Summary />

        </div>
      </div>
      <div className='flex flex-col'>
        <div className='flex justify-between'>
          <div className='pl-12'>
            <Experience />

          </div>
          <div className='pr-20 '>
            <Education />

          </div>

        </div>

      </div>
      <div className='flex flex-row'>
        <div className='pl-12'> 
          <Skills />

        </div>
       

      </div>
      </div>
    </div>
  );
}
export default App
