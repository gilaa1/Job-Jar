const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const resetPasswordRouter = require('express').Router();

const User = require('../models/user');

resetPasswordRouter.post('/reset-password', async (request, response) => {
    try {
        const { email } = request.body;
        if (!email) {
            return response.status(400).json({ error: 'missing fields' });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return response.status(401).json({ error: 'user does not exist' });
        }

        const token = crypto.randomBytes(20).toString('hex');
        const tokenExpiration = Date.now() + 3600000; // 1 hour
        console.log('tokenExpiration ', tokenExpiration)
        user.resetPasswordToken = token;
        user.resetPasswordExpires = tokenExpiration;
        await user.save();

        const transporter = nodemailer.createTransport({
            host: 'localhost',
            port: 1025,
            secure: false,
        });

        const mailOptions = {
            from: '"Job Jar" <no-reply@jobjar.com>',
            to: email,
            subject: 'Password Reset',
            text: `You requested a password reset. Click the link below to reset your password:\n\n` +
            `http://localhost:3000/reset-password?token=${token}\n\n` +
            `If you didn't request this, please ignore this email.`,
        };

          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              console.error('Error sending email:', err);
            } else {
              console.log('Email sent:', info.response);
            }
          });

    } catch (error) {
        response.status(400).json({ error: error.message });
    }
}
);

resetPasswordRouter.post('/update-password', async (request, response) => {
    try {
        const { token, password } = request.body;
        console.log('token ' , token)
        if (!token || !password) {
            return response.status(400).json({ error: 'missing fields' });
        }

        console.log('Date.now() ', Date.now())

        const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
        if (!user) {
            return response.status(401).json({ error: 'invalid or expired token' });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        user.passwordHash = passwordHash;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        response.status(200).json({ message: 'Password updated' });
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
}
);

module.exports = resetPasswordRouter;