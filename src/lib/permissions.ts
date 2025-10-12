import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,
  user: ["listPublicUsers"],
} as const;

const ac = createAccessControl(statement);

const superAdmin = ac.newRole({
  ...adminAc.statements,
  user: ["listPublicUsers"],
});

const admin = ac.newRole({
  ...adminAc.statements,
  user: ["listPublicUsers"],
});

const user = ac.newRole({
  user: ["listPublicUsers"],
});

export { ac, superAdmin, admin, user };
