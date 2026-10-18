import React, { useState } from 'react';

interface GetAppModalProps {
  onClose: () => void;
}

export const GetAppModal: React.FC<GetAppModalProps> = ({ onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [smsSent, setSmsSent] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleSendSms = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    setSmsSent(true);
    setTimeout(() => setSmsSent(false), 5000);
  };

  const handleCopyCode = () => {
    setCopiedCode(true);
    navigator.clipboard?.writeText('GORIDE100');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md rounded-3xl bg-[#19191e] border border-[#2a292e] shadow-2xl overflow-hidden flex flex-col text-[#e4e1e7]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#131317] border-b border-[#2a292e]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#bef500] text-[20px]">
              smartphone
            </span>
            <span className="font-display text-base font-bold text-white uppercase tracking-wider">
              Get the GoRide App
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#9ca3af] hover:text-white hover:bg-[#2a292e] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col items-center text-center gap-5">
          <div className="flex flex-col items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#bef500] text-[#273500] text-xs font-bold uppercase">
              Welcome Offer
            </span>
            <h3 className="font-display text-2xl font-bold text-white">
              Get ₹100 Flat Off Your 1st Ride
            </h3>
            <p className="text-xs text-[#9ca3af] max-w-xs">
              Scan the QR code with your phone camera or enter your mobile number for a direct download link.
            </p>
          </div>

          {/* QR Code Container */}
          <div className="p-4 rounded-2xl bg-white border-4 border-[#bef500] shadow-[0_0_30px_rgba(190,245,0,0.2)] flex flex-col items-center">
            <svg
              className="w-36 h-36"
              viewBox="0 0 100 100"
              fill="black"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Corner squares */}
              <rect x="5" y="5" width="28" height="28" fill="#131317" rx="3" />
              <rect x="10" y="10" width="18" height="18" fill="white" />
              <rect x="14" y="14" width="10" height="10" fill="#131317" />

              <rect x="67" y="5" width="28" height="28" fill="#131317" rx="3" />
              <rect x="72" y="10" width="18" height="18" fill="white" />
              <rect x="76" y="14" width="10" height="10" fill="#131317" />

              <rect x="5" y="67" width="28" height="28" fill="#131317" rx="3" />
              <rect x="10" y="72" width="18" height="18" fill="white" />
              <rect x="14" y="76" width="10" height="10" fill="#131317" />

              {/* Data matrix dots */}
              <rect x="38" y="12" width="6" height="6" fill="#131317" />
              <rect x="48" y="12" width="6" height="6" fill="#131317" />
              <rect x="40" y="24" width="8" height="6" fill="#131317" />
              <rect x="52" y="24" width="6" height="6" fill="#131317" />

              <rect x="12" y="38" width="6" height="6" fill="#131317" />
              <rect x="22" y="44" width="6" height="6" fill="#131317" />
              <rect x="38" y="38" width="6" height="6" fill="#131317" />
              <rect x="48" y="44" width="8" height="6" fill="#131317" />
              <rect x="60" y="38" width="6" height="6" fill="#131317" />
              <rect x="74" y="44" width="6" height="6" fill="#131317" />
              <rect x="84" y="38" width="6" height="6" fill="#131317" />

              <rect x="38" y="60" width="8" height="6" fill="#131317" />
              <rect x="52" y="64" width="6" height="6" fill="#131317" />
              <rect x="42" y="76" width="6" height="6" fill="#131317" />
              <rect x="56" y="80" width="6" height="6" fill="#131317" />
              <rect x="70" y="64" width="6" height="6" fill="#131317" />
              <rect x="82" y="72" width="8" height="6" fill="#131317" />
              <rect x="70" y="84" width="6" height="6" fill="#131317" />
            </svg>
            <span className="text-[10px] text-black font-extrabold uppercase mt-1 tracking-wider">
              Scan to Download
            </span>
          </div>

          {/* Copy Promo Code */}
          <div className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#0e0e12] border border-[#2a292e]">
            <div className="text-left">
              <span className="text-[10px] text-[#9ca3af] uppercase block font-semibold">
                Promo Code
              </span>
              <span className="font-mono text-sm font-bold text-[#bef500]">GORIDE100</span>
            </div>
            <button
              onClick={handleCopyCode}
              className="px-3 py-1.5 rounded-lg bg-[#2a292e] text-xs font-semibold text-white hover:bg-[#353439] cursor-pointer transition-colors"
            >
              {copiedCode ? 'Copied!' : 'Copy Code'}
            </button>
          </div>

          {/* SMS Link Form */}
          <form onSubmit={handleSendSms} className="w-full flex flex-col gap-2">
            <div className="flex gap-2">
              <input
                type="tel"
                placeholder="+91 Mobile number..."
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#0e0e12] border border-[#2a292e] text-xs text-white focus:outline-none focus:border-[#bef500]"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-[#bef500] text-[#273500] font-bold text-xs hover:opacity-90 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
              >
                Send Link
              </button>
            </div>
            {smsSent && (
              <span className="text-xs text-[#bef500] font-semibold animate-fadeIn">
                ✓ Download link sent via SMS to {phoneNumber}!
              </span>
            )}
          </form>

          {/* Store links */}
          <div className="w-full flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-[#2a292e] hover:bg-[#353439] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer border border-[#353439]"
            >
              <span className="material-symbols-outlined text-[18px]">shop</span>
              <span>Google Play</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-[#2a292e] hover:bg-[#353439] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer border border-[#353439]"
            >
              <span className="material-symbols-outlined text-[18px]">phone_iphone</span>
              <span>App Store</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
