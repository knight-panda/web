// Order types and data

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description?: string;
  category?: string;
}

export interface OrderModel {
  id: string;
  orderNumber: string;
  orderDate: string;
  deliveryDate: string;
  deliveryTime: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'out-for-delivery' | 'delivered' | 'cancelled';
  paymentMethod: 'credit-card' | 'debit-card' | 'upi' | 'cash-on-delivery' | 'wallet';
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    landmark?: string;
  };
  items: OrderItem[];
  restaurantName: string;
  restaurantId: string;
  deliveryInstructions?: string;
  riderName?: string;
  riderPhone?: string;
  estimatedDelivery: string; // e.g., "12 minutes"
}

// Sample orders data
export const ordersData: OrderModel[] = [
  {
    id: "ORD-001",
    orderNumber: "#12345",
    orderDate: "20 Jan, 7:41 pm",
    deliveryDate: "20 Jan, 2024",
    deliveryTime: "7:53 PM",
    totalAmount: 300,
    status: "delivered",
    paymentMethod: "upi",
    paymentStatus: "completed",
    deliveryAddress: {
      street: "123 MG Road",
      city: "Bangalore",
      state: "Karnataka",
      zipCode: "560001",
      landmark: "Near Metro Station"
    },
    items: [
      {
        id: "ITEM-001",
        name: "Paneer Butter Masala",
        price: 250,
        quantity: 1,
        image: "https://example.com/product_2.png",
        description: "Cottage cheese in rich tomato gravy"
      },
      {
        id: "ITEM-002",
        name: "Garlic Naan",
        price: 50,
        quantity: 1,
        image: "https://example.com/product_3.png",
        description: "Tandoor baked bread with garlic"
      }
    ],
    restaurantName: "Spice Garden",
    restaurantId: "RES-001",
    deliveryInstructions: "Leave at door",
    riderName: "Raj Kumar",
    riderPhone: "+91 9876543210",
    estimatedDelivery: "12 minutes"
  },
  {
    id: "ORD-002",
    orderNumber: "#12346",
    orderDate: "19 Jan, 6:30 pm",
    deliveryDate: "19 Jan, 2024",
    deliveryTime: "7:15 PM",
    totalAmount: 450,
    status: "out-for-delivery",
    paymentMethod: "credit-card",
    paymentStatus: "completed",
    deliveryAddress: {
      street: "456 Brigade Road",
      city: "Bangalore",
      state: "Karnataka",
      zipCode: "560025"
    },
    items: [
      {
        id: "ITEM-003",
        name: "Chicken Biryani",
        price: 350,
        quantity: 1,
        image: "https://example.com/product_4.png",
        category: "Main Course"
      },
      {
        id: "ITEM-004",
        name: "Raita",
        price: 80,
        quantity: 1,
        image: "https://example.com/product_5.png",
        category: "Side Dish"
      },
      {
        id: "ITEM-005",
        name: "Coke",
        price: 20,
        quantity: 1,
        image: "https://example.com/product_6.png",
        category: "Beverages"
      }
    ],
    restaurantName: "Biryani House",
    restaurantId: "RES-002",
    estimatedDelivery: "25 minutes"
  },
  {
    id: "ORD-003",
    orderNumber: "#12347",
    orderDate: "18 Jan, 8:15 pm",
    deliveryDate: "18 Jan, 2024",
    deliveryTime: "9:00 PM",
    totalAmount: 180,
    status: "preparing",
    paymentMethod: "cash-on-delivery",
    paymentStatus: "pending",
    deliveryAddress: {
      street: "789 Indiranagar",
      city: "Bangalore",
      state: "Karnataka",
      zipCode: "560038",
      landmark: "Near 100 Feet Road"
    },
    items: [
      {
        id: "ITEM-006",
        name: "Margherita Pizza",
        price: 180,
        quantity: 1,
        image: "https://example.com/product_7.png",
        description: "Classic cheese pizza"
      }
    ],
    restaurantName: "Italian Bistro",
    restaurantId: "RES-003",
    estimatedDelivery: "35 minutes"
  },
  {
    id: "ORD-004",
    orderNumber: "#12348",
    orderDate: "17 Jan, 1:00 pm",
    deliveryDate: "17 Jan, 2024",
    deliveryTime: "1:40 PM",
    totalAmount: 560,
    status: "cancelled",
    paymentMethod: "upi",
    paymentStatus: "refunded",
    deliveryAddress: {
      street: "321 Koramangala",
      city: "Bangalore",
      state: "Karnataka",
      zipCode: "560034"
    },
    items: [
      {
        id: "ITEM-007",
        name: "Burger Combo",
        price: 280,
        quantity: 2,
        image: "https://example.com/product_8.png",
        description: "Burger with fries and coke"
      }
    ],
    restaurantName: "Burger King",
    restaurantId: "RES-004",
    estimatedDelivery: "20 minutes"
  },
  {
    id: "ORD-005",
    orderNumber: "#12349",
    orderDate: "16 Jan, 12:30 pm",
    deliveryDate: "16 Jan, 2024",
    deliveryTime: "1:00 PM",
    totalAmount: 120,
    status: "confirmed",
    paymentMethod: "wallet",
    paymentStatus: "completed",
    deliveryAddress: {
      street: "654 Jayanagar",
      city: "Bangalore",
      state: "Karnataka",
      zipCode: "560011"
    },
    items: [
      {
        id: "ITEM-008",
        name: "Masala Dosa",
        price: 80,
        quantity: 1,
        image: "https://example.com/product_9.png"
      },
      {
        id: "ITEM-009",
        name: "Filter Coffee",
        price: 40,
        quantity: 1,
        image: "https://example.com/product_10.png"
      }
    ],
    restaurantName: "South Indian Delight",
    restaurantId: "RES-005",
    estimatedDelivery: "15 minutes"
  }
];