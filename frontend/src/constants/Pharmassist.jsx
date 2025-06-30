import { Bell, LayoutDashboard, Pill, ShoppingCart, UserRound } from "lucide-react";

export const navItems = [
 {
    titre: "Tableau de Bord",
    icone: LayoutDashboard,
    lien: "dashboard",
  },
  {
    titre: "Commandes",
    icone: ShoppingCart,
    lien: "Orders",
  },
  {
    titre: "Médicaments",
    icone: Pill,
    lien: "medicaments",
  },
  {
    titre: "Alertes",
    icone: Bell,
    lien: "alertes",
  },
  {
    titre: "Mon Profil",
    icone: UserRound,
    lien: "myprofile",
  }
];


// constants/pharmacist.js
export const barData = [
  { name: 'Mon', sales: 21 },
  { name: 'Tue', sales: 15 },
  { name: 'Wed', sales: 32 },
  { name: 'Thu', sales: 24 },
  { name: 'Fri', sales: 28 },
  { name: 'Sat', sales: 16 },
  { name: 'Sun', sales: 12 },
];

export const pieData = [
  { name: 'Antibiotics', value: 35 },
  { name: 'Pain Relief', value: 25 },
  { name: 'Vitamins', value: 20 },
  { name: 'Dermatology', value: 15 },
  { name: 'Others', value: 5 },
];

export const COLORS = ['#037847', '#0d9488', '#34a853', '#8b5cf6', '#d946ef'];

// Order Status Types
export const ORDER_STATUS = {
  pending: 'pending',
  shipped: 'shipped',
  delivered: 'delivered',
  cancelled:'cancelled'

};

// Medicine Stock Status
export const STOCK_STATUS = {
  NORMAL: 'Normal',
  LOW: 'Low Stock',
  CRITICAL: 'Critical'
};

// Medicine Categories
export const MEDICINE_CATEGORIES = {
  PAIN_RELIEF: 'Pain Relief',
  ANTIBIOTICS: 'Antibiotics',
  ALLERGY: 'Allergy',
  CARDIOVASCULAR: 'Cardiovascular',
  DIABETES: 'Diabetes',
  GASTROINTESTINAL: 'Gastrointestinal',
  MENTAL_HEALTH: 'Mental Health'
};

// Sample Medicine Data
export const MEDICINES = [
  {
    id: 'med001',
    name: 'Ibuprofen 400mg',
    category: MEDICINE_CATEGORIES.PAIN_RELIEF,
    stock: 145,
    status: STOCK_STATUS.NORMAL,
    price: 8.50,
    description: 'Nonsteroidal anti-inflammatory drug for pain relief'
  },
  {
    id: 'med002',
    name: 'Paracetamol 500mg',
    category: MEDICINE_CATEGORIES.PAIN_RELIEF,
    stock: 230,
    status: STOCK_STATUS.NORMAL,
    price: 5.25,
    description: 'Analgesic and antipyretic medication'
  },
  {
    id: 'med003',
    name: 'Amoxicillin 250mg',
    category: MEDICINE_CATEGORIES.ANTIBIOTICS,
    stock: 12,
    status: STOCK_STATUS.LOW,
    price: 14.75,
    description: 'Penicillin antibiotic for bacterial infections'
  },
  // Add other medicines following the same structure
];

// Sample Order Items
export const ORDER_ITEMS = [
  {
    id: 'item001',
    orderId: 'order001',
    medicineId: 'med001',
    quantity: 2,
    unitPrice: 8.50
  },
  {
    id: 'item002',
    orderId: 'order001',
    medicineId: 'med003',
    quantity: 1,
    unitPrice: 9.99
  },
  // Add other order items
];

// Sample Orders Data with calculated totals
export const ORDERS = [
  {
    id: 'order001',
    customer: 'Ahmed Benali',
    customerId: 'cust001',
    orderDate: '2025-04-05',
    deliveryDate: '2025-04-07',
    status: ORDER_STATUS.PENDING,
    items: [
      { medicineId: 'med001', name: 'Ibuprofen 400mg', quantity: 2, price: 8.50 },
      { medicineId: 'med003', name: 'Cetirizine 10mg', quantity: 1, price: 9.99 }
    ],
    get total() {
      return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    pharmacyId: 'pharm001',
    prescriptionId: 'presc001'
  },
  {
    id: 'order002',
    customer: 'Sarah Dubois',
    customerId: 'cust002',
    orderDate: '2025-04-04',
    deliveryDate: '2025-04-06',
    status: ORDER_STATUS.VALIDATED,
    items: [
      { medicineId: 'med002', name: 'Paracetamol 500mg', quantity: 3, price: 5.25 }
    ],
    get total() {
      return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    pharmacyId: 'pharm001',
    prescriptionId: 'presc002'
  },
 
  // Add other orders following the same structure
];

// Pharmacy Information
export const PHARMACY = {
  id: 'pharm001',
  name: 'PharmaEase',
  address: '123 Health Street',
  city: 'Casablanca',
  contactNumber: '+212 6 1234 5678',
  email: 'contact@pharmaease.ma',
  openingHours: {
    weekdays: '08:00 - 20:00',
    weekends: '09:00 - 18:00'
  }
};

export const stats = [
  { 
    title: "Total Orders", 
    value: "284", 
    icon: "ShoppingCart", 
    trend: { value: 12, isPositive: true } 
  },
  { 
    title: "Medicines in Stock", 
    value: "1,432", 
    icon: "Pill", 
    trend: { value: 3, isPositive: true } 
  },
  { 
    title: "Pending Orders", 
    value: "28", 
    icon: "Clock", 
    trend: { value: 8, isPositive: false } 
  },
  { 
    title: "Low Stock Alerts", 
    value: "16", 
    icon: "AlertTriangle", 
    className: "bg-[#FFFEFE] border-l-4 border-[#e53e3e]" 
  },
];



export const USER_ROLES = {
  PHARMACIST: 'pharmacist',
  ADMIN: 'admin',
  CUSTOMER: 'customer'
};

export const ACTIVITY_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  ON_LEAVE: 'on_leave'
};

// Pharmacist Profile Data
export const PHARMACIST_PROFILE = [
    {
  user_id: 'pharm001',
  username: 'amine.benali',
  email: 'amino.benali@pharmaciecentrale.ma',
  role: USER_ROLES.PHARMACIST,
  profile_picture: null, // or base64 string/image path
  phoneNumber: '+212 661-234567',
  address: 'Pharmacie Centrale, Casablanca',
  
  // Pharmacist-specific fields
  pharmacy_id: 'pharm_central_001',
  isActive: true,
  licenseNumber: 'PH12345MA',
  yearsOfExperience: 5,
  lastLogin: '2025-04-22T08:30:00',
  
  // Activity Stats
  activityStats: {
    processedOrders: 253,
    itemsInStock: 120,
    notifications: 18,
    lastActive: '22/04/2025'
  },
  
  // Pharmacy Information
  pharmacy: {
    name: 'Pharmacie Centrale',
    address: '123 Main Street, Casablanca',
    contactNumber: '+212 522-123456',
    workingHours: '08:00 - 20:00'
  },
  
  // Methods available to pharmacist (mirroring your class diagram)
  availableActions: [
    'viewOrders',
    'processOrders',
    'handlePrescription',
    'manageStocks',
    'receiveNotification',
    'approvePrescription',
    'handlePayment'
  ]
},
];