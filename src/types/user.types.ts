// This type defines the structure for filtering users in queries
export type UserFilter = Partial<{
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
}>;
