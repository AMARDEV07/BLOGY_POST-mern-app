
import toast from "react-hot-toast";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";


function Search() {
  const location =useLocation();
  const navigate=useNavigate();
  const [searchParams,setSearchParams]=useSearchParams();

  const handelkeyPress=(e)=>{

    if(e.key==="Enter"){
      const query=e.target.value;
      if(location.pathname==="/posts"){
        setSearchParams({...Object.fromEntries(searchParams),search:query});
    }
    else{
      navigate(`/posts?search=${query}`);
     
      
    }
  }

  }

  return (

    <div className="bg-gray-300 p-2 rounded-full flex items-center gap-2 ">

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
        />
      </svg>

      <input type="text"placeholder="Search a post..." className="bg-transparent border-none focus:outline-none" onKeyDown={handelkeyPress}/>
    </div>
  );
}

export default Search;
