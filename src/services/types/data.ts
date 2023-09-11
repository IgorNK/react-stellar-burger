export type TUser = {
  email: string,
  name: string  
};

export type TLoginResponse = {
  success: boolean,
  user: TUser,
  accessToken: string,
  refreshToken: string,
};

export type TRegisterResponse = {
  success: boolean,
  user: TUser,
  accessToken: string,
  refreshToken: string,
};

export type TUserResponse = {
  success: boolean,
  user: TUser,
}

export type TRefreshTokenResponse = {
  success: boolean,
  accessToken: string,
  refreshToken: string,
}

export interface ILoginForm {
  email: string,
  password: string,
};

export interface IUpdateUserForm {
  name: string,
  email: string,
  password?: string,
};

export interface IRegisterForm {
  name: string,
  email: string,
  password: string,
};

export interface IForgotPasswordForm {
  email: string,
};

export interface IResetPasswordForm {
  password: string,
  token: string,
};

export type TFormData = ILoginForm | IUpdateUserForm | IRegisterForm | IForgotPasswordForm | IResetPasswordForm;

export type TIngredient = {
  _id: string,
  name: string,
  type: string,
  proteins?: number,
  fat?: number,
  carbohydrates?: number,
  calories?: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large?: string,
  __v?: number,
};

export type TIngredientsResponse = {
  success: boolean,
  data: ReadonlyArray<TIngredient>,
}

export type TCartItem = {
  item: TIngredient,
  key: string,
}

export type TOrder = {
  ingredients: string[],
  _id: string,
  status: string,
  number: string,
  name?: string,
  createdAt: string,
  updatedAt: string,
};

export type TOrderResponse = {
  success: boolean,
  order: TOrder,
}

export type TOrdersResponse = {
  success: boolean,
  orders: ReadonlyArray<TOrder>,
};

export type TWsMessage = {
  orders: ReadonlyArray<TOrder>,
  success: boolean,
  total: number,
  totalToday: number,
  storage?: string,
};