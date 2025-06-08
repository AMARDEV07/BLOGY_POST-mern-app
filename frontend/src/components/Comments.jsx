import axios from "axios";
import CommentShow from "./CommentShow";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth, useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";

//fetch comment data...
const fetchComment = async (postId) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/comments/${postId}`
  );
  return res.data;
};




function Comments({ postId }) {
  //for optmestic comment auth..
  const { user } = useUser(); //get token
  const { getToken } = useAuth();
  //use react query fetching data ofe comment data page....
  const { isPending, error, data } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComment(postId),
  });




  //refetch and refrece data from database.....
  const queryClient = useQueryClient();





  //------mutation  react query  hook which use for write data
  const mutation = useMutation({
    mutationFn: async (newComment) => {
      //calling get token
      const token = await getToken();
      return axios.post(
        `${import.meta.env.VITE_API_URL}/comments/${postId}`,
        newComment,
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
    },

    //if mutation failed
    onError: () => toast.error(error.response.data),
  });
  if (error) return "Something went Wrong!" + error.message;





  const handelSubmitComment = (e) => {
    e.preventDefault();

    //get form data..
    const formData = new FormData(e.target);

    const data = {
      desc: formData.get("desc"),
    };
    //send data to db
    mutation.mutate(data);

    //after addding input reset data
    e.target.reset();
  };









  
  return (
    <div className="flex flex-col gap-8 lg:w-3/5 mb-12">
      <h1 className="underline text-xl text-gray-500 ">Comments</h1>
      <form
        onSubmit={handelSubmitComment}
        className="flex items-center justify-between gap-8 w-full"
      >
        <textarea
          name="desc"
          placeholder="Write a Comment..."
          className="bg-white p-4 rounded-xl w-full"
        />
        <button className="bg-blue-800 px-4 py-3 text-white font-medium rounded-xl hover:bg-blue-900">
          Send
        </button>
      </form>

      {/* comment list  */}
      {/* //optmestic commet lode faster  */}

      {isPending ? (
        "Loading..."
      ) : error ? (
        "Error loading Comments!"
      ) : (
        <>
          {mutation.isPending && (
            <CommentShow
              comment={{
                desc: `${mutation.variables.desc}(Sending...)`,
                createdAt: new Date(),
                user: {
                  img: user.imageUrl,
                  username: user.username,
                },
              }}
            />
          )}

          {data.map((comment) => (
            <CommentShow key={comment._id} comment={comment} postId={postId} />
          ))}
        </>
      )}
    </div>
  );
}

export default Comments;
