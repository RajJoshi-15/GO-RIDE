import { FleetTier, MetroCity, VehicleOption, Captain } from '../types';

export const GORIDE_LOGO_URL =
  'https://lh3.googleusercontent.com/aida/AEtjO1Uapds8dK4hzPXR8nUEymgYUNgKE5ISn6VWNnT9U8yxgjtYaWDTQujWmk_vh4_h9ve2cwdNhrCPI8yo5MlVMYCClIDWA9NODKNO1bn8Z9g1TFbgE11-V7YAB_PCtO5Ros-F-6MAn1byz49Lbfc75PY-vJhdMk9xcuPUIPGpaMaBp2i-tz0ZFnII0TUHSi39w1wUxACK27db7dlNAf7L_y3sEUdPqjpMFlQZb04Vj4NDKWsECt4gRhoNLXRK';

export const CAPTAIN_RAHUL_PHOTO =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAPJlpnY-7jG3lHqVCWhwva412A4oDKcbzr7LvYxDBgIwzZXRYh4UrE3B9Am5KfkteAG-HbsE9EzLG7WJvb1MAhOgiQQgBLLqcD5FMIMVaxDr0tj39Ic4jZDCL2sFAQr9CUwxAdz_n16ny9pKAnbBlEEf59UV_MMaGi3rdfT9FUPnIug5nhNR-r7VO8WTRgUhLsVZY6mbas50wOk1Y1xfh1U3DCPugG4NCM0KdnEC94QpcrYW8rC__75w';

export const MAP_BG_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDhHf4dUxHJ1yjQOKXrIF7_uDN5aPH3U52m473eoMYEOGmDCz8VTo6OG8Gn_gB_E1aEfQxdOVVe7V8CoodWl6cBG3gwrD28kfrqLKwPAJPDoJYQKzKgryV0wmVXzeJwWkauidu0Z-by1LC7ZWUa-gZ1UbxD1Sm6AtJ5EJpua6K947e7oqRzxw1CdqPChdwjx0fGyWWbrGiWI_ApJAvCohCkT6IIgY7RpWTO2jAxeQMl7GdnPnlrSe3G_w';

export const CITIES_DATA: MetroCity[] = [
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    state: 'Karnataka',
    baseFare: 29,
    status: 'Zero Surge Lock Active',
    defaultPickup: 'Koramangala 4th Block, Bengaluru',
    defaultDrop: 'Indiranagar 100ft Road / Metro Station',
    distanceKm: 5.8,
    bikeEtaMin: 14,
    carEtaMin: 40,
    activeCaptains: 4120,
    evShare: 82,
    hotspots: ['Koramangala 4th Block', 'Indiranagar 100ft Road', 'Whitefield ITPL', 'HSR Layout Sector 1', 'MG Road Metro'],
  },
  {
    id: 'indore',
    name: 'Indore',
    state: 'Madhya Pradesh',
    baseFare: 25,
    status: 'BRTS Fast Corridor Active',
    defaultPickup: 'Palasia Square, Indore',
    defaultDrop: 'Vijay Nagar Square / C21 Mall',
    distanceKm: 6.2,
    bikeEtaMin: 12,
    carEtaMin: 32,
    activeCaptains: 1840,
    evShare: 74,
    hotspots: ['Palasia Square', 'Vijay Nagar Square', 'Bhawarkua', 'Chappan Dukan', 'Rajwada'],
  },
  {
    id: 'bhopal',
    name: 'Bhopal',
    state: 'Madhya Pradesh',
    baseFare: 24,
    status: 'Zero Surge Active',
    defaultPickup: 'MP Nagar Zone 1, Bhopal',
    defaultDrop: 'Bhopal Junction Railway Station',
    distanceKm: 7.1,
    bikeEtaMin: 15,
    carEtaMin: 36,
    activeCaptains: 1210,
    evShare: 68,
    hotspots: ['MP Nagar Zone 1', 'Bhopal Junction', 'Arera Colony', 'New Market', 'Kolar Road'],
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    baseFare: 35,
    status: 'Sea Link Express Enabled',
    defaultPickup: 'BKC Complex G Block, Mumbai',
    defaultDrop: 'Lower Parel / High Street Phoenix',
    distanceKm: 9.4,
    bikeEtaMin: 19,
    carEtaMin: 55,
    activeCaptains: 4890,
    evShare: 79,
    hotspots: ['BKC Complex', 'Lower Parel', 'Andheri West Metro', 'Powai Hiranandani', 'Bandra Terminus'],
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    state: 'Telangana',
    baseFare: 28,
    status: 'Cyberabad Quick Pass Active',
    defaultPickup: 'Hitec City Metro Station, Hyderabad',
    defaultDrop: 'Gachibowli Financial District',
    distanceKm: 6.8,
    bikeEtaMin: 13,
    carEtaMin: 38,
    activeCaptains: 3240,
    evShare: 85,
    hotspots: ['Hitec City Metro', 'Gachibowli', 'Jubilee Hills Checkpost', 'Madhapur', 'Kondapur'],
  },
];

