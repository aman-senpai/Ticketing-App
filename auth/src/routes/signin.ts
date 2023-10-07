import express, { Request, Response } from "express";
import { body } from "express-validator";

import { Password } from "../services/password";
import { User } from "../models/user";
import { validateRequest } from "../middlewares/validate-request";
import { BadRequestError } from "../errors/bad-request-error";
import { sign } from "jsonwebtoken";

const router = express.Router();

router.post("/api/users/signin", [
    body("email")
        .isEmail()
        .withMessage("Email must be valid"),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("You must supply a password")
],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            throw new BadRequestError("Invalid credentials.");
        }

        const passwordsMatch = await Password.compare(existingUser.password, password);

        if (!passwordsMatch) {
            throw new BadRequestError("Invalid credentials.")
        }

        // TODO: Generate JWT
        const userJwt = sign({
            id: existingUser.id,
            email: existingUser.email
        }, process.env.JWT_KEY!)

        // TODO: Store it on session 
        req.session = {
            jwt: userJwt
        }

        await existingUser.save();

        res.status(200).send(existingUser);
    })

export { router as signinRouter }; 