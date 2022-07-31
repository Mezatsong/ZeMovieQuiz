import { MiddlewareFn, UnauthorizedError } from "type-graphql";
import { verify, sign } from "jsonwebtoken";
import { MyContext } from "../types";
import config from "../constants";

const SECRET_KEY = config.authTokenSecret;

export const verifyToken = (token: string) => verify(token, SECRET_KEY);

export const signToken = (payload: string | object) => sign(payload, SECRET_KEY, { expiresIn: '15m' });

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];

  if (!authorization) {
    throw new UnauthorizedError();
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = verifyToken(token);
    console.log(payload);
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
    throw new UnauthorizedError();
  }

  return next();
};