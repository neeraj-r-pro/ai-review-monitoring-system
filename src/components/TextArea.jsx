function TextArea({
  label,
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
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
      />
    </div>
  );
}

export default TextArea;