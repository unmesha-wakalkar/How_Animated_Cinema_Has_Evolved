import { VideoSource } from '../types';

export const videoSources: VideoSource[] = [
  {
    id: "youtube-animation-history",
    title: "The Evolution of Animation: From Phenakistoscope to CGI",
    provider: "YouTube",
    url: "https://www.youtube.com/watch?v=k_ok8b3m_a4",
    embedId: "k_ok8b3m_a4",
    embed: true,
    note: "Comprehensive visual documentation exploring the transition from optical toys to digital computers."
  },
  {
    id: "youtube-pixar-story",
    title: "The Pixar Story: How Computer Graphics Revolutionized Cinema",
    provider: "YouTube",
    url: "https://www.youtube.com/watch?v=F2OPqU_2ZFc",
    embedId: "F2OPqU_2ZFc",
    embed: true,
    note: "Archival footage documenting the birth of RenderMan and early Pixar short films."
  },
  {
    id: "youtube-disney-multiplane",
    title: "Walt Disney Explains the Multiplane Camera (1957)",
    provider: "YouTube",
    url: "https://www.youtube.com/watch?v=kN-eCBAOW60",
    embedId: "kN-eCBAOW60",
    embed: true,
    note: "Historic demonstration showing how dimensional depth was achieved before digital compositing."
  },
  {
    id: "youtube-reiniger-silhouette",
    title: "The Art of Lotte Reiniger: Silhouette Animation Craft",
    provider: "YouTube",
    url: "https://www.youtube.com/watch?v=LvU55CUw5Ck",
    embedId: "LvU55CUw5Ck",
    embed: true,
    note: "Behind-the-scenes recording of Lotte Reiniger manipulating cut-out silhouette puppets."
  }
];
