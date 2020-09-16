export default {
  jwtSecret: process.env.JWTSECRET,
  serverPort: process.env.SERVERPORT,
  emailFromAddress: process.env.EMAILFROMADDRESS,
  emailHost: process.env.EMAILHOST,
  emailPort: process.env.EMAILPORT,
  emailUser: process.env.EMAILUSER,
  emailPassword: process.env.EMAILPASSWORD,
  clientUrl: process.env.CLIENTURL,
  tokenExpiresIn: process.env.TOKENEXPIRES,
  refreshTokenExpiresIn: process.env.REFRESHTOKENEXPIRES,
  cookieExpires: process.env.COOKIEEXPIRES,
  refreshCookieExpires: process.env.REFRESHCOOKIEEXPIRES
};
