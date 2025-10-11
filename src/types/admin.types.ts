import adminValidations from "@/validations/admin.validations.js";
import { z } from "zod";
import { Request } from "express";

export type CreateUserParams = z.infer<typeof adminValidations.CreateUserRequestSchema>["body"];
export interface CreateUserRequest extends Request {
  body: CreateUserParams;
}

export type ListUserParams = z.infer<typeof adminValidations.ListUserRequestSchema>["body"];
export interface ListUserRequest extends Request {
  body: ListUserParams;
}

export type SetUserRoleParams = z.infer<typeof adminValidations.SetUserRoleRequestSchema>["body"];
export interface SetUserRoleRequest extends Request {
  body: SetUserRoleRequest;
}

export type SetUserPasswordParams = z.infer<
  typeof adminValidations.SetUserPasswordRequestSchema
>["body"];
export interface SetUserPasswordRequest extends Request {
  body: SetUserPasswordParams;
}

export type UpdateUserParams = z.infer<typeof adminValidations.UpdateUserRequestSchema>["body"];
export interface UpdateUserRequest extends Request {
  body: UpdateUserParams;
}

export type BanUserParams = z.infer<typeof adminValidations.BanUserRequestSchema>["body"];
export interface BanUserRequest extends Request {
  body: BanUserParams;
}

export type UnbanUserParams = z.infer<typeof adminValidations.UnbanUserRequestSchema>["body"];
export interface UnbanUserRequest extends Request {
  body: UnbanUserParams;
}

export type ListUserSessionsParams = z.infer<
  typeof adminValidations.ListUserSessionsRequestSchema
>["body"];
export interface ListUserSessionsRequest extends Request {
  body: ListUserSessionsParams;
}

export type RevokeUserSessionParams = z.infer<
  typeof adminValidations.RevokeUserSessionRequestSchema
>["body"];
export interface RevokeUserSessionRequest extends Request {
  body: RevokeUserSessionParams;
}

export type RevokeAllUserSessionParams = z.infer<
  typeof adminValidations.RevokeAllUserSessionRequestSchema
>["body"];
export interface RevokeAllUserSessionRequest extends Request {
  body: RevokeAllUserSessionParams;
}

export type ImpersonateUserParams = z.infer<
  typeof adminValidations.ImpersonateUserRequestSchema
>["body"];
export interface ImpersonateUserRequest extends Request {
  body: ImpersonateUserParams;
}

export type RemoveUserParams = z.infer<typeof adminValidations.RemoveUserRequestSchema>["body"];
export interface RemoveUserRequest extends Request {
  body: RemoveUserParams;
}
