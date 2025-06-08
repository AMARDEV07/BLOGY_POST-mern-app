import { IKContext, IKUpload } from "imagekitio-react";
import toast from "react-hot-toast";
import { useRef } from "react";

// for authangate uplode images request
const authenticator = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/posts/upload-auth`
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token, publicKey } = data;

    return { signature, expire, token, publicKey };
  } catch (error) {
    console.error("Authentication error:", error);
    throw new Error("Authentication request failed");
  }
};




function Uplode({children, type, setProgress, setData}) {
  const ref = useRef(null);
  // on error function of uplode images
  const onError = (err) => {
    console.log("images uploding failed", err);
    toast.error("Image uploading failed");
  };




  //sucess function of uplode images
  const onSuccess = (res) => {
    console.log(" images uploade sucess msg", res);
    toast.success(" File uploading done");
    //when imange uplode set them set data
    setData(res);
  };

  //onprogres
  const onUploadProgress = (progress) => {
    console.log("Image upload in progress", progress);
    setProgress(Math.round(progress.loaded / progress.total) * 100);
  };




  return (
    <IKContext
      className="border-4 bg-black"
      publicKey={import.meta.env.VITE_IK_PUBLIC_KEY}
      urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
      authenticator={authenticator}
    >
      <IKUpload
        // pic file name uniqe
        useUniqueFileName
        // pic uplode fail show error
        onError={onError}
        onSuccess={onSuccess}
        onUploadProgress={onUploadProgress}
        className="hidden"
        ref={ref}
        accept={`${type}/*`}
      />

      {/* this using making cutsom choosing elemnt  */}
      <div className="cursor-pointer" onClick={() => ref.current.click()}>
        {children}
      </div>

    </IKContext>
  );
}

export default Uplode;
