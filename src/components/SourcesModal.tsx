import React from 'react';
import { X, BookOpen, ExternalLink, ShieldCheck, Database, CheckCircle } from 'lucide-react';
import { sourceManifest } from '../data/sourceManifest';
import { storyMetrics } from '../data/storyMetrics';

interface SourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SourcesModal: React.FC<SourcesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 backdrop-blur-md bg-stone-950/75 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#FBF8F2] text-[#171717] border border-stone-300 rounded-3xl overflow-hidden shadow-2xl my-6 max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between gap-4 shrink-0 bg-[#F7F2E8]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E84D3C]/15 border border-[#E84D3C]/30 flex items-center justify-center text-[#E84D3C]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-serif-display font-bold text-stone-900">
                Sources, Methodology & Data Audit
              </h2>
              <p className="text-xs text-stone-500 font-mono">
                Verification protocols, citation manifest, and completeness rules
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-700 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs text-stone-700">
          {/* Data Audit Summary */}
          <div className="bg-white border border-stone-200 p-5 rounded-2xl shadow-sm">
            <h3 className="text-sm font-serif-display font-bold text-stone-900 mb-2 flex items-center gap-2">
              <Database className="w-4 h-4 text-[#E84D3C]" />
              Database Scope & Completeness Audit
            </h3>
            <ul className="space-y-2 leading-relaxed text-stone-600 font-editorial text-sm">
              <li>
                • <strong className="text-stone-900">Catalog Population:</strong> 25,390 total animated cinema records; 24,074 usable released productions across 14 decades (1880s–2020s).
              </li>
              <li>
                • <strong className="text-stone-900">Complete-Case Financials:</strong> 1,458 verified budgets, 1,642 box office revenues, and exactly 777 dual complete-case financial records. Zero values are never substituted for missing records.
              </li>
              <li>
                • <strong className="text-stone-900">Curated Masterworks Corpus:</strong> 117 landmark productions individually audited with canonical studios, animation techniques, directors, and critical consensus scores.
              </li>
            </ul>
          </div>

          {/* Academic & Archival Sources */}
          <div>
            <h3 className="text-sm font-serif-display font-bold text-stone-900 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#4F8FE8]" />
              Academic References & Institutional Archives
            </h3>
            <div className="space-y-3">
              {sourceManifest.map((src) => (
                <div
                  key={src.id}
                  className="bg-white border border-stone-200 p-4 rounded-xl shadow-sm"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-serif-display font-bold text-stone-900 text-sm">
                      {src.title}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F7F2E8] text-stone-700 border border-stone-300">
                      {src.kind}
                    </span>
                  </div>
                  <p className="text-stone-600 font-editorial text-xs mb-2">
                    {src.use}
                  </p>
                  <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 pt-2 border-t border-stone-100">
                    <span>{src.publisher}</span>
                    {src.url && (
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[#4F8FE8] hover:underline font-medium"
                      >
                        <span>Access Document</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Curatorial Principles */}
          <div className="p-4 rounded-xl bg-[#F7F2E8] border border-stone-200">
            <h4 className="font-serif-display font-bold text-stone-900 mb-1">
              Curatorial Philosophy & Scientific Skepticism
            </h4>
            <p className="font-editorial text-stone-700 leading-relaxed text-xs">
              This interactive publication does not treat animation as an artistic form that declined into mere commercialism, nor as an inevitable march toward photorealism. Instead, it presents verified empirical data, illuminates structural trade-offs, and invites audiences to explore the living tension between artisanal craft, computational technology, and industrial distribution.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
