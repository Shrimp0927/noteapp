const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.clientId,
			clientSecret: keys.clientSecret,
			callbackURL: '/auth/google/callback',
		},
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({ googleId: profile.id });

			if (existingUser) {
				done(null, existingUser);
			} else {
				const user = await new User({
					googleId: profile.id,
					avatarURL: profile._json.picture,
				}).save();

				done(null, user);
			}
		}
	)
);
