import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

function ImageInfo() {
  const { id } = useParams();

  const {
    data: image,
    isPending,
    error,
  } = useFetch(
    `https://api.unsplash.com/photos/${id}?client_id=${
      import.meta.env.VITE_ACCESS_KEY
    }
    }`
  );

  console.log(image);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!image) {
    return <div>No data available</div>;
  }

  const {
    urls: { regular } = {},
    alt_description = "No Description Available",
    likes = 0,
    views = 0,
    user: { name = "Unknown", username = "unknown" } = {},
  } = image;

  return (
    <div className=" align-elements card w-full lg:w-96 bg-base-100 shadow-xl mx-auto my-5">
      <figure>
        <img
          src={regular}
          alt={alt_description}
          className="w-full h-auto object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg font-bold">{alt_description}</h2>
        <p className="text-sm text-gray-500">
          Uploaded by: <span className="font-semibold">{name}</span> (@
          {username})
        </p>
        <div className="flex justify-between items-center mt-4">
          <div className="badge badge-accent">Likes: {likes}</div>
          <div className="badge badge-secondary">Views: {views}</div>
        </div>
      </div>
    </div>
  );
}

export default ImageInfo;
