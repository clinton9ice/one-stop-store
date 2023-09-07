/* eslint-disable no-mixed-spaces-and-tabs */
import "typescript/lib/lib.dom";
import * as CSS from "csstype";
declare global {
  interface Window {
    localStorage: WindowLocalStorage;
  }
}

export interface CSSProperties
  extends CSS.Properties<string | number>,
    CSS.PropertiesHyphen<string | number> {
  [v: `--${string}`]: string | number | undefined;
}
export type StyleValue = string | CSSProperties | Array<StyleValue>;

export type NotificationTypes = {
  data: {
    errors: Array<[]>;
    message: string;
    status: string;
  };
  response: {
    status: number | null;
    statusText: string;
  };
  error: {
    message: string;
  };
  text: string;
};

export interface NotificationState {
  notificationMessage: string | NotificationTypes["response"];
  notificationStatus: number | null | string;
}

export interface UserDropDown {
  name: string;
  href?: string;
  callback?: Function;
}
export type ProductContext = {
  id: number;
  category: string;
  description: string;
  imageUrl: string;
  name: string;
  unitPrice: number;
  unitsInStock: number;
};

export type CustomerInformation = {
  customerFirstName: string;
  customerLastName: string;
  customerEmail: string;
};
export type Address = {
  street: string;
  city: string;
  state: string;
  country: string;
};
export type OrderItem = {
  unitPrice: number;
  quantity: number;
  productId: number;
};

export type OrderContext = {
  totalQuantity: number;
  totalPrice: number;
  orderItems: OrderItem[] | [];
  billingAddress: Address;
  shippingAddress: Address;
} & CustomerInformation;
