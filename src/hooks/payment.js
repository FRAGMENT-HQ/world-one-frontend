import { useMutation } from "@tanstack/react-query";
import { getUrl, request } from "../utils/network";
const createPayout = (data) => {
  const url = getUrl(`/api/payments/payouts/`);

  return request("POST", url, data, true);
};

export const createPayoutMutation = (successCallback, errorCallback) => {
  return useMutation(createPayout, {
    mutationKey: "create-payout",
    onSuccess: (res) => {
      successCallback(res);
    },
    onError: (err) => {
      errorCallback(err);
    },
  });
};


const confirmPaymentRequest = (data) => {
  const url = getUrl(`/api/payments/confirmation/`);

  return request("POST", url, data, true);
};

export const confirmPaymentMutation = (successCallback, errorCallback) => {
  return useMutation(confirmPaymentRequest, {
    mutationKey: "confirm-payout",
    onSuccess: (res) => {
      successCallback(res);
    },
    onError: (err) => {
      errorCallback(err);
    },
  });
};