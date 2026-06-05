'use client';

import { useMemo, useState, useEffect } from 'react';
import { ThemeToggle } from '@/components/ui/theme-toggle';

interface Hostel {
  slug: string;
  name: string;
  location: string;
  status: 'available' | 'reserved' | 'limited';
  rating: number;
  price: string;
  numericPrice: number;
  tags: string[];
  host?: string;
}

const HOSTELS: Hostel[] = [
  {
    slug: 'woss-hostel',
    name: 'Woss Hostel',
    location: '4 min walk · KWASU Gate',
    status: 'available',
    rating: 4.9,
    price: '₦180,000',
    numericPrice: 180000,
    tags: ['Wi-Fi', 'Water', '24h light', 'Sync-verified', 'Top-rated'],
    host: 'Alhaji Woss',
  },
  {
    slug: 'la-marida-malete',
    name: 'La Marida Hotel',
    location: '9 min walk · Malete Town',
    status: 'available',
    rating: 4.7,
    price: '₦150,000',
    numericPrice: 150000,
    tags: ['Wi-Fi', 'Water', 'Security', 'Tiled flooring'],
    host: 'Mama Yetunde',
  },
  {
    slug: 'amina-villa',
    name: 'Amina Villa',
    location: '12 min walk · Malete Town',
    status: 'reserved',
    rating: 4.6,
    price: '₦95,000',
    numericPrice: 95000,
    tags: ['Wi-Fi', 'Water', 'Female only', 'Borehole'],
    host: 'Baba Amina',
  },
  {
    slug: 'success-hostel',
    name: 'Success Hostel',
    location: '15 min walk · Malete Town',
    status: 'limited',
    rating: 4.5,
    price: '₦70,000',
    numericPrice: 70000,
    tags: ['Water', '24h light', 'Budget-friendly'],
    host: 'Bro. Success',
  },
  {
    slug: 'montresor-capitol',
    name: 'MonTresor Capitol Hostel',
    location: '11 min walk · Safari',
    status: 'available',
    rating: 4.8,
    price: '₦165,000',
    numericPrice: 165000,
    tags: ['Wi-Fi', 'Water', 'Security', 'CCTV at gate'],
    host: 'Capitol Admins',
  },
  {
    slug: 'eniduro-villa',
    name: 'Eniduro Villa',
    location: '13 min walk · Malete Town',
    status: 'reserved',
    rating: 4.6,
    price: '₦110,000',
    numericPrice: 110000,
    tags: ['Wi-Fi', 'Water', 'Male only', 'Inverter Backup'],
    host: 'Pa Eniduro',
  },
];

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'available', label: 'Available' },
  { value: 'reserved', label: 'Reserved' },
  { value: 'limited', label: 'Limited' },
] as const;

const STATUS_MAP = {
  available: {
    label: 'Available',
    cls: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
  },
  reserved: {
    label: 'Reserved',
    cls: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
  },
  limited: {
    label: 'Limited',
    cls: 'bg-violet-500/10 border-violet-500/30 text-violet-400',
  },
} as const;

