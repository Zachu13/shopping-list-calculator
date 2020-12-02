export class Order {
  zone: string;
  shippingCost: number;
  extraShippingPrice: number;
  totalShippingPrice: number;
  totalPrice: number;
  constructor(
    zone: string,
    shippingCost: number,
    extraShippingPrice: number,
    totalShippingPrice: number,
    totalPrice: number
  ) {
    this.zone = zone;
    this.shippingCost = shippingCost;
    this.extraShippingPrice = extraShippingPrice;
    this.totalShippingPrice = totalShippingPrice;
    this.totalPrice = totalPrice;
  }
}
