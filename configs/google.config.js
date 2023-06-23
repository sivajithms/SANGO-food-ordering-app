import googleOAuth from 'passport-google-oauth20';
import { UserModel } from '../database/allModels';

const GoogleStrategy = googleOAuth.Strategy;

export default (passport) => {
    passport.use(
        new googleOAuth({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callBackURL: 'http:/localhost:5000/auth/google/callback'
        },
            async (accesToken, refreshToken, profile, done) => {
                const newUser = {
                    fullname: profile.displayName,
                    email: profile.email[0].value,
                    profilePic: profile.photos[0].value,
                };
                try {
                    const user = await UserModel.findOne({ email: newUser.email })
                    const token = user.generateToken();
                    if (user) {
                        done(null, { user, token });
                    } else {
                        const user = await UserModel.create(newUser);
                    }
                } catch (err) {
                    done(err, null);
                }
            }
        )
    )
}