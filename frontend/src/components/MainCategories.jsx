
import { Link } from 'react-router-dom'
import Search from './Search'


// homepage main categories 

function MainCategories() {

    return (
        <div className=' hidden md:flex bg-white rounded-3xl  xl:rounded-full p-4 shadow-lg items-center justify-center gap-8'>

            {/* links  */}
               <div className='flex-1 flex items-center justify-between flex-wrap'>
                <Link to="/Posts" className='bg-blue-800 text-white rounded-full px-4 py-2'>All Posts</Link>
                <Link to="/Posts?cat=Web-Designe" className='hover:bg-blue-50 rounded-full px-4 py-2'>Web Design</Link>
                <Link to="/Posts?cat=Development" className='hover:bg-blue-50 rounded-full px-4 py-2'>Development</Link>
                <Link to="/Posts?cat=Database" className='hover:bg-blue-50 rounded-full px-4 py-2'>Database</Link>
                <Link to="/Posts?cat=Search-Engines" className='hover:bg-blue-50 rounded-full px-4 py-2'>Search Engine</Link>
                <Link to="/Posts?cat=Marketing" className='hover:bg-blue-50 rounded-full px-4 py-2'>Marketing</Link>
            </div>

            <span className='text-xl font-medium'>|</span>

            {/* search  */}
            <Search/>


        </div>
    )
}


export default MainCategories