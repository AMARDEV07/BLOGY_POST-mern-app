
import { format } from "timeago.js";
import Images from "./Images";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";

function CommentShow({comment,postId}) {
  const {user}=useUser();
  const {getToken}=useAuth();
  const role=user?.publicMetadata?.role;


    //refetch and refrece data from database.....
    const queryClient = useQueryClient();


  
    //------mutation  react query  hook which use for write data
    const mutation = useMutation({
      mutationFn: async () => {
        //calling get token
        const token = await getToken();
        return axios.delete(
          `${import.meta.env.VITE_API_URL}/comments/${comment._id}`,
          
          {
            //using bearer for auth
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      },


  
      //if mutation sucess show this msg and navigate on data
      onSuccess: () => {
        //it use refrece comment ist..
        queryClient.invalidateQueries({ queryKey: ["comments", postId] });
        toast.success("comment delete sucessfully");
      },
  
      //if mutation failed
     onError: (error) => toast.error(error.response?.data?.message || "Failed to delete comment"),

    });
   
  
  
  
  
  

  
  return (
    <div className='p-4 bg-slate-50 rounded-xl mb-8'>
      <div className='flex items-center gap-4'> 

       {comment.user.img &&
       <Images src={comment.user.img} 
       className="w-10 h-10 rounded-full object-cover"
        w="40"/>}
        <span  className='font-medium'>{comment.user.username}</span>
        <span className='text-sm text-gray-500'>{format(comment.createdAt)}</span>
        

   {/* //role base condition or comment delete  */}
    {/* user or admin can delete comment post  */}
        {user && (comment.user.username===user.username||role==="admin") && (
        <span className="text-xs text-red-300 hover:text-red-600 cursor-pointer" 

        onClick={() => mutation.mutate()}>delete
        {mutation.isPending && <span>(in progress)</span>}
        </span> 
        )}

      </div>
      <div className='mt-4'>
        <p>{comment.desc}</p>
      </div>
    </div>
  )
}

export default CommentShow