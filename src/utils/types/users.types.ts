export type RegisterTypeDTO = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export type LoginTypeDTO = {
  username?: string;
  email?: string;
  password: string;
};
