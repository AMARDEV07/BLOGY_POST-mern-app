
import { IKImage } from "imagekitio-react";

function Images({ src, className, w, h, alt }) {
  // Agar src external URL hai (http ya https se shuru hota hai)
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return (
      <img
        src={src}
        className={className}
        alt={alt}
        width={w}
        height={h}  
        loading="lazy"
      />
    );
  }

  // Agar src ImageKit ka relative path hai
  return (
    <IKImage
      urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
      path={src}
      className={className}
      loading="lazy"
      lqip={{ active: true, quality: 20 }}
      alt={alt}
      width={w}
      height={h}
      transformation={[
        {
          width: w,
          height: h,
        },
      ]}
    />
  );
}

export default Images;
