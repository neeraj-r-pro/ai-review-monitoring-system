import { User, Mail } from "lucide-react";
import "./InputField.css";

function InputField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
}) {
  const Icon = type === "email" ? Mail : User;

  return (
    <div className="form-group">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>

      <div className="input-wrapper">
        <Icon size={18} className="input-icon" />

        <input
          id={name}
          className="form-input"
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default InputField;