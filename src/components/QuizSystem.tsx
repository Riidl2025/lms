
import React, { useState } from 'react';
import type { MCQ } from './Types';

interface QuizSystemProps {
  questions: MCQ[];
  onPass: () => void;
  onFail: () => void;
}

export const QuizSystem: React.FC<QuizSystemProps> = ({ questions, onPass, onFail }) => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<{ score: number, failedIndices: number[] } | null>(null);

  const handleSelect = (idx: number) => {
    const newAnswers = [...answers];
    newAnswers[current] = idx;
    setAnswers(newAnswers);
  };

  const calculateResults = () => {
    let correctCount = 0;
    const failedIndices: number[] = [];
    questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) correctCount++;
      else failedIndices.push(i);
    });
    const percentage = (correctCount / questions.length) * 100;
    setResult({ score: percentage, failedIndices });
  };

  if (result) {
    const isPassed = result.score >= 90;
    return (
      <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-10 shadow-2xl space-y-8 animate-in zoom-in duration-300">
        <div className="text-center">
          <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-6 border-4 ${isPassed ? 'border-emerald-500 text-emerald-500 bg-emerald-500/5' : 'border-red-500 text-red-500 bg-red-500/5'}`}>
            <i className={`fas ${isPassed ? 'fa-award' : 'fa-triangle-exclamation'} text-4xl`}></i>
          </div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
            {isPassed ? 'Module Certification Achieved' : 'Assessment Threshold Failed'}
          </h2>
          <p className="text-zinc-500 mt-2 font-medium">Final Score: <span className={isPassed ? 'text-emerald-400' : 'text-red-400'}>{result.score}%</span> (Required: 90%)</p>
        </div>

        {!isPassed && (
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-4 no-scrollbar border-t border-zinc-800 pt-8">
            <h4 className="text-xs font-black text-zinc-600 uppercase tracking-widest mb-4">Corrective Review Required</h4>
            {result.failedIndices.map(idx => (
              <div key={idx} className="p-5 bg-red-500/5 border border-red-500/10 rounded-2xl space-y-3">
                <p className="text-sm font-bold text-white">{questions[idx].question}</p>
                <div className="flex flex-col gap-1 text-xs">
                  <span className="text-red-400">Your selection: {questions[idx].options[answers[idx]] || 'None'}</span>
                  <span className="text-emerald-400 font-bold">Correct solution: {questions[idx].options[questions[idx].correctAnswer]}</span>
                </div>
                <p className="text-[11px] text-zinc-500 italic leading-relaxed pt-2 border-t border-zinc-800/50">
                  {questions[idx].explanation}
                </p>
              </div>
            ))}
          </div>
        )}

        <button 
          onClick={isPassed ? onPass : () => { setResult(null); setCurrent(0); setAnswers([]); onFail(); }}
          className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl active:scale-[0.98] ${isPassed ? 'bg-emerald-500 text-black hover:bg-emerald-400' : 'bg-white text-black hover:bg-zinc-200'}`}
        >
          {isPassed ? 'Unlock Next Session' : 'Restart Module Training'}
        </button>
      </div>
    );
  }

  const q = questions[current];
  return (
    <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-10 shadow-2xl">
      <div className="flex justify-between items-center mb-10">
        <span className="text-[10px] font-black tracking-[0.3em] text-zinc-600 uppercase">Knowledge Verification</span>
        <span className="px-3 py-1 bg-zinc-800 rounded-lg text-[10px] text-zinc-400 font-mono border border-zinc-700">Q{current + 1}/{questions.length}</span>
      </div>

      <h3 className="text-2xl font-bold text-white mb-10 leading-snug">{q.question}</h3>

      <div className="grid gap-3">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            className={`w-full p-5 rounded-2xl text-left border transition-all flex items-center gap-4 ${
              answers[current] === i 
              ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' 
              : 'bg-black/20 border-zinc-800 text-zinc-500 hover:bg-zinc-800 hover:border-zinc-700'
            }`}
          >
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black ${answers[current] === i ? 'bg-emerald-500 text-black' : 'bg-zinc-800'}`}>
              {String.fromCharCode(65 + i)}
            </span>
            <span className="text-sm font-medium">{opt}</span>
          </button>
        ))}
      </div>

      <div className="mt-12 flex gap-4">
        {current > 0 && (
          <button onClick={() => setCurrent(current - 1)} className="flex-1 py-4 border border-zinc-800 text-zinc-500 rounded-xl hover:bg-zinc-800 text-xs font-bold transition-all">Previous</button>
        )}
        <button 
          onClick={current < questions.length - 1 ? () => setCurrent(current + 1) : calculateResults}
          disabled={answers[current] === undefined}
          className="flex-[2] py-5 bg-white text-black font-black rounded-2xl hover:bg-zinc-200 disabled:opacity-20 disabled:grayscale transition-all text-xs uppercase tracking-widest"
        >
          {current < questions.length - 1 ? 'Verify Step' : 'Finalize Certification'}
        </button>
      </div>
    </div>
  );
};
