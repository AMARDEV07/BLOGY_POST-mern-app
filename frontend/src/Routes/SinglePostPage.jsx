import { Link, useParams } from "react-router-dom";
import Images from "../components/Images";
import PostMenuAction from "../components/PostMenuAction";
import Search from "../components/Search";
import Comments from "../components/Comments";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "timeago.js";
import DOMPurify from 'dompurify';



const fetchPost = async (slug) => {
  //single post data fetch....
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
  return res.data;
}



function SinglePostPage() {
  const { slug } = useParams();
  //fetching data of single post page....
  const { isPending, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),

  });


  if (isPending) return "Loading...";
  if (error) return "Something went Wrong!" + error.message;
  if (!data) return "post Not found !"



  return (
    <div className=" flex flex-col gap-8 ">

      {/* details-div */}

      <div className="flex gap-8">
        {/* details- */}
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
            {data.title}
          </h1>

          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <span>written by</span>
            <Link className="text-blue-800">
              {data.user.username}

            </Link>
            <span>on</span>
            <Link className="text-blue-800">
              {data.category}
            </Link>
            <span>{format(data.createdAt)}</span>
          </div>

          <p className="text-gray-500 font-medium">
            {data.desc}
          </p>
        </div>

        {/* images  */}
        {data.img && <div className="hidden lg:block w-2/5">
          <Images src={data.img} className="rounded-2xl" w="600" />
        </div>}
      </div>

      {/* content--  */}
      <div className="flex flex-col md:flex-row gap-12">



        {/* text content here  */}
        <div className="bg-transparent lg:text-lg flex flex-col quill-content-override"
         dangerouslySetInnerHTML={{ 
           __html: DOMPurify.sanitize(data.content) 
         }}>
        </div>




        {/* menu-------------------  */}
        <div className="px-4 h-max sticky top-8">

          <h1 className=" mb-4 text-sm font-medium">Author</h1>

          <div className=" flex flex-col gap-4">
            <div className="flex items-center gap-6">

             {data.img && <Images
                src={data.user.img}
                className="w-12 h-12 rounded-full object-cover"
                w="48"
                h="48"
              />}

              <Link to="" className="text-blue-800">{data.user.username}</Link>
            </div>

            <p className="text-sm text-gray-400">Lorem ipsum dolor sit.</p>

            <div className="flex gap-2">
              <Link><Images src="facebook.svg"></Images></Link>
              <Link><Images src="facebook.svg"></Images></Link>
            </div>

          </div>


          {/* post menu action  */}
          {/* sending data  of post to post action for */}
          <PostMenuAction  post={data}/>



          {/* categories  */}

          <h1 className="mt-8 mb-4 text-sm font-medium">Categoriese</h1>
          <div className="flex flex-col gap-2 text-sm ">
            <Link className="underline">All</Link>
            <Link to=" " className="underline">
              web designe
            </Link>
            <Link to=" " className="underline">
              Development
            </Link>
            <Link to=" " className="underline">
              Database
            </Link>
            <Link to=" " className="underline">
              search Engines
            </Link>
            <Link to=" " className="underline">
              Marketing
            </Link>
          </div>

          {/* search div  */}

          <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>
          <Search />
        </div>


      </div>


      {/* comments-section  */}
      {/* passing id comment  */}
      <Comments postId={data._id} />




    </div>
  );
}

export default SinglePostPage;
