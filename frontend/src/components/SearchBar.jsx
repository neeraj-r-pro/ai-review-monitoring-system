import { Search } from "lucide-react";
import "./SearchBar.css";

function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <Search size={18} className="search-bar__icon" />

      <input
        type="text"
        placeholder="Search by customer name or email..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default SearchBar;