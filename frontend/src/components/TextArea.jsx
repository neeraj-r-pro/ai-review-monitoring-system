import { MessageSquare } from "lucide-react";
import "./TextArea.css";

function TextArea({
  label,
  name,
  placeholder,
  value,
  onChange,
  rows = 5,
}) {
  return (
    <div className="form-group">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>

      <div className="textarea-wrapper">
        <MessageSquare size={18} className="textarea-icon" />

        <textarea
          id={name}
          className="form-textarea"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
        />
      </div>
    </div>
  );
}

export default TextArea;