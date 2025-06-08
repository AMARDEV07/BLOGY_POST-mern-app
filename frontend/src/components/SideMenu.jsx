
import { Link, useSearchParams } from "react-router-dom";
import Search from "./Search";

function SideMenu() {


    //checking filter post acoording theri time
  const [searchParams, setSearchParams] = useSearchParams();
  const handelFilterchange = (e) => {
    //just check condition ki jo searchParam.hmna get keya h uski value taget agr same nahi h toh
    if(searchParams.get("sort") !==e.target.value){
   //URL ke andar jo bhi query parameters hain (jaise ?q=mern&page=2)
    //  unko wapas set kar rahi hai — bas ek naya object bana ke.
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      //sort value according theri target
      sort:e.target.value,
    });
}
  };




  return (
    <div className="px-4 h-max sticky top-8 ">
      <h1 className="mb-4 text-sm font-medium">Search</h1>
      <Search />

      {/* filter option  */}
      <h1 className="mt-4 text-sm font-medium">Filter</h1>

      <div className="flex flex-col gap-2 text-sm">
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onChange={handelFilterchange}
            value="newest"
            className="appearance-none w-4 h-4 border-[1.5px] border-bue-800 cursor-pointer  bg-white rounded-sm checked:bg-blue-600"
          />
          Newest
        </label>

        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onChange={handelFilterchange}
            value="Popular"
            className="appearance-none w-4 h-4 border-[1.5px] border-bue-800 cursor-pointer bg-white rounded-sm checked:bg-blue-600"
          />
          Most Popular
        </label>

        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onChange={handelFilterchange}
            value="trending"
            className="appearance-none w-4 h-4 border-[1.5px] border-bue-800  bg-white cursor-pointer rounded-sm checked:bg-blue-600"
          />
          Trending
        </label>

        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onChange={handelFilterchange}
            value="oldest"
            className="appearance-none w-4 h-4 border-[1.5px] border-bue-800 cursor-pointer  bg-white rounded-sm checked:bg-blue-600"
          />
          oldest
        </label>
      </div>

      {/* categoreis-otion  */}
      <h1 className="mt-4 text-sm font-medium">Categories</h1>
      <div className="flex flex-col gap-2 text-sm">
        <Link to="/Posts" className="underline">
          All
        </Link>
        <Link to="/Posts?cat=Web-design" className="underline">
          Web Designe
        </Link>
        <Link to="/Posts?cat=Development" className="underline">
          Development
        </Link>
        <Link to="/Posts?cat=Database" className="underline">
          database
        </Link>
        <Link to="/Posts?cat=Search-engine" className="underline">
          Search-engines
        </Link>
        <Link to="/Posts?cat=Marketing" className="underline">
          Marketing
        </Link>
      </div>
    </div>
  );
}

export default SideMenu;
