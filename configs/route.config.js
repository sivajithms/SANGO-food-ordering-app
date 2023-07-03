import JwtPassport from 'passport-jwt';

//database model
import { UserModel } from '../database/user';
import passport from 'passport';

const JWTStrategy = JwtPassport.Strategy;
const ExtractJwt = JwtPassport.ExtractJwt;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'SangoApp'
};

export default (passport) => {
    passport.UserModel(
        new JWTStrategy(options, async (jwt__payload, done) => {
            try {
                const doesUserExist = UserModel.findById(jwt__payload.user);
                if (!doesUserExist) return done(null, false);

                return (null, doesUserExist);
            } catch (error) {
                throw new Error(error);
            }
        })
    )
}