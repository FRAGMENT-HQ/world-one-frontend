import { useMutation } from "@tanstack/react-query";
import { getUrl, request } from "../utils/network";
const getBlogsRequest = ( ) => {
  const url = getUrl(`/api/blogs/`);

  return request("GET", url, null, false);
};

export const getBlogsMutation = (successCallback, errorCallback) => {
  return useMutation(getBlogsRequest, {
    mutationKey: "get-blogs",
    onSuccess: (res) => {
      successCallback(res);
    },
    onError: (err) => {
      errorCallback(err);
    },
  });
};

const getBlogRequest = (id) => {
  const url = getUrl(`/api/blogs/${id}/`);

  return request("GET", url, null, false);
};

export const getBlogMutation = (successCallback, errorCallback) => {
  return useMutation(getBlogRequest, {
    mutationKey: "get-blog",
    onSuccess: (res) => {
      successCallback(res);
    },
    onError: (err) => {
      errorCallback(err);
    },
  });
};