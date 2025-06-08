
import Images from "./Images";
import { Link } from "react-router-dom";
import { format } from 'timeago.js';




function PostListItems({post}) {
  // pass post as props fetch post data now post props 

  return (
    <div className="flex flex-col xl:flex-row gap-8 mb-12 ">

      {/* cover images ka  */}
      {post.img && <div className="md:hidden xl:block xl:w-1/3">
        <Images src={post.img} className="rounded-2xl object-cover" w="400"  />
      </div>}


      {/* details section  */}
      <div className="flex flex-col gap-4 xl:w-2/3">
        <Link to={`/${post.slug}`} className="text-4xl font-semibold">
        {/* title  */}
         {post.title}
        </Link>

        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span>Written By</span>

          {/* username  */}
          <Link to={`/${post.slug}`} className="text-blue-800">
           {post.user.username}
          </Link>

          {/* time  */}
          <span>{format(post.createdAt)}</span>

          {/* category  */}
          <Link to={`/${post.slug}`} className="text-blue-800">
           {post.category}
          </Link>
        </div>

        {/* descprition  */}
        <p className=""> {post.desc}</p>

        <Link to={`/${post.slug}`} className=" underline text-blue-900 text-sm">Read More</Link>

      </div>
    </div>
  );
}

export default PostListItems;
