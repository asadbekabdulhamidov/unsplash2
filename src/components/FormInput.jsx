// react icons
import { FaSearch } from "react-icons/fa";

function Forminput({ type, placeholder, name }) {
  return (
    <label className="input w-full input-bordered flex items-center gap-2 input-sm md:btn-md">
      <input
        required
        type={type}
        className="grow "
        placeholder={placeholder}
        name={name}
      />

      <FaSearch className="h-4 w-4 opacity-70" />
    </label>
  );
}

export default Forminput;
