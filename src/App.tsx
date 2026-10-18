/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { RideScreen } from './components/RideScreen';
import { ServicesScreen } from './components/ServicesScreen';
import { SafetyTechScreen } from './components/SafetyTechScreen';
import { CitiesScreen } from './components/CitiesScreen';
import { CaptainPortalScreen } from './components/CaptainPortalScreen';
import { ActiveTripModal } from './components/ActiveTripModal';
import { GetAppModal } from './components/GetAppModal';
import { RiderAccountModal } from './components/RiderAccountModal';
import { CITIES_DATA, DEFAULT_CAPTAIN, VEHICLE_OPTIONS } from './data/mockData';
import { ActiveRideState, FleetTier, MetroCity } from './types';

export default function App() {
  const [currentCity, setCurrentCity] = useState<MetroCity>(CITIES_DATA[0]);
  const [activeTab, setActiveTab] = useState('ride');

  // Modal open states
  const [getAppModalOpen, setGetAppModalOpen] = useState(false);
  const [riderProfileOpen, setRiderProfileOpen] = useState(false);
  const [activeTripOpen, setActiveTripOpen] = useState(false);

  // Active Trip State
  const [activeRide, setActiveRide] = useState<ActiveRideState>({
    status: 'idle',
    tier: 'bike',
    city: currentCity.name,
    pickup: currentCity.defaultPickup,
    drop: currentCity.defaultDrop,
    fare: 45,
    otp: '4982',
    captain: DEFAULT_CAPTAIN,
    progressPercent: 0,
    paymentMethod: 'UPI / GPay / PhonePe',
    etaRemainingMinutes: 2,
  });

  const handleStartBooking = (
    tier: FleetTier,
    pickup: string,
    drop: string,
    paymentMethod: string
  ) => {
    const selectedOption = VEHICLE_OPTIONS.find((v) => v.id === tier) || VEHICLE_OPTIONS[0];
    setActiveRide({
      status: 'searching',
      tier,
      city: currentCity.name,
      pickup,
      drop,
      fare: selectedOption.price,
      otp: Math.floor(1000 + Math.random() * 9000).toString(),
      captain: DEFAULT_CAPTAIN,
      progressPercent: 0,
      paymentMethod,
      etaRemainingMinutes: 2,
    });
    setActiveTripOpen(true);
  };

  const handleCancelRide = () => {
    setActiveTripOpen(false);
    setActiveRide((prev) => ({ ...prev, status: 'idle' }));
  };

  const handleFinishRide = () => {
    setActiveRide((prev) => ({ ...prev, status: 'completed' }));
  };

  const handleBookTierFromOtherTab = (tier: FleetTier) => {
    setActiveTab('ride');
    setTimeout(() => {
      const panel = document.getElementById('booking-panel');
      if (panel) {
        panel.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleBookInCity = (city: MetroCity) => {
    setCurrentCity(city);
    setActiveTab('ride');
    setTimeout(() => {
      const panel = document.getElementById('booking-panel');
      if (panel) {
        panel.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#131317] text-[#e4e1e7] flex flex-col font-sans selection:bg-[#bef500] selection:text-[#273500]">
      {/* Sticky Header */}
      <Header
        currentCity={currentCity}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenGetApp={() => setGetAppModalOpen(true)}
        onOpenProfile={() => setRiderProfileOpen(true)}
        onOpenCaptainModal={() => setActiveTab('captain')}
      />

      {/* Main Screen Content */}
      <main className="w-full pt-20 flex-1">
        {activeTab === 'ride' && (
          <RideScreen
            currentCity={currentCity}
            onCityChange={setCurrentCity}
            onStartBooking={handleStartBooking}
            onOpenCaptainTab={() => setActiveTab('captain')}
            onOpenGetApp={() => setGetAppModalOpen(true)}
            onOpenSafetyTab={() => setActiveTab('safety')}
            onOpenCitiesTab={() => setActiveTab('cities')}
          />
        )}

        {activeTab === 'services' && (
          <ServicesScreen onBookTier={handleBookTierFromOtherTab} />
        )}

        {activeTab === 'safety' && (
          <SafetyTechScreen onBackToRide={() => setActiveTab('ride')} />
        )}

        {activeTab === 'cities' && (
          <CitiesScreen
            currentCity={currentCity}
            onSelectCity={setCurrentCity}
            onBookInCity={handleBookInCity}
          />
        )}

        {activeTab === 'captain' && (
          <CaptainPortalScreen onBackToRide={() => setActiveTab('ride')} />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectCity={(cityId) => {
          const match = CITIES_DATA.find((c) => c.id === cityId);
          if (match) setCurrentCity(match);
        }}
      />

      {/* Active Trip Live Dispatch & Radar Simulation Modal */}
      {activeTripOpen && (
        <ActiveTripModal
          rideState={activeRide}
          onClose={() => setActiveTripOpen(false)}
          onCancelRide={handleCancelRide}
          onFinishRide={handleFinishRide}
          onTriggerSos={() => {
            setActiveTab('safety');
            setActiveTripOpen(false);
          }}
        />
      )}

      {/* Get App Modal */}
      {getAppModalOpen && <GetAppModal onClose={() => setGetAppModalOpen(false)} />}

      {/* Rider Profile / Account Drawer Modal */}
      {riderProfileOpen && (
        <RiderAccountModal
          onClose={() => setRiderProfileOpen(false)}
          onSelectSavedPlace={(_address) => {
            setActiveTab('ride');
          }}
        />
      )}
    </div>
  );
}
