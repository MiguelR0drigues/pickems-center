import React from "react";

interface GoogleIconProps {
  size?: number;
}

const GoogleIcon: React.FC<GoogleIconProps> = ({ size = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={size}
      height={size}
      viewBox="0 0 48 48"
    >
      <linearGradient
        id="AqtO5BvxUNucZJMaVoULta_ijji5YlQFGxd_gr1"
        x1="-5.978"
        x2="41.081"
        y1="16.837"
        y2="44.007"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#262626" stop-opacity="0"></stop>
        <stop offset="1" stop-color="#262626" stop-opacity=".8"></stop>
      </linearGradient>
      <path
        fill="url(#AqtO5BvxUNucZJMaVoULta_ijji5YlQFGxd_gr1)"
        d="M12,24c0,1.43,0.25,2.79,0.71,4.06L6.2,33.08v0.03C4.79,30.38,4,27.28,4,24	c0-3.36,0.83-6.53,2.31-9.31l6.56,4.81C12.31,20.89,12,22.41,12,24z"
      ></path>
      <linearGradient
        id="AqtO5BvxUNucZJMaVoULtb_ijji5YlQFGxd_gr2"
        x1="16.345"
        x2="42.165"
        y1="-25.616"
        y2="45.324"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#262626" stop-opacity="0"></stop>
        <stop offset="1" stop-color="#262626" stop-opacity=".8"></stop>
      </linearGradient>
      <path
        fill="url(#AqtO5BvxUNucZJMaVoULtb_ijji5YlQFGxd_gr2)"
        d="M44,24c0,5.88-2.55,11.18-6.59,14.83c0-0.01,0-0.01,0-0.02l-6.19-5.24	c1.86-1.4,3.29-3.33,4.08-5.57H28c-2.209,0-4-1.791-4-4v-4h19.61C43.86,21.27,44,22.66,44,24z"
      ></path>
      <linearGradient
        id="AqtO5BvxUNucZJMaVoULtc_ijji5YlQFGxd_gr3"
        x1="-15.114"
        x2="44.303"
        y1="11.75"
        y2="11.75"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#262626" stop-opacity="0"></stop>
        <stop offset="1" stop-color="#262626" stop-opacity=".8"></stop>
      </linearGradient>
      <path
        fill="url(#AqtO5BvxUNucZJMaVoULtc_ijji5YlQFGxd_gr3)"
        d="M37.62,9.38l-2.916,2.916c-1.473,1.473-3.699,1.753-5.58,0.857C27.571,12.414,25.836,12,24,12	c-5.04,0-9.35,3.1-11.13,7.5l-6.56-4.81v-0.01C9.65,8.32,16.32,4,24,4C29.27,4,34.05,6.05,37.62,9.38z"
      ></path>
      <linearGradient
        id="AqtO5BvxUNucZJMaVoULtd_ijji5YlQFGxd_gr4"
        x1="38.5"
        x2="6.232"
        y1="16.058"
        y2="54.515"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#262626" stop-opacity="0"></stop>
        <stop offset="1" stop-color="#262626" stop-opacity=".8"></stop>
      </linearGradient>
      <path
        fill="url(#AqtO5BvxUNucZJMaVoULtd_ijji5YlQFGxd_gr4)"
        d="M37.41,38.81c0,0.01,0,0.01,0,0.02C33.86,42.05,29.16,44,24,44c-7.77,0-14.49-4.43-17.8-10.89	v-0.03l6.51-5.02C14.37,32.69,18.79,36,24,36c2.71,0,5.21-0.9,7.22-2.43L37.41,38.81z"
      ></path>
    </svg>
  );
};

export default GoogleIcon;
