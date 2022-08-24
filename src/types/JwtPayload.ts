
export type JwtPayload = {
  username: string;
  email: string;
  role:Role;
  created_at: Date;
};

export type Role = "admin" | "user"