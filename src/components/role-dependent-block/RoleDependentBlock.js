import { getUserRoles } from "../../api/Cookie";

function RoleDependentBlock({ role, children }) {
  const hasRole = getUserRoles().includes(role);

  let block;
  if (hasRole) {
    block = children;
  } else {
    block = null;
  }

  return <>{block}</>;
}

export default RoleDependentBlock;
