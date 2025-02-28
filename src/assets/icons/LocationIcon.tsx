import React from 'react';

type TLocationIconProps = {
  color?: string;
};

const LocationIcon: React.FC<TLocationIconProps> = ({ color = '#5D5FEF' }) => {
  return (
    <svg
      width="13"
      height="16"
      viewBox="0 0 13 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.98828 14.8818C1.71094 8.72949 0.949219 8.08496 0.949219 5.7998C0.949219 2.69434 3.43945 0.174805 6.57422 0.174805C9.67969 0.174805 12.1992 2.69434 12.1992 5.7998C12.1992 8.08496 11.4082 8.72949 7.13086 14.8818C6.86719 15.292 6.25195 15.292 5.98828 14.8818ZM6.57422 8.14355C7.86328 8.14355 8.91797 7.11816 8.91797 5.7998C8.91797 4.51074 7.86328 3.45605 6.57422 3.45605C5.25586 3.45605 4.23047 4.51074 4.23047 5.7998C4.23047 7.11816 5.25586 8.14355 6.57422 8.14355Z"
        fill={color}
      />
    </svg>
  );
};

export default LocationIcon;
