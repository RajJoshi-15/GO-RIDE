import React, { useState } from 'react';
import { SAVED_USER_PROFILE } from '../data/mockData';

interface RiderAccountModalProps {
  onClose: () => void;
  onSelectSavedPlace: (address: string) => void;
}

export const RiderAccountModal: React.FC<RiderAccountModalProps> = ({
  onClose,
  onSelectSavedPlace,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'trips' | 'places' | 'payments'>('trips');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#19191e] border border-[#2a292e] shadow-2xl overflow-hidden flex flex-col text-[#e4e1e7] max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#131317] border-b border-[#2a292e]">
          <div className="flex items-center gap-3">
            <img
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border border-[#bef500]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPJlpnY-7jG3lHqVCWhwva412A4oDKcbzr7LvYxDBgIwzZXRYh4UrE3B9Am5KfkteAG-HbsE9EzLG7WJvb1MAhOgiQQgBLLqcD5FMIMVaxDr0tj39Ic4jZDCL2sFAQr9CUwxAdz_n16ny9pKAnbBlEEf59UV_MMaGi3rdfT9FUPnIug5nhNR-r7VO8WTRgUhLsVZY6mbas50wOk1Y1xfh1U3DCPugG4NCM0KdnEC94QpcrYW8rC__75w"
            />
            <div>
              <h3 className="font-display text-base font-bold text-white">
                {SAVED_USER_PROFILE.name}
              </h3>
              <p className="text-xs text-[#9ca3af]">{SAVED_USER_PROFILE.phone}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#9ca3af] hover:text-white hover:bg-[#2a292e] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 px-6 py-3 bg-[#0e0e12] border-b border-[#2a292e] text-center text-xs">
          <div>
            <span className="text-[#9ca3af] block">Rider Rating</span>
            <span className="font-bold text-white">⭐ {SAVED_USER_PROFILE.rating}</span>
          </div>
          <div>
            <span className="text-[#9ca3af] block">Total Trips</span>
            <span className="font-bold text-white">{SAVED_USER_PROFILE.ridesTaken}</span>
          </div>
          <div>
            <span className="text-[#9ca3af] block">Zero Surge Pass</span>
            <span className="font-bold text-[#bef500]">ACTIVE</span>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="flex border-b border-[#2a292e] bg-[#131317]">
          <button
            onClick={() => setActiveSubTab('trips')}
            className={`flex-1 py-3 text-xs font-semibold cursor-pointer border-b-2 transition-all ${
              activeSubTab === 'trips'
                ? 'border-[#bef500] text-[#bef500]'
                : 'border-transparent text-[#9ca3af] hover:text-white'
            }`}
          >
            Past Trips
          </button>
          <button
            onClick={() => setActiveSubTab('places')}
            className={`flex-1 py-3 text-xs font-semibold cursor-pointer border-b-2 transition-all ${
              activeSubTab === 'places'
                ? 'border-[#bef500] text-[#bef500]'
                : 'border-transparent text-[#9ca3af] hover:text-white'
            }`}
          >
            Saved Places
          </button>
          <button
            onClick={() => setActiveSubTab('payments')}
            className={`flex-1 py-3 text-xs font-semibold cursor-pointer border-b-2 transition-all ${
              activeSubTab === 'payments'
                ? 'border-[#bef500] text-[#bef500]'
                : 'border-transparent text-[#9ca3af] hover:text-white'
            }`}
          >
            Payment Methods
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex flex-col gap-3">
          {activeSubTab === 'trips' && (
            <div className="flex flex-col gap-3">
              {SAVED_USER_PROFILE.recentTrips.map((trip) => (
                <div
                  key={trip.id}
                  className="p-3.5 rounded-2xl bg-[#0e0e12] border border-[#2a292e] flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#9ca3af]">{trip.date}</span>
                    <span className="font-display font-bold text-[#bef500]">₹{trip.fare}</span>
                  </div>

                  <div className="flex flex-col gap-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#bef500]" />
                      <span className="text-white font-medium truncate">{trip.from}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#ff5c5c]" />
                      <span className="text-white font-medium truncate">{trip.to}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#1f1f23] text-[11px] text-[#9ca3af]">
                    <span>
                      {trip.tier} • Captain {trip.captain}
                    </span>
                    <span className="text-white font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#bef500]" />
                      {trip.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSubTab === 'places' && (
            <div className="flex flex-col gap-3">
              {SAVED_USER_PROFILE.savedPlaces.map((place, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-[#0e0e12] border border-[#2a292e] flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-[#2a292e] flex items-center justify-center text-[#bef500] shrink-0">
                      <span className="material-symbols-outlined text-[20px]">
                        {place.label === 'Home'
                          ? 'home'
                          : place.label === 'Work'
                          ? 'apartment'
                          : 'fitness_center'}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-white block">{place.label}</span>
                      <span className="text-[11px] text-[#9ca3af] truncate block">
                        {place.address}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectSavedPlace(place.address);
                      onClose();
                    }}
                    className="px-3 py-1 rounded-full bg-[#2a292e] text-white hover:bg-[#bef500] hover:text-[#273500] text-xs font-semibold transition-all cursor-pointer whitespace-nowrap"
                  >
                    Set as Drop
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeSubTab === 'payments' && (
            <div className="flex flex-col gap-3">
              {SAVED_USER_PROFILE.paymentMethods.map((pm, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-[#0e0e12] border border-[#2a292e] flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#bef500] text-[22px]">
                      payments
                    </span>
                    <div>
                      <span className="text-xs font-bold text-white block">{pm.label}</span>
                      <span className="text-[11px] text-[#9ca3af]">{pm.handle}</span>
                    </div>
                  </div>
                  {pm.isDefault ? (
                    <span className="text-[11px] font-bold text-[#bef500]">DEFAULT</span>
                  ) : (
                    <span className="text-[11px] text-[#9ca3af]">Linked</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