export default function Page() {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState<(typeof FILTERS)[number]['value']>('all');
  const [selectedHostel, setSelectedHostel] = useState<Hostel | null>(null);

  // Modal and Hold Reservation systems state
  const [showModal, setShowModal] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(86400); // 24 hours in seconds

  // Inline Chat Box Overlay Toggle
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState<{ sender: 'user' | 'agent'; text: string }[]>([
    { sender: 'agent', text: 'Hello! I am the manager for this listing. Would you like to confirm a physical walkthrough or process payment details?' }
  ]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Reset temporary allocations when moving between context views
    setIsLocked(false);
    setChatOpen(false);
  }, [selectedHostel]);

  // Active Countdown Ticking Engine Thread
  useEffect(() => {
    if (!isLocked) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsLocked(false);
          clearInterval(interval);
          return 86400;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isLocked]);

  const formatCountdown = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setMessages((prev) => [...prev, { sender: 'user', text: chatMessage }]);
    setChatMessage('');
    
    // Simulate swift agent dynamic acknowledgement response
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: 'agent', text: 'Got it. Holding allocation open. Please drop your WhatsApp line so we can sync documents.' }]);
    }, 1200);
  };

  const visible = useMemo(
    () =>
      HOSTELS.filter((hostel) => {
        const matchesQuery =
          query.trim() === '' ||
          [hostel.name, hostel.location, hostel.tags.join(' ')]
            .join(' ')
            .toLowerCase()
            .includes(query.toLowerCase());

        const matchesFilter =
          active === 'all' ? true : hostel.status === active;

        return matchesQuery && matchesFilter;
      }),
    [active, query],
  );

  /* ==================== SCREEN 2: DEDICATED HOSTEL DETAIL VIEW (TRANSPARENT BACKGROUND) ==================== */
  if (selectedHostel) {
    return (
      <main className="min-h-screen text-current transition-colors duration-300 animate-in fade-in duration-500 relative">
        
        {/* MODAL WINDOW SYSTEM - FLOATS ABOVE APARTMENT ROOT CANVAS */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/60 animate-in fade-in duration-200">
            <div className="border border-zinc-800 bg-zinc-950 p-6 md:p-8 rounded-3xl max-w-md w-full text-center shadow-2xl space-y-5 animate-in zoom-in-95 duration-300">
              <div className="h-12 w-12 rounded-full bg-lime-500/10 border border-lime-500/30 text-lime-400 flex items-center justify-center mx-auto text-xl">
                🔒
              </div>
              <div>
                <h3 className="text-xl font-black tracking-tight text-white">Temporary Lock Engaged</h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  Excellent choice. This space in <span className="text-lime-400 font-semibold">{selectedHostel.name}</span> has been locked exclusively for your profile account token. 
                </p>
                <p className="text-xs bg-lime-500/5 text-lime-400 border border-lime-500/20 p-3 rounded-xl font-mono mt-4 font-bold">
                  ⚠️ HOLD WINDOW DURATION: 24 HOURS ONLY
                </p>
                <p className="text-[11px] text-zinc-500 mt-2">
                  If payment authorization documentation isn’t uploaded before expiration, the allotment system releases the inventory key back to open directory streams.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setIsLocked(true);
                }}
                className="w-full py-3 bg-lime-400 hover:bg-lime-500 text-black font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all"
              >
                Acknowledge & Start Timer
              </button>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          
          {/* Top Navigation Row */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800/40">
            <button
              type="button"
              onClick={() => setSelectedHostel(null)}
              className="flex items-center gap-2 group text-sm font-semibold text-zinc-400 hover:text-lime-400 transition-colors"
            >
              <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Hostels List
            </button>
            <ThemeToggle />
          </div>

          <div className="bg-transparent rounded-3xl overflow-hidden">
            
            {/* Wireframe Grid Blueprint Panels */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 p-0 pb-6 border-b border-zinc-800/40">
              <div className="md:col-span-2 h-64 bg-zinc-500/5 rounded-2xl relative flex items-center justify-center border border-zinc-800/30 overflow-hidden group">
                <span className="text-xs font-mono opacity-30 text-zinc-400">primary room view</span>
                <div className="absolute inset-0 pointer-events-none opacity-5 border border-zinc-700 [clip-path:polygon(0_0,100%_100%,100%_0,0_100%)]" />
              </div>
              <div className="hidden md:block col-span-1 space-y-2">
                <div className="h-[124px] bg-zinc-500/5 rounded-2xl flex items-center justify-center border border-zinc-800/30 text-xs font-mono opacity-30">exterior walkway</div>
                <div className="h-[124px] bg-zinc-500/5 rounded-2xl flex items-center justify-center border border-zinc-800/30 text-xs font-mono opacity-30">kitchen spaces</div>
              </div>
              <div className="hidden md:block col-span-1 space-y-2">
                <div className="h-[124px] bg-zinc-500/5 rounded-2xl flex items-center justify-center border border-zinc-800/30 text-xs font-mono opacity-30">bathroom profile</div>
                <div className="h-[124px] bg-zinc-500/5 rounded-2xl bg-lime-500/5 text-lime-400 font-bold flex items-center justify-center border border-lime-500/20 text-sm">
                  + 8 Blueprint Photos
                </div>
              </div>
            </div>

            {/* Core Content Segment Layout */}
            <div className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Left Column Structural Details */}
              <div className="lg:col-span-7 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-lime-500 text-black px-3 py-0.5 rounded-full text-xs font-bold tracking-tight shadow-sm flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-black animate-ping" /> Real-time Verified · 2026
                    </span>
                    <span className={`px-3 py-0.5 rounded-full border text-xs font-semibold ${STATUS_MAP[selectedHostel.status].cls}`}>
                      {STATUS_MAP[selectedHostel.status].label} Allocation
                    </span>
                  </div>

                  <h1 className="text-4xl font-black tracking-tight text-current">
                    {selectedHostel.name} <span className="font-normal italic text-lime-400">Complex</span>
                  </h1>

                  <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-zinc-400">
                    <span className="flex items-center gap-1 text-amber-400 font-bold">★ {selectedHostel.rating} <span className="text-zinc-500 font-normal">(Verified Reviews)</span></span>
                    <span>•</span>
                    <span>{selectedHostel.location}</span>
                    <span>•</span>
                    <span className="text-zinc-500 italic">Managed by {selectedHostel.host}</span>
                  </div>
                </div>

                <div className="border-t border-dashed border-zinc-800/60 pt-6">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Architectural Description</h3>
                  <p className="text-sm leading-relaxed text-zinc-400">
                    A secure structurally vetted facility configured for maximum academic tranquility. Provides premium amenities spacing layout tailored effectively to students attending Kwara State University (KWASU).
                  </p>
                </div>

                {/* Amenities grid frameworks */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">Facility Amenities Framework</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {['High-speed Wi-Fi', 'Continuous Water Supply', '24h Light Inverter', 'Secure Gated Perimeter', 'Full Tiled Floorplan', 'Private Closet space', 'Water Heater system', 'Dedicated Kitchen area'].map((facility) => {
                      return (
                        <div key={facility} className="flex items-center gap-2 border border-zinc-800/40 rounded-xl p-2.5 bg-zinc-500/5 text-xs">
                          <span className="text-lime-400 font-bold">✓</span>
                          <span className="font-medium text-zinc-300">{facility}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Route Maps segment blueprints */}
                <div className="border-t border-dashed border-zinc-800/60 pt-6">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">Malete Geographic Coordinate Route</h3>
                  
                  <div className="h-48 rounded-2xl border border-zinc-800/40 relative overflow-hidden flex flex-col justify-between p-4 group bg-zinc-500/5">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />
                    
                    <div className="absolute inset-0 flex items-center justify-center gap-8 md:gap-16 z-10 px-4">
                      <div className="bg-zinc-900/90 border border-emerald-800 text-emerald-400 rounded-xl p-2.5 text-center text-xs">
                        <p className="font-mono uppercase font-black text-[10px]">KWASU GATE</p>
                        <span className="text-[8px] opacity-80 block">Main Campus Hub</span>
                      </div>

                      <div className="flex-1 h-0.5 border-t-2 border-dashed border-zinc-700/60 relative flex items-center justify-center">
                        <span className="absolute -top-3 text-[9px] bg-zinc-950 px-1.5 text-zinc-500 font-mono">Malete Route Path</span>
                      </div>

                      <div className="bg-lime-400 border border-zinc-900 text-zinc-950 rounded-xl p-2.5 font-bold transform -rotate-1 group-hover:rotate-0 transition-transform shadow-md">
                        <p className="text-[11px] uppercase font-black tracking-tight">{selectedHostel.name}</p>
                        <span className="text-[8px] opacity-80 block">Selected Destination</span>
                      </div>
                    </div>

                    <div className="mt-auto w-full flex flex-wrap gap-4 text-[10px] font-mono z-10 text-zinc-400 bg-zinc-900/40 backdrop-blur-xs p-2 rounded-xl border border-zinc-800/30">
                      <span>📍 Malete Town Area Network</span>
                      <span>•</span>
                      <span>🚶 {selectedHostel.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column Financial Calculations Segment & Booking Controls */}
              <div className="lg:col-span-5 space-y-4 animate-in slide-in-from-right-4 duration-500">
                <div className="border border-zinc-800/60 rounded-2xl p-6 bg-zinc-500/5 shadow-xl relative overflow-hidden">
                  
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Rental Session Fee</p>
                      <h2 className="text-4xl font-black font-mono text-current mt-1">{selectedHostel.price}</h2>
                    </div>
                    <span className="text-xs font-semibold bg-lime-500/10 border border-lime-500/20 text-lime-400 px-2.5 py-1 rounded-md">
                      Per Session
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 border border-zinc-800/40 rounded-xl p-3 bg-zinc-900/20 text-xs mb-4">
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase block font-medium">Academic Year</span>
                      <p className="font-bold text-zinc-300 mt-0.5">2026 / 2027</p>
                    </div>
                    <div className="border-l border-zinc-800/40 pl-3">
                      <span className="text-[10px] text-zinc-500 uppercase block font-medium">Allocation Mode</span>
                      <p className="font-bold text-zinc-300 mt-0.5">Direct Key Handover</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs border-b border-dashed border-zinc-800/40 pb-4 mb-4">
                    <div className="flex justify-between text-zinc-400">
                      <span>Base Hostel Rent Invoice</span>
                      <span className="font-mono">{selectedHostel.price}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Refundable Caution Deposit</span>
                      <span className="font-mono">₦20,000</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Utility & Maintenance Setup</span>
                      <span className="font-mono">₦5,000</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm font-bold text-current mb-6">
                    <span>Total Estimated Due</span>
                    <span className="text-xl font-mono text-lime-400">
                      ₦{(selectedHostel.numericPrice + 25000).toLocaleString()}
                    </span>
                  </div>

                  {/* INTERACTIVE BOOKING MATRIX AND SIDE-BY-SIDE CHAT HOOK */}
                  <div className="space-y-3">
                    {!isLocked ? (
                      <button
                        type="button"
                        onClick={() => setShowModal(true)}
                        className="w-full py-3.5 bg-lime-400 hover:bg-lime-500 text-black font-extrabold rounded-xl text-xs transition-all uppercase tracking-wider shadow-lg active:scale-95"
                      >
                        Lock Apartment Layout
                      </button>
                    ) : (
                      <div className="space-y-2">
                        {/* 24-Hour Countdown HUD Element */}
                        <div className="border border-red-500/30 bg-red-500/5 p-4 rounded-xl text-center space-y-1">
                          <p className="text-[10px] text-red-400 uppercase tracking-widest font-bold">Lockout Hold Expiring In</p>
                          <h4 className="text-2xl font-black font-mono text-red-500 tracking-wider animate-pulse">
                            {formatCountdown(timeLeft)}
                          </h4>
                        </div>

                        {/* Split Action Layer: Extension / Active Contact Trigger Interface */}
                        <div className="grid grid-cols-5 gap-2">
                          <div className="col-span-3 bg-zinc-900 border border-zinc-800 rounded-xl p-3 flex flex-col justify-center">
                            <span className="text-[9px] uppercase text-zinc-500 block">Status Flag</span>
                            <span className="text-[11px] font-bold text-lime-400 flex items-center gap-1">
                              <span className="h-1.5 w-1.5 rounded-full bg-lime-400 animate-ping" /> Held Exclusively
                            </span>
                          </div>
                          
                          {/* Chat Box Adjacent Trigger Toggle Button */}
                          <button
                            type="button"
                            onClick={() => setChatOpen(!chatOpen)}
                            className={`col-span-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 border border-zinc-700/60 ${
                              chatOpen ? 'bg-lime-400 text-black border-lime-400' : 'bg-zinc-500/5 text-white hover:bg-zinc-800'
                            }`}
                          >
                            <span className="text-base">💬</span>
                            <span>{chatOpen ? 'Hide Chat' : 'Chat Agent'}</span>
                          </button>
                        </div>
                      </div>
                    )}

                    <button
                      type="button"
                      className="w-full py-3 border border-zinc-800/60 text-zinc-300 font-bold rounded-xl text-xs hover:bg-zinc-900/40 transition-all"
                    >
                      Schedule In-Person Inspection Walk
                    </button>
                  </div>
                </div>

                {/* INLINE AGENT DOCK CHAT DRAWER */}
                {isLocked && chatOpen && (
                  <div className="border border-zinc-800 rounded-2xl bg-zinc-950 p-4 shadow-xl flex flex-col h-72 animate-in slide-in-from-top-4 duration-300">
                    <div className="flex items-center justify-between pb-2 border-b border-zinc-800/60 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-400" />
                        <span className="text-xs font-bold text-white">{selectedHostel.host || 'Listing Agent'}</span>
                        <span className="text-[9px] font-mono bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-400">Assigned</span>
                      </div>
                      <span className="text-[10px] text-zinc-500">Hostel Desk</span>
                    </div>

                    {/* Messages Container */}
                    <div className="flex-1 overflow-y-auto space-y-2 p-1 text-xs no-scrollbar">
                      {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[85%] rounded-xl px-3 py-2 ${
                            msg.sender === 'user' 
                              ? 'bg-lime-400 text-black font-medium' 
                              : 'bg-zinc-900 border border-zinc-800 text-zinc-300'
                          }`}>
                            {msg.text}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Chat Form Element */}
                    <form onSubmit={handleSendMessage} className="mt-2 flex gap-1.5 pt-2 border-t border-zinc-800/60">
                      <input
                        type="text"
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        placeholder="Ask about deposits, documents..."
                        className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3 text-xs outline-none text-white focus:border-lime-500/50"
                      />
                      <button
                        type="submit"
                        className="bg-zinc-100 hover:bg-white text-black px-3 rounded-xl text-xs font-bold transition-all"
                      >
                        Send
                      </button>
                    </form>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* ==================== SCREEN 1: COMPREHENSIVE DIRECTORY LIST VIEW ==================== */
  return (
    <main className="min-h-screen text-current transition-colors duration-300 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        
        {/* Navigation Core Header links element */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800/40">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-lime-400 animate-pulse" />
            <span className="text-xs font-mono tracking-widest uppercase opacity-60">KWASU Accommodation Portal</span>
          </div>
          <ThemeToggle />
        </div>

        {/* Hero Banner text section */}
        <section className="mb-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display tracking-tight font-extrabold text-current leading-tight">
            Find your{' '}
            <span className="block md:inline italic text-lime-400 font-normal">
              perfect hostel stay.
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm md:text-base text-zinc-400">
            Browse comprehensively vetted off-campus student accommodations around Malete town. Click any item card to see standalone geographic routes and pricing structures.
          </p>

          <div className="grid grid-cols-3 gap-3 mt-8 max-w-2xl">
            <div className="bg-zinc-500/5 border border-zinc-800/40 rounded-2xl p-4">
              <p className="text-xs text-zinc-500 font-medium">Vetted Openings</p>
              <h3 className="text-2xl font-bold mt-1 text-zinc-200">
                {HOSTELS.filter((h) => h.status === 'available').length} Available
              </h3>
            </div>
            <div className="bg-zinc-500/5 border border-zinc-800/40 rounded-2xl p-4">
              <p className="text-xs text-zinc-500 font-medium">Starting Price</p>
              <h3 className="text-2xl font-bold mt-1 text-zinc-200">₦70,000</h3>
            </div>
            <div className="bg-zinc-500/5 border border-zinc-800/40 rounded-2xl p-4">
              <p className="text-xs text-zinc-500 font-medium">System Quality</p>
              <h3 className="text-2xl font-bold mt-1 text-zinc-200">4.6 ★</h3>
            </div>
          </div>
        </section>

        {/* Input Text Box element field setup */}
        <div className="flex items-center gap-3 bg-zinc-500/5 border border-zinc-800/40 focus-within:border-lime-500 focus-within:ring-2 focus-within:ring-lime-500/10 rounded-2xl px-4 h-12 mb-4 transition-all duration-200">
          <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search hostels by name, distance, area tags..."
            className="flex-1 bg-transparent outline-none text-sm placeholder-zinc-500 text-current"
          />
        </div>

        {/* Filter selection Row Pills button sets */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-5 no-scrollbar scroll-smooth">
          {FILTERS.map((filter) => {
            const isSelected = active === filter.value;
            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActive(filter.value)}
                className={`whitespace-nowrap px-5 py-2 rounded-full border text-sm font-medium transition-all duration-200 transform active:scale-95 ${
                  isSelected
                    ? 'bg-zinc-100 text-black border-zinc-100 shadow-sm'
                    : 'bg-zinc-500/5 text-zinc-400 border-zinc-800/40 hover:bg-zinc-900/40'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <div className="mb-4">
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Showing {visible.length} Matching Complex{visible.length !== 1 ? 'es' : ''}
          </p>
        </div>

        {/* Core Hostel card elements matrix lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((hostel) => (
            <div
              key={hostel.slug}
              onClick={() => setSelectedHostel(hostel)}
              className="group text-left cursor-pointer overflow-hidden rounded-3xl border border-zinc-800/40 bg-zinc-500/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-zinc-700/60 flex flex-col h-full focus:outline-none"
            >
              <div className="h-44 w-full bg-gradient-to-br from-zinc-900/30 to-zinc-950/20 relative flex items-center justify-center overflow-hidden border-b border-zinc-800/30">
                <span className={`absolute top-4 right-4 px-3 py-1 rounded-full border text-xs font-semibold backdrop-blur-xs z-10 shadow-sm ${STATUS_MAP[hostel.status].cls}`}>
                  {STATUS_MAP[hostel.status].label}
                </span>
                
                <svg className="w-14 h-14 text-zinc-800/60 group-hover:scale-110 group-hover:text-lime-500/20 transition-all duration-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 9.3V4h-3v2.6L12 3 2 12h3v8h5v-6h4v6h5v-8h3L19 9.3zM10 10c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1z"/>
                </svg>
              </div>

              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="font-bold text-lg text-current group-hover:text-lime-400 transition-colors">
                        {hostel.name}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {hostel.location}
                      </p>
                    </div>
                    <div className="bg-lime-500/10 text-lime-400 border border-lime-500/20 font-bold text-xs px-2 py-1 rounded-lg flex items-center whitespace-nowrap">
                      ★ {hostel.rating}
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-2xl font-black text-current font-mono tracking-tight">{hostel.price}</p>
                    <span className="text-[11px] text-zinc-500 font-medium">per academic session lease</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mt-5">
                  {hostel.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[10px] font-semibold px-2.5 py-0.5 rounded-md bg-zinc-900/60 border border-zinc-800/30 text-zinc-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}