import googleOAuth from 'passport-google-oauth20';
import { UserModel } from '../database/allModels';

const GoogleStrategy = googleOAuth.Strategy;

export default (passport) => {
    passport.use(
        new googleOAuth({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:5000/auth/google/callback', 
        },
            async (accesToken, refreshToken, profile, done) => {
                //creating new user
                const newUser = {
                    fullname: profile.displayName,
                    email: profile.emails[0].value,
                    profilePic: profile.photos[0].value,
                };
                try {
                    //check whether user exists or not
                    const user = await UserModel.findOne({ email: newUser.email })
                    if (user) {
                        //generate JWT token
                        const token = user.generateJwtToken();
                        //return user
                        done(null, { user, token });
                    } else {
                        //creating new user
                        const user = await UserModel.create(newUser);
                        const token = user.generateJwtToken();
                        //return user
                        done(null, (user, token));
                    }
                } catch (err) {
                    done(err, null);
                }
            }
        )
    );
    passport.serializeUser((userData, done) => done(null, { ...userData }))
    passport.deserializeUser((id, done) => done(null, id))
}