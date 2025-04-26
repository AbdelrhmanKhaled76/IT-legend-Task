"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface viewExamContext {
  viewExam: boolean;
  setViewExam: (viewExam: boolean) => void;
}

const ExamViewContext = createContext<viewExamContext | null>(null);

function ExamViewProvider({ children }: { children: ReactNode }) {
  const [viewExam, setViewExam] = useState<boolean>(false);

  return (
    <ExamViewContext.Provider value={{ viewExam, setViewExam }}>
      {children}
    </ExamViewContext.Provider>
  );
}

export const useViewExam = () => {
  const context = useContext(ExamViewContext);
  if (!context) {
    throw new Error("useOverView must be used within OverViewProvider");
  }
  return context;
};

export default ExamViewProvider;
