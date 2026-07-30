function TextArea({
  label,
  name,
  placeholder,
  value,
  onChange,
  rows = 5,
}) {
  return (
    <div>
      <label>{label}</label>
      <br />
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
      />
    </div>
  );
}

export default TextArea;