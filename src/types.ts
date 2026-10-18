export type FleetTier = 'bike' | 'auto' | 'cab' | 'parcel';

export interface VehicleOption {
  id: FleetTier;
  name: string;
  badge: string;
  eta: string;
  price: number;
  originalPrice: number;
  description: string;
  iconName: string;
  capacity: string;
  features: string[];
  baseRateText: string;
  popularRouteSample: {
    route: string;
    fare: number;
  };
}

export interface MetroCity {
  id: string;
  name: string;
  state: string;
  baseFare: number;
  status: string;
  defaultPickup: string;
  defaultDrop: string;
  distanceKm: number;
  bikeEtaMin: number;
  carEtaMin: number;
  activeCaptains: number;
  evShare: number;
  hotspots: string[];
}

export interface Captain {
  name: string;
  photoUrl: string;
  rating: number;
  tripsCount: string;
  vehicleModel: string;
  vehicleNumber: string;
  isEv: boolean;
  statusText: string;
  phone: string;
}

export interface ActiveRideState {
  status: 'idle' | 'searching' | 'assigned' | 'in_transit' | 'completed';
  tier: FleetTier;
  city: string;
  pickup: string;
  drop: string;
  fare: number;
  otp: string;
  captain: Captain;
  progressPercent: number;
  paymentMethod: string;
  etaRemainingMinutes: number;
}
