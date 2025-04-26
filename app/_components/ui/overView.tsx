import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faHandFist } from "@fortawesome/free-solid-svg-icons/faHandFist";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import itLegendImage from "/public/images/IT LEGEND logo-02.png";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useOverView } from "../../_providers/overViewContext";

const OverView = () => {
  const { overView, setOverView } = useOverView();
  const overViewClosing = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = overView ? "hidden" : "auto";
  }, [overView]);

  if (!overView) return null;

  return (
    <div
      className={`
        fixed inset-0 flex justify-center items-center z-50 flex-col gap-20 
        bg-[rgba(0,0,0,0.7)] transition-all duration-500 ease-in-out
        ${
          overView
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-[100%]"
        }
      `}
    >
      <Image src={itLegendImage} alt="it legend logo" className="text-center" />
      <div className="rounded-lg overflow-hidden">
        <div
          className={`bg-white p-8 shadow-lg max-w-lg relative w-[400px] sm:w-full h-[600px] overflow-x-hidden overflow-y-scroll
          transition-all duration-500 ease-in-out`}
        >
          <button
            title="this button closes the course overview window"
            type="button"
            onClick={() => setOverView(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <div className="flex justify-between items-center flex-col gap-5">
            <p className="text-center text-[#182578]">
              Course Name is shown Here
            </p>
            <h2 className="text-2xl font-bold text-center text-[#182578]">
              Leaderboard
            </h2>
            <div className="flex justify-between items-center flex-col sm:flex-row gap-5 p-4 bg-[#f5f9fa] text-[#182578]">
              <article className="sm:text-right text-center">
                عظيم يا صديقي.. أداءك في الكورس ده أفضل من 60% من باقي الطلبة..
                كمّل عايز أشوف اسمك في الليدر بورد هنا
              </article>
              <figure className="flex justify-center">
                <svg
                  viewBox="0 0 80 80"
                  width="80"
                  height="80"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <text
                    x="50"
                    y="50"
                    fontSize="50"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    💪
                  </text>
                </svg>
              </figure>
            </div>
            <div className="bg-[#f5f9fa] p-4 rounded-xl flex justify-between items-center flex-col w-full gap-10">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="border border-gray-300 rounded w-full h-[100px] bg-[#ffffff]"
                ></div>
              )) ?? ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverView;