export const VEHICLE_OPTIONS: VehicleOption[] = [
  {
    id: 'bike',
    name: 'GoBike',
    badge: 'Fastest',
    eta: '2 min away',
    price: 45,
    originalPrice: 90,
    description: 'The ultimate urban cheat code. Slivers through stationary bumper-to-bumper city jams with effortless ease.',
    iconName: 'two_wheeler',
    capacity: '1 Passenger • Peak Speed',
    baseRateText: '₹19 Base + ₹6/km',
    popularRouteSample: {
      route: 'Koramangala to MG Road',
      fare: 49,
    },
    features: [
      'Clean sanitized ISI-approved helmet',
      '55% faster than 4-wheelers in rush hours',
      'EV bike options for zero tailpipe emissions',
    ],
  },
  {
    id: 'auto',
    name: 'GoAuto',
    badge: 'Rain-Safe',
    eta: '3 min away',
    price: 79,
    originalPrice: 130,
    description: 'India’s quintessential auto-rickshaw upgraded. No bargaining, no meter tantrums, guaranteed upfront fare confirmation.',
    iconName: 'electric_rickshaw',
    capacity: 'Up to 3 Passengers',
    baseRateText: '₹29 Base + ₹11/km',
    popularRouteSample: {
      route: 'Palasia to Vijay Nagar (Indore)',
      fare: 65,
    },
    features: [
      '100% upfront fare lock guarantee',
      'Rain and weather shield curtains',
      'Direct door-to-door alley access',
    ],
  },
  {
    id: 'cab',
    name: 'GoCab Prime',
    badge: 'Chilled AC',
    eta: '4 min away',
    price: 149,
    originalPrice: 220,
    description: 'Powerful air-conditioned sedans and spacious hatchbacks for client meetings, airport transit, and luggage-heavy trips.',
    iconName: 'local_taxi',
    capacity: '4 Passengers • AC',
    baseRateText: '₹59 Base + ₹14/km',
    popularRouteSample: {
      route: 'Bhopal Jn to MP Nagar',
      fare: 129,
    },
    features: [
      'Chilled climate control pre-cooled',
      'Deep trunk capacity for 3 large suitcases',
      'Top-tier drivers with 4.85+ star ratings',
    ],
  },
];

export const DEFAULT_CAPTAIN: Captain = {
  name: 'Captain Rahul S.',
  photoUrl: CAPTAIN_RAHUL_PHOTO,
  rating: 4.96,
  tripsCount: '12,400+ 5-Star Trips',
  vehicleModel: 'Yamaha FZ-S EV',
  vehicleNumber: 'KA-01-EQ-9844',
  isEv: true,
  statusText: 'Sanitized Helmet Ready',
  phone: '+91 98450 21984',
};

export const REVIEWS_AND_STATS = {
  activeRides: '14,290',
  rating: '4.8 / 5',
  totalRides: '20M+',
  co2SavedMT: 142,
  co2TargetPercent: 78,
  averageMatchSeconds: 84,
  citiesCount: '50+',
};

export const SAVED_USER_PROFILE = {
  name: 'Ananya Sharma',
  phone: '+91 98765 43210',
  rating: '4.92',
  ridesTaken: 48,
  savedPlaces: [
    { label: 'Home', address: 'Apartment 4B, Koramangala 4th Block, Bengaluru' },
    { label: 'Work', address: 'Embassy TechVillage, Outer Ring Road, Bellandur' },
    { label: 'Gym', address: 'Cult.Fit, 100ft Road, Indiranagar' },
  ],
  paymentMethods: [
    { type: 'UPI', label: 'Google Pay', handle: 'ananya@oksbi', isDefault: true },
    { type: 'UPI', label: 'PhonePe', handle: '9876543210@ybl', isDefault: false },
    { type: 'Cash', label: 'Direct Cash', handle: 'Exact paper cash', isDefault: false },
  ],
  recentTrips: [
    {
      id: 'TRIP-9024',
      date: 'Today, 04:15 PM',
      from: 'Indiranagar Metro',
      to: 'Koramangala Sony Signal',
      tier: 'GoBike',
      fare: 45,
      captain: 'Rahul S.',
      status: 'Completed',
    },
    {
      id: 'TRIP-8911',
      date: 'Yesterday, 09:30 AM',
      from: 'HSR Layout Sector 2',
      to: 'Embassy Tech Village',
      tier: 'GoAuto',
      fare: 82,
      captain: 'Ganesh K.',
      status: 'Completed',
    },
    {
      id: 'TRIP-8740',
      date: '14 Oct, 08:20 PM',
      from: 'Kempegowda Int. Airport T2',
      to: 'Koramangala 4th Block',
      tier: 'GoCab Prime',
      fare: 540,
      captain: 'Imran M.',
      status: 'Completed',
    },
  ],
};
