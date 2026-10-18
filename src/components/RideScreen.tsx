import React, { useState } from 'react';
import {
  CITIES_DATA,
  VEHICLE_OPTIONS,
  DEFAULT_CAPTAIN,
  REVIEWS_AND_STATS,
  MAP_BG_IMAGE,
} from '../data/mockData';
import { FleetTier, MetroCity } from '../types';

interface RideScreenProps {
  currentCity: MetroCity;
  onCityChange: (city: MetroCity) => void;
  onStartBooking: (tier: FleetTier, pickup: string, drop: string, paymentMethod: string) => void;
  onOpenCaptainTab: () => void;
  onOpenGetApp: () => void;
  onOpenSafetyTab: () => void;
  onOpenCitiesTab: () => void;
}

export const RideScreen: React.FC<RideScreenProps> = ({
  currentCity,
  onCityChange,
  onStartBooking,
  onOpenCaptainTab,
  onOpenGetApp,
  onOpenSafetyTab,
  onOpenCitiesTab,
}) => {
  const [pickup, setPickup] = useState(currentCity.defaultPickup);
  const [drop, setDrop] = useState(currentCity.defaultDrop);
  const [selectedTier, setSelectedTier] = useState<FleetTier>('bike');
  const [paymentMethod, setPaymentMethod] = useState('UPI / GPay / PhonePe');
  const [showPaymentMenu, setShowPaymentMenu] = useState(false);
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropSuggestions, setShowDropSuggestions] = useState(false);
  const [promoApplied, setPromoApplied] = useState(true);
  const [isLocating, setIsLocating] = useState(false);
  const [locatingToast, setLocatingToast] = useState(false);

  // When city changes from props, synchronize defaults if not manually altered
  const handleCitySelect = (city: MetroCity) => {
    onCityChange(city);
    setPickup(city.defaultPickup);
    setDrop(city.defaultDrop);
  };

  const handleSwap = () => {
    const temp = pickup;
    setPickup(drop);
    setDrop(temp);
  };

  const handleGeolocate = () => {
    setIsLocating(true);
    setTimeout(() => {
      setIsLocating(false);
      setPickup(`Near Sony Signal, ${currentCity.name}`);
    }, 600);
  };

  const handleBookClick = () => {
    setLocatingToast(true);
    setTimeout(() => {
      setLocatingToast(false);
      onStartBooking(selectedTier, pickup, drop, paymentMethod);
    }, 1200);
  };

  const handleTierBookFromShowcase = (tierId: FleetTier) => {
    setSelectedTier(tierId);
    const element = document.getElementById('booking-panel');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col w-full text-[#e4e1e7]">
      {/* Ambient glow mesh */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[580px] h-[580px] bg-[#bef500]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-[600px] -right-20 w-[420px] h-[420px] bg-[#bef500]/5 rounded-full blur-[120px] pointer-events-none" />

        {/* HERO SECTION */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-14">
          {/* Live Traffic Pill & Ticker */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1f1f23] border border-[#2a292e] shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#bef500] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#bef500]" />
              </span>
              <span className="text-xs font-bold text-[#bef500] tracking-wide uppercase">
                LIVE
              </span>
              <span className="text-xs text-[#9ca3af]">
                {REVIEWS_AND_STATS.activeRides} active rides in progress across Indian metros
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-[#9ca3af] text-xs uppercase tracking-wider font-semibold">
              <span className="material-symbols-outlined text-[16px] text-[#bef500]">bolt</span>
              <span>{currentCity.status}</span>
            </div>
          </div>

          {/* Hero Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Copy & Interactive Booking Module */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white leading-tight">
                  Your City. <br className="hidden sm:inline" />
                  Your Rules. <br />
                  <span className="text-[#bef500] drop-shadow-[0_0_24px_rgba(190,245,0,0.35)]">
                    Your Ride.
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-[#9ca3af] max-w-xl leading-relaxed">
                  Beat the traffic, save your time, and ride your way. Your next hyper-speed journey
                  is just one tap away across Bengaluru, Indore, Bhopal, and 50+ Indian cities.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#booking-panel"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#bef500] text-[#273500] text-sm font-bold shadow-[0_0_30px_rgba(190,245,0,0.35)] hover:bg-[#bef500]/90 active:scale-95 transition-all"
                >
                  <span>Book a Ride Now</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </a>
                <button
                  onClick={onOpenCaptainTab}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#1f1f23] text-white text-sm font-semibold border border-[#2a292e] hover:bg-[#2a292e] hover:border-[#bef500]/50 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[#bef500] text-[20px]">
                    sports_motorsports
                  </span>
                  <span>
                    Become a Captain{' '}
                    <span className="text-[#bef500] font-bold">(Earn up to ₹35k/mo)</span>
                  </span>
                </button>
              </div>

              {/* Trust Badges Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 rounded-2xl bg-[#1b1b1f] border border-[#2a292e] shadow-sm">
                <div className="flex items-center gap-2.5 p-2">
                  <span className="material-symbols-outlined text-[#bef500] text-[22px]">bolt</span>
                  <div>
                    <div className="text-xs font-bold text-white">2-Min Pickups</div>
                    <div className="text-[11px] text-[#9ca3af]">Instant matching</div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 p-2">
                  <span className="material-symbols-outlined text-[#bef500] text-[22px]">
                    verified
                  </span>
                  <div>
                    <div className="text-xs font-bold text-white">100% Verified</div>
                    <div className="text-[11px] text-[#9ca3af]">Aadhaar + Police</div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 p-2">
                  <span className="material-symbols-outlined text-[#bef500] text-[22px]">
                    currency_rupee
                  </span>
                  <div>
                    <div className="text-xs font-bold text-white">Lowest Fare</div>
                    <div className="text-[11px] text-[#9ca3af]">Lock Guarantee</div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 p-2">
                  <span className="material-symbols-outlined text-[#bef500] text-[22px]">star</span>
                  <div>
                    <div className="text-xs font-bold text-white">4.8 / 5 Rating</div>
                    <div className="text-[11px] text-[#9ca3af]">20M+ Rides Done</div>
                  </div>
                </div>
              </div>

              {/* Interactive Booking Panel Card */}
              <div
                id="booking-panel"
                className="rounded-2xl bg-[#1f1f23] p-5 sm:p-6 shadow-xl border border-[#2a292e] relative overflow-visible"
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#bef500] text-[22px]">
                      directions_bike
                    </span>
                    <span className="font-display text-lg font-bold text-white uppercase tracking-tight">
                      Quick Ride Dispatch
                    </span>
                  </div>
                  {promoApplied && (
                    <div className="flex items-center gap-1.5 bg-[#2a292e] px-3 py-1 rounded-full border border-[#bef500]/30">
                      <span className="material-symbols-outlined text-[#bef500] text-[14px]">
                        local_fire_department
                      </span>
                      <span className="text-[11px] text-[#bef500] font-bold">
                        FIRST50: 50% OFF Applied
                      </span>
                    </div>
                  )}
                </div>

                {/* Metro City Quick Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4 no-scrollbar">
                  <span className="text-xs text-[#9ca3af] uppercase font-bold tracking-wider shrink-0 pr-1">
                    Metro:
                  </span>
                  {CITIES_DATA.map((city) => {
                    const isSelected = currentCity.id === city.id;
                    return (
                      <button
                        key={city.id}
                        type="button"
                        onClick={() => handleCitySelect(city)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#bef500] text-[#273500] font-bold shadow-sm'
                            : 'bg-[#2a292e] text-[#9ca3af] hover:text-white hover:bg-[#353439]'
                        }`}
                      >
                        {city.name}
                      </button>
                    );
                  })}
                </div>

                {/* Route Inputs with Swap & Location */}
                <div className="flex flex-col gap-2 relative mb-4">
                  {/* Pickup */}
                  <div className="relative">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0e0e12] border border-[#2a292e] focus-within:border-[#bef500]">
                      <span className="w-3 h-3 rounded-full bg-[#bef500] shrink-0 animate-pulse" />
                      <div className="flex-1 min-w-0">
                        <label className="text-[10px] text-[#9ca3af] uppercase font-semibold block">
                          Pickup Location
                        </label>
                        <input
                          type="text"
                          value={pickup}
                          onChange={(e) => setPickup(e.target.value)}
                          onFocus={() => setShowPickupSuggestions(true)}
                          className="w-full bg-transparent text-sm font-medium text-white focus:outline-none truncate"
                          placeholder="Search pickup location..."
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleGeolocate}
                        className="text-[#9ca3af] hover:text-[#bef500] p-1.5 rounded-lg bg-[#1f1f23] transition-colors cursor-pointer"
                        title="Detect Current Location"
                      >
                        <span
                          className={`material-symbols-outlined text-[18px] ${
                            isLocating ? 'animate-spin text-[#bef500]' : ''
                          }`}
                        >
                          my_location
                        </span>
                      </button>
                    </div>

                    {/* Suggestions dropdown */}
                    {showPickupSuggestions && (
                      <div className="absolute top-full left-0 right-0 mt-1 z-20 bg-[#1b1b1f] border border-[#353439] rounded-xl shadow-2xl p-2 max-h-48 overflow-y-auto">
                        <div className="flex items-center justify-between px-2 py-1 text-[11px] text-[#9ca3af] font-semibold">
                          <span>POPULAR IN {currentCity.name.toUpperCase()}</span>
                          <button
                            type="button"
                            onClick={() => setShowPickupSuggestions(false)}
                            className="text-[#bef500] hover:underline"
                          >
                            Close
                          </button>
                        </div>
                        {currentCity.hotspots.map((spot, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              setPickup(spot);
                              setShowPickupSuggestions(false);
                            }}
                            className="w-full text-left px-3 py-2 text-xs text-white hover:bg-[#2a292e] rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px] text-[#bef500]">
                              location_on
                            </span>
                            <span>{spot}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Swap Button Absolute */}
                  <div className="absolute right-10 top-1/2 -translate-y-1/2 z-10">
                    <button
                      type="button"
                      onClick={handleSwap}
                      className="w-8 h-8 rounded-full bg-[#353439] border border-[#434933] flex items-center justify-center text-[#bef500] hover:rotate-180 transition-transform shadow-md cursor-pointer"
                      title="Swap Pickup and Drop"
                    >
                      <span className="material-symbols-outlined text-[18px]">swap_vert</span>
                    </button>
                  </div>

                  {/* Drop-off */}
                  <div className="relative">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0e0e12] border border-[#2a292e] focus-within:border-[#bef500]">
                      <span className="material-symbols-outlined text-[#ff5c5c] text-[18px] shrink-0">
                        location_on
                      </span>
                      <div className="flex-1 min-w-0">
                        <label className="text-[10px] text-[#9ca3af] uppercase font-semibold block">
                          Drop Location
                        </label>
                        <input
                          type="text"
                          value={drop}
                          onChange={(e) => setDrop(e.target.value)}
                          onFocus={() => setShowDropSuggestions(true)}
                          className="w-full bg-transparent text-sm font-medium text-white focus:outline-none truncate"
                          placeholder="Where do you want to go?"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setDrop('')}
                        className="text-[#9ca3af] hover:text-white p-1.5 rounded-lg bg-[#1f1f23] transition-colors cursor-pointer"
                        title="Clear Input"
                      >
                        <span className="material-symbols-outlined text-[18px]">close</span>
                      </button>
                    </div>

                    {showDropSuggestions && (
                      <div className="absolute top-full left-0 right-0 mt-1 z-20 bg-[#1b1b1f] border border-[#353439] rounded-xl shadow-2xl p-2 max-h-48 overflow-y-auto">
                        <div className="flex items-center justify-between px-2 py-1 text-[11px] text-[#9ca3af] font-semibold">
                          <span>FAST DROP HUBS</span>
                          <button
                            type="button"
                            onClick={() => setShowDropSuggestions(false)}
                            className="text-[#bef500] hover:underline"
                          >
                            Close
                          </button>
                        </div>
                        {currentCity.hotspots.map((spot, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              setDrop(spot);
                              setShowDropSuggestions(false);
                            }}
                            className="w-full text-left px-3 py-2 text-xs text-white hover:bg-[#2a292e] rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px] text-[#bef500]">
                              near_me
                            </span>
                            <span>{spot}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Fleet Tier Selector */}
                <div className="text-xs uppercase font-bold text-[#9ca3af] tracking-wider mb-2">
                  Select Fleet Tier
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                  {VEHICLE_OPTIONS.map((tier) => {
                    const isSelected = selectedTier === tier.id;
                    return (
                      <div
                        key={tier.id}
                        onClick={() => setSelectedTier(tier.id)}
                        className={`cursor-pointer p-4 rounded-xl border transition-all flex flex-col justify-between group ${
                          isSelected
                            ? 'bg-[#353439] border-[#bef500] shadow-md ring-1 ring-[#bef500]/50'
                            : 'bg-[#1b1b1f] border-[#2a292e] hover:bg-[#2a292e]'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                isSelected
                                  ? 'bg-[#bef500] text-[#273500]'
                                  : 'bg-[#2a292e] text-[#9ca3af]'
                              }`}
                            >
                              {tier.badge}
                            </span>
                            <h3 className="font-display text-base font-bold text-white mt-2">
                              {tier.name}
                            </h3>
                            <p
                              className={`text-xs font-semibold ${
                                isSelected ? 'text-[#bef500]' : 'text-[#9ca3af]'
                              }`}
                            >
                              ⚡ {tier.eta}
                            </p>
                          </div>
                          <span
                            className={`material-symbols-outlined text-[28px] transition-transform group-hover:scale-110 ${
                              isSelected ? 'text-[#bef500]' : 'text-[#9ca3af]'
                            }`}
                          >
                            {tier.iconName}
                          </span>
                        </div>

                        <div className="mt-4 pt-1 flex items-baseline justify-between border-t border-[#2a292e]">
                          <span className="font-display text-xl font-bold text-white">
                            ₹{tier.price}
                          </span>
                          <span className="text-xs text-[#9ca3af] line-through">
                            ₹{tier.originalPrice}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#9ca3af] mt-1 truncate">
                          {tier.id === 'bike'
                            ? 'Disinfected helmet included'
                            : tier.id === 'auto'
                            ? 'Upfront meter-free lock'
                            : 'Sedan / Prime 4 seats'}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Payment Selection & Dispatch Trigger */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                  {/* Payment Dropdown */}
                  <div className="relative w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setShowPaymentMenu(!showPaymentMenu)}
                      className="w-full sm:w-auto flex items-center justify-between gap-2 px-4 py-2.5 rounded-full bg-[#0e0e12] border border-[#2a292e] hover:border-[#bef500]/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#bef500] text-[18px]">
                          payments
                        </span>
                        <span className="text-xs font-semibold text-white whitespace-nowrap">
                          {paymentMethod}
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-[#9ca3af] text-[16px]">
                        expand_more
                      </span>
                    </button>

                    {showPaymentMenu && (
                      <div className="absolute bottom-full mb-2 left-0 w-60 bg-[#1b1b1f] border border-[#353439] rounded-xl shadow-2xl p-2 z-20">
                        <div className="text-[11px] font-bold text-[#9ca3af] px-2 py-1 uppercase">
                          Choose Payment Option
                        </div>
                        {['UPI / GPay / PhonePe', 'Paytm UPI / QR', 'Direct Cash at End'].map(
                          (m) => (
                            <button
                              key={m}
                              type="button"
                              onClick={() => {
                                setPaymentMethod(m);
                                setShowPaymentMenu(false);
                              }}
                              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                                paymentMethod === m
                                  ? 'bg-[#353439] text-[#bef500]'
                                  : 'text-white hover:bg-[#2a292e]'
                              }`}
                            >
                              {m}
                            </button>
                          )
                        )}
                      </div>
                    )}
                  </div>

                  {/* Primary Find GoRide Button */}
                  <button
                    type="button"
                    onClick={handleBookClick}
                    className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#bef500] text-[#273500] font-display text-sm sm:text-base font-bold shadow-[0_0_24px_rgba(190,245,0,0.4)] hover:brightness-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                  >
                    <span>Find My GoRide</span>
                    <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
                  </button>
                </div>

                {/* Micro-interaction feedback toast */}
                {locatingToast && (
                  <div className="mt-3 p-3 rounded-xl bg-[#2a292e] text-[#bef500] text-xs font-semibold flex items-center gap-2 animate-fadeIn border border-[#bef500]/40">
                    <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
                    <span>
                      Locating nearest top-rated Captain in {currentCity.name} (ETA ~90s)...
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Captain Card & Route Telemetry */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {/* Verified GoRide Captain Card */}
              <div className="relative rounded-2xl overflow-hidden bg-[#1b1b1f] border border-[#2a292e] shadow-xl">
                <div className="relative h-80 sm:h-96 w-full overflow-hidden">
                  <img
                    alt="Verified GoRide Captain Rahul S."
                    className="w-full h-full object-cover object-top filter brightness-95 transition-transform duration-700 hover:scale-105"
                    src={DEFAULT_CAPTAIN.photoUrl}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131317] via-[#131317]/40 to-transparent" />

                  {/* Top Overlay: Live GPS Track Pill */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1f1f23]/90 backdrop-blur-md border border-[#353439]">
                      <span className="w-2 h-2 rounded-full bg-[#bef500] animate-ping" />
                      <span className="text-xs text-white font-bold tracking-wider">
                        RADAR: {DEFAULT_CAPTAIN.vehicleNumber}
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#bef500] text-[#273500] text-xs font-bold shadow-sm">
                      <span>EV Fleet</span>
                      <span className="material-symbols-outlined text-[14px]">electric_bolt</span>
                    </div>
                  </div>

                  {/* Captain Profile Box */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#1f1f23]/95 backdrop-blur-md border border-[#2a292e] shadow-lg">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-display text-base font-bold text-white">
                            {DEFAULT_CAPTAIN.name}
                          </span>
                          <span className="material-symbols-outlined text-[#bef500] text-[18px]">
                            verified
                          </span>
                        </div>
                        <div className="text-xs text-[#9ca3af]">
                          {DEFAULT_CAPTAIN.vehicleModel} • {DEFAULT_CAPTAIN.tripsCount}
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#2a292e] border border-[#353439]">
                          <span className="material-symbols-outlined text-[#bef500] text-[16px]">
                            star
                          </span>
                          <span className="text-xs font-bold text-white">
                            {DEFAULT_CAPTAIN.rating}
                          </span>
                        </div>
                        <span className="text-[11px] text-[#bef500] font-medium mt-1">
                          {DEFAULT_CAPTAIN.statusText}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Real-Time Dynamic Route Telemetry Card */}
              <div className="rounded-2xl bg-[#1f1f23] p-4 sm:p-5 border border-[#2a292e] shadow-md flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold text-[#9ca3af] tracking-wider">
                    Active Route Analytics
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#2a292e] text-[#bef500] text-xs font-bold border border-[#bef500]/30">
                    Saves {currentCity.carEtaMin - currentCity.bikeEtaMin} mins vs Car
                  </span>
                </div>

                {/* SVG Route Simulation Graphic */}
                <div className="relative w-full h-32 rounded-xl bg-[#0e0e12] border border-[#2a292e] overflow-hidden flex items-center justify-center p-3">
                  <svg
                    className="w-full h-full text-[#bef500]"
                    fill="none"
                    viewBox="0 0 400 120"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Grid dots */}
                    <circle cx="50" cy="30" fill="currentColor" fillOpacity="0.2" r="1.5" />
                    <circle cx="150" cy="30" fill="currentColor" fillOpacity="0.2" r="1.5" />
                    <circle cx="250" cy="30" fill="currentColor" fillOpacity="0.2" r="1.5" />
                    <circle cx="350" cy="30" fill="currentColor" fillOpacity="0.2" r="1.5" />
                    <circle cx="50" cy="90" fill="currentColor" fillOpacity="0.2" r="1.5" />
                    <circle cx="150" cy="90" fill="currentColor" fillOpacity="0.2" r="1.5" />
                    <circle cx="250" cy="90" fill="currentColor" fillOpacity="0.2" r="1.5" />
                    <circle cx="350" cy="90" fill="currentColor" fillOpacity="0.2" r="1.5" />

                    {/* Alternative Car Route (Heavy Red Traffic) */}
                    <path
                      d="M 40 85 C 100 85, 140 100, 200 100 C 260 100, 310 40, 360 35"
                      stroke="#ff5c5c"
                      strokeDasharray="4 4"
                      strokeWidth="2.5"
                    />

                    {/* GoBike Hyper Path (Luminous Lime) */}
                    <path
                      d="M 40 85 C 90 40, 160 50, 230 40 C 290 30, 320 35, 360 35"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="3"
                    />

                    {/* Start Point */}
                    <circle cx="40" cy="85" fill="currentColor" r="5" />
                    {/* Destination Point */}
                    <circle cx="360" cy="35" fill="#ffffff" r="5" />

                    {/* Moving Transit Node */}
                    <circle cx="230" cy="40" fill="currentColor" fillOpacity="0.3" r="7">
                      <animate
                        attributeName="r"
                        dur="2s"
                        repeatCount="indefinite"
                        values="4;9;4"
                      />
                    </circle>
                    <circle cx="230" cy="40" fill="#0D0D11" r="3" />
                  </svg>

                  {/* Route overlay chips */}
                  <div className="absolute bottom-2 left-3 text-[11px] text-[#9ca3af] bg-[#131317]/90 px-2 py-0.5 rounded border border-[#2a292e]">
                    {pickup.split(',')[0]}
                  </div>
                  <div className="absolute top-2 right-3 text-[11px] text-[#bef500] font-semibold bg-[#131317]/90 px-2 py-0.5 rounded border border-[#bef500]/40">
                    {drop.split(',')[0]}
                  </div>
                </div>

                {/* Route Metrics */}
                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="p-2 rounded-xl bg-[#1b1b1f] border border-[#2a292e]">
                    <span className="text-[11px] text-[#9ca3af] block">Distance</span>
                    <span className="font-display text-sm sm:text-base font-bold text-white">
                      {currentCity.distanceKm} km
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#1b1b1f] border border-[#bef500]/30">
                    <span className="text-[11px] text-[#9ca3af] block">GoBike ETA</span>
                    <span className="font-display text-sm sm:text-base font-bold text-[#bef500]">
                      {currentCity.bikeEtaMin} mins
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#1b1b1f] border border-[#ff5c5c]/30">
                    <span className="text-[11px] text-[#9ca3af] block">Car Cab ETA</span>
                    <span className="font-display text-sm sm:text-base font-bold text-[#ff5c5c]">
                      {currentCity.carEtaMin} mins
                    </span>
                  </div>
                </div>

                {/* Corridor telemetry notes */}
                <div className="flex items-center justify-between text-[#9ca3af] text-[11px] pt-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#bef500]" />
                    Sony Signal: Green wave priority
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#bef500]" />
                    Intermediate Flyover clear
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* SECTION A: How GoRide Works */}
      <section className="w-full bg-[#0e0e12] py-16 border-y border-[#1f1f23]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs uppercase font-bold text-[#bef500] tracking-wider">
                Rapid Flow Technology
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-white mt-1">
                How GoRide Works
              </h2>
            </div>
            <p className="text-sm text-[#9ca3af] max-w-md">
              Zero phone calls from drivers asking &ldquo;Kaha jaana hai?&rdquo; (Where do you want
              to go?). Upfront destination clarity and instantaneous dispatch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-[#1f1f23] border border-[#2a292e] flex flex-col gap-4 shadow-md hover:-translate-y-1 transition-all">
              <div className="flex items-center justify-between">
                <span className="font-display text-4xl text-[#bef500]/20 font-bold">01</span>
                <div className="w-12 h-12 rounded-full bg-[#2a292e] flex items-center justify-center text-[#bef500]">
                  <span className="material-symbols-outlined text-[26px]">pin_drop</span>
                </div>
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-white">Set Drop Location</h3>
                <p className="text-sm text-[#9ca3af] mt-2 leading-relaxed">
                  Smart auto-complete preloaded with metro gates, tech parks (Manyata, Cyber City),
                  residential societies, and transit hubs across 50+ cities.
                </p>
              </div>
              <div className="p-2 rounded-xl bg-[#0e0e12] text-[#9ca3af] text-xs flex items-center gap-2 mt-auto border border-[#2a292e]">
                <span className="material-symbols-outlined text-[#bef500] text-[16px]">
                  touch_app
                </span>
                <span>Single-tap saved favorites: Home, Work, Gym</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-[#1f1f23] border border-[#bef500]/40 flex flex-col gap-4 shadow-md hover:-translate-y-1 transition-all">
              <div className="flex items-center justify-between">
                <span className="font-display text-4xl text-[#bef500] font-bold">02</span>
                <div className="w-12 h-12 rounded-full bg-[#bef500] text-[#273500] flex items-center justify-center shadow-[0_0_16px_rgba(190,245,0,0.3)]">
                  <span className="material-symbols-outlined text-[26px]">electric_moped</span>
                </div>
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-white">Pick Your Vehicle</h3>
                <p className="text-sm text-[#9ca3af] mt-2 leading-relaxed">
                  Choose GoBike for single-seater agility through traffic, GoAuto for breezy group
                  rides, or GoCab Prime for silent AC comfort. Upfront fixed price.
                </p>
              </div>
              <div className="p-2 rounded-xl bg-[#0e0e12] text-[#9ca3af] text-xs flex items-center gap-2 mt-auto border border-[#2a292e]">
                <span className="material-symbols-outlined text-[#bef500] text-[16px]">lock</span>
                <span>Locked fares: Zero surprise meter hikes</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-[#1f1f23] border border-[#2a292e] flex flex-col gap-4 shadow-md hover:-translate-y-1 transition-all">
              <div className="flex items-center justify-between">
                <span className="font-display text-4xl text-[#bef500]/20 font-bold">03</span>
                <div className="w-12 h-12 rounded-full bg-[#2a292e] flex items-center justify-center text-[#bef500]">
                  <span className="material-symbols-outlined text-[26px]">phonelink_ring</span>
                </div>
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-white">Hop On &amp; Pay Free</h3>
                <p className="text-sm text-[#9ca3af] mt-2 leading-relaxed">
                  Share your 4-digit biometric OTP, grab your sanitized helmet, monitor real-time
                  telematics, and pay via any UPI app or cash at ride completion.
                </p>
              </div>
              <div className="p-2 rounded-xl bg-[#0e0e12] text-[#9ca3af] text-xs flex items-center gap-2 mt-auto border border-[#2a292e]">
                <span className="material-symbols-outlined text-[#bef500] text-[16px]">
                  verified_user
                </span>
                <span>Live emergency SOS &amp; trip broadcast link</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION B: Vehicle Fleet Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold text-[#bef500] tracking-wider">
            Tailored For Indian Road Realities
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-white mt-1">
            Choose Your Fleet Weapon
          </h2>
          <p className="text-sm text-[#9ca3af] mt-2">
            Whether you are racing to Silk Board or heading comfortably to the airport, GoRide
            deploys the ideal vehicle configuration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VEHICLE_OPTIONS.map((tier) => (
            <div
              key={tier.id}
              className="rounded-2xl bg-[#1f1f23] border border-[#2a292e] p-6 shadow-md flex flex-col justify-between group hover:border-[#bef500]/50 hover:bg-[#25252a] transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-[#2a292e] text-[#bef500]">
                    <span className="material-symbols-outlined text-[32px]">
                      {tier.iconName}
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#bef500] text-[#273500] text-xs font-bold uppercase">
                    {tier.capacity}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-white">{tier.name}</h3>
                <p className="text-xs text-[#bef500] font-bold mt-1">{tier.baseRateText}</p>
                <p className="text-sm text-[#9ca3af] mt-3 leading-relaxed">{tier.description}</p>

                <ul className="flex flex-col gap-2 mt-5 text-xs text-[#e4e1e7]">
                  {tier.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#bef500] text-[18px]">
                        check_circle
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-[#2a292e]">
                <div className="p-3 rounded-xl bg-[#0e0e12] mb-4 flex items-center justify-between border border-[#2a292e]">
                  <span className="text-xs text-[#9ca3af]">{tier.popularRouteSample.route}</span>
                  <span className="font-display text-base font-bold text-[#bef500]">
                    ~ ₹{tier.popularRouteSample.fare}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleTierBookFromShowcase(tier.id)}
                  className="w-full py-3 rounded-full bg-[#2a292e] text-white text-xs font-bold group-hover:bg-[#bef500] group-hover:text-[#273500] transition-all cursor-pointer shadow-sm"
                >
                  Book {tier.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION C: Why Riders Refuse Everything Else */}
      <section className="w-full bg-[#0e0e12] py-16 border-y border-[#1f1f23]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col gap-1 mb-12">
            <span className="text-xs uppercase font-bold text-[#bef500] tracking-wider">
              Engineered For Everyday Indian Commuters
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-white">
              Why Riders Refuse Everything Else
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#1f1f23] border border-[#2a292e] shadow-md flex flex-col gap-2.5">
              <div className="w-12 h-12 rounded-full bg-[#2a292e] flex items-center justify-center text-[#bef500]">
                <span className="material-symbols-outlined text-[26px]">timer</span>
              </div>
              <h3 className="font-display text-base font-bold text-white">
                Lightning Pickups (&lt; 3 Mins)
              </h3>
              <p className="text-sm text-[#9ca3af] leading-relaxed">
                Our predictive geospatial algorithm dispatches captains cruising right around your
                street corner before you even hit confirm.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#1f1f23] border border-[#2a292e] shadow-md flex flex-col gap-2.5">
              <div className="w-12 h-12 rounded-full bg-[#2a292e] flex items-center justify-center text-[#bef500]">
                <span className="material-symbols-outlined text-[26px]">price_check</span>
              </div>
              <h3 className="font-display text-base font-bold text-white">
                Zero Surge Pricing Shocks
              </h3>
              <p className="text-sm text-[#9ca3af] leading-relaxed">
                Rain or shine, evening office hours or weekend parties—the fare you see on the
                screen is exactly what you pay. No 3x multiplier traps.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#1f1f23] border border-[#2a292e] shadow-md flex flex-col gap-2.5">
              <div className="w-12 h-12 rounded-full bg-[#2a292e] flex items-center justify-center text-[#bef500]">
                <span className="material-symbols-outlined text-[26px]">badge</span>
              </div>
              <h3 className="font-display text-base font-bold text-white">
                100% Background-Checked Captains
              </h3>
              <p className="text-sm text-[#9ca3af] leading-relaxed">
                Aadhaar bio-verification, physical driving license authenticity tests, vehicle
                fitness checks, and city police clearance records.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#1f1f23] border border-[#2a292e] shadow-md flex flex-col gap-2.5">
              <div className="w-12 h-12 rounded-full bg-[#2a292e] flex items-center justify-center text-[#bef500]">
                <span className="material-symbols-outlined text-[26px]">security</span>
              </div>
              <h3 className="font-display text-base font-bold text-white">
                Live Telematics &amp; 24/7 SOS
              </h3>
              <p className="text-sm text-[#9ca3af] leading-relaxed">
                One-tap emergency call center dispatch, automatic route deviation alarms, and
                instantaneous live WhatsApp GPS tracking for your family.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#1f1f23] border border-[#2a292e] shadow-md flex flex-col gap-2.5">
              <div className="w-12 h-12 rounded-full bg-[#2a292e] flex items-center justify-center text-[#bef500]">
                <span className="material-symbols-outlined text-[26px]">qr_code_scanner</span>
              </div>
              <h3 className="font-display text-base font-bold text-white">
                Instant UPI &amp; Cash Freedom
              </h3>
              <p className="text-sm text-[#9ca3af] leading-relaxed">
                Scan Captain&apos;s static QR code via GPay, PhonePe, Paytm, BHIM, or hand over
                exact paper currency. Zero wallet locks or hidden cancellation fees.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#1f1f23] border border-[#2a292e] shadow-md flex flex-col gap-2.5">
              <div className="w-12 h-12 rounded-full bg-[#2a292e] flex items-center justify-center text-[#bef500]">
                <span className="material-symbols-outlined text-[26px]">support_agent</span>
              </div>
              <h3 className="font-display text-base font-bold text-white">
                24/7 Indian Multilingual Support
              </h3>
              <p className="text-sm text-[#9ca3af] leading-relaxed">
                In-app voice &amp; chat resolution in Hindi, Kannada, Telugu, Tamil, Marathi, and
                English. Speak directly with real humans who resolve within 60s.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION D: Active Metro Transit Zones & EV Impact */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Interactive City Transit Card */}
          <div className="lg:col-span-7 rounded-2xl bg-[#1f1f23] border border-[#2a292e] p-6 shadow-xl flex flex-col justify-between gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs uppercase font-bold text-[#bef500] tracking-wider">
                  Urban Grid Expansion
                </span>
                <h3 className="font-display text-xl font-bold text-white">
                  Active Metro Transit Zones
                </h3>
              </div>
              <div className="px-3 py-1 rounded-full bg-[#2a292e] text-white text-xs font-semibold border border-[#353439]">
                50+ Cities Live
              </div>
            </div>

            {/* Stylized Map Viewport */}
            <div
              className="w-full h-72 rounded-xl bg-cover bg-center relative overflow-hidden shadow-inner flex items-center justify-center border border-[#2a292e]"
              style={{ backgroundImage: `url('${MAP_BG_IMAGE}')` }}
            >
              <div className="absolute inset-0 bg-[#0e0e12]/80 backdrop-blur-[2px]" />

              {/* Luminous Metro Nodes Overlay */}
              <div className="relative z-10 w-full h-full p-4 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-[#2a292e]/90 text-[#bef500] text-xs font-bold border border-[#bef500]/30">
                    {currentCity.name} Tech Hub Grid
                  </span>
                  <span className="px-2.5 py-1 rounded bg-[#2a292e]/90 text-[#9ca3af] text-xs font-semibold">
                    Real-time Density: High
                  </span>
                </div>

                {/* Visual Nodes on Map */}
                <div className="relative h-32 w-full">
                  {/* Node 1 */}
                  <div className="absolute top-6 left-1/4 flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#bef500] animate-ping absolute" />
                    <span className="w-3 h-3 rounded-full bg-[#bef500] relative" />
                    <span className="bg-[#131317]/95 px-2 py-0.5 rounded text-xs text-white font-bold shadow border border-[#2a292e]">
                      {currentCity.hotspots[0] || 'Zone Alpha'}
                    </span>
                  </div>

                  {/* Node 2 */}
                  <div className="absolute top-12 right-12 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#bef500]" />
                    <span className="bg-[#131317]/95 px-2 py-0.5 rounded text-xs text-[#e4e1e7] shadow border border-[#2a292e]">
                      {currentCity.hotspots[2] || 'Zone Bravo'}
                    </span>
                  </div>

                  {/* Node 3 */}
                  <div className="absolute bottom-6 left-1/2 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#bef500]" />
                    <span className="bg-[#131317]/95 px-2 py-0.5 rounded text-xs text-[#e4e1e7] shadow border border-[#2a292e]">
                      {currentCity.hotspots[1] || 'Zone Charlie'}
                    </span>
                  </div>

                  {/* Connecting Neon Vector */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      stroke="#bef500"
                      strokeDasharray="3 3"
                      strokeWidth="2"
                      x1="28%"
                      x2="52%"
                      y1="28%"
                      y2="70%"
                    />
                    <line
                      stroke="#bef500"
                      strokeDasharray="3 3"
                      strokeWidth="2"
                      x1="52%"
                      x2="85%"
                      y1="70%"
                      y2="45%"
                    />
                  </svg>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {CITIES_DATA.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => handleCitySelect(c)}
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        currentCity.id === c.id
                          ? 'bg-[#bef500] text-[#273500]'
                          : 'bg-[#131317]/90 text-white hover:bg-[#2a292e] border border-[#2a292e]'
                      }`}
                    >
                      📍 {c.name} {c.hotspots[0]?.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#9ca3af] pt-1">
              <span>
                Average match time across all active nodes:{' '}
                <strong className="text-white">{REVIEWS_AND_STATS.averageMatchSeconds}s</strong>
              </span>
              <button
                type="button"
                onClick={onOpenCitiesTab}
                className="text-[#bef500] font-bold hover:underline cursor-pointer"
              >
                Explore full coverage map →
              </button>
            </div>
          </div>

          {/* Eco Impact & App Download Banner */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            {/* Eco Counter Card */}
            <div className="rounded-2xl bg-gradient-to-br from-[#2a292e] to-[#1f1f23] p-6 border border-[#2a292e] shadow-md flex flex-col gap-2.5">
              <div className="flex items-center gap-2 text-[#bef500]">
                <span className="material-symbols-outlined text-[24px]">eco</span>
                <span className="text-xs uppercase font-bold tracking-wider">
                  Shared EV Impact
                </span>
              </div>
              <div className="font-display text-4xl sm:text-5xl font-extrabold text-white">
                {REVIEWS_AND_STATS.co2SavedMT} MT
              </div>
              <p className="text-sm text-[#9ca3af] leading-relaxed">
                CO2 emissions saved this month via our high-efficiency shared GoBike EV taxi fleet.
                Ride green without spending a rupee extra.
              </p>
              <div className="w-full bg-[#0e0e12] h-2.5 rounded-full overflow-hidden mt-1 border border-[#2a292e]">
                <div
                  className="bg-[#bef500] h-full rounded-full transition-all duration-1000"
                  style={{ width: `${REVIEWS_AND_STATS.co2TargetPercent}%` }}
                />
              </div>
              <span className="text-xs text-[#9ca3af] text-right font-medium">
                {REVIEWS_AND_STATS.co2TargetPercent}% of monthly target reached
              </span>
            </div>

            {/* Download Banner Card with Promo & QR Code */}
            <div className="rounded-2xl bg-[#1f1f23] border border-[#2a292e] p-6 shadow-xl relative overflow-hidden flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="px-2 py-0.5 rounded bg-[#bef500] text-[#273500] text-[10px] font-bold uppercase">
                    Welcome Offer
                  </span>
                  <h4 className="font-display text-xl font-bold text-white mt-2">
                    Get ₹100 Flat Off
                  </h4>
                  <p className="text-xs text-[#9ca3af] mt-1">
                    Scan to download and ride your first 3 trips on massive discounts.
                  </p>
                </div>
                {/* QR Code Container */}
                <button
                  type="button"
                  onClick={onOpenGetApp}
                  className="w-18 h-18 p-2 rounded-xl bg-[#0e0e12] border border-[#2a292e] flex items-center justify-center shrink-0 shadow-md hover:border-[#bef500] transition-colors cursor-pointer"
                  title="Click to view QR code"
                >
                  <span className="material-symbols-outlined text-[#bef500] text-[40px]">
                    qr_code_2
                  </span>
                </button>
              </div>

              {/* App Store / Play Store Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={onOpenGetApp}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#2a292e] hover:bg-[#bef500] hover:text-[#273500] text-white text-xs font-bold transition-all cursor-pointer border border-[#353439]"
                >
                  <span className="material-symbols-outlined text-[18px]">shop</span>
                  <span>Google Play</span>
                </button>
                <button
                  type="button"
                  onClick={onOpenGetApp}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#2a292e] hover:bg-[#bef500] hover:text-[#273500] text-white text-xs font-bold transition-all cursor-pointer border border-[#353439]"
                >
                  <span className="material-symbols-outlined text-[18px]">phone_iphone</span>
                  <span>Apple Store</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
