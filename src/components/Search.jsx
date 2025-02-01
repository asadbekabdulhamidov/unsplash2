//componets
import { Form } from "react-router-dom";
//react router dom
import { FormInput } from "./";

function Search() {
  return (
    <Form method="post" className="max-w-96 w-full flex gap-3 mx-auto">
      <FormInput type="search" placeholder="Search" name="search" />
      <button className="btn btn-primary md:hidden btn-sm">Search</button>
    </Form>
  );
}

export default Search;
