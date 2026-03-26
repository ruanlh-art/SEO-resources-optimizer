
import React, { useState } from 'react';
import { InputSection } from './components/InputSection';
import { ResultsSection } from './components/ResultsSection';
import { optimizeContent } from './services/geminiService';
import { SEOOutput } from './types';

const App: React.FC = () => {
  const [html, setHtml] = useState('');
  const [reqs, setReqs] = useState('');
  const [keywords, setKeywords] = useState('');
  const [result, setResult] = useState<SEOOutput | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOptimize = async () => {
    setIsOptimizing(true);
    setError(null);
    try {
      const data = await optimizeContent({
        originalHtml: html,
        requirements: reqs,
        keywords: keywords
      });
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Falha ao otimizar o conteúdo. Verifique sua chave de API e tente novamente.");
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-slate-950 overflow-hidden">
      {/* Sidebar - Inputs */}
      <div className="w-full lg:w-[400px] xl:w-[500px] flex-shrink-0 h-1/2 lg:h-full">
        <InputSection 
          html={html}
          setHtml={setHtml}
          reqs={reqs}
          setReqs={setReqs}
          keywords={keywords}
          setKeywords={setKeywords}
          isOptimizing={isOptimizing}
          onOptimize={handleOptimize}
        />
      </div>

      {/* Main Panel - Results */}
      <div className="flex-1 h-1/2 lg:h-full relative">
        {error && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-rose-500/20 border border-rose-500/50 text-rose-200 px-6 py-3 rounded-lg backdrop-blur-md shadow-2xl flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}
        <ResultsSection result={result} />
      </div>
    </div>
  );
};

export default App;
