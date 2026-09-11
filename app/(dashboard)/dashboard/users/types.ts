export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  profilePicture: string | null;
  createdAt: string;
  updatedAt: string;
  _count: {
    orders: number;
  };
  ordersCount: number;
}
