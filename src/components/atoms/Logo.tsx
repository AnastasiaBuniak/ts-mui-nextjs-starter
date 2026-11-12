import * as React from 'react';

type Props = {
  size?: number;
};

export const Logo: React.FC<Props> = ({ size = 28 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="32" height="32" rx="8" fill="#4C57C5" />
      <rect x="7.5" y="10" width="17" height="15.5" rx="3" fill="#fff" />
      <path
        d="M12 6.5v4.5M20 6.5v4.5"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M11.6 18.1l2.7 2.7 6.1-6.3"
        stroke="#4C57C5"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
