// import React
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

//components
import { Image } from "./";
//hooks
import { useGlobalContext } from "../hooks/useGlobalContext";

function ImageContainer({ images }) {
  const { likedImages } = useGlobalContext();
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 350: 1, 750: 3, 900: 4 }}
      gutterBreakpoints={{ 350: "12px", 750: "16px", 900: "24px" }}
    >
      <Masonry>
        {images.map((image) => {
          return (
            <Image
              image={image}
              key={image.id}
              added={likedImages.some((img) => img.id == image.id)}
            />
          );
        })}
      </Masonry>
    </ResponsiveMasonry>
  );
}

export default ImageContainer;
