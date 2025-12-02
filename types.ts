export type Product = {
  id: string;
  title: string;
  imageUrl: string[];
  category: string;
  description: string;
  price: number;
  discountedPrice: number;
  rating: number;
  quantity: number;
};

export type OrderProduct = {
  id: string;
  title: string;
  imageUrl: string[];
  category: string;
  description: string;
  price: number;
  discountedPrice: number;
  quantity: number;
};

export type Order = {
  id: string;
  fullName: string;
  email: string;
  address: string;
  products: OrderProduct[];
  totalPrice: number;
  sms?: string;
  status: string;
};
export type Messages = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  phoneNumber: number;
};

export type Blog = {
  forImg: string;
  sarlavha: string;
  description: string;
  yil: number;
  haftaKuni: string;
  kun: string;
};
