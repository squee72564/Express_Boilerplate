import type { Request } from "express";

import auth from "../lib/auth.js";
import { GetUserArgs, ListUsersArgs } from "../types/user.types.ts";

const getUserById = async (args: GetUserArgs, req: Request) => {
  return auth.api.getUser({
    query: {
      id: args.id,
    },
    headers: req.headers,
  });
};

const listUsers = async (args: ListUsersArgs, req: Request) => {
  return auth.api.listUsers({
    query: {
      searchValue: args.searchValue,
      searchField: args.searchField,
      searchOperator: args.searchOperator,
      limit: args.limit,
      offset: args.offset,
      sortBy: args.sortBy,
      sortDirection: args.sortDirection,
      filterField: args.filterField,
      filterValue: args.filterValue,
      filterOperator: args.filterOperator,
    },
    headers: req.headers,
  });
};

export default {
  getUserById,
  listUsers,
};
