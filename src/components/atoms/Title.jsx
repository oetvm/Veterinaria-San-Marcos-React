export default function Title({ children, level = 2, className = '' }) {
  const Tag = `h${level}`;
  return <Tag className={`titulo-custom ${className}`}>{children}</Tag>;
}