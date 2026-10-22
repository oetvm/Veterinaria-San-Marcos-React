export default function Input({ label, type = "text", id, placeholder, value, onChange, error }) {
  return (
    <div className="campo">
      <label htmlFor={id}>{label}:</label>
      <input type={type} id={id} placeholder={placeholder} value={value} onChange={onChange} />
      {error && <span className="error">{error}</span>}
    </div>
  );
}