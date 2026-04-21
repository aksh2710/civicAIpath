import React, { useState } from 'react';
import DecisionTree from './components/DecisionTree';
import Roadmap from './components/Roadmap';
import { Award } from 'lucide-react';

function App() {
  const [profile, setProfile] = useState(null);

  const handleProfileComplete = (data) => {
    setProfile(data);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-4 flex items-center justify-center gap-3">
            <Award className="w-12 h-12 text-blue-400" />
            CivicPath AI
          </h1>
          <p className="text-xl text-slate-300">Your personalized step-by-step roadmap to participating in democracy.</p>
        </header>

        <main className="bg-slate-800/50 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-slate-700">
          {!profile ? (
            <DecisionTree onComplete={handleProfileComplete} />
          ) : (
            <Roadmap profile={profile} onReset={() => setProfile(null)} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
