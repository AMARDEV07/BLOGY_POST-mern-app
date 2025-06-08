import  { useState } from 'react'
import RecentPostList from '../components/RecentPostList'
import SideMenu from '../components/SideMenu'

// all post list page 

function PostListPage() {
  const [open, setOpen] = useState(false)

  return (
    <div>

      <h1 className='mb-8 text-2xl'>Development blog</h1>

      <button onClick={() => setOpen(prev => !prev)}
        className=' bg-blue-800 md:hidden text-sm text-white py-2 px-4 mb-4 rounded-2xl md:hidden'>
        {open ? "close" : "Filter or Search"}</button>


      <div className='flex  flex-col-reverse gap-8 md:flex-row '>
        <div><RecentPostList /></div>

        {/* //it show  when we click button menu list show block ese it hiiden */}

        <div className={`${open ? "block" : "hidden"} md:block`}>
          <SideMenu />
        </div>
      </div>

    </div>

  )
}

export default PostListPage