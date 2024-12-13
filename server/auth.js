// Middleware for validating JWT tokens in incoming requests.
import { expressjwt } from 'express-jwt';
// Used to create JWT tokens.
import jwt from 'jsonwebtoken';
//  a function to fetch user details by email from your database.
import { getUserByEmail } from './db/users.js';

// A secret key is decoded from base64 format, which is used to sign and verify JWT tokens.
const secret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');


export const authMiddleware = expressjwt({
  algorithms: ['HS256'],
  credentialsRequired: false,
  secret,
});

// HANDLING POST REQUEST TO LOGIN
export async function handleLogin(req, res) {
  // extracts email and password from the request body.
  const { email, password } = req.body;
  // fetch user data
  const user = await getUserByEmail(email);
    // if the user does not exist or the password does NOT match, responds with 401
    if (!user || user.password !== password) {
    res.sendStatus(401);
    }
    // If the credentials are correct, it creates a JWT token with the user's id and email
    // as claims, sign it with the secret, and responds with the token in JSON format. 
    else {
    const claims = { sub: user.id, email: user.email };
    const token = jwt.sign(claims, secret);
    res.json({ token });  
  }
}
