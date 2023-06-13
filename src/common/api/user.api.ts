import {
  CreateNewUserType,
  CreateRootUserType,
  CurrentUserSchema,
  ResponseFetchUserSchema,
  ResponseLoginUserSchema,
  loginUserType,
} from "../schema/UserSchema";
import axios from "./axios";

// register the root user and business
export const createRootUser = async (rootUserData: CreateRootUserType) =>
  await axios.post(`/api/auth/register`, rootUserData);

// login user
export const loginUser = async (userData: loginUserType) =>
  await axios
    .post(`/api/auth/login`, userData)
    .then((res) => ResponseLoginUserSchema.parse(res.data));

// fetch currenlty logged in user
export const fetchCurrentUser = async () =>
  await axios
    .get("/api/users/me")
    .then((res) => CurrentUserSchema.parse(res.data?.data));

// register the root user and business
export const createNewUser = async (userData: CreateNewUserType) =>
  await axios.post(`/api/users`, userData);

// register the root user and business
export const fetchUsers = async ({ businessId }: { businessId: string }) =>
  await axios
    .get(`/api/users?businessId=${businessId}`)
    .then((res) => ResponseFetchUserSchema.parse(res.data?.data));
