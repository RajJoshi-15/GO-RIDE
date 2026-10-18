import React, { useState } from 'react';
import { FleetTier } from '../types';

interface CaptainPortalScreenProps {
  onBackToRide: () => void;
}

export const CaptainPortalScreen: React.FC<CaptainPortalScreenProps> = ({ onBackToRide }) => {
  const [vehicleType, setVehicleType] = useState<FleetTier>('bike');
  const [dailyHours, setDailyHours] = useState(8);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Bengaluru',
    vehicleNumber: '',
  });

  const calculateEarnings = () => {
    let ratePerHour = 180;
    if (vehicleType === 'bike') ratePerHour = 160;
    if (vehicleType === 'auto') ratePerHour = 220;
    if (vehicleType === 'cab') ratePerHour = 310;

    const daily = dailyHours * ratePerHour;
    const monthly = daily * 26; // 26 working days
    return {
      daily,
      monthly,
    };
  };

  const earnings = calculateEarnings();

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-12 text-[#e4e1e7]">
      {/* Header */}
      <div className="flex flex-col gap-3 max-w-2xl">
        <span className="text-xs uppercase font-bold text-[#bef500] tracking-wider">
          Captain Network Portal
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-white">
          Drive With GoRide. <br />
          <span className="text-[#bef500]">Earn Up To ₹35,000+/Month.</span>
        </h1>
        <p className="text-sm sm:text-base text-[#9ca3af] leading-relaxed">
          Join 45,000+ verified Indian captains. Enjoy daily instant UPI payouts, ₹5 Lakh accident
          insurance, zero commission on your first 30 days, and full freedom to choose your own hours.
        </p>
      </div>

      {/* Main Grid: Calculator & Application Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Earnings Calculator */}
        <div className="lg:col-span-7 rounded-2xl bg-[#1f1f23] border border-[#2a292e] p-6 sm:p-8 flex flex-col gap-6 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-white">Captain Earnings Calculator</h2>
            <span className="px-3 py-1 rounded-full bg-[#bef500]/10 text-[#bef500] text-xs font-bold border border-[#bef500]/30">
              Daily UPI Payouts
            </span>
          </div>

          {/* Select vehicle */}
          <div>
            <label className="text-xs uppercase font-bold text-[#9ca3af] tracking-wider block mb-2">
              Select Your Vehicle Fleet
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'bike' as FleetTier, label: 'Bike / EV Moped', icon: 'two_wheeler' },
                { id: 'auto' as FleetTier, label: 'Auto-Rickshaw', icon: 'electric_rickshaw' },
                { id: 'cab' as FleetTier, label: 'Cab / Sedan', icon: 'local_taxi' },
              ].map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVehicleType(v.id)}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-2 cursor-pointer transition-all ${
                    vehicleType === v.id
                      ? 'bg-[#353439] border-[#bef500] text-[#bef500]'
                      : 'bg-[#0e0e12] border-[#2a292e] text-[#9ca3af] hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-[26px]">{v.icon}</span>
                  <span className="text-xs font-bold text-white text-center">{v.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Hours slider */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-xs text-[#9ca3af]">
              <span>Daily Working Hours</span>
              <span className="text-white font-bold">{dailyHours} Hours / Day</span>
            </div>
            <input
              type="range"
              min="4"
              max="12"
              value={dailyHours}
              onChange={(e) => setDailyHours(Number(e.target.value))}
              className="w-full accent-[#bef500] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#9ca3af]">
              <span>4 hrs (Part-time)</span>
              <span>8 hrs (Standard)</span>
              <span>12 hrs (Peak hustle)</span>
            </div>
          </div>

          {/* Calculated Output Cards */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-[#0e0e12] border border-[#2a292e]">
            <div>
              <span className="text-[11px] text-[#9ca3af] uppercase font-bold block">
                Estimated Daily Take-Home
              </span>
              <span className="font-display text-2xl sm:text-3xl font-extrabold text-[#bef500]">
                ₹{earnings.daily.toLocaleString()}
              </span>
              <span className="text-[10px] text-[#9ca3af] block">Credited every midnight</span>
            </div>
            <div>
              <span className="text-[11px] text-[#9ca3af] uppercase font-bold block">
                Estimated Monthly Income
              </span>
              <span className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                ₹{earnings.monthly.toLocaleString()}
              </span>
              <span className="text-[10px] text-[#bef500] block">Includes bonus targets</span>
            </div>
          </div>

          {/* Key Captain Perks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#9ca3af]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#bef500] text-[18px]">
                verified_user
              </span>
              <span className="text-white">₹5 Lakh Accident Insurance Cover</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#bef500] text-[18px]">
                currency_rupee
              </span>
              <span className="text-white">0% Platform Fee for First 30 Days</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#bef500] text-[18px]">
                battery_charging_full
              </span>
              <span className="text-white">Subsidized EV Battery Swaps</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#bef500] text-[18px]">
                support_agent
              </span>
              <span className="text-white">Dedicated 24/7 Captain Desk</span>
            </div>
          </div>
        </div>

        {/* Right: Instant Application Form */}
        <div className="lg:col-span-5 rounded-2xl bg-[#1f1f23] border border-[#2a292e] p-6 sm:p-8 flex flex-col gap-5 shadow-xl">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#bef500] text-[24px]">
              badge
            </span>
            <h3 className="font-display text-xl font-bold text-white">
              Instant Captain Registration
            </h3>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-[#0e0e12] border border-[#bef500]/50 text-center flex flex-col items-center gap-3 animate-fadeIn">
              <div className="w-12 h-12 rounded-full bg-[#bef500]/20 text-[#bef500] flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px]">check_circle</span>
              </div>
              <h4 className="font-display text-lg font-bold text-white">
                Application Received, {formData.name}!
              </h4>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                Our onboarding team in {formData.city} has sent an SMS verification to{' '}
                <strong className="text-white">{formData.phone}</strong>. Please visit the nearest
                GoRide Hub for physical vehicle inspection.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs text-[#bef500] hover:underline cursor-pointer"
              >
                Register another vehicle
              </button>
            </div>
          ) : (
            <form onSubmit={handleApply} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-semibold text-[#9ca3af] block mb-1">
                  Full Name (As per Aadhaar)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0e0e12] border border-[#2a292e] text-xs text-white focus:outline-none focus:border-[#bef500]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#9ca3af] block mb-1">
                  Mobile Number (Linked with UPI)
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0e0e12] border border-[#2a292e] text-xs text-white focus:outline-none focus:border-[#bef500]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#9ca3af] block mb-1">
                    Operating Metro
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0e0e12] border border-[#2a292e] text-xs text-white focus:outline-none focus:border-[#bef500]"
                  >
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Indore">Indore</option>
                    <option value="Bhopal">Bhopal</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Hyderabad">Hyderabad</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#9ca3af] block mb-1">
                    Vehicle Number
                  </label>
                  <input
                    type="text"
                    placeholder="KA-01-XX-0000"
                    value={formData.vehicleNumber}
                    onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0e0e12] border border-[#2a292e] text-xs text-white focus:outline-none focus:border-[#bef500]"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#0e0e12] border border-[#2a292e] text-[11px] text-[#9ca3af] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#bef500] text-[16px]">
                  lock
                </span>
                <span>Requires Driving License &amp; RC Book upload at next step</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#bef500] text-[#273500] font-display text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(190,245,0,0.3)] hover:opacity-90 active:scale-95 transition-all cursor-pointer"
              >
                Submit &amp; Start Onboarding
              </button>
            </form>
          )}

          <button
            type="button"
            onClick={onBackToRide}
            className="text-center text-xs text-[#9ca3af] hover:text-white transition-colors cursor-pointer pt-2"
          >
            ← Back to Rider Booking
          </button>
        </div>
      </div>
    </div>
  );
};
