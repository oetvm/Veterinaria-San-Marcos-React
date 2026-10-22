export default function Button({ children, type = "button", className = "btn", onClick }) {
  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
}