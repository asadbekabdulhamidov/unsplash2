//components
import { Search, ImageContainer } from "../components";
//react router dom
import { useActionData } from "react-router-dom";
//action

export const action = async ({ request }) => {
  let formData = await request.formData();
  let search = formData.get("search");
  return search;
};

//custom hooks
import { useFetch } from "../hooks/useFetch";
import { useEffect, useState, useRef } from "react";

function Home() {
  const searchParamsFromAction = useActionData();
  const [allImages, setAllImages] = useState([]);
  const [pageParam, SetPageParam] = useState(1);

  const prevSearchParam = useRef(searchParamsFromAction);
  const { data, isPending, error } = useFetch(
    `https://api.unsplash.com/search/photos?client_id=${
      import.meta.env.VITE_ACCESS_KEY
    }&query=${searchParamsFromAction ?? "all"}&page=${pageParam}`
  );

  useEffect(() => {
    if (data && data.results) {
      setAllImages((prevImages) => {
        return pageParam === 1
          ? data.results
          : [...prevImages, ...data.results];
      });
    }
  }, [data]);

  useEffect(() => {
    if (searchParamsFromAction != prevSearchParam.current) {
      setAllImages([]);
      SetPageParam(1);
      prevSearchParam.current = searchParamsFromAction;
    }
  }, [searchParamsFromAction]);

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <div className="align-elements ">
      <div className="my-10 ">
        <Search />
      </div>
      {isPending && <h1>Loading...</h1>}
      {allImages.length > 0 && <ImageContainer images={allImages} />}
      <div className="my-10">
        <button
          onClick={() =>
            SetPageParam((param) => {
              return (param += 1);
            })
          }
          className="btn btn-secondary btn-block "
        >
          Read More
        </button>
      </div>
    </div>
  );
}

export default Home;
