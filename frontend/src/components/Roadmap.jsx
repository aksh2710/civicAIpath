import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Loader2, RefreshCcw } from 'lucide-react';

const Roadmap = ({ profile, onReset }) => {
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAdvice = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/advice';
        
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profile),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch roadmap.');
        }

        const data = await response.json();
        setAdvice(data.advice);
      } catch (err) {
        console.error(err);
        setError('We encountered an issue generating your roadmap. Please ensure the backend is running with Vertex AI configured.');
      } finally {
        setLoading(false);
      }
    };

    fetchAdvice();
  }, [profile]);

  return (
    <div className="w-full max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
        <h2 className="text-3xl font-bold text-slate-100">Your Civic Roadmap</h2>
        <button 
          onClick={onReset}
          className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-full"
        >
          <RefreshCcw className="w-4 h-4" /> Start Over
        </button>
      </div>

      <div className="bg-slate-900/50 rounded-2xl p-6 min-h-[300px] prose prose-invert prose-blue max-w-none">
        {loading && (
          <div className="flex flex-col items-center justify-center h-full space-y-4 py-20">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
            <p className="text-slate-400 animate-pulse text-lg">AI is generating your personalized civic roadmap...</p>
          </div>
        )}
        {error && (
          <div className="text-red-400 text-center bg-red-900/20 p-6 rounded-xl border border-red-500/30">
            {error}
          </div>
        )}
        {!loading && !error && advice && (
          <div className="roadmap-content">
            <ReactMarkdown>{advice}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default Roadmap;
