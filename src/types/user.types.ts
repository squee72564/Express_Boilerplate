import userValidations from "@/validations/user.validations.ts";
import { ZodRequest } from "../utils/zodReqeust.ts";

export type GetUserRequest = ZodRequest<typeof userValidations.getUserById>;
export type GetUserArgs = GetUserRequest["query"];
