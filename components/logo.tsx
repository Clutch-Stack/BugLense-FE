import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        {/* Beetle body */}
        <path
          d="M12 5C9.23858 5 7 7.23858 7 10V14C7 16.7614 9.23858 19 12 19C14.7614 19 17 16.7614 17 14V10C17 7.23858 14.7614 5 12 5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Beetle head */}
        <path
          d="M12 5V3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Antennae */}
        <path
          d="M10 3L8 1"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 3L16 1"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Legs */}
        <path
          d="M7 10H4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 14H4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 10H20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 14H20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Beetle pattern (spots) */}
        <circle
          cx="10"
          cy="10"
          r="1"
          fill="currentColor"
        />
        <circle
          cx="14"
          cy="10"
          r="1"
          fill="currentColor"
        />
        <circle
          cx="12"
          cy="14"
          r="1"
          fill="currentColor"
        />
      </svg>
      <span className="font-bold">BugLense</span>
    </Link>
  );
} 