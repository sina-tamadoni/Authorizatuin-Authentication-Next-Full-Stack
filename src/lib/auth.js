import { compare, hash } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

async function hashPassword(pass) {
  const hashedPass = await hash(pass, 12);
  return hashedPass;
}

function generateToken(payload) {
  const token = sign({ ...payload }, process.env.PRIVATE_KEY, {
    algorithm: "HS256",
    expiresIn: "24h",
  });
  return token;
}
async function verifyPassword(pass, hashedPass) {
  const isValid = await compare(pass, hashedPass);
  return isValid;
}

function verifyToken(token) {
  try {
    const tokenPayload = verify(token, process.env.PRIVATE_KEY); // {email: 'ss.tamadoni@gmail.com', iat: 1737020957, exp: 1737107357}
    return tokenPayload;
  } catch (error) {
    throw new Error(error);
  }
}

export { hashPassword, generateToken, verifyPassword, verifyToken };
