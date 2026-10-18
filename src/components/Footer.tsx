import React from 'react';
import { GORIDE_LOGO_URL } from '../data/mockData';

interface FooterProps {
  onSelectTab: (tab: string) => void;
  onSelectCity?: (cityId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onSelectCity }) => {
  return (
    <footer className="w-full bg-[#0e0e12] mt-16 border-t border-[#1f1f23]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <img
                alt="GoRide Neon Logo"
                className="h-7 w-auto object-contain"
                src={GORIDE_LOGO_URL}
              />
              <span className="font-display text-xl font-bold tracking-tight uppercase text-white">
                GoRide
              </span>
            </div>
            <p className="text-sm text-[#9ca3af] max-w-sm leading-relaxed">
              Hyper-speed urban mobility built for Indian metros. Instant captain matching, zero cancellations, biometric trust, and dynamic fare locks across Bengaluru, Mumbai, Delhi NCR, Hyderabad, and Indore.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="px-3 py-1.5 rounded-full bg-[#1f1f23] flex items-center gap-1.5 border border-[#2a292e]">
                <span className="material-symbols-outlined text-[#bef500] text-[16px]">
                  electric_bolt
                </span>
                <span className="text-xs text-[#e4e1e7] font-semibold">100% EV Fleets Active</span>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-[#1f1f23] flex items-center gap-1.5 border border-[#2a292e]">
                <span className="material-symbols-outlined text-[#bef500] text-[16px]">
                  pin_drop
                </span>
                <span className="text-xs text-[#e4e1e7] font-semibold">50+ Indian Cities</span>
              </div>
            </div>
          </div>

          {/* Ride & Fleet */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Ride &amp; Fleet
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-[#9ca3af]">
              <li>
                <button
                  onClick={() => onSelectTab('ride')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  GoBike Fastlane
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  GoAuto Meter-Free
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  GoCab Prime &amp; XL
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  GoParcel Express
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('ride')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Fare Estimator
                </button>
              </li>
            </ul>
          </div>

          {/* City Coverage */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              City Coverage
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-[#9ca3af]">
              <li>
                <button
                  onClick={() => {
                    onSelectTab('cities');
                    onSelectCity?.('bengaluru');
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Bengaluru Tech Belt
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('cities');
                    onSelectCity?.('mumbai');
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Mumbai Coastal Speed
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('cities');
                    onSelectCity?.('hyderabad');
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Hyderabad Cyberabad
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('cities');
                    onSelectCity?.('indore');
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Indore BRTS Corridor
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('cities');
                    onSelectCity?.('bhopal');
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Bhopal Transit Zone
                </button>
              </li>
            </ul>
          </div>

          {/* Safety & Support */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Safety &amp; Support
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-[#9ca3af]">
              <li>
                <button
                  onClick={() => onSelectTab('safety')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  24x7 Safety Shield
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('safety')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Captain Biometrics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('captain')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Captain Insurance
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('safety')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Emergency SOS
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('safety')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Zero Surge Guarantee
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* UPI Integration Ribbon */}
        <div className="py-4 px-6 rounded-2xl bg-[#1b1b1f] border border-[#2a292e] flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#bef500] text-[20px]">
              account_balance_wallet
            </span>
            <span className="text-xs sm:text-sm font-semibold text-[#e4e1e7]">
              Seamless Instant UPI Integrations:
            </span>
          </div>
          <div className="flex items-center flex-wrap gap-2 sm:gap-3 text-xs text-[#9ca3af]">
            <span className="px-3 py-1 rounded-md bg-[#2a292e] font-semibold text-white">
              Google Pay
            </span>
            <span className="px-3 py-1 rounded-md bg-[#2a292e] font-semibold text-white">
              PhonePe
            </span>
            <span className="px-3 py-1 rounded-md bg-[#2a292e] font-semibold text-white">
              Paytm UPI
            </span>
            <span className="px-3 py-1 rounded-md bg-[#2a292e] font-semibold text-white">
              BHIM UPI
            </span>
            <span className="px-3 py-1 rounded-md bg-[#2a292e] font-semibold text-white">
              Direct Cash
            </span>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#9ca3af]">
          <p>© 2025 GoRide Mobility Tech Pvt. Ltd. All rights reserved. Registered Indian Urban Transit Operator.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => onSelectTab('safety')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onSelectTab('safety')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms of Transit
            </button>
            <button
              onClick={() => onSelectTab('safety')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Regulatory Filings
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-between border-t pt-4 text-xs"><span>© 2026 GoRide Mobility. All rights reserved.</span><span>Created by Raj Joshi</span></div>
    </footer>
  );
};
