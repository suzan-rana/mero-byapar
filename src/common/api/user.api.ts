import { CreateRootUserType } from "../schema/UserSchema";
import axios from "./axios";

export const createRootUser = async (rootUserData: CreateRootUserType) =>
  await axios.post(`/api/auth/register`, rootUserData);
