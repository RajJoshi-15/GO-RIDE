import React, { useState } from 'react';
import { GORIDE_LOGO_URL } from '../data/mockData';
import { MetroCity } from '../types';

interface HeaderProps {
  currentCity: MetroCity;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenGetApp: () => void;
  onOpenProfile: () => void;
  onOpenCaptainModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCity,
  activeTab,
  onTabChange,
  onOpenGetApp,
  onOpenProfile,
  onOpenCaptainModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'ride', label: 'Ride' },
    { id: 'services', label: 'Services' },
    { id: 'safety', label: 'Safety & Tech' },
    { id: 'cities', label: 'Cities' },
    { id: 'captain', label: 'Drive / Captain' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#131317]/90 backdrop-blur-md border-b border-[#2a292e]/40 shadow-[0_1px_12px_rgba(0,0,0,0.5)]">
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Brand & City Base Fare */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={() => onTabChange('ride')}
            className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
            title="Go to GoRide Home"
          >
            <img
              alt="GoRide Neon Logo"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              src={GORIDE_LOGO_URL}
            />
            <span className="font-display text-xl sm:text-2xl font-bold tracking-tight uppercase text-white">
              GoRide
            </span>
          </button>

          <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-[#2a292e] border border-[#353439]">
            <span className="w-2 h-2 rounded-full bg-[#bef500] animate-pulse" />
            <span className="text-xs text-[#9ca3af] uppercase tracking-wider font-semibold">
              {currentCity.name}: ₹{currentCity.baseFare} base fare
            </span>
          </div>
        </div>

        {/* Center Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-full bg-[#1b1b1f] border border-[#2a292e]">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#353439] text-[#bef500] shadow-sm'
                    : 'text-[#9ca3af] hover:text-white hover:bg-[#2a292e]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Safety Shield Pill */}
          <button
            onClick={() => onTabChange('safety')}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1f1f23] border border-[#2a292e] hover:border-[#bef500]/50 transition-colors cursor-pointer"
            title="24/7 Commuter Safety Protocols"
          >
            <span className="material-symbols-outlined text-[#bef500] text-[18px]">
              verified_user
            </span>
            <span className="text-xs text-[#e4e1e7] font-semibold uppercase tracking-wider">
              Safety Shield 24x7
            </span>
          </button>

          {/* Captain Login */}
          <button
            onClick={onOpenCaptainModal}
            className="hidden sm:inline-flex text-xs font-semibold text-[#9ca3af] hover:text-white transition-colors cursor-pointer"
          >
            Captain Login
          </button>

          {/* Get App CTA Button */}
          <button
            onClick={onOpenGetApp}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#bef500] text-[#273500] text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(190,245,0,0.35)] hover:bg-[#bef500]/90 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Get the App</span>
          </button>

          {/* Rider Profile Avatar */}
          <button
            onClick={onOpenProfile}
            className="relative flex items-center justify-center rounded-full ring-2 ring-[#bef500]/40 hover:ring-[#bef500] transition-all cursor-pointer p-0.5"
            title="Open Rider Profile & History"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPJlpnY-7jG3lHqVCWhwva412A4oDKcbzr7LvYxDBgIwzZXRYh4UrE3B9Am5KfkteAG-HbsE9EzLG7WJvb1MAhOgiQQgBLLqcD5FMIMVaxDr0tj39Ic4jZDCL2sFAQr9CUwxAdz_n16ny9pKAnbBlEEf59UV_MMaGi3rdfT9FUPnIug5nhNR-r7VO8WTRgUhLsVZY6mbas50wOk1Y1xfh1U3DCPugG4NCM0KdnEC94QpcrYW8rC__75w"
            />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#9ca3af] hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#131317] border-b border-[#2a292e] px-4 py-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1f1f23] mb-2">
            <span className="w-2 h-2 rounded-full bg-[#bef500] animate-pulse" />
            <span className="text-xs text-[#9ca3af] uppercase font-semibold">
              {currentCity.name}: ₹{currentCity.baseFare} base fare
            </span>
          </div>

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                setMobileMenuOpen(false);
              }}
              className={`text-left px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === item.id
                  ? 'bg-[#353439] text-[#bef500]'
                  : 'text-[#9ca3af] hover:text-white hover:bg-[#1f1f23]'
              }`}
            >
              {item.label}
            </button>
          ))}

          <div className="pt-2 border-t border-[#2a292e] flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenCaptainModal();
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 text-xs font-semibold text-[#bef500] hover:underline"
            >
              Captain Login & Portal →
            </button>
            <button
              onClick={() => {
                onOpenProfile();
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 text-xs font-semibold text-[#9ca3af] hover:text-white"
            >
              My Account & Past Trips →
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
