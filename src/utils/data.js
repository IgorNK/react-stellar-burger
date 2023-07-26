export const dataUrl = "https://norma.nomoreparties.space/api";

export const formatNumber = (num) => {
  return num?.toString().replace(/(.)(?=(\d{3})+$)/g, "$1 ");
};

export const getOrderStatus = (status) => {
  switch (status) {
    case "cooking": {
      return <p className="text text_type_main-small">Готовится</p>;
    }
    case "pending": {
      return <p className="text text_type_main-small">Готовится</p>;
    }
    case "created": {
      return <p className="text text_type_main-small">Готовится</p>;
    }
    case "done": {
      return (
        <p className="text text_type_main-small" style={{ color: "#0cc" }}>
          Готов
        </p>
      );
    }
    case "cancelled": {
      return (
        <p className="text text_type_main-small" style={{ color: "#e52b1a" }}>
          Отменён
        </p>
      );
    }
    default: {
      return (
        <p className="text text_type_main-small" style={{ color: "#e52b1a" }}>
          Нет статуса
        </p>
      );
    }
  }
};

//in: "2021-06-23T14:43:22.587Z"
//out: Сегодня, 16:20 i-GMT+3
export const formatDate = (date) => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const dateOptions = {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: timezone,
  };
  const orderDate = new Date(Date.parse(date)); 
  console.log(`orderDate: ${typeof orderDate} ${orderDate}`)
  const currentDate = new Date(Date.now());
  console.log(`currentDate: ${typeof currentDate} ${currentDate}`)
  const orderDateLocal = dateToLocalTimezone(orderDate, dateOptions);
  console.log(`orderDateLocal: ${typeof orderDateLocal} ${orderDateLocal}`)
  const currentDateLocal = dateToLocalTimezone(currentDate, dateOptions);
  console.log(`currentDateLocal: ${typeof currentDateLocal} ${currentDateLocal}`)
  const todayLocal = new Date(currentDateLocal.getTime());
  console.log(`todayLocal: ${typeof todayLocal} ${todayLocal}`)
  todayLocal.setHours(0, 0, 0, 0);
  
  const yesterdayLocal = new Date(todayLocal.getTime());
  const beforeYesterdayLocal = new Date(todayLocal.getTime());
  const tomorrowLocal = new Date(todayLocal.getTime());
  const afterTomorrowLocal = new Date(todayLocal.getTime());
  const afterAfterTomorrowLocal = new Date(todayLocal.getTime());
  yesterdayLocal.setDate(todayLocal.getDate() - 1);
  beforeYesterdayLocal.setDate(todayLocal.getDate() - 2);
  tomorrowLocal.setDate(todayLocal.getDate() + 1);
  afterTomorrowLocal.setDate(todayLocal.getDate() + 2);
  afterAfterTomorrowLocal.setDate(todayLocal.getDate() + 3);
  
  const hoursOffset = currentDate.getTimezoneOffset() / 60;
  let dateString = `${orderDate.toLocaleString(navigator.language, dateOptions)}`;
  console.log(`orderdate: ${typeof orderDateLocal} ${orderDateLocal} ${orderDateLocal.getTime()}; today: ${typeof todayLocal} ${todayLocal} ${todayLocal.getTime()}`);

  switch (true) {
    case (orderDateLocal.getTime() >= afterTomorrowLocal.getTime() && orderDateLocal.getTime() <= afterAfterTomorrowLocal.getTime()): {
      dateString = `Послезавтра, ${formatTime(orderDateLocal)}`;
      break;
    }
    case (orderDateLocal.getTime() >= tomorrowLocal.getTime() && orderDateLocal.getTime() <= afterTomorrowLocal.getTime()): {
      dateString = `Завтра, ${formatTime(orderDateLocal)}`;
      break;
    }
    case (orderDateLocal.getTime() >= todayLocal.getTime() && orderDateLocal.getTime() <= tomorrowLocal.getTime()): {
      dateString = `Сегодня, ${formatTime(orderDateLocal)}`;
      break;
    }
    case (orderDateLocal.getTime() >= yesterdayLocal.getTime() && orderDateLocal.getTime() <= todayLocal.getTime()): {
      dateString = `Вчера, ${formatTime(orderDateLocal)}`;
      break;
    }
    case (orderDateLocal.getTime() >= beforeYesterdayLocal.getTime() && orderDateLocal.getTime() <= yesterdayLocal.getTime()): {
      dateString = `Позавчера, ${formatTime(orderDateLocal)}`;
      break;
    }
    default: {
      break;
    }
  }
  return `${dateString} i-GMT${formatGMT(hoursOffset)}`;
};

