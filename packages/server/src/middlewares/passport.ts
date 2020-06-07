import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import User from '../models/user.model';

import config from '../config/index';

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret,
};

export default new Strategy(opts, async (payload, done) => {
    try {
        const user = await User.findById(payload.id, {
            password: 0,
            created_At: 0,
            last_session: 0,
            __v: 0,
        });
        const { exp } = payload;
        if (exp < Date.now()) {
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        }
        return done(null, false);
    } catch (err) {
        console.error(`[PJWT] This is the problem ${err}`);
    }
});
