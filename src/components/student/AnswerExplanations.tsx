import React from 'react';
import { Question } from '../../types/database';
import { cleanQuestionText } from '../../utils/questionUtils';
export function AnswerExplanations({ question }: { question: Question }) {
  const correct = question.choices.find(c => c.is_correct);
  return <details className="bg-white border rounded-xl p-4 text-sm"><summary className="cursor-pointer font-bold text-blue-800">Understand every answer option</summary><div className="mt-3 space-y-3">{question.choices.map((choice,index)=><div key={choice.id} className="border-b pb-3"><p className="font-semibold">{String.fromCharCode(65+index)}. {choice.choice_text} — {choice.is_correct?'Correct':'Not the best answer'}</p><p className="text-slate-600 mt-1">{choice.explanation || (choice.is_correct ? cleanQuestionText(question.explanation) : `Compare this option with the required answer: ${correct?.choice_text || 'the keyed response'}. ${cleanQuestionText(question.explanation)}`)}</p></div>)}</div></details>;
}
