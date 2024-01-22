export type Product = {
  id: number;
  product_name: string;
  description: string;
  image: string;
  price_details: {
    currency_code: string;
    actual_price: number;
    current_price: number;
    discount: string;
  };
  rating_details: {
    rating: number;
    scale: number;
  };
  available_sizes: string[];
  modelImg: string;
};

export type OfferProduct = {
  id: number;
  modelImg: string;
  discountText: string;
  discountCode: string;
  discountSlogan: string;
};
