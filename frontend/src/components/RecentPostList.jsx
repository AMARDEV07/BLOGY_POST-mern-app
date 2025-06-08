import PostListItems from "./PostListItems";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";








//fetch function.........
//fetch  ho rha h wo data  jo hmna qill  ma likha data bse m stroe keya using useinfinity
const fetchPosts = async (pageParam,searchParams) => {
   
  //creating search paramaobj in instance of searchparama acess jo bhi parms ma jayga wo is object ma aajayaga ....
  const searchParamsObj=Object.fromEntries([...searchParams]);
  console.log(searchParamsObj);


  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
    params: { page: pageParam, limit: 10,...searchParamsObj},
  });

  return res.data;
};





function RecentPostList() {
  //set serchparms --------------hook for search category using url...
  const [searchParams, setSearchParams]=useSearchParams();




  // Destructure useful properties from useInfiniteQuery 
  //fetch data with pagination logic
  const {
    data, // Contains all pages of fetched posts
    error,
    fetchNextPage, // Function to load the next page
    hasNextPage, // Boolean: is there more data?
    isFetchingNextPage, // Boolean: is next page currently loading?
    status, // 'loading' | 'error' | 'success'
  } = useInfiniteQuery({
    queryKey: ["posts",searchParams.toString()], // Unique key for this query's cache
    // Query function to fetch data, receives pageParam

    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam,searchParams),
    // Start from page 1
    initialPageParam: 1,
    // Determine the next page to fetch
    getNextPageParam: (lastPage, pages) => {
      // If the backend says there's more data (hasMore is true),
      // return the next page number
      return lastPage.hasMore ? pages.length + 1 : undefined;
    },
  });







  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return "An error has occurred";
  //To map all pages' posts into one single array.
  const allPosts = data?.pages?.flatMap((page) => page.posts) || [];


  return (


    // using infinte scroll package 
    <InfiniteScroll

      dataLength={allPosts.length} // total items count
      next={fetchNextPage}              // function to load next page
      hasMore={hasNextPage || false} // is there more data to load?
      loader={<h4>Loading more post...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>All posts loaded</b>
        </p>
      }>



      {/* items ka jagha post map kr diya  */}
      {/* post array map..  */}
      {allPosts.map((post) => (
        <PostListItems key={post._id} post={post} />
        // we pass post here not hwen we fetach post details we use post as prper and fetch data like post.tittle etc 

      ))}
    </InfiniteScroll>

  );
}

export default RecentPostList;
