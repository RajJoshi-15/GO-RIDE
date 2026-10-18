import React, { useState } from 'react';

interface SafetyTechScreenProps {
  onBackToRide: () => void;
}

export const SafetyTechScreen: React.FC<SafetyTechScreenProps> = ({ onBackToRide }) => {
  const [sosActive, setSosActive] = useState(false);
  const [sosCountdown, setSosCountdown] = useState(5);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleTriggerTestSos = () => {
    setSosActive(true);
    setSosCountdown(5);
    const interval = setInterval(() => {
      setSosCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleShareLiveLink = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-12 text-[#e4e1e7]">
      {/* Header */}
      <div className="flex flex-col gap-3 max-w-2xl">
        <span className="text-xs uppercase font-bold text-[#bef500] tracking-wider">
          Safety Shield 24x7
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-white">
          Commuter Security &amp; Telematics
        </h1>
        <p className="text-sm sm:text-base text-[#9ca3af] leading-relaxed">
          Indian urban roads demand uncompromising safety standards. Our multi-layered security
          infrastructure combines hardware biometric verification, automated route deviation AI,
          and a 24/7 dedicated command response room.
        </p>
      </div>

      {/* Safety Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#1f1f23] border border-[#2a292e] flex flex-col gap-4 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-[#2a292e] flex items-center justify-center text-[#bef500]">
            <span className="material-symbols-outlined text-[28px]">fingerprint</span>
          </div>
          <h2 className="font-display text-lg font-bold text-white">
            100% Biometric Captain Verification
          </h2>
          <p className="text-sm text-[#9ca3af] leading-relaxed">
            Every captain undergoes Aadhaar bio-authentication, government driving license checks,
            and in-person vehicle fitness inspections before their first trip. Zero proxy accounts
            or shared driver profiles.
          </p>
          <div className="mt-auto pt-2 text-xs text-[#bef500] font-semibold flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span>Government Digital ID Integrated</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#1f1f23] border border-[#2a292e] flex flex-col gap-4 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-[#2a292e] flex items-center justify-center text-[#bef500]">
            <span className="material-symbols-outlined text-[28px]">route</span>
          </div>
          <h2 className="font-display text-lg font-bold text-white">
            Automated Route Deviation Radar
          </h2>
          <p className="text-sm text-[#9ca3af] leading-relaxed">
            If a vehicle stops unexpectedly for &gt; 3 minutes or deviates from the algorithmic
            optimal corridor, our centralized safety bot immediately rings both rider and captain
            to verify passenger well-being.
          </p>
          <div className="mt-auto pt-2 text-xs text-[#bef500] font-semibold flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">notifications_active</span>
            <span>Real-time Geofence Alerts</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#1f1f23] border border-[#2a292e] flex flex-col gap-4 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-[#2a292e] flex items-center justify-center text-[#bef500]">
            <span className="material-symbols-outlined text-[28px]">share_location</span>
          </div>
          <h2 className="font-display text-lg font-bold text-white">
            Instant WhatsApp Trip Broadcast
          </h2>
          <p className="text-sm text-[#9ca3af] leading-relaxed">
            Send an encrypted, browser-accessible live tracking URL to your family with one tap.
            They can watch your EV move on the map in real-time, view Captain details, and see
            estimated arrival time.
          </p>
          <div className="mt-auto pt-2 text-xs text-[#bef500] font-semibold flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">chat</span>
            <span>One-Tap WhatsApp Broadcast</span>
          </div>
        </div>
      </div>

      {/* Interactive Emergency SOS Demo Console */}
      <div className="rounded-3xl bg-[#1b1b1f] border border-[#2a292e] p-6 sm:p-10 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="flex-1 flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#ff5c5c] uppercase tracking-wider">
            <span className="material-symbols-outlined text-[18px]">emergency</span>
            <span>Emergency Protocol Test Console</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
            How The 24/7 SOS Works In Real Time
          </h3>
          <p className="text-sm text-[#9ca3af] leading-relaxed">
            In an emergency, tapping SOS triggers an automated high-priority dispatch pipeline:
            our Bangalore Safety Command Center receives instant telematics, dials 112 emergency
            services, and dispatches the nearest ground patrol unit.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleTriggerTestSos}
              className="px-6 py-3 rounded-full bg-[#ff5c5c] text-white font-display text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(255,92,92,0.4)] hover:bg-[#ff5c5c]/90 transition-all cursor-pointer flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">sos</span>
              <span>Test SOS Trigger</span>
            </button>
            <button
              onClick={handleShareLiveLink}
              className="px-6 py-3 rounded-full bg-[#2a292e] text-white hover:bg-[#353439] text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border border-[#353439]"
            >
              <span className="material-symbols-outlined text-[18px]">link</span>
              <span>{copiedLink ? 'Link Copied to Clipboard!' : 'Copy Demo WhatsApp Track Link'}</span>
            </button>
          </div>
        </div>

        {/* SOS Feedback Box */}
        <div className="w-full lg:w-96 rounded-2xl bg-[#0e0e12] border border-[#2a292e] p-6 flex flex-col gap-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#9ca3af] uppercase">Command Center Status</span>
            <span className="flex items-center gap-1.5 text-xs text-[#bef500] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#bef500] animate-pulse" />
              ONLINE 24/7
            </span>
          </div>

          {sosActive ? (
            <div className="p-4 rounded-xl bg-[#93000a]/20 border border-[#ff5c5c]/40 flex flex-col gap-3 animate-fadeIn">
              <div className="flex items-center justify-between text-xs text-[#ff5c5c] font-bold">
                <span>EMERGENCY DISPATCH TRIGGERED</span>
                <span>T-{sosCountdown}s</span>
              </div>
              <p className="text-xs text-[#e4e1e7] leading-relaxed">
                {sosCountdown > 0
                  ? `Contacting 24/7 Safety Command Center in ${sosCountdown}s. Tap cancel if triggered by mistake.`
                  : 'Emergency Call Center Connected! Audio channel open, GPS coordinates relayed to city police dispatch.'}
              </p>
              {sosCountdown > 0 ? (
                <button
                  onClick={() => setSosActive(false)}
                  className="py-1.5 px-3 rounded-lg bg-[#2a292e] text-white text-xs font-semibold hover:bg-[#353439] cursor-pointer"
                >
                  Cancel False Alarm
                </button>
              ) : (
                <button
                  onClick={() => setSosActive(false)}
                  className="py-1.5 px-3 rounded-lg bg-[#2a292e] text-[#bef500] text-xs font-semibold hover:bg-[#353439] cursor-pointer"
                >
                  Reset Simulator
                </button>
              )}
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-[#19191e] border border-[#2a292e] flex flex-col gap-2 text-xs text-[#9ca3af]">
              <div className="flex justify-between">
                <span>Average Emergency Response</span>
                <span className="text-white font-bold">&lt; 28 seconds</span>
              </div>
              <div className="flex justify-between">
                <span>Active Safety Patrols</span>
                <span className="text-[#bef500] font-bold">342 Units</span>
              </div>
              <div className="flex justify-between">
                <span>WhatsApp Broadcast Status</span>
                <span className="text-white font-bold">Encrypted TLS 1.3</span>
              </div>
            </div>
          )}

          <button
            onClick={onBackToRide}
            className="w-full py-2.5 rounded-full bg-[#1f1f23] text-white text-xs font-bold hover:bg-[#2a292e] transition-colors cursor-pointer border border-[#2a292e]"
          >
            ← Return to Ride Booking
          </button>
        </div>
      </div>
    </div>
  );
};
