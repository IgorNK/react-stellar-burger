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

export type TLoginForm = {
  email: string,
  password: string,
};

export type TUpdateUserForm = {
  name?: string,
  email?: string,
  password?: string,
};

export type TRegisterForm = {
  name: string,
  email: string,
  password: string,
};

export type TForgotPasswordForm = {
  email: string,
};

export type TResetPasswordForm = {
  password: string,
  token: string,
};

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

export type TWsMessage = {
  orders: ReadonlyArray<TOrder>,
  success: boolean,
  total: number,
  totalToday: number,
  storage?: string,
};