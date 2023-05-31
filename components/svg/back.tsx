import React from "react";

export default function Back({ animation }: { animation: boolean }) {
  return (
    <div className="w-[21px] overflow-hidden  ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`min-w-[60px] will-change-transform  ${
          animation && " translate-x-[-42px] transition-transform "
        }`}
        fill="none"
        viewBox="0 0 2684 511"
      >
        <g fill="#000" filter="url(#filter0_d_323_23)">
          <path d="M306.567 498.129c8.078 6.18 20.562 5.562 27.906-1.236 7.344-6.797 6.609-17.303-1.469-23.483L48.801 257.121c-7.344-5.561-7.344-13.595 0-19.157L333.004 29.091c8.078-6.18 8.813-16.685 2.203-23.483-7.344-6.798-19.828-7.416-27.906-1.854L23.098 213.246c-24.969 18.539-25.703 49.437-.735 68.594l284.204 216.289zM2646.57 498.129c8.07 6.18 20.56 5.562 27.9-1.236 7.35-6.797 6.61-17.303-1.47-23.483l-284.2-216.289c-7.34-5.561-7.34-13.595 0-19.157L2673 29.091c8.08-6.18 8.82-16.685 2.21-23.483-7.35-6.798-19.83-7.416-27.91-1.854l-284.2 209.492c-24.97 18.539-25.71 49.437-.74 68.594l284.21 216.289zM2178.57 498.129c8.07 6.18 20.56 5.562 27.9-1.236 7.35-6.797 6.61-17.303-1.47-23.483l-284.2-216.289c-7.34-5.561-7.34-13.595 0-19.157L2205 29.091c8.08-6.18 8.82-16.685 2.21-23.483-7.35-6.798-19.83-7.416-27.91-1.854l-284.2 209.492c-24.97 18.539-25.71 49.437-.74 68.594l284.21 216.289zM1710.57 498.129c8.07 6.18 20.56 5.562 27.9-1.236 7.35-6.797 6.61-17.303-1.47-23.483l-284.2-216.289c-7.34-5.561-7.34-13.595 0-19.157L1737 29.091c8.08-6.18 8.82-16.685 2.21-23.483-7.35-6.798-19.83-7.416-27.91-1.854l-284.2 209.492c-24.97 18.539-25.71 49.437-.74 68.594l284.21 216.289zM1242.57 498.129c8.07 6.18 20.56 5.562 27.9-1.236 7.35-6.797 6.61-17.303-1.47-23.483L984.801 257.121c-7.344-5.561-7.344-13.595 0-19.157L1269 29.091c8.08-6.18 8.82-16.685 2.21-23.483-7.35-6.798-19.83-7.416-27.91-1.854L959.098 213.246c-24.969 18.539-25.703 49.437-.735 68.594l284.207 216.289zM774.567 498.129c8.078 6.18 20.562 5.562 27.906-1.236 7.344-6.797 6.609-17.303-1.469-23.483L516.801 257.121c-7.344-5.561-7.344-13.595 0-19.157L801.004 29.091c8.078-6.18 8.813-16.685 2.203-23.483-7.344-6.798-19.828-7.416-27.906-1.854L491.098 213.246c-24.969 18.539-25.703 49.437-.735 68.594l284.204 216.289z"></path>
        </g>
        <defs>
          <filter
            id="filter0_d_323_23"
            width="2683.67"
            height="510.402"
            x="0"
            y="0"
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dy="4"></feOffset>
            <feGaussianBlur stdDeviation="2"></feGaussianBlur>
            <feComposite in2="hardAlpha" operator="out"></feComposite>
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
            <feBlend
              in2="BackgroundImageFix"
              result="effect1_dropShadow_323_23"
            ></feBlend>
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow_323_23"
              result="shape"
            ></feBlend>
          </filter>
        </defs>
      </svg>
    </div>
  );
}
