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
export type LoginTypes = {
  email: string;
  password: string;
  roles?: string[];
  redirect?: boolean;
};

export interface UserStore {
  user: object | null;
  isLoggedIn: boolean;
}

export interface UserResponse {
  isFetching: boolean;
  error: unknown;
  data: {
    user: {
      first_name: string;
      last_name: string;
      full_name: string;
    };
    isLoggedIn: boolean;
  };
}

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

export interface UserAuthType {
  value: {
    data: {
      user: object;
      isLoggedIn: boolean;
    };
  };
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
