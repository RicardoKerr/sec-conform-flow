
import React from 'react';
import { QuickQuestion } from '@/types/chat';

interface QuickQuestionsProps {
  questions: QuickQuestion[];
  onSelectQuestion: (question: QuickQuestion) => void;
  isLoading: boolean;
}

const QuickQuestions: React.FC<QuickQuestionsProps> = ({
  questions,
  onSelectQuestion,
  isLoading
}) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center my-4">
      {questions.map((question) => (
        <button
          key={question.id}
          disabled={isLoading}
          onClick={() => onSelectQuestion(question)}
          className="bg-iso-medium bg-opacity-60 hover:bg-iso-light hover:bg-opacity-30 px-4 py-2 rounded-md text-sm text-iso-text border border-iso-light border-opacity-20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {question.text}
        </button>
      ))}
    </div>
  );
};

export default QuickQuestions;
