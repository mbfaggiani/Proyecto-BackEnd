import passport from "passport";
import local from 'passport-local';
import GithubStrategy from 'passport-github2'
import registroModel from '../dao/models/regist.schema.js'
import { isValidPassword, createHash } from "../utils/criptografia.js"
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_CALLBACK_URL } from '../config/auth.config.js'


const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use('register', new LocalStrategy({
        passReqToCallback: true, usernameField: 'email'
    }, async (req, username, password, done) => {
        const { firstName, lastName, email, age} = req.body;
        try {
            const user = await registroModel.findOne({ email: username })
            if (user) return done(null, false, { message: 'El usuario ya existe' });
            const newUser = {
                firstName,
                lastName,
                email,
                age,
                password: createHash(password)
            }
            const response = await registroModel.create(newUser)
            return done(null, response)
        }
        catch (err) {
            return done('error al obtener usuario' + err)
        }
    })
    )
    passport.use('login', new LocalStrategy({usernameField: 'email'}, async (username, password, done) => {
        try{
            const user = await registroModel.findOne({email: username})
            if(!user) return done(null, false, {message: 'Usuario no encontrado'})
            if(!isValidPassword(user,password)) return done(null, false, {message: 'Contraseña incorrecta'})
            return done(null, user)
        }
        catch(err){
            return done('error al obtener usuario' + err)
        }
    }))

    passport.use('github', new GithubStrategy({
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: GITHUB_CALLBACK_URL
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile)
            const user = await registroModel.findOne({ email: profile._json.email })
            if (!user) {
                const newUser = {
                    firstName: profile._json.login,
                    lastName: '',
                    age: 0,
                    email: profile._json.email,
                    password: ''
                }
                const response = await registroModel.create(newUser)
                return done(null, response)
            } else {
                return done(null, user)
            }
        }
        catch (err) {
            return done('error al obtener usuario' + err)
        }
    }))
}


passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await registroModel.findById(id)
        done(null, user)
    }
    catch (err) {
        done(err)
    }
});

export default initializePassport