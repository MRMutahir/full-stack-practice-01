import { genSaltSync, hashSync } from "bcrypt-ts";

const hashPassword = async (password: string): Promise<string> => {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);
  return hash;
};

export { hashPassword };
