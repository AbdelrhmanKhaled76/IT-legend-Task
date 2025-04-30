"use client";
import Image from "next/image";
import lockIcon from "/public/images/locked-padlock-.png";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { useOverView } from "@/app/_providers/overViewContext";
import { Section } from "@/app/_interfaces/Section";
import { useViewExam } from "@/app/_providers/examViewContext";

const SideSection = ({}: {}) => {
  const progressBarRef = useRef(null);
  const [courseProgress, setCourseProgress] = useState<number>(0);
  const { setOverView } = useOverView();
  const { setViewExam } = useViewExam();

  function PopUpButton(): void {
    const popUp = window.open(
      "/pdfs/GitHub-Cheatsheet-1.pdf",
      "FilePopup",
      "width=800,height=800,scrollbars=yes,resizable=yes"
    );
    if (popUp) {
      popUp.focus();
    } else {
      alert("Popup got blocked !  please Allow popups for this website");
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCourseProgress(63);
        } else {
          setCourseProgress(0);
        }
      },
      { threshold: 0.5 }
    );
    if (progressBarRef.current) {
      observer.observe(progressBarRef.current);
    }
    return () => {
      if (progressBarRef.current) {
        observer.unobserve(progressBarRef.current);
      }
    };
  }, []);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "Week1-4": true,
    "Week5-8": true,
    "Week9-12": true,
  });

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const sections: Section[] = [
    {
      id: "Week1-4",
      title: "Week 1-4",
      subtitle:
        "Advanced storytelling techniques for writers: Personas, Characters & Plots",
      items: [
        { title: "Introduction", locked: true },
        { title: "Course Overview", locked: true },
        { title: "Course Overview", locked: false, questions: 0, minutes: 10 },
        { title: "Course Exercise / Reference Files", locked: true },
        { title: "Course Editor installation (Optional)", locked: true },
        { title: "Embedding PHP in HTML", locked: true },
      ],
    },
    {
      id: "Week5-8",
      title: "Week 5-8",
      subtitle: "Function fundamentals and scope management",
      items: [
        { title: "Defining Functions", locked: true },
        { title: "Function Parameters", locked: true },
        {
          title: "Return Values From Functions",
          locked: false,
          questions: 2,
          minutes: 15,
        },
        { title: "Global Variable and Scope", locked: true },
        { title: "Creating Constants", locked: true },
        { title: "Constants", locked: true },
      ],
    },
    {
      id: "Week9-12",
      title: "Week9-12",
      subtitle:
        "Advanced storytelling techniques for writers: Personas, Characters & Plots",
      items: [
        { title: "Defining Functions", locked: true },
        { title: "Functions Parameters", locked: true },
        {
          title: "Return Values From Functions",
          locked: false,
          questions: 2,
          minutes: 15,
        },
        { title: "Global Variable and Scope", locked: true },
        { title: "Newer Way of creating a Constant", locked: true },
        { title: "Constants", locked: true },
      ],
    },
  ];

  return (
    <aside className="px-5">
      <h2 className="text-[26px] font-medium">Topics for This Course</h2>

      {/* progress bar  */}

      <section
        ref={progressBarRef}
        className="relative w-full h-2 bg-gray-200 rounded mt-16"
      >
        <div
          className="absolute inset-0 bg-[#6abd8a] h-full rounded transition-all duration-500 ease-in-out"
          style={{ width: `${courseProgress}%` }}
        ></div>

        <div
          className="absolute -top-14 transform -translate-x-1/2 transition-all duration-500 ease-in-out"
          style={{ left: `${courseProgress}%` }}
        >
          <p className="text-[12px] px-2 py-2 border-3 border-[#c8c8c8] rounded-[50%] text-[#485293] flex justify-center items-center me-2">
            You
          </p>
          <FontAwesomeIcon
            icon={faSortDown}
            className="ms-[17px] text-[#c8c8c8] text-[12px] transform -translate-y-2"
          />
        </div>

        <div
          className="absolute top-4 transform -translate-x-1/2 transition-all duration-500 ease-in-out"
          style={{ left: `${courseProgress}%` }}
        >
          <span className="text-[#485293] text-[12px] md:text-[14px]">
            {courseProgress}%
          </span>
        </div>
      </section>

      {/* courses menu  */}

      {sections.map((section) => (
        <section
          key={section.id}
          className={`mt-20 border border-gray-300 px-4 overflow-hidden py-10 } font-[var(--font-inter)]`}
        >
          <div className="flex justify-between items-center">
            <h4 className="text-[24px] pb-2">{section.title}</h4>
            <button
              title="toggle section"
              type="button"
              aria-controls={`section-${section.id}`}
              aria-expanded={!!openSections?.[section.id]}
              aria-label={`${
                openSections?.[section.id] ? "Collapse" : "Expand"
              } ${section.title}`}
              onClick={() => toggleSection(section.id)}
              className="cursor-pointer"
            >
              {openSections[section.id] ? (
                <FontAwesomeIcon
                  icon={faMinus}
                  className={`transform transition-transform text-xl duration-500 ${
                    openSections[section.id] ? "rotate-360" : "rotate-0"
                  }`}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faPlus}
                  className={`transform transition-transform text-xl duration-500 ${
                    openSections[section.id] ? "rotate-360" : "rotate-0"
                  }`}
                />
              )}
            </button>
          </div>

          <p className={`text-[20px] text-gray-400 font-[var(--font-spartan)]`}>
            {section.subtitle}
          </p>

          {openSections[section.id] && (
            <div
              className={`mt-4 overflow-hidden transition-all duration-500 ${
                openSections[section.id] ? "max-h-[1000px]" : "max-h-0"
              }`}
            >
              {section.items.map((item, index) => (
                <div key={index}>
                  <hr className="my-3 border-gray-300" />
                  <div className="flex justify-between items-center py-2 gap-2">
                    <article className="flex items-center">
                      <FontAwesomeIcon
                        icon={faFileLines}
                        className="text-black mr-2"
                      />
                      <span className="font-light text-[16px]">
                        {item.title}
                      </span>
                    </article>

                    {item.locked ? (
                      <Image src={lockIcon} alt="locked" className="w-5" />
                    ) : (
                      <div
                        className={`flex gap-2 ${
                          section.id === "Week1-4" ||
                          section.id === "Week5-8" ||
                          section.id === "Week9-12"
                            ? "cursor-pointer"
                            : ""
                        }`}
                        onClick={() => {
                          if (section.id === "Week1-4") setOverView(true);
                          else if (section.id === "Week5-8") PopUpButton();
                          else if (section.id === "Week9-12") setViewExam(true);
                        }}
                      >
                        {item.questions !== undefined && (
                          <p className="bg-[#f2faf8] text-[#6abd8a] px-2 py-1 uppercase">
                            {item.questions} questions
                          </p>
                        )}
                        {item.minutes !== undefined && (
                          <p className="bg-[#fdf2f4] text-[#e54860] px-2 py-1 uppercase">
                            {item.minutes} minutes
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}
    </aside>
  );
};

export default React.memo(SideSection);
