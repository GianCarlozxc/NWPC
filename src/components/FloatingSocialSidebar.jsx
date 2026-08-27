import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { ChevronRight, ChevronLeft } from 'lucide-react';

// Custom Crisp Brand SVGs
function FacebookIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function XIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YouTubeIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function ViberIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.5 3.5C17.3 1.4 14.2.3 11 .3 4.9.3 0 5.2 0 11.3c0 2.2.6 4.3 1.8 6.1L.1 23.3l6.1-1.6c1.7 1 3.8 1.6 5.8 1.6 6.1 0 11-4.9 11-11 0-3.2-1.2-6.3-3.5-8.8zm-8.5 18c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.8 1 1-3.7-.2-.4c-1-1.6-1.6-3.4-1.6-5.4 0-5.1 4.2-9.3 9.3-9.3 2.5 0 4.8 1 6.6 2.7 1.8 1.8 2.7 4.1 2.7 6.6-.1 5.2-4.3 9.7-9.5 9.7zm5.5-7.3c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-.9-.8-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7.1-.1.3-.4.5-.5.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.4-1.2 1.2-1.2 2.9 0 1.7 1.2 3.4 1.4 3.6.2.2 2.4 3.7 5.9 5.2.8.4 1.5.6 2 .8.8.3 1.6.2 2.2.1.7-.1 2.1-.9 2.4-1.7.3-.8.3-1.6.2-1.7-.1-.2-.3-.3-.6-.4z"/>
    </svg>
  );
}

export function FloatingSocialSidebar() {
  const { settings } = useData();
  const [collapsed, setCollapsed] = useState(false);

  const socialLinks = [
    {
      name: 'Facebook',
      url: settings?.facebookUrl || 'https://www.facebook.com/dole.nwpc',
      icon: FacebookIcon,
      bg: 'bg-[#1877F2] hover:bg-[#0c63d4]',
      label: 'Like on Facebook',
      handle: '@dole.nwpc'
    },
    {
      name: 'X (Twitter)',
      url: settings?.xUrl || 'https://x.com/DOLE_NWPC',
      icon: XIcon,
      bg: 'bg-black hover:bg-neutral-800',
      label: 'Follow on X',
      handle: '@DOLE_NWPC'
    },
    {
      name: 'YouTube',
      url: settings?.youtubeUrl || 'https://www.youtube.com/channel/UCTRCkNR3HMBAipgfRHOcKZQ',
      icon: YouTubeIcon,
      bg: 'bg-[#FF0000] hover:bg-[#cc0000]',
      label: 'Subscribe on YouTube',
      handle: 'NWPC DOLE'
    },
    {
      name: 'Viber',
      url: settings?.viberUrl || 'https://invite.viber.com/?g2=AQBCnUKzqOZ5Tk0OWCGiQChLDnyMFq52k%2BXZqKLLSc745oouvaSmLNPXrws4zXqi&lang=en',
      icon: ViberIcon,
      bg: 'bg-[#7360F2] hover:bg-[#5d4ad6]',
      label: 'Join Viber Community',
      handle: 'NWPC Viber Channel'
    }
  ];

  return (
    <aside 
      aria-label="Official Social Media Channels"
      className={`fixed right-0 top-1/2 -translate-y-1/2 z-50 transition-all duration-300 ${
        collapsed ? 'translate-x-[calc(100%-10px)]' : 'translate-x-0'
      }`}
    >
      {/* Toggle Tab */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -left-6 top-1/2 -translate-y-1/2 bg-slate-900 text-white p-1 rounded-l-md shadow-lg border-l border-y border-slate-700 hover:bg-slate-800 transition"
        title={collapsed ? "Show Social Links" : "Hide Social Links"}
        aria-label="Toggle Social Links"
      >
        {collapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>

      {/* Floating Buttons Column */}
      <div className="flex flex-col shadow-2xl rounded-l-xl overflow-hidden bg-slate-900 border-l border-y border-slate-700">
        {socialLinks.map((item, idx) => {
          const Icon = item.icon;
          return (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex items-center justify-center p-3 text-white transition-all duration-200 ${item.bg}`}
              title={`${item.label} (${item.handle})`}
              aria-label={item.name}
            >
              {/* Main Icon */}
              <div className="w-5 h-5 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </div>

              {/* Hover Flyout Label (Desktop) */}
              <span className="absolute right-full mr-2 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-md shadow-2xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-150 border border-slate-700 flex items-center gap-1.5 z-50">
                <span>{item.name}</span>
                <span className="text-[10px] text-amber-400 font-mono">({item.handle})</span>
              </span>
            </a>
          );
        })}
      </div>
    </aside>
  );
}
