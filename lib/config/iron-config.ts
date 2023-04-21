export const ironOptions = {
  cookieName: "MY_APP_COOKIE",
  password: process.env.SESSION_PASS as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production" ? true : false,
  }
}