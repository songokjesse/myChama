const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJWT;
const JWT_SECRET = process.env.JWT_SECRET
const bcrypt = require('bcrypt')

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();



passport.use(
    'create', 
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "Password"
        },

        async (email,password,done) => {
            try {
                const hashedPassword = bcrypt.hashSync(password, 10)
                const user = await prisma.user.create({email,hashedPassword})
                return done('null', user)
            } catch (err){
                done(err)
            }

        }
    )
  )

  passport.use(
      'login',
      new LocalStrategy (
          {
              usernameField: 'email',
              passwordField: 'password'
          },
          async (email,password, done) => {
              try {
                  const user = await prisma.user.findUnique({
                    where: {
                        email: email
                    }
                  })
                  if (!user){
                      return done(null,false, { message: 'User Not Found'})
                  }
                  const validatePassword = bcrypt.compareSync(password, user.password)
                  if (!validatePassword){
                      return done(null, false, { message: 'Invalid Credentials'})
                  }
                  return done(null, user, {message: 'Successful Login'})

              }catch (err){
                  done(err)
              }
          }
      )
  )

  passport.use(
      new JwtStrategy (
          {
          secretOrKey: JWT_SECRET,
          jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        },

        async (token, done) =>{
            try {
            
            const user = await prisma.user({
                where: {
                    email: token.email,
                },
            })
            if (!user) {
                return done(null, false,{message: 'User not Found'})
            }
            return done(null, user, {message: 'User Authorized'})
        }catch(err){
            done(err)
        }
        }
      )
  )