const dateToLocalTimezone = (date, options) => {  
  return new Date(date.toLocaleString('en-US', options));
}

const formatGMT = (hoursOffset) => {
  return hoursOffset > 0 ? "+" + hoursOffset : hoursOffset;
}

const formatTime = (date) => {
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

export const testFeedOrders = {
  success: true,
  orders: [
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa093e",
      ],
      _id: "",
      status: "done",
      number: 342561,
      createdAt: "2021-06-23T14:43:22.587Z",
      updatedAt: "2021-06-23T14:43:22.603Z",
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0942",
      ],
      _id: "",
      status: "done",
      number: 469817,
      createdAt: "2022-07-23T14:43:22.217Z",
      updatedAt: "2022-07-23T14:43:22.633Z",
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0942",
      ],
      _id: "",
      status: "done",
      number: 469817,
      createdAt: "2022-07-23T14:43:22.217Z",
      updatedAt: "2022-07-23T14:43:22.633Z",
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa093e",
      ],
      _id: "",
      status: "done",
      number: 342561,
      createdAt: "2021-06-23T14:43:22.587Z",
      updatedAt: "2021-06-23T14:43:22.603Z",
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa093e",
      ],
      _id: "",
      status: "done",
      number: 342561,
      createdAt: "2021-06-23T14:43:22.587Z",
      updatedAt: "2021-06-23T14:43:22.603Z",
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa093e",
      ],
      _id: "",
      status: "done",
      number: 342561,
      createdAt: "2021-06-23T14:43:22.587Z",
      updatedAt: "2021-06-23T14:43:22.603Z",
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0942",
      ],
      _id: "",
      status: "done",
      number: 469817,
      createdAt: "2022-07-23T14:43:22.217Z",
      updatedAt: "2022-07-23T14:43:22.633Z",
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0942",
      ],
      _id: "",
      status: "done",
      number: 469817,
      createdAt: "2022-07-23T14:43:22.217Z",
      updatedAt: "2022-07-23T14:43:22.633Z",
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0942",
      ],
      _id: "",
      status: "done",
      number: 469817,
      createdAt: "2022-07-23T14:43:22.217Z",
      updatedAt: "2022-07-23T14:43:22.633Z",
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa093e",
      ],
      _id: "",
      status: "done",
      number: 342561,
      createdAt: "2021-06-23T14:43:22.587Z",
      updatedAt: "2021-06-23T14:43:22.603Z",
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa093e",
      ],
      _id: "",
      status: "done",
      number: 342561,
      createdAt: "2021-06-23T14:43:22.587Z",
      updatedAt: "2021-06-23T14:43:22.603Z",
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa093e",
      ],
      _id: "",
      status: "done",
      number: 342561,
      createdAt: "2021-06-23T14:43:22.587Z",
      updatedAt: "2021-06-23T14:43:22.603Z",
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa093e",
      ],
      _id: "",
      status: "done",
      number: 342561,
      createdAt: "2021-06-23T14:43:22.587Z",
      updatedAt: "2021-06-23T14:43:22.603Z",
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa093e",
      ],
      _id: "",
      status: "done",
      number: 342561,
      createdAt: "2021-06-23T14:43:22.587Z",
      updatedAt: "2021-06-23T14:43:22.603Z",
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa093e",
      ],
      _id: "",
      status: "done",
      number: 342561,
      createdAt: "2021-06-23T14:43:22.587Z",
      updatedAt: "2021-06-23T14:43:22.603Z",
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0942",
      ],
      _id: "",
      status: "created",
      number: 469817,
      createdAt: "2022-07-23T14:43:22.217Z",
      updatedAt: "2022-07-23T14:43:22.633Z",
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
      ],
      _id: "",
      status: "pending",
      number: 263497,
      createdAt: "2023-08-18T10:40:22.587Z",
      updatedAt: "2023-08-18T11:48:12.403Z",
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
      ],
      _id: "",
      status: "pending",
      number: 263497,
      createdAt: "2023-08-18T10:40:22.587Z",
      updatedAt: "2023-08-18T11:48:12.403Z",
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
      ],
      _id: "",
      status: "pending",
      number: 263497,
      createdAt: "2023-08-18T10:40:22.587Z",
      updatedAt: "2023-08-18T11:48:12.403Z",
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
      ],
      _id: "",
      status: "pending",
      number: 263497,
      createdAt: "2023-08-18T10:40:22.587Z",
      updatedAt: "2023-08-18T11:48:12.403Z",
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
      ],
      _id: "",
      status: "pending",
      number: 263497,
      createdAt: "2023-08-18T10:40:22.587Z",
      updatedAt: "2023-08-18T11:48:12.403Z",
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
      ],
      _id: "",
      status: "pending",
      number: 263497,
      createdAt: "2023-08-18T10:40:22.587Z",
      updatedAt: "2023-08-18T11:48:12.403Z",
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
      ],
      _id: "",
      status: "pending",
      number: 263497,
      createdAt: "2023-08-18T10:40:22.587Z",
      updatedAt: "2023-08-18T11:48:12.403Z",
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
      ],
      _id: "",
      status: "pending",
      number: 263497,
      createdAt: "2023-08-18T10:40:22.587Z",
      updatedAt: "2023-08-18T11:48:12.403Z",
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
      ],
      _id: "",
      status: "pending",
      number: 263497,
      createdAt: "2023-08-18T10:40:22.587Z",
      updatedAt: "2023-08-18T11:48:12.403Z",
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
      ],
      _id: "",
      status: "pending",
      number: 263497,
      createdAt: "2023-08-18T10:40:22.587Z",
      updatedAt: "2023-08-18T11:48:12.403Z",
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
      ],
      _id: "",
      status: "pending",
      number: 263497,
      createdAt: "2023-08-18T10:40:22.587Z",
      updatedAt: "2023-08-18T11:48:12.403Z",
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
      ],
      _id: "",
      status: "pending",
      number: 263497,
      createdAt: "2023-08-18T10:40:22.587Z",
      updatedAt: "2023-08-18T11:48:12.403Z",
    },
  ],
  total: 38752,
  totalToday: 3568,
};

export const testUserOrders = {
  success: true,
  orders: [
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa093e",
      ],
      _id: "",
      status: "done",
      number: 1,
      createdAt: "2021-06-23T20:11:01.403Z",
      updatedAt: "2021-06-23T20:11:01.406Z",
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0942",
      ],
      _id: "",
      status: "cancelled",
      number: 1,
      createdAt: "2021-06-23T20:11:01.403Z",
      updatedAt: "2021-06-23T20:11:01.406Z",
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
      ],
      _id: "",
      status: "done",
      number: 3,
      createdAt: "2021-06-23T20:13:23.654Z",
      updatedAt: "2021-06-23T20:13:23.657Z",
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
      ],
      _id: "",
      status: "pending",
      number: 263497,
      createdAt: "2023-08-18T10:40:22.587Z",
      updatedAt: "2023-08-18T11:48:12.403Z",
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
      ],
      _id: "",
      status: "pending",
      number: 263497,
      createdAt: "2023-08-18T10:40:22.587Z",
      updatedAt: "2023-08-18T11:48:12.403Z",
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
      ],
      _id: "",
      status: "pending",
      number: 263497,
      createdAt: "2023-08-18T10:40:22.587Z",
      updatedAt: "2023-08-18T11:48:12.403Z",
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
      ],
      _id: "",
      status: "pending",
      number: 263497,
      createdAt: "2023-08-18T10:40:22.587Z",
      updatedAt: "2023-08-18T11:48:12.403Z",
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0941",
      ],
      _id: "",
      status: "pending",
      number: 263497,
      createdAt: "2023-08-18T10:40:22.587Z",
      updatedAt: "2023-08-18T11:48:12.403Z",
    },
  ],
  total: 3,
  totalToday: 3,
};
