import React, { useState } from 'react';
import { X, Play, ExternalLink, Sparkles, Film } from 'lucide-react';
import { videoSources } from '../data/videoSources';
import { VideoSource } from '../types';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  const [activeVideo, setActiveVideo] = useState<VideoSource>(videoSources[0]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 backdrop-blur-md bg-stone-950/80 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#FBF8F2] text-[#171717] border border-stone-300 rounded-3xl overflow-hidden shadow-2xl my-6 max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between gap-4 shrink-0 bg-[#F7F2E8]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E84D3C]/15 border border-[#E84D3C]/30 flex items-center justify-center text-[#E84D3C]">
              <Play className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h2 className="text-xl font-serif-display font-bold text-stone-900">
                Archival Film & Technique Reel
              </h2>
              <p className="text-xs text-stone-500 font-mono">
                Primary audiovisual historical records and technical demonstrations
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

        {/* Video Player & Selection */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Main Embed Area */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-stone-300 shadow-md">
            {activeVideo.embedId ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.embedId}?autoplay=0&rel=0`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                <Film className="w-12 h-12 text-stone-500 mb-3" />
                <p className="text-sm text-stone-400 mb-4">Direct playback external link</p>
                <a
                  href={activeVideo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-white text-stone-900 text-xs font-semibold"
                >
                  Watch on {activeVideo.provider}
                </a>
              </div>
            )}
          </div>

          {/* Video Metadata */}
          <div>
            <div className="flex items-center justify-between gap-4 mb-2">
              <h3 className="text-lg font-serif-display font-bold text-stone-900">
                {activeVideo.title}
              </h3>
              <a
                href={activeVideo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-[#4F8FE8] hover:underline font-mono"
              >
                <span>External Link</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            {activeVideo.note && (
              <p className="text-sm text-stone-600 font-editorial leading-relaxed">
                {activeVideo.note}
              </p>
            )}
          </div>

          {/* Archival Selection Grid */}
          <div className="pt-4 border-t border-stone-200">
            <h4 className="text-xs font-mono text-stone-500 uppercase tracking-wider mb-3">
              Archival Video Chapters
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {videoSources.map((v) => (
                <div
                  key={v.id}
                  onClick={() => setActiveVideo(v)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                    activeVideo.id === v.id
                      ? 'bg-white border-[#E84D3C] shadow-sm'
                      : 'bg-white/60 hover:bg-white border-stone-200 text-stone-700'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      activeVideo.id === v.id
                        ? 'bg-[#E84D3C] text-white'
                        : 'bg-stone-200 text-stone-600'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h5 className="text-xs font-serif-display font-bold text-stone-900 truncate">
                      {v.title}
                    </h5>
                    <span className="text-[10px] font-mono text-stone-500">
                      {v.provider} • Archival Record
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
