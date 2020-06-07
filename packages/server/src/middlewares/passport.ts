import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';

import config from '../config/index';

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret,
};

export default new Strategy(opts, async (payload, done) => {
    try {
        const { expiresIn } = payload;
        if (expiresIn < Date.now()) {
            return done(null);
        }
        return done(null, false);
    } catch (err) {
        console.error(`[PJWT] This is the problem ${err}`);
    }
});
