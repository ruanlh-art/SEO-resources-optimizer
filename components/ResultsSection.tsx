
import React, { useState } from 'react';
import { SEOOutput } from '../types';

interface ResultsSectionProps {
  result: SEOOutput | null;
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({ result }) => {
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-500 p-12 bg-slate-950">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 2v6h6M8 12h8m-8 4h5" />
        </svg>
        <p className="text-xl font-medium">Pronto para otimizar</p>
        <p className="text-sm mt-2 max-w-xs text-center">Insira os dados à esquerda e clique em "Otimizar Agora" para gerar os ativos SEO.</p>
      </div>
    );
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copiado com sucesso!");
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 overflow-hidden">
      <div className="p-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md">
        <h3 className="text-sm font-bold text-teal-400 uppercase tracking-widest mb-4">Ativos Gerados</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-slate-400">Sugestão de URL</span>
              <button onClick={() => copyToClipboard(result.url)} className="text-teal-500 hover:text-teal-400 text-xs font-bold">COPIAR</button>
            </div>
            <p className="text-sm text-white font-mono break-all">{result.url}</p>
          </div>
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-slate-400">Browser Title</span>
              <button onClick={() => copyToClipboard(result.browserTitle)} className="text-teal-500 hover:text-teal-400 text-xs font-bold">COPIAR</button>
            </div>
            <p className="text-sm text-white font-medium">{result.browserTitle}</p>
          </div>
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 md:col-span-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-slate-400">Meta Description</span>
              <button onClick={() => copyToClipboard(result.metaDescription)} className="text-teal-500 hover:text-teal-400 text-xs font-bold">COPIAR</button>
            </div>
            <p className="text-sm text-slate-300 italic">"{result.metaDescription}"</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="flex items-center gap-4 px-6 pt-4">
          <button 
            onClick={() => setActiveTab('code')}
            className={`pb-3 text-sm font-bold tracking-wide transition-all border-b-2 ${activeTab === 'code' ? 'border-teal-500 text-teal-500' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
          >
            CÓDIGO MODIFICADO
          </button>
          <button 
            onClick={() => setActiveTab('preview')}
            className={`pb-3 text-sm font-bold tracking-wide transition-all border-b-2 ${activeTab === 'preview' ? 'border-teal-500 text-teal-500' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
          >
            PRÉ-VISUALIZAÇÃO
          </button>
        </div>

        <div className="flex-1 overflow-auto custom-scrollbar p-6">
          {activeTab === 'code' ? (
            <div className="relative">
              <button 
                onClick={() => copyToClipboard(result.modifiedHtml)}
                className="absolute top-2 right-2 bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded text-xs font-bold transition-colors z-10"
              >
                COPIAR TUDO
              </button>
              <pre className="bg-slate-900 p-6 rounded-xl border border-slate-800 text-xs font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap leading-relaxed shadow-inner">
                {result.modifiedHtml}
              </pre>
            </div>
          ) : (
            <div className="bg-white rounded-xl h-full shadow-2xl overflow-hidden border border-slate-700">
               <iframe 
                srcDoc={result.modifiedHtml} 
                className="w-full h-full border-none"
                title="Preview"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
