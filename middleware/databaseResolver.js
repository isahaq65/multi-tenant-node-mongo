import { getConnectionForTenant } from "../utils/connectionManager.js";
import { verifyJWT } from "../utils/misc.js";

export const databaseResolver = async (req, _, next) => {
  const urlArr = req.url.split("/");

  if (urlArr.includes("login")) return next();

  const token = req.headers.jwt;
  const payloadData = verifyJWT(token);
  const dbConnection = getConnectionForTenant(req.headers.tenantId || 'default');
  req.dbConnection = dbConnection;
  next();
};