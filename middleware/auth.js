const { expressjwt } = require("express-jwt");

const authToken = () => {
  const secret = process.env.SECRET_JWT;
  return expressjwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevokedFun,
  }).unless({
    path: [
      { url: /\/api\/v1\/prodect(.*)/, method: ["GET"] },
      "/api/v1/user/login",
      "/api/v1/",
      "/api/v1/getCount",
      "/api/v1/user",
    ],
  });
};


async function isRevokedFun(res, token) {
  const payload = token.payload;
  if (!payload.isAdmin) {
    return true;
  }
  return false;
}

module.exports = authToken;

