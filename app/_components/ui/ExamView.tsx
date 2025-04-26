"use client";
import { faChevronLeft, faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { Exam } from "../../_interfaces/Exam";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useViewExam } from "@/app/_providers/examViewContext";

function ExamView() {
  const { setViewExam, viewExam } = useViewExam();
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [examData, setExamData] = useState<Exam[]>([
    {
      questionTitle:
        "among the following status of India which one has the oldest rock formations in the country",
      answer_1: {
        answerTitle: "Asam",
        isCorrect: false,
      },
      answer_2: {
        answerTitle: "Bahar",
        isCorrect: false,
      },
      answer_3: {
        answerTitle: "Kamaltake",
        isCorrect: true,
      },
      answer_4: {
        answerTitle: "utter Paradesh",
        isCorrect: false,
      },
    },
    {
      questionTitle: "What are proper nouns?",
      answer_1: {
        answerTitle: "An action",
        isCorrect: true,
      },
      answer_2: {
        answerTitle: "A quality or an idea",
        isCorrect: false,
      },
      answer_3: {
        answerTitle: "General items",
        isCorrect: false,
      },
      answer_4: {
        answerTitle: "Specific items",
        isCorrect: false,
      },
    },
    {
      questionTitle: "How many nouns are there in the below sentence.",
      answer_1: {
        answerTitle: "four",
        isCorrect: true,
      },
      answer_2: {
        answerTitle: "three",
        isCorrect: false,
      },
      answer_3: {
        answerTitle: "two",
        isCorrect: false,
      },
      answer_4: {
        answerTitle: "one",
        isCorrect: false,
      },
    },
    {
      questionTitle:
        "Choose the word that is not both a singular and plural noun.",
      answer_1: {
        answerTitle: "Messieurs",
        isCorrect: true,
      },
      answer_2: {
        answerTitle: "Hovercraft",
        isCorrect: false,
      },
      answer_3: {
        answerTitle: "Chinos",
        isCorrect: false,
      },
      answer_4: {
        answerTitle: "Crossroads",
        isCorrect: false,
      },
    },
    {
      questionTitle:
        "The noun that depicts ownership of possession is said to be in _______ case.",
      answer_1: {
        answerTitle: "Accusative",
        isCorrect: true,
      },
      answer_2: {
        answerTitle: "Genitive",
        isCorrect: false,
      },
      answer_3: {
        answerTitle: "Objective",
        isCorrect: false,
      },
      answer_4: {
        answerTitle: "Nominative",
        isCorrect: false,
      },
    },
  ]);
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) return; // Stop when timer reaches 0

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId); // Clear on unmount
  }, [timeLeft]);

  // Convert seconds to mm:ss
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };
  useEffect(() => {
    if (viewExam) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [viewExam]);
  useEffect(() => {}, [currentIdx, examData]);

  function handleChangeQuestion(idx: number): void {
    setCurrentIdx(idx);
  }
  function handlePrevious(): void {
    if (currentIdx > 0) {
      setCurrentIdx(Math.max(0, currentIdx - 1));
    }
  }
  function handleNext(): void {
    if (currentIdx < examData.length - 1) {
      setCurrentIdx(Math.min(examData.length, currentIdx + 1));
    }
  }
  function handleOnChange(ansNum: number): void {
    setExamData((prevData) =>
      prevData.map((question, idx) => {
        if (idx === currentIdx) {
          return {
            ...question,
            selectedAnswer: ansNum,
          };
        }
        return question;
      })
    );
  }
  return viewExam ? (
    <div className="fixed inset-0 w-screen h-screen overflow-x-hidden bg-[rgba(0,0,0,0.8)] z-50 flex justify-center items-center">
      <div className="w-[500px] bg-[#3e54b5] flex justify-between items-center flex-col gap-10 p-5 relative">
        <div className="absolute top-6 left-4 text-white cursor-pointer">
          <button
            title="back from exam button"
            type="button"
            onClick={() => setViewExam(false)}
            className="cursor-pointer"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        </div>
        <div className="mx-auto rounded bg-[#fbd500] text-white flex justify-center items-center gap-3 w-[100px] h-[30px] shadow-sm  shadow-[#fbd500] text-xl">
          <FontAwesomeIcon icon={faStopwatch} />
          <p className="">{formatTime(timeLeft)}</p>
        </div>
        <div className="flex justify-between items-center gap-3">
          {Array.from({ length: examData.length }).map((_, idx) => (
            <button
              onClick={() => handleChangeQuestion(idx)}
              type="button"
              key={idx}
              className={`${
                currentIdx === idx
                  ? "bg-white text-[#3e54b5] "
                  : "bg-[#3e54b5] text-white "
              } flex justify-center items-center border border-white rounded-full w-[50px] h-[50px] hover:bg-white hover:text-[#3e54b5] transition-colors duration-500 cursor-pointer `}
            >
              {idx + 1}
            </button>
          )) ?? ""}
        </div>
        <div className="rounded-xl bg-white w-full">
          {examData[currentIdx] ? (
            <div className="flex justify-between items-start flex-col p-5 gap-14">
              <h3 className="text-[20px] font-semibold">
                {currentIdx + 1}. {examData[currentIdx].questionTitle}
              </h3>
              <div className="flex justify-between items-center flex-col gap-10 w-full">
                {[1, 2, 3, 4].map((num) => (
                  <label
                    key={`answer-${num}-${currentIdx}`}
                    className="flex items-center gap-10 w-full p-4 rounded shadow-md has-[:checked]:bg-[#3e54b5] has-[:checked]:text-white transition-colors duration-500"
                    htmlFor={`answer_${num}-${currentIdx}`}
                  >
                    <input
                      id={`answer_${num}-${currentIdx}`}
                      name={`question-${currentIdx}`}
                      onChange={() => handleOnChange(num)}
                      type="radio"
                      checked={examData[currentIdx].selectedAnswer === num}
                      className="appearance-none w-[20px] h-[20px] border-2 border-[#3e54b5] rounded-sm cursor-pointer relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:w-[10px] before:h-[10px] before:bg-white before:rounded-sm before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:scale-0 checked:before:scale-100 before:transition-transform checked:border-white"
                    />
                    <span className="h-full">
                      {
                        (
                          examData[currentIdx][
                            `answer_${num}` as keyof Exam
                          ] as any
                        ).answerTitle
                      }
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="flex justify-between items-center gap-10 w-full ">
          <button
            type="button"
            className="bg-white p-3 rounded cursor-pointer shadow transition-colors duration-500 hover:bg-black hover:text-white"
            disabled={currentIdx < 0}
            onClick={() => handlePrevious()}
          >
            previous
          </button>
          <button
            type="button"
            className="bg-white p-3 rounded cursor-pointer shadow transition-colors duration-500 hover:bg-black hover:text-white"
            disabled={currentIdx >= examData.length}
            onClick={() => handleNext()}
          >
            next
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default ExamView;
