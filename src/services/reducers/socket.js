import {
  WS_USER_NAME_UPDATE,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE
} from '../actions/socket';

const initialState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

export const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      console.log("connection success")
      return {
        ...state,
        wsConnected: true
      };

    case WS_CONNECTION_ERROR:
      console.log("connection error")
      return {
        ...state,
        wsConnected: false
      };

    case WS_CONNECTION_CLOSED:
      console.log("connection closed")
      return {
        ...state,
        wsConnected: false
      };

    case WS_GET_MESSAGE:
      console.log(`get message payload: ${action.payload}`);
      const message = JSON.parse(action.payload);
      return {
        ...state,
        orders: message.orders,
        total: message.total,
        totalToday: message.totalToday,
      };
      
    default:
      return state;
  }
};