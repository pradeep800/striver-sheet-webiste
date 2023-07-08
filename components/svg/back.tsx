import React from "react";
import { useState } from "react";
export default function Back() {
  const [animation, setAnimation] = useState(false);

  return (
    <div
      className="bg-slate-300 hover:bg-slate-200 px-2 py-1 rounded-md flex items-center gap-1 font-semibold "
      onMouseEnter={() => {
        setAnimation(true);
      }}
      onMouseLeave={() => {
        setAnimation(false);
      }}
    >
      <div className="w-[21px] overflow-hidden ">
        <svg
          className={` min-w-[60px] will-change-transform  ${
            animation && " translate-x-[-41px] transition-transform "
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2724 551"
        >
          <g className="fill-black " strokeWidth="2">
            <path d="M359.08 485.468l-.01-.008-.01-.007L74.857 269.164l-.01-.007-.009-.007c-.922-.699-1.318-1.252-1.465-1.511a1.918 1.918 0 01-.05-.096c.012-.027.029-.059.05-.096.144-.255.529-.793 1.418-1.475L358.926 57.149l.078-.057.076-.059c12.628-9.66 14.263-27.117 3.297-38.396l-.184-.189-.193-.179c-10.911-10.1-28.591-10.86-40.37-2.751l-.133.091-.129.096L37.164 225.196l-.014.01-.014.011c-14.625 10.859-22.895 25.977-23.13 41.946-.237 16.004 7.618 31.369 22.27 42.611l.016.012.015.012 284.184 216.274.013.01c11.929 9.115 29.838 8.262 40.762-1.85 5.768-5.339 8.715-12.552 8.235-19.959-.478-7.363-4.281-14.108-10.421-18.805zM73.283 267.444l.003.009-.003-.009zm.003.189a.057.057 0 01-.003.009c0-.001 0-.004.003-.009z"></path>
            <path d="M2699.08 485.468l-.01-.008-.01-.007-284.2-216.289-.01-.007-.01-.007c-.92-.699-1.32-1.252-1.47-1.511-.02-.038-.03-.07-.05-.096.02-.027.03-.059.05-.096.15-.255.53-.793 1.42-1.475l284.14-208.823.07-.057.08-.059c12.63-9.66 14.26-27.117 3.3-38.396l-.19-.189-.19-.179c-10.91-10.1-28.59-10.86-40.37-2.751l-.13.091-.13.096-284.21 209.491-.01.01-.01.011c-14.63 10.859-22.9 25.977-23.13 41.946-.24 16.004 7.61 31.369 22.27 42.611l.01.012.02.012 284.18 216.274c.01.003.01.007.01.01 11.93 9.115 29.84 8.262 40.77-1.85 5.76-5.339 8.71-12.552 8.23-19.959-.48-7.363-4.28-14.108-10.42-18.805zm-285.8-218.024s0 .003.01.009c-.01-.006-.01-.009-.01-.009zm.01.189c-.01.006-.01.009-.01.009 0-.001 0-.004.01-.009z"></path>
            <path d="M2231.08 485.468l-.01-.008-.01-.007-284.2-216.289-.01-.007-.01-.007c-.92-.699-1.32-1.252-1.47-1.511-.02-.038-.03-.07-.05-.096.02-.027.03-.059.05-.096.15-.255.53-.793 1.42-1.475l284.14-208.823.07-.057.08-.059c12.63-9.66 14.26-27.117 3.3-38.396l-.19-.189-.19-.179c-10.91-10.1-28.59-10.86-40.37-2.751l-.13.091-.13.096-284.21 209.491-.01.01-.01.011c-14.63 10.859-22.9 25.977-23.13 41.946-.24 16.004 7.61 31.369 22.27 42.611l.01.012.02.012 284.18 216.274c.01.003.01.007.01.01 11.93 9.115 29.84 8.262 40.77-1.85 5.76-5.339 8.71-12.552 8.23-19.959-.48-7.363-4.28-14.108-10.42-18.805zm-285.8-218.024s0 .003.01.009c-.01-.006-.01-.009-.01-.009zm.01.189c-.01.006-.01.009-.01.009 0-.001 0-.004.01-.009z"></path>
            <path d="M1763.08 485.468l-.01-.008-.01-.007-284.2-216.289-.01-.007-.01-.007c-.92-.699-1.32-1.252-1.47-1.511-.02-.038-.03-.07-.05-.096.02-.027.03-.059.05-.096.15-.255.53-.793 1.42-1.475l284.14-208.823.07-.057.08-.059c12.63-9.66 14.26-27.117 3.3-38.396l-.19-.189-.19-.179c-10.91-10.1-28.59-10.86-40.37-2.751l-.13.091-.13.096-284.21 209.491-.01.01-.01.011c-14.63 10.859-22.9 25.977-23.13 41.946-.24 16.004 7.61 31.369 22.27 42.611l.01.012.02.012 284.18 216.274c.01.003.01.007.01.01 11.93 9.115 29.84 8.262 40.77-1.85 5.76-5.339 8.71-12.552 8.23-19.959-.48-7.363-4.28-14.108-10.42-18.805zm-285.8-218.024s0 .003.01.009c-.01-.006-.01-.009-.01-.009zm.01.189c-.01.006-.01.009-.01.009 0-.001 0-.004.01-.009z"></path>
            <path d="M1295.08 485.468l-.01-.008-.01-.007-284.2-216.289-.01-.007-.01-.007c-.92-.699-1.32-1.252-1.47-1.511-.02-.038-.03-.07-.05-.096.02-.027.03-.059.05-.096.15-.255.53-.793 1.42-1.475l284.14-208.823.07-.057.08-.059c12.63-9.66 14.26-27.117 3.3-38.396l-.19-.189-.19-.179c-10.91-10.1-28.59-10.86-40.37-2.751l-.13.091-.13.096-284.206 209.491-.014.01-.014.011c-14.625 10.859-22.895 25.977-23.131 41.946-.236 16.004 7.619 31.369 22.271 42.611l.016.012.015.012 284.183 216.274c.01.003.01.007.01.01 11.93 9.115 29.84 8.262 40.77-1.85 5.76-5.339 8.71-12.552 8.23-19.959-.48-7.363-4.28-14.108-10.42-18.805zm-285.8-218.024s0 .003.01.009c-.01-.006-.01-.009-.01-.009zm.01.189c-.01.006-.01.009-.01.009 0-.001 0-.004.01-.009z"></path>
            <path d="M827.08 485.468l-.01-.008-.01-.007-284.203-216.289-.009-.007-.01-.007c-.922-.699-1.318-1.252-1.465-1.511a1.585 1.585 0 01-.05-.096c.012-.027.029-.059.05-.096.144-.255.529-.793 1.418-1.475L826.926 57.149l.078-.057.076-.059c12.628-9.66 14.263-27.117 3.297-38.396l-.184-.189-.193-.179c-10.911-10.1-28.591-10.86-40.37-2.751l-.133.091-.129.096-284.204 209.491-.014.01-.014.011c-14.625 10.859-22.895 25.977-23.131 41.946-.236 16.004 7.619 31.369 22.271 42.611l.016.012.015.012 284.184 216.274.013.01c11.929 9.115 29.838 8.262 40.762-1.85 5.768-5.339 8.715-12.552 8.235-19.959-.478-7.363-4.281-14.108-10.421-18.805zM541.283 267.444l.003.009-.003-.009zm.003.189l-.003.009.003-.009z"></path>
          </g>
        </svg>
      </div>
      Back
    </div>
  );
}
