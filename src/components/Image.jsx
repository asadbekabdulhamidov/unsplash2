// react icons
import { FaRegHeart, FaHeart, FaDownload } from "react-icons/fa";

//react router dom
import { Link } from "react-router-dom";

//global Context
import { useGlobalContext } from "../hooks/useGlobalContext";

function Image({ image, added }) {
  const { links, urls, alt_description, user } = image;
  const { likedImages, downloadImages, dispatch } = useGlobalContext();

  const addLikeImage = (image, e) => {
    e.preventDefault();
    const allReadyAdded = likedImages.some((img) => img.id == image.id);
    if (!allReadyAdded) {
      dispatch({ type: "LIKE", payload: image });
    } else {
      dispatch({ type: "UNLIKE", payload: image.id });
    }
  };

  const addDownload = (image, e) => {
    e.preventDefault();
    window.open(links.download + "&force=true", "_blank");
    const allDownAdded = downloadImages.some((img) => img.id != image.id);
    if (!allDownAdded) dispatch({ type: "DOWNLOAD", payload: image });
  };

  return (
    <Link to={`/imageinfo/${image.id}`}>
      <div className="group relative">
        {!added && (
          <span
            onClick={(e) => addLikeImage(image, e)}
            className="heart-icon  icon-hover "
          >
            <FaRegHeart className="text-white w-5 h-5 " />
          </span>
        )}
        {added && (
          <span
            onClick={(e) => addLikeImage(image, e)}
            className="bg-white heart-icon  icon-hover "
          >
            <FaHeart className="text-red-700 w-5 h-5 " />
          </span>
        )}
        <img
          src={urls.regular}
          alt={alt_description}
          className="w-full rounded-md"
        />
        <span className="absolute right-2 bottom-2 cursor-pointer icon-hover">
          <span onClick={(e) => addDownload(image, e)}>
            <FaDownload className="text-white w-5 h-5" />
          </span>
        </span>
        <span
          className="absolute left-2 bottom-2 icon-hover flex
      items-center gap-3"
        >
          <img
            src={user.profile_image.large}
            alt={user.name + "avatar"}
            className="w-5 h-5 md:w-8 md:h-8 rounded-full"
          />
          <p className="text-white text-xs md:text-sm">{user.name}</p>
        </span>
      </div>
    </Link>
  );
}

export default Image;
