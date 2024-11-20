"use server";

import { LOGIN_URL, REGISTER_URL } from "@/lib/APIsEndPoints";
import axios, { AxiosError } from "axios";

const RegisterAction = async (prevState: any, formData: FormData) => {
  try {
    const { data } = await axios.post(REGISTER_URL, {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirm_password: formData.get("confirm_password"),
    });

    if (data) {
      return {
        status: data.status || 200,
        message:
          data.message ||
          "User created successfully. Please verify your email.",
        errors: {},
      };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 422) {
        return {
          status: 422,
          message: error.response?.data.message,
          errors: error.response?.data.errors,
        };
      }
      return {
        status: error.response?.status || 400,
        message: error.response?.data?.message || "An error occurred",
        errors: error.response?.data?.errors || {},
      };
    } else {
      return {
        status: 500,
        message: "Unexpected error occurred",
        errors: {},
      };
    }
  }
};

const LoginAction = async (prevState: any, formData: FormData) => {
  try {
    const { data } = await axios.post(LOGIN_URL, {
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (data) {
      return {
        status: data.status || 200,
        message: data.message || "Login successfully.",
        errors: {},
      };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error?.response?.status! >= 400) {
        return {
          status: error.response?.status || 400,
          message: error.response?.data.message,
          errors: error.response?.data.errors,
        };
      }
    } else {
      return {
        status: 500,
        message: "Unexpected error occurred",
        errors: {},
      };
    }
  }
};
export { RegisterAction, LoginAction };
