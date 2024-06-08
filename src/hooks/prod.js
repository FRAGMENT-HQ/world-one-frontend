import { useMutation } from "@tanstack/react-query";
import { getUrl, request } from "../utils/network";

const rateRequest = (curr) => {
  const url = getUrl(`/api/products/forex/get_rate/?curr=${curr}`);

  return request("GET", url, null, false);
};

export const getRateMutation = (successCallback, errorCallback) => {
  return useMutation(rateRequest, {
    mutationKey: "rate-request",
    onSuccess: (res) => {
      successCallback(res);
    },
    onError: (err) => {
      errorCallback(err);
    },
  });
};

const orderRequest = (data) => {
  const url = getUrl(`/api/products/order/create_order/`);

  return request("POST", url, data, false,'multipart/form-data');
};

export const postOrderMutation = (successCallback, errorCallback) => {
  return useMutation(orderRequest, {
    mutationKey: "rate-request",
    onSuccess: (res) => {
      successCallback(res);
    },
    onError: (err) => {
      errorCallback(err);
    },
  });
};

const rateCardRequest = () => {
  const url = getUrl(`/api/products/forex/mini`);

  return request("GET", url, null, false);
};

export const getRateCardMutation = (successCallback, errorCallback) => {
  return useMutation(rateCardRequest, {
    mutationKey: "rate-request",
    onSuccess: (res) => {
      successCallback(res);
    },
    onError: (err) => {
      errorCallback(err);
    },
  });
};

const fullRateCardRequest = () => {
  const url = getUrl(`/api/products/forex`);

  return request("GET", url, null, false);
};

export const getFullRateCardMutation = (successCallback, errorCallback) => {
  return useMutation(fullRateCardRequest, {
    mutationKey: "rate-request",
    onSuccess: (res) => {
      successCallback(res);
    },
    onError: (err) => {
      errorCallback(err);
    },
  });
};

export const submitQueryRequest = (Data) => {
  const url = getUrl(`/api/products/userquery/`);

  return request("POST", url, Data, false);
};


const loginRequest = (data) => {
  const url = getUrl(`/api/users/google_login/`);

  return request("POST", url, data, false);
};

export const loginMutation = (successCallback, errorCallback) => {
  return useMutation(loginRequest, {
    mutationKey: "rate-request",
    onSuccess: (res) => {
      successCallback(res);
    },
    onError: (err) => {
      errorCallback(err);
    },
  });
};

const listOutletsRequest = () => {
  const url = getUrl(`/api/outlets/`);

  return request("GET", url, null, false);
};

export const listOutletsMutation = (successCallback, errorCallback) => {
  return useMutation(listOutletsRequest, {
    mutationKey: "outlet-request",
    onSuccess: (res) => {
      successCallback(res);
    },
    onError: (err) => {
      errorCallback(err);
    },
  });
};

const listOrdersRequest = (email) => {
  const url = getUrl(`/api/items/?email=${email}`);

  return request("GET", url, null, false);
};

export const listOrdersMutation = (successCallback, errorCallback) => {
  return useMutation(listOrdersRequest, {
    mutationKey: "outlet-request",
    onSuccess: (res) => {
      successCallback(res);
    },
    onError: (err) => {
      errorCallback(err);
    },
  });
};

const submitRequest = (data) => {
  const url = getUrl(`/api/resume/`);

  return request("POST", url, data, false);
};

export const submitMutation = (successCallback, errorCallback) => {
  return useMutation(submitRequest, {
    mutationKey: "resume-request",
    onSuccess: (res) => {
      successCallback(res);
    },
    onError: (err) => {
      errorCallback(err);
    },
  });
};
const addLocationRequest = (data) => {
  const url = getUrl(`/api/add-adress/`);

  return request("POST", url, data, false);
};

export const locationMutation = (successCallback, errorCallback) => {
  return useMutation(addLocationRequest, {
    mutationKey: "location-request",
    onSuccess: (res) => {
      successCallback(res);
    },
    onError: (err) => {
      errorCallback(err);
    },
  });
};