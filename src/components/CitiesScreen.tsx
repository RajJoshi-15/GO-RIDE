import React from 'react';
import { CITIES_DATA } from '../data/mockData';
import { MetroCity } from '../types';

interface CitiesScreenProps {
  currentCity: MetroCity;
  onSelectCity: (city: MetroCity) => void;
  onBookInCity: (city: MetroCity) => void;
}

export const CitiesScreen: React.FC<CitiesScreenProps> = ({
  currentCity,
  onSelectCity,
  onBookInCity,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-12 text-[#e4e1e7]">
      {/* Header */}
      <div className="flex flex-col gap-3 max-w-2xl">
        <span className="text-xs uppercase font-bold text-[#bef500] tracking-wider">
          Urban Grid Expansion
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-white">
          Active Metro Networks
        </h1>
        <p className="text-sm sm:text-base text-[#9ca3af] leading-relaxed">
          GoRide operates across 50+ tier-1 and tier-2 Indian metros with zero surge lock,
          dedicated EV charging docks, and ultra-fast captain matching.
        </p>
      </div>

      {/* Cities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CITIES_DATA.map((city) => {
          const isCurrent = currentCity.id === city.id;
          return (
            <div
              key={city.id}
              className={`rounded-2xl p-6 border transition-all flex flex-col justify-between shadow-lg ${
                isCurrent
                  ? 'bg-[#25252b] border-[#bef500] ring-1 ring-[#bef500]/50'
                  : 'bg-[#1f1f23] border-[#2a292e] hover:border-[#bef500]/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#bef500] text-[24px]">
                      location_city
                    </span>
                    <div>
                      <h2 className="font-display text-xl font-bold text-white">{city.name}</h2>
                      <span className="text-xs text-[#9ca3af]">{city.state}</span>
                    </div>
                  </div>
                  {isCurrent && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#bef500] text-[#273500] text-[10px] font-bold uppercase">
                      Active Metro
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#0e0e12] border border-[#2a292e] mb-4">
                  <span className="material-symbols-outlined text-[#bef500] text-[18px]">bolt</span>
                  <span className="text-xs text-[#e4e1e7] font-semibold">{city.status}</span>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                  <div className="p-2.5 rounded-xl bg-[#131317] border border-[#2a292e]">
                    <span className="text-[10px] text-[#9ca3af] block">Base Fare</span>
                    <span className="font-display text-base font-bold text-white">
                      ₹{city.baseFare}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#131317] border border-[#2a292e]">
                    <span className="text-[10px] text-[#9ca3af] block">EV Share</span>
                    <span className="font-display text-base font-bold text-[#bef500]">
                      {city.evShare}%
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#131317] border border-[#2a292e]">
                    <span className="text-[10px] text-[#9ca3af] block">Active Captains</span>
                    <span className="font-display text-base font-bold text-white">
                      {city.activeCaptains.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#131317] border border-[#2a292e]">
                    <span className="text-[10px] text-[#9ca3af] block">GoBike ETA</span>
                    <span className="font-display text-base font-bold text-[#bef500]">
                      {city.bikeEtaMin} mins
                    </span>
                  </div>
                </div>

                {/* Popular Hotspots */}
                <div className="text-xs">
                  <span className="text-[11px] font-bold text-[#9ca3af] uppercase block mb-1.5">
                    High Frequency Hubs:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {city.hotspots.slice(0, 3).map((h, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-[#131317] text-[#9ca3af] text-[11px] border border-[#2a292e]"
                      >
                        {h.split(' ')[0]}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#2a292e] flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => onSelectCity(city)}
                  className={`text-xs font-semibold cursor-pointer ${
                    isCurrent ? 'text-[#bef500]' : 'text-[#9ca3af] hover:text-white'
                  }`}
                >
                  {isCurrent ? 'Current Selection' : 'Set as Current'}
                </button>
                <button
                  type="button"
                  onClick={() => onBookInCity(city)}
                  className="px-4 py-2 rounded-full bg-[#bef500] text-[#273500] text-xs font-bold hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-sm"
                >
                  Book Ride
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
