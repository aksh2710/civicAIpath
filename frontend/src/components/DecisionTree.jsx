import React, { useState } from 'react';
import { ArrowRight, MapPin, CalendarDays } from 'lucide-react';

const DecisionTree = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');

  const handleNext = () => {
    if (step === 1 && age) {
      setStep(2);
    } else if (step === 2 && location) {
      onComplete({ age, location });
    }
  };

  return (
    <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
      {step === 1 && (
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-center text-slate-100 mb-8 flex items-center justify-center gap-2">
            <CalendarDays className="w-8 h-8 text-blue-400"/>
            How old are you?
          </h2>
          <input
            type="number"
            className="w-full bg-slate-900 border border-slate-600 rounded-xl px-6 py-4 text-2xl text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="e.g., 18"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleNext()}
            autoFocus
          />
          <button
            onClick={handleNext}
            disabled={!age}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 text-white font-semibold rounded-xl px-6 py-4 text-xl transition-all flex items-center justify-center gap-2"
          >
            Next <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-center text-slate-100 mb-8 flex items-center justify-center gap-2">
            <MapPin className="w-8 h-8 text-emerald-400"/>
            Where do you live?
          </h2>
          <input
            type="text"
            className="w-full bg-slate-900 border border-slate-600 rounded-xl px-6 py-4 text-2xl text-center focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
            placeholder="e.g., California or NYC"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleNext()}
            autoFocus
          />
          <button
            onClick={handleNext}
            disabled={!location}
            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-50 text-white font-semibold rounded-xl px-6 py-4 text-xl transition-all flex items-center justify-center gap-2"
          >
            Get My Roadmap <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default DecisionTree;
