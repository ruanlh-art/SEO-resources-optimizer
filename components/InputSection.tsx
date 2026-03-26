
import React from 'react';

interface InputSectionProps {
  html: string;
  setHtml: (v: string) => void;
  reqs: string;
  setReqs: (v: string) => void;
  keywords: string;
  setKeywords: (v: string) => void;
  isOptimizing: boolean;
  onOptimize: () => void;
}

export const InputSection: React.FC<InputSectionProps> = ({
  html, setHtml, reqs, setReqs, keywords, setKeywords, isOptimizing, onOptimize
}) => {
  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-900 border-r border-slate-800 h-full overflow-y-auto custom-scrollbar">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-8 bg-teal-500 rounded-full"></div>
        <h2 className="text-xl font-bold text-white tracking-tight">Otimizador de Conteúdo SEO</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
            Código HTML Original
          </label>
          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            className="w-full h-64 bg-slate-800 border border-slate-700 rounded-lg p-3 text-slate-200 font-mono text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all placeholder-slate-600"
            placeholder="Cole seu HTML aqui..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
            Requisitos de Modificação
          </label>
          <textarea
            value={reqs}
            onChange={(e) => setReqs(e.target.value)}
            className="w-full h-24 bg-slate-800 border border-slate-700 rounded-lg p-3 text-slate-200 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all placeholder-slate-600"
            placeholder="Ex: Mudar contexto de vídeo para imagem, focar em Gemini prompts..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
            Keywords Alvo
          </label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-slate-200 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all placeholder-slate-600"
            placeholder="Ex: gerador de imagem ai, criar arte digital gratis"
          />
        </div>
      </div>

      <button
        onClick={onOptimize}
        disabled={isOptimizing || !html || !reqs || !keywords}
        className={`mt-4 py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 ${
          isOptimizing 
          ? "bg-slate-700 cursor-not-allowed text-slate-500" 
          : "bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white shadow-lg shadow-teal-500/20 active:scale-95"
        }`}
      >
        {isOptimizing ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Otimizando...
          </>
        ) : (
          "Otimizar Agora"
        )}
      </button>
    </div>
  );
};
