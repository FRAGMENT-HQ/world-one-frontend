import { useMutation } from "@tanstack/react-query";
import { getUrl, request } from "../utils/network";


const loginRequest = ( data ) => {
  const url = getUrl(`/api/users/login/`);

  return request("Post", url, data, false);
};

export const loginMutation = (successCallback, errorCallback) => {
  return useMutation(loginRequest, {
    mutationKey: "login",
    onSuccess: (res) => {
      successCallback(res);
    },
    onError: (err) => {
      errorCallback(err);
    },
  });
};

const signupRequest = (data) => {
  const url = getUrl(`/api/users/signup/`);

  return request("POST", url, data, false);
};

export const signupMutation = (successCallback, errorCallback) => {
  return useMutation(signupRequest, {
    mutationKey: "signup",
    onSuccess: (res) => {
      successCallback(res);
    },
    onError: (err) => {
      errorCallback(err);
    },
  });
};



const gLoginRequest = (data) => {
  const url = getUrl(`/api/users/google_login/`);

  return request("POST", url, data, false);
};

export const gLoginMutation = (successCallback, errorCallback) => {
  return useMutation(gLoginRequest, {
    mutationKey: "rate-request",
    onSuccess: (res) => {
      successCallback(res);
    },
    onError: (err) => {
      errorCallback(err);
    },
  });
};

const verifyRequest = (data) => {
  const url = getUrl(`/api/users/verify_otp/`);

  return request("POST", url, data, false);
};

export const verifyMutation = (successCallback, errorCallback) => {
  return useMutation(verifyRequest, {
    mutationKey: "rate-request",
    onSuccess: (res) => {
      successCallback(res);
    },
    onError: (err) => {
      errorCallback(err);
    },
  });
};
const completeRequest = (data) => {
  const url = getUrl(`/api/users/completeProfile/`);

  return request("POST", url, data, false);
};

export const completeMutation = (successCallback, errorCallback) => {
  return useMutation(completeRequest, {
    mutationKey: "rate-request",
    onSuccess: (res) => {
      successCallback(res);
    },
    onError: (err) => {
      errorCallback(err);
    },
  });
};
const forgotPasswordRequest = (data) => {
  const url = getUrl(`/api/users/forgot_password/`);

  return request("POST", url, data, false);
};

export const forgotPasswordMutation = (successCallback, errorCallback) => {
  return useMutation(forgotPasswordRequest, {
    mutationKey: "rate-request",
    onSuccess: (res) => {
      successCallback(res);
    },
    onError: (err) => {
      errorCallback(err);
    },
  });
};
const verifyPasswordRequest = (data) => {
  const url = getUrl(`/api/users/reset_password/`);

  return request("POST", url, data, false);
};

export const verifyPasswordMutation = (successCallback, errorCallback) => {
  return useMutation(verifyPasswordRequest, {
    mutationKey: "rate-request",
    onSuccess: (res) => {
      successCallback(res);
    },
    onError: (err) => {
      errorCallback(err);
    },
  });
};
// completeProfile