import React from 'react'
import yt from '../assets/yt.png'
import discord from '../assets/discord.png'

const ValuableResources = () => {
  return (
    <>
      <div className='max-w-7xl mx-auto my-20 p-10'>
        <h1 className='text-4xl font-bold text-center'>Valuable Resources</h1>
        <h2 className='text-xl font-bold text-center my-4'>Enhancing Your Career</h2>
        <p className='text-center mb-12'>
          Our platform provides a wide range of resources to boost your career growth. 
          From resume building to interview tips, we offer everything you need to succeed in the job market.
        </p>

        <div className='relative grid grid-cols-1 md:grid-cols-2 gap-10 text-center'>
          <div className='absolute inset-0 flex justify-center items-center'>
            <div className='border-t-2 border-black w-full'></div>
          </div>
          <div className='absolute inset-0 flex justify-center items-center'>
            <div className='border-l-2 border-black h-full'></div>
          </div>

          {/* Portfolio Creation */}
          <div className='relative'>
            <h3 className='text-2xl font-bold hover:text-blue-800'>Portfolio Creation</h3>
            <p className='mt-4 hover:text-blue-800'>
              Showcase Your Skills<br />
              Create a professional portfolio that highlights your talents and experiences. 
              Impress employers and stand out from the crowd with a personalized portfolio.
            </p>
          </div>

          {/* Courses with Udemy Link */}
          <div className='relative'>
            <a 
              href='https://www.udemy.com/?utm_source=adwords-brand&utm_medium=udemyads&utm_campaign=Brand-Udemy_la.EN_cc.India_dev.&campaigntype=Search&portfolio=BrandDirect&language=EN&product=Course&test=&audience=Keyword&topic=&priority=&utm_content=deal4584&utm_term=_._ag_133043842461_._ad_595460368512_._kw_udemy%20courses_._de_c_._dm__._pl__._ti_kwd-295955963002_._li_9144445_._pd__._&matchtype=b&gad_source=1&gclid=CjwKCAjwjsi4BhB5EiwAFAL0YFP1wTHDODxlC27oryqsT0mTIDniPgiBVfLvItLrGSiThTLrPQwbWxoCmuIQAvD_BwE' 
              target='_blank' 
              rel='noopener noreferrer'
              className='text-black-600 hover:text-blue-800'
            >
              <h3 className='text-2xl font-bold'>Courses</h3>
              <p className='mt-4'>
                Continuous Learning<br />
                Enroll in our courses designed to enhance your skills and knowledge. From technical 
                skills to soft skills, our courses cover a wide range of topics to help you excel in your career.
              </p>
            </a>
          </div>


          <div className='relative'>
            <h3 className='text-2xl font-bold hover:text-blue-800'>Join Community</h3>
            <p className='mt-4 hover:text-blue-800'>
              Connect and Grow<br />
              Join our community to network with professionals from various industries. Build valuable 
              connections, share insights, and collaborate for mutual growth.
            </p>

           
            <div className='mt-4 flex justify-center gap-10'>
              <a 
                href='https://www.youtube.com/' 
                target='_blank' 
                rel='noopener noreferrer'
              >
                <img 
                  src={yt}
                  alt='YouTube' 
                  className='w-45 h-32 hover:opacity-85 transition-opacity duration-200'
                />
              </a>
              <a 
                href='https://discord.com/' 
                target='_blank' 
                rel='noopener noreferrer'
              >
                <img 
                  src={discord}
                  alt='Discord' 
                  className='w-45 h-32 hover:opacity-75 transition-opacity duration-200'
                />
              </a>
            </div>
          </div>

          {/* Virtual Job Fairs with vFairs Link */}
          <div className='relative'>
            <a 
              href='https://www.vfairs.com/event-management-platform/virtual-job-fair/' 
              target='_blank' 
              rel='noopener noreferrer'
              className='text-black-600 hover:text-blue-800'
            >
              <h3 className='text-2xl font-bold'>Virtual Job Fairs</h3>
              <p className='mt-4'>
                Guidance and Support<br />
                Get personalized mentorship from industry experts right on your campus. Gain valuable 
                insights, career advice, and guidance to shape your professional journey.
              </p>
            </a>
          </div>
        </div>

        {/* Explore More Button linking to Dribbble Explore Page */}
        <div className='text-center mt-10'>
          <a 
            href='https://dribbble.com/tags/explore-page' 
            target='_blank' 
            rel='noopener noreferrer'
          >
            <button className='bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800'>
              Explore More
            </button>
          </a>
        </div>
      </div>
    </>
  )
}

export default ValuableResources
