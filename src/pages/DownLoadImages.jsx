//custom hooks
import { useGlobalContext } from "../hooks/useGlobalContext";

//components
import { ImageContainer } from "../components";

//react router dom
import { Link } from "react-router-dom";

function DownLoadImages() {
  const { downloadImages } = useGlobalContext();
  console.log(downloadImages);

  if (downloadImages.length == 0) {
    return (
      <div className="h-full flex flex-col justify-center items-center  gap-10">
        <h1 className="text-center text-4xl">
          You don't choose andy images yet !
        </h1>
        <Link
          className="btn btn-primary btn-sm md:btn-md
        "
          to="/"
        >
          Go Home
        </Link>
      </div>
    );
  }
  return (
    <div className="align-elements">
      {downloadImages.length > 0 && <ImageContainer images={downloadImages} />}
    </div>
  );
}

export default DownLoadImages;
