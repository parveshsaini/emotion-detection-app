import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const About = () => {
  return (
    <section className="">
  <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6 min-h-screen">
      <div className="mx-auto mb-8 max-w-screen-sm lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Our team</h2>
      </div> 
      <div className="flex justify-between">
          <div className="text-center text-gray-500 dark:text-gray-400">
              <Image className="mx-auto mb-4 rounded-full" width={200} height={200} src="/me3.jpg" alt="Parvesh Saini"/>
              <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <a href="#">Parvesh Saini</a>
              </h3>
              <p className='text-xl font-semibold'>2021UCS1582</p>
              
          </div>

          <div className="text-center text-gray-500 dark:text-gray-400">
              <Image className="mx-auto mb-4  rounded-full" width={200} height={200} src="/varsha.jpg" alt="Varsha Balwan"/>
              <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <a href="#">Varsha Balwan</a>
              </h3>
              <p className='text-xl font-semibold'>2021UCS1584</p>
              
          </div>

          <div className="text-center text-gray-500 dark:text-gray-400">
              <Image className="mx-auto mb-4  rounded-full" width={200} height={200} src="/pt.jpg" alt="devesh"/>
              <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <a href="#">Devesh K. Sharma</a>
              </h3>
              <p className='text-xl font-semibold'>2021UCS1583</p>
              
          </div>
          
      </div>  
      <div className='mt-20'>
      <Link href={'/'}>
      <button  className=' text-4xl text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full  px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'>
        Home
      </button>
        </Link>
      </div>
  </div>
  
</section>
  )
}

export default About
