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

  return request("POST", url, data, false);
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
  const url = getUrl(`/api/products/forex/`);

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
