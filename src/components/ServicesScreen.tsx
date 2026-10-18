import React, { useState } from 'react';
import { FleetTier } from '../types';

interface ServicesScreenProps {
  onBookTier: (tier: FleetTier) => void;
}

export const ServicesScreen: React.FC<ServicesScreenProps> = ({ onBookTier }) => {
  const [selectedCalcTier, setSelectedCalcTier] = useState<FleetTier>('bike');
  const [calcDistance, setCalcDistance] = useState(8);

  const calculateEstimate = (tier: FleetTier, km: number) => {
    switch (tier) {
      case 'bike':
        return Math.round(19 + km * 6);
      case 'auto':
        return Math.round(29 + km * 11);
      case 'cab':
        return Math.round(59 + km * 14);
      case 'parcel':
        return Math.round(25 + km * 5.5);
      default:
        return 50;
    }
  };

  const services = [
    {
      id: 'bike' as FleetTier,
      title: 'GoBike Fastlane',
      tagline: 'Beat bumper-to-bumper city jams with single-seat agility',
      badge: 'Most Popular',
      priceText: 'From ₹19 Base + ₹6/km',
      icon: 'two_wheeler',
      color: '#bef500',
      bullets: [
        'Guaranteed sanitized ISI helmet with disposable hair caps',
        'Cuts peak rush hour commute times by up to 55%',
        '80%+ of fleets running on zero-emission high efficiency EVs',
        'Instant pickup within 2 minutes in major tech belts',
      ],
    },
    {
      id: 'auto' as FleetTier,
      title: 'GoAuto Meter-Free',
      tagline: 'Upfront lock. No meter arguments or route haggling',
      badge: 'Weather Proof',
      priceText: 'From ₹29 Base + ₹11/km',
      icon: 'electric_rickshaw',
      color: '#bef500',
      bullets: [
        'Guaranteed zero bargaining, no meter tampering',
        'Roll-down rain curtains for sudden Indian monsoons',
        'Comfortable seating for up to 3 passengers plus grocery bags',
        'Direct door-to-door transit into narrow residential lanes',
      ],
    },
    {
      id: 'cab' as FleetTier,
      title: 'GoCab Prime & XL',
      tagline: 'Chilled pre-cooled air conditioning for business and airport',
      badge: 'Executive',
      priceText: 'From ₹59 Base + ₹14/km',
      icon: 'local_taxi',
      color: '#bef500',
      bullets: [
        'Guaranteed pre-cooled climate control at 22°C',
        'Spacious boot space fitting 3 large airport suitcases',
        'Top-rated 4.85+ star captains with clean English/Hindi support',
        '6-seater XL options available for large family outings',
      ],
    },
    {
      id: 'parcel' as FleetTier,
      title: 'GoParcel Express',
      tagline: 'Hyperlocal package & document pickup within 45 mins',
      badge: 'Express Delivery',
      priceText: 'From ₹25 Base + ₹5.5/km',
      icon: 'package_2',
      color: '#bef500',
      bullets: [
        'Secure 4-digit PIN verification upon delivery handover',
        'Live GPS tracking shared with recipient via WhatsApp',
        'Handles packages up to 10 kg safely in weatherproof carriers',
        'Affordable doorstep delivery for local businesses and retail',
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-12 text-[#e4e1e7]">
      {/* Header */}
      <div className="flex flex-col gap-3 max-w-2xl">
        <span className="text-xs uppercase font-bold text-[#bef500] tracking-wider">
          Full Mobility Suite
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-white">
          Our Fleet Services
        </h1>
        <p className="text-sm sm:text-base text-[#9ca3af] leading-relaxed">
          From micro-commutes slicing through peak traffic to pre-cooled airport sedans and instant
          hyperlocal package runs, GoRide powers Indian cities with transparent pricing.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((svc) => (
          <div
            key={svc.id}
            className="rounded-2xl bg-[#1f1f23] border border-[#2a292e] p-6 sm:p-8 flex flex-col justify-between hover:border-[#bef500]/50 transition-all shadow-lg group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#2a292e] flex items-center justify-center text-[#bef500]">
                  <span className="material-symbols-outlined text-[28px]">{svc.icon}</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#bef500]/10 text-[#bef500] text-xs font-bold border border-[#bef500]/30">
                  {svc.badge}
                </span>
              </div>

              <h2 className="font-display text-xl sm:text-2xl font-bold text-white">{svc.title}</h2>
              <p className="text-xs text-[#bef500] font-bold mt-1">{svc.priceText}</p>
              <p className="text-sm text-[#9ca3af] mt-2 leading-relaxed">{svc.tagline}</p>

              <ul className="flex flex-col gap-2.5 mt-6 text-xs sm:text-sm text-[#e4e1e7]">
                {svc.bullets.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#bef500] text-[18px] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-[#2a292e] flex items-center justify-between gap-4">
              <span className="text-xs text-[#9ca3af]">Locked Upfront Fare Guarantee</span>
              <button
                type="button"
                onClick={() => onBookTier(svc.id === 'parcel' ? 'bike' : svc.id)}
                className="px-6 py-2.5 rounded-full bg-[#2a292e] text-white text-xs font-bold group-hover:bg-[#bef500] group-hover:text-[#273500] transition-all cursor-pointer whitespace-nowrap shadow-sm"
              >
                Book {svc.title.split(' ')[0]}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Fare Estimator Calculator */}
      <div className="rounded-3xl bg-[#1b1b1f] border border-[#2a292e] p-6 sm:p-10 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="flex-1 flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#bef500] uppercase tracking-wider">
            <span className="material-symbols-outlined text-[18px]">calculate</span>
            <span>Interactive Estimator</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
            Calculate Your Transit Cost
          </h3>
          <p className="text-sm text-[#9ca3af] leading-relaxed">
            Drag the distance slider to estimate your transparent, zero-surge locked fare across our
            different fleet vehicles.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            {[
              { id: 'bike' as FleetTier, label: 'GoBike' },
              { id: 'auto' as FleetTier, label: 'GoAuto' },
              { id: 'cab' as FleetTier, label: 'GoCab' },
              { id: 'parcel' as FleetTier, label: 'GoParcel' },
            ].map((tier) => (
              <button
                key={tier.id}
                type="button"
                onClick={() => setSelectedCalcTier(tier.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCalcTier === tier.id
                    ? 'bg-[#bef500] text-[#273500] shadow-sm'
                    : 'bg-[#2a292e] text-white hover:bg-[#353439]'
                }`}
              >
                {tier.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <div className="flex justify-between text-xs text-[#9ca3af]">
              <span>Estimated Distance</span>
              <span className="text-white font-bold">{calcDistance} km</span>
            </div>
            <input
              type="range"
              min="1"
              max="35"
              value={calcDistance}
              onChange={(e) => setCalcDistance(Number(e.target.value))}
              className="w-full accent-[#bef500] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#9ca3af]">
              <span>1 km (Local run)</span>
              <span>15 km (Office rush)</span>
              <span>35 km (Airport transit)</span>
            </div>
          </div>
        </div>

        {/* Calculated Fare Box */}
        <div className="w-full lg:w-80 rounded-2xl bg-[#0e0e12] border border-[#2a292e] p-6 flex flex-col items-center text-center gap-4 shrink-0 shadow-xl">
          <span className="text-xs text-[#9ca3af] uppercase font-bold tracking-wider">
            Upfront Locked Fare
          </span>
          <div className="font-display text-5xl font-extrabold text-[#bef500]">
            ₹{calculateEstimate(selectedCalcTier, calcDistance)}
          </div>
          <p className="text-xs text-[#9ca3af]">
            No rain surge. No waiting time penalty. Includes driver partner incentives.
          </p>
          <button
            type="button"
            onClick={() => onBookTier(selectedCalcTier === 'parcel' ? 'bike' : selectedCalcTier)}
            className="w-full py-3 rounded-full bg-[#bef500] text-[#273500] font-display text-xs font-bold shadow-md hover:opacity-90 active:scale-95 transition-all cursor-pointer"
          >
            Book This Trip Now
          </button>
        </div>
      </div>
    </div>
  );
};
