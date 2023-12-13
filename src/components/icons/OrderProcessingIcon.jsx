export default function OrderProcessingIcon({ color = '#A1A1AA', className }) {
  return (
    <svg
      width="43"
      height="42"
      viewBox="0 0 43 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7.25 13.125V28.875L21.25 36.75V21M7.25 13.125L21.25 5.25L35.25 13.125M7.25 13.125L21.25 21M35.25 13.125V21M35.25 13.125L21.25 21M38.75 31.5H26.5M26.5 31.5L31.75 26.25M26.5 31.5L31.75 36.75"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
