import React from 'react'

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
            {/* Vertical line */}
            <div className='border-l-2 border-black h-full'></div>
          </div>

          {/* Portfolio Creation */}
          <div className='relative'>
            <h3 className='text-2xl font-bold'>Portfolio Creation</h3>
            <p className='mt-4'>
              Showcase Your Skills<br />
              Create a professional portfolio that highlights your talents and experiences. 
              Impress employers and stand out from the crowd with a personalized portfolio.
            </p>
          </div>

          {/* Courses */}
          <div className='relative'>
            <h3 className='text-2xl font-bold'>Courses</h3>
            <p className='mt-4'>
              Continuous Learning<br />
              Enroll in our courses designed to enhance your skills and knowledge. From technical 
              skills to soft skills, our courses cover a wide range of topics to help you excel in your career.
            </p>
          </div>

          {/* Join Community */}
          <div className='relative'>
            <h3 className='text-2xl font-bold'>Join Community</h3>
            <p className='mt-4'>
              Connect and Grow<br />
              Join our community to network with professionals from various industries. Build valuable 
              connections, share insights, and collaborate for mutual growth.
            </p>
          </div>

          {/* Virtual Job Fairs */}
          <div className='relative'>
            <h3 className='text-2xl font-bold'>Virtual Job Fairs</h3>
            <p className='mt-4'>
              Guidance and Support<br />
              Get personalized mentorship from industry experts right on your campus. Gain valuable 
              insights, career advice, and guidance to shape your professional journey.
            </p>
          </div>
        </div>

        {/* Explore More Button */}
        <div className='text-center mt-10'>
          <button className='bg-black text-white py-2 px-4 rounded-lg'>
            Explore More
          </button> 
        </div>
      </div>
    </>
  )
}

export default ValuableResources
