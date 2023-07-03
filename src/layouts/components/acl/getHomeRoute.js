/**
 *  Set Home URL based on User Roles
 */
const getHomeRoute = (role) => {
  if (role === "landlord") return "/acl";
  else return "/home";
};

export default getHomeRoute;
