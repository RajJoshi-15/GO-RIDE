import React, { useState, useEffect } from 'react';
import { ActiveRideState } from '../types';

interface ActiveTripModalProps {
  rideState: ActiveRideState;
  onClose: () => void;
  onCancelRide: () => void;
  onFinishRide: () => void;
  onTriggerSos: () => void;
}

export const ActiveTripModal: React.FC<ActiveTripModalProps> = ({
  rideState,
  onClose,
  onCancelRide,
  onFinishRide,
  onTriggerSos,
}) => {
  const [currentStep, setCurrentStep] = useState<'searching' | 'assigned' | 'in_transit' | 'completed'>(
    rideState.status === 'idle' ? 'searching' : rideState.status
  );
  const [progress, setProgress] = useState(0);
  const [captainCallActive, setCaptainCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'captain'; text: string; time: string }>>([
    {
      sender: 'captain',
      text: 'Namaste! I am on my way in my EV bike. Please be at the pickup gate.',
      time: 'Just now',
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [tipAmount, setTipAmount] = useState<number | null>(null);
  const [ratingGiven, setRatingGiven] = useState(5);

  // Simulated search to assigned transition
  useEffect(() => {
    if (currentStep === 'searching') {
      const timer = setTimeout(() => {
        setCurrentStep('assigned');
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  // Simulated trip progression
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (currentStep === 'in_transit') {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setCurrentStep('completed');
            onFinishRide();
            return 100;
          }
          return prev + 10;
        });
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [currentStep, onFinishRide]);

  // Call timer simulation
  useEffect(() => {
    let callTimer: NodeJS.Timeout;
    if (captainCallActive) {
      callTimer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(callTimer);
  }, [captainCallActive]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userMsg, time: 'Just now' },
    ]);
    setChatInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'captain',
          text: 'Got it! Reaching your spot now.',
          time: 'Just now',
        },
      ]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#19191e] border border-[#2a292e] shadow-2xl overflow-hidden flex flex-col text-[#e4e1e7] max-h-[92vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#131317] border-b border-[#2a292e]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#bef500] animate-pulse" />
            <span className="font-display text-sm font-bold text-white uppercase tracking-wider">
              {currentStep === 'searching'
                ? 'Matching Radar...'
                : currentStep === 'assigned'
                ? 'Captain Assigned • Reaching in 2m'
                : currentStep === 'in_transit'
                ? 'Trip in Progress'
                : 'Ride Completed'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#9ca3af] hover:text-white hover:bg-[#2a292e] transition-colors cursor-pointer"
            title="Minimize"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex flex-col gap-5">
          {/* STATE 1: SEARCHING */}
          {currentStep === 'searching' && (
            <div className="flex flex-col items-center justify-center py-8 text-center gap-4">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-28 w-28 rounded-full bg-[#bef500] opacity-20" />
                <span className="animate-pulse absolute inline-flex h-20 w-20 rounded-full bg-[#bef500] opacity-40" />
                <div className="relative w-16 h-16 rounded-full bg-[#bef500] flex items-center justify-center text-[#273500] shadow-[0_0_24px_rgba(190,245,0,0.6)]">
                  <span className="material-symbols-outlined text-[32px]">two_wheeler</span>
                </div>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white">
                  Finding Your GoRide Captain...
                </h3>
                <p className="text-xs text-[#9ca3af] mt-1">
                  Scanning verified drivers near {rideState.pickup.split(',')[0]}
                </p>
              </div>
              <div className="px-4 py-2 rounded-full bg-[#0e0e12] border border-[#2a292e] text-xs text-[#bef500] font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                <span>Applying Zero Surge Lock &amp; Lowest Fare</span>
              </div>
            </div>
          )}

          {/* STATE 2 & 3: ASSIGNED OR IN TRANSIT */}
          {(currentStep === 'assigned' || currentStep === 'in_transit') && (
            <>
              {/* OTP Banner (High Visibility) */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#222910] via-[#1f1f23] to-[#222910] border border-[#bef500]/50 flex items-center justify-between shadow-md">
                <div>
                  <div className="text-[11px] text-[#9ca3af] uppercase font-bold tracking-wider">
                    Start Ride OTP
                  </div>
                  <div className="font-display text-3xl font-extrabold text-[#bef500] tracking-widest">
                    {rideState.otp}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#9ca3af] block">Upfront Fare</span>
                  <span className="font-display text-xl font-bold text-white">
                    ₹{rideState.fare}
                  </span>
                  <span className="text-[10px] text-[#bef500] block">Locked Zero Surge</span>
                </div>
              </div>

              {/* Captain Details Strip */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0e0e12] border border-[#2a292e]">
                <img
                  src={rideState.captain.photoUrl}
                  alt={rideState.captain.name}
                  className="w-14 h-14 rounded-2xl object-cover object-top border border-[#bef500]"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-display text-sm sm:text-base font-bold text-white truncate">
                      {rideState.captain.name}
                    </h4>
                    <span className="material-symbols-outlined text-[#bef500] text-[16px]">
                      verified
                    </span>
                  </div>
                  <p className="text-xs text-[#9ca3af]">
                    {rideState.captain.vehicleModel} •{' '}
                    <span className="text-[#bef500] font-bold">
                      {rideState.captain.vehicleNumber}
                    </span>
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-bold text-white flex items-center gap-0.5">
                      ⭐ {rideState.captain.rating}
                    </span>
                    <span className="text-[11px] text-[#9ca3af]">
                      ({rideState.captain.tripsCount})
                    </span>
                  </div>
                </div>

                {/* Call / Chat Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCaptainCallActive(true)}
                    className="w-10 h-10 rounded-full bg-[#2a292e] text-[#bef500] hover:bg-[#bef500] hover:text-[#273500] transition-colors flex items-center justify-center cursor-pointer shadow-sm"
                    title="Call Captain"
                  >
                    <span className="material-symbols-outlined text-[20px]">call</span>
                  </button>
                  <button
                    onClick={() => setChatOpen(!chatOpen)}
                    className="w-10 h-10 rounded-full bg-[#2a292e] text-white hover:bg-[#353439] transition-colors flex items-center justify-center cursor-pointer shadow-sm relative"
                    title="Message Captain"
                  >
                    <span className="material-symbols-outlined text-[20px]">chat</span>
                    <span className="w-2 h-2 rounded-full bg-[#bef500] absolute top-2 right-2" />
                  </button>
                </div>
              </div>

              {/* Chat Drawer Dropdown */}
              {chatOpen && (
                <div className="p-3 rounded-2xl bg-[#131317] border border-[#2a292e] flex flex-col gap-2">
                  <div className="text-xs font-bold text-white flex items-center justify-between pb-1 border-b border-[#2a292e]">
                    <span>Chat with Captain</span>
                    <button
                      onClick={() => setChatOpen(false)}
                      className="text-[#9ca3af] hover:text-white text-xs"
                    >
                      Close
                    </button>
                  </div>
                  <div className="max-h-36 overflow-y-auto flex flex-col gap-2 text-xs p-1">
                    {messages.map((m, idx) => (
                      <div
                        key={idx}
                        className={`flex flex-col max-w-[80%] rounded-xl px-3 py-1.5 ${
                          m.sender === 'user'
                            ? 'ml-auto bg-[#bef500] text-[#273500] font-medium'
                            : 'bg-[#2a292e] text-[#e4e1e7]'
                        }`}
                      >
                        <span>{m.text}</span>
                        <span className="text-[9px] opacity-70 mt-0.5">{m.time}</span>
                      </div>
                    ))}
                  </div>

                  {/* Preset quick message chips */}
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                    {['I am at the main gate', 'Sanitized helmet please', 'Waiting 1 min'].map(
                      (quick) => (
                        <button
                          key={quick}
                          onClick={() => {
                            setMessages((prev) => [
                              ...prev,
                              { sender: 'user', text: quick, time: 'Just now' },
                            ]);
                          }}
                          className="px-2.5 py-1 rounded-full bg-[#2a292e] text-[10px] text-white hover:bg-[#353439] whitespace-nowrap cursor-pointer"
                        >
                          {quick}
                        </button>
                      )
                    )}
                  </div>

                  <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 bg-[#0e0e12] border border-[#2a292e] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#bef500]"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-xl bg-[#bef500] text-[#273500] font-bold text-xs cursor-pointer"
                    >
                      Send
                    </button>
                  </form>
                </div>
              )}

              {/* Live Route Tracker */}
              <div className="p-4 rounded-2xl bg-[#0e0e12] border border-[#2a292e] flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs text-[#9ca3af]">
                  <span className="flex items-center gap-1 text-[#bef500] font-semibold">
                    <span className="material-symbols-outlined text-[16px]">sensors</span>
                    Live Telematics Active
                  </span>
                  <span>Speed: 38 km/h</span>
                </div>

                {/* Route points */}
                <div className="flex flex-col gap-2 relative">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#bef500]" />
                    <span className="text-xs text-white truncate font-medium">
                      {rideState.pickup}
                    </span>
                  </div>
                  <div className="w-0.5 h-4 bg-[#2a292e] ml-1" />
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5c5c]" />
                    <span className="text-xs text-white truncate font-medium">
                      {rideState.drop}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                {currentStep === 'in_transit' && (
                  <div className="mt-2">
                    <div className="flex justify-between text-[11px] text-[#9ca3af] mb-1">
                      <span>Trip Progress</span>
                      <span className="text-[#bef500] font-bold">{progress}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#1f1f23] overflow-hidden">
                      <div
                        className="h-full bg-[#bef500] transition-all duration-700"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons: Start Trip Simulation or Trigger SOS */}
              <div className="flex items-center gap-3 pt-2">
                {currentStep === 'assigned' ? (
                  <button
                    onClick={() => {
                      setCurrentStep('in_transit');
                      setProgress(15);
                    }}
                    className="flex-1 py-3 rounded-full bg-[#bef500] text-[#273500] font-display text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(190,245,0,0.3)] hover:opacity-90 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    <span>Captain Arrived • Start Trip</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setCurrentStep('completed');
                      onFinishRide();
                    }}
                    className="flex-1 py-3 rounded-full bg-[#bef500] text-[#273500] font-display text-xs sm:text-sm font-bold shadow-md hover:opacity-90 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">flag</span>
                    <span>Complete Trip &amp; Pay</span>
                  </button>
                )}

                {/* 24/7 SOS Emergency Button */}
                <button
                  onClick={onTriggerSos}
                  className="px-4 py-3 rounded-full bg-[#ff5c5c]/10 text-[#ff5c5c] border border-[#ff5c5c]/30 hover:bg-[#ff5c5c] hover:text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
                  title="24/7 Emergency SOS"
                >
                  <span className="material-symbols-outlined text-[18px]">sos</span>
                  <span>SOS</span>
                </button>
              </div>

              <div className="flex justify-between items-center text-xs text-[#9ca3af] pt-1">
                <span>Payment: {rideState.paymentMethod}</span>
                <button
                  onClick={onCancelRide}
                  className="text-[#9ca3af] hover:text-[#ff5c5c] transition-colors cursor-pointer"
                >
                  Cancel Ride
                </button>
              </div>
            </>
          )}

          {/* STATE 4: COMPLETED */}
          {currentStep === 'completed' && (
            <div className="flex flex-col gap-5 text-center py-2">
              <div className="w-16 h-16 rounded-full bg-[#bef500]/20 text-[#bef500] mx-auto flex items-center justify-center">
                <span className="material-symbols-outlined text-[36px]">check_circle</span>
              </div>

              <div>
                <h3 className="font-display text-2xl font-bold text-white">
                  You Have Arrived!
                </h3>
                <p className="text-xs text-[#9ca3af] mt-1">
                  Thank you for riding with GoRide EV Fleet.
                </p>
              </div>

              {/* Receipt Box */}
              <div className="p-4 rounded-2xl bg-[#0e0e12] border border-[#2a292e] text-left text-xs flex flex-col gap-2">
                <div className="flex justify-between text-[#9ca3af] pb-2 border-b border-[#1f1f23]">
                  <span>Trip Fare (Locked)</span>
                  <span className="text-white font-bold">₹{rideState.fare}</span>
                </div>
                <div className="flex justify-between text-[#9ca3af] pb-2 border-b border-[#1f1f23]">
                  <span>Payment Mode</span>
                  <span className="text-[#bef500] font-semibold">{rideState.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-[#9ca3af]">
                  <span>CO2 Saved (EV Fleet)</span>
                  <span className="text-[#bef500] font-semibold">0.42 kg</span>
                </div>
              </div>

              {/* Rating */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-white">Rate Captain Rahul S.</span>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRatingGiven(star)}
                      className={`text-2xl cursor-pointer transition-transform hover:scale-125 ${
                        star <= ratingGiven ? 'text-[#bef500]' : 'text-[#353439]'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              {/* Tip options */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] text-[#9ca3af]">Add a Tip for Captain</span>
                <div className="flex justify-center gap-2">
                  {[10, 20, 50].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setTipAmount(tipAmount === amount ? null : amount)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        tipAmount === amount
                          ? 'bg-[#bef500] text-[#273500]'
                          : 'bg-[#1f1f23] text-white hover:bg-[#2a292e] border border-[#2a292e]'
                      }`}
                    >
                      +₹{amount}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-full bg-[#bef500] text-[#273500] font-display text-sm font-bold shadow-md hover:opacity-90 transition-all cursor-pointer mt-2"
              >
                Done • Book Another Ride
              </button>
            </div>
          )}
        </div>

        {/* Live Call Simulator Overlay */}
        {captainCallActive && (
          <div className="absolute inset-0 bg-[#0e0e12]/95 backdrop-blur-md z-30 p-6 flex flex-col items-center justify-between text-center animate-fadeIn">
            <div className="flex items-center gap-2 text-xs text-[#bef500] mt-4 font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#bef500] animate-ping" />
              <span>GoRide In-App Encrypted Call</span>
            </div>

            <div className="flex flex-col items-center gap-3">
              <img
                src={rideState.captain.photoUrl}
                alt={rideState.captain.name}
                className="w-24 h-24 rounded-full object-cover border-2 border-[#bef500] shadow-[0_0_24px_rgba(190,245,0,0.4)]"
              />
              <h4 className="font-display text-xl font-bold text-white">
                {rideState.captain.name}
              </h4>
              <p className="text-xs text-[#9ca3af]">{rideState.captain.vehicleNumber}</p>
              <div className="font-mono text-lg text-[#bef500] font-bold">
                00:{callDuration < 10 ? `0${callDuration}` : callDuration}
              </div>
              <p className="text-xs text-[#9ca3af] max-w-xs mt-2 italic">
                &ldquo;Hello, I am near the landmark. I have an extra sanitized helmet.&rdquo;
              </p>
            </div>

            <button
              onClick={() => setCaptainCallActive(false)}
              className="w-14 h-14 rounded-full bg-[#ff5c5c] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all mb-4 cursor-pointer"
              title="End Call"
            >
              <span className="material-symbols-outlined text-[28px]">call_end</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
