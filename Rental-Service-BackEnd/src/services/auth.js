import mongoCollections from "../config/mongoCollections";
const users = mongoCollections.users;

export async function verify(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      console.log(`Verifying token...`);
      const userCollection = await users();
      const user = await userCollection.findOne({
        authToken: token,
      });
      if (user) {
        console.log(`User Verified`);
        res.locals._id = user._id;
        res.locals.email = user.email;
        if (user.name) {
          res.locals.name = user.name;
        }
        return await next();
      } else {
        console.log("Invalid Token");
        return res.unauthorizedUser();
      }
    } else {
      console.log("Invalid Token");
      return res.unauthorizedUser();
    }
  } catch (e) {
    if (/invalid token/i.test(e)) return res.unauthorizedUser();
    return res.error(e);
  }
}
