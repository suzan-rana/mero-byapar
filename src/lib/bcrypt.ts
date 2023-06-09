import bcrypt from "bcrypt";

export const encryptPassword = async (rawPassword: string) => {
  return await bcrypt.hash(rawPassword, 10);
};
export const comparePassword = async (
  rawPassword: string,
  dbPassword: string
) => {
  return await bcrypt.compare(rawPassword, dbPassword);
};
