import jwt from "jsonwebtoken";
import { UserId } from "../user/model/user.id";
import { sessionRepository } from "../user/session.repository";
import { JwtLoginPayload } from "./model/jwt-payload";
import { randomBytes } from 'crypto';
import { jwtDto } from "./dto/jwt.dto";
import { jwtError } from "../../utility/http-errors";

export class JwtService {
  constructor(private sessionRepo: sessionRepository) { }

  async sign(id: UserId, rememberMe: boolean) {
    const payload: JwtLoginPayload = { id: id }

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "1h" })
    const refreshToken = randomBytes(64).toString('hex')
    const time = rememberMe ? 24 * 3600 * 1000 : 6 * 3600 * 1000;
    const userInfo = await this.sessionRepo.createSession(refreshToken, id, new Date(Date.now() + time));
    return { userInfo, accessToken, refreshToken }
  }


  async verify(dto : jwtDto) { // ASK : T?? <T extends verifedToken> Promise<T>?
    if (typeof dto.token !== 'string') {
      throw new jwtError() // NOTE: new JsonWebTokenError('jwt must be a string')
    }

    const parts = dto.token.split('.');

    if (parts.length !== 3) {
      throw new jwtError() //NOTE: new JsonWebTokenError('jwt malformed')
    }
    const accessKey = process.env.ACCESS_TOKEN_SECRET as string;
    jwt.verify(dto.token, accessKey, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError" || err.name === "NotBeforeError") {
          throw new jwtError()
        }
      } else {
        let payload = decoded as jwt.JwtPayload
        if (!decoded) {
          throw new jwtError()
        }
        if (typeof payload === 'string') {
          try {
            var obj = JSON.parse(payload);
            if (obj !== null && typeof obj === 'object') {
              payload = obj;
            }
          } catch (e) { throw new jwtError() }
        }
        const id = payload.id
        if (!UserId.is(id)) {
          throw new jwtError()
        }
      }
      
    })
    return "valid"

  }
}
