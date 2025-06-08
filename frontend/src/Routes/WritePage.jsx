import { useMutation } from "@tanstack/react-query";
import { useAuth, useUser } from "@clerk/clerk-react";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Uplode from "../components/Uplode";

function WritePage() {
  const { isLoaded, isSignedIn } = useUser();

  // create hook data fetch from react quill
  const [value, setValue] = useState("");
  const [cover, setCover] = useState("");
  const [progress, setProgress] = useState(0);
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  //navigate function
  const navigate = useNavigate();
  //----webtoken function use:-
  const { getToken } = useAuth();





  useEffect(() => {
    //  set images on des 
    img && setValue(prev => prev + `<p><image src="${img.url}"/> </p>`)

  }, [img])
  //for video
  useEffect(() => {
    //  set images on des 
    video && setValue(prev => prev + `<p><iframe class="ql-video" src="${video.url}"/> </p>`)

  }, [video])






  //------mutation  react query  hook which use for write data
  const mutation = useMutation({
    mutationFn: async (newPost) => {
      //calling get token
      const token = await getToken();
      
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
        //using bearer for auth
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },

    //if mutation sucess show this msg and navigate on data
    onSuccess: (res) => {
      toast.success("Post created!"), navigate(`/${res.data.slug}`);
    },

    //if mutation failed
    onError: () => toast.error(" Failed to post"),
  });

  //if user not loaded then show loading
  if (!isLoaded) {
    return <div> Loading...</div>;
  }

  //if user loaded but then not signed in
  if (isLoaded && !isSignedIn) {
    return <div>you should login !</div>;
  }



  //---submit form function
  const handelSubmit = (e) => {
    e.preventDefault();

    //target form data like all things cat, desc, title
    // Use Case: User uploads name + image → submit to backend
    const formData = new FormData(e.target);

    const title = formData.get("title");

    //get target data from form
    const data = {
      // send path of images in backend esle send empty
      img: cover.filePath || "",
      title: title,
      category: formData.get("category"),
      desc: formData.get("desc"),
      content: value,
    };

    console.log(data);
    // pass our data in database
    mutation.mutate(data);
  };

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
      <h1 className="text-cl font-light "> Create a New Post</h1>




      <form onSubmit={handelSubmit} className="flex flex-col gap-6 flex-1 mb-6">
        <Uplode type="image" setProgress={setProgress} setData={setCover}>

          {/* img/video uplode btnt */}
          <button className=" w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white">
            Add A cover Image
          </button>
        </Uplode>




        <input
          type="text"
          placeholder=" My Awesome Story"
          className="text-4xl  font-semibold bg-transparent outline-none "
          name="title"
          required
        />

        <div className=" flex items-center gap-4">
          <label htmlFor="" className="text-sm">
            Choose a category
          </label>

          <select
            name="category"
            id=""
            className="p-2 rounded-xl bg-white shadow-md"
          >
            <option value="general">General</option>
            <option value=" Web-Designe">Web Designe</option>
            <option value="Development"> development</option>
            <option value="Database"> Database</option>
            <option value="Search-Engines">Search Engines</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>



        <textarea
          className="p-4 rounded-xl bg-white shadow-md"
          name="desc"
          placeholder="A short Description"
        />




        {/* button  for video and images uplode form folder */}
        <div className=" flex flex-1">
          <div className=" flex flex-col gap-2 mr-2">
            {/* uplode images /video use component  */}
            <Uplode type="image" setProgress={setProgress} setData={setImg}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M21.02 5H19V2.98c0-.54-.44-.98-.98-.98h-.03c-.55 0-.99.44-.99.98V5h-2.01c-.54 0-.98.44-.99.98v.03c0 .55.44.99.99.99H17v2.01c0 .54.44.99.99.98h.03c.54 0 .98-.44.98-.98V7h2.02c.54 0 .98-.44.98-.98v-.04c0-.54-.44-.98-.98-.98zM16 9.01V8h-1.01c-.53 0-1.03-.21-1.41-.58-.37-.38-.58-.88-.58-1.44 0-.36.1-.69.27-.98H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8.28c-.3.17-.64.28-1.02.28-1.09-.01-1.98-.9-1.98-1.99zM15.96 19H6c-.41 0-.65-.47-.4-.8l1.98-2.63c.21-.28.62-.26.82.02L10 18l2.61-3.48c.2-.26.59-.27.79-.01l2.95 3.68c.26.33.03.81-.39.81z" /></svg>
            </Uplode>

            <Uplode type="video" setProgress={setProgress} setData={setVideo}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="video-upload">
                <g>
                  <path d="M292.607,221.137a10,10,0,0,0-4.9-8.6l-128.94-76.378a9.69,9.69,0,0,0-9.881-.085A9.851,9.851,0,0,0,144,144.759V297.515a9.849,9.849,0,0,0,4.882,8.688,9.688,9.688,0,0,0,4.868,1.312,9.838,9.838,0,0,0,5.055-1.4L287.724,229.74A9.978,9.978,0,0,0,292.607,221.137ZM164,279.969V162.305l99.319,58.832Z"></path>
                  <path d="M373.1,299.737a10,10,0,0,0-13.92,0l-38.149,36.976a9.976,9.976,0,0,0,13.851,14.361L356,330.537v68.819a10,10,0,0,0,20,0V330.537l21.258,20.537a10.021,10.021,0,0,0,13.98-14.361Z"></path>
                  <path d="M376,247.641V92.868A39.588,39.588,0,0,0,336.406,53H79.868A39.82,39.82,0,0,0,40,92.868V349.406A39.588,39.588,0,0,0,79.868,389H266.535A105.848,105.848,0,1,0,376,247.641ZM79.868,369A19.566,19.566,0,0,1,60,349.406V92.868A19.8,19.8,0,0,1,79.868,73H336.406A19.567,19.567,0,0,1,356,92.868V247.593c-53,4.929-96.061,50.175-96.061,105.341A100.345,100.345,0,0,0,261.39,369Zm286.269,70.132a85.992,85.992,0,0,1-.3-171.983c.189.011.375.029.566.029.131,0,.257-.015.386-.02a85.988,85.988,0,0,1-.655,171.974Z"></path>
                </g>
              </svg>
            </Uplode>
          </div>
          {/* npm package use for  integrate a rich text editor */}
          <ReactQuill
            theme="snow"
            className="flex-1 p-2 rounded-xl bg-white shadow-md"
            value={value}
            onChange={setValue}
            readOnly={(0 < progress && progress < 100)}
          />
        </div>



        <button
          //when mutation pneding disable button
          disabled={mutation.isPending || (0 < progress && progress < 100)}
          className="bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {/* jo data mutation sa send hora h backend p send click krna k bad uski validation  */}
          {/* //when mutation pending show loding or send if complet */}
          {mutation.isPending ? "Loding..." : "Send"}
        </button>



        {/* // loding progess  */}
        {"progress:" + progress}



        {/* //when muttion is error  */}
        {mutation.isError && <span>{mutation.error.message}</span>}


      </form>
    </div>
  );
}

export default WritePage;
