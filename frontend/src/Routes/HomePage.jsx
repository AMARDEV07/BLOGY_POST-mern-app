
import { Link } from 'react-router-dom';
import MainCategories from '../components/MainCategories';
import FeaturedPost from '../components/FeaturedPost';
import RecentPostList from '../components/RecentPostList';

function HomePage() {
  return (
    <div className='mt-4 flex flex-col gap-4'>

      {/* BREADCRUMB*/}
      <div className='flex gap-4'>
        <Link to="/" className="hover:text-blue-600 transition-colors"> Home</Link>
        <span>•</span>
        <span className='text-blue-800'>Blogs and Articles</span>
        <Link to="/write" className="hover:text-blue-600 transition-colors">.write</Link>
       
      </div>

      {/* INTRODUCTION */}
      <div className='flex items-center justify-between flex-col md:flex-row gap-8'>

        {/* title  */}
        <div className='md:w-2/3'>
          <h1 className='text-gray-800 text-2xl md:text-5xl lg:text-6xl font-bold'>Lorem ipsum dolor sit. Cu!</h1>
          <p className='mt-8 text-md md:text-xl text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, odio!</p>
        </div>



        {/* animation button  */}
        <Link to="/write" className=' hidden md:block relative'>

          <svg
            viewBox="0 0 200 200"
            width="200"
            height="200"
            className='text-lg tracking-widest animate-spin animatebutton'>

            <path id="circlePath"
              fill='none'
              d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
            />
            <text>
              <textPath href="#circlePath" startOffset="0%">
                • WRITE YOUR STORY
              </textPath>
              <textPath href="#circlePath" startOffset="50%">
                • WRITE YOUR IDEA
              </textPath>
            </text>
          </svg>

          <button className='absolute top-0 left-0 right-0 bottom-0 m-auto w-20 h-20 bg-blue-800 rounded-full flex items-center justify-center'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="50"
              height="50"
              fill="none"
              stroke="white"
              strokeWidth="2">
              <line x1="6" y1="18" x2="18" y2="6" />
              <polyline points="9 6 18 6 18 15" />


            </svg>


          </button>
        </Link>

      </div>

      
      {/* categories  */}
      <div className='mt-12'>
        <MainCategories/>
      </div>


      {/* FEATURED POST */}
      <div className="mt-12">
        <FeaturedPost/>
       
      </div>
      

      {/*  RECENT POST LIST */}
      <div className="mt-8">
        <h1 className='my-8 text-2xl text-gray-600'>RECENT POST</h1>
       <RecentPostList/>
      </div>

      


    </div>
  )
}

export default HomePage