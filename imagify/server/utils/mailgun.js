import formData from 'form-data';
import Mailgun from 'mailgun.js';

// const mailgun = new Mailgun(formData);
// const mg = mailgun.client({
//   username: 'api',
//   key: process.env.MAILGUN_API_KEY,
// });
// import formData from 'form-data';
// import Mailgun from 'mailgun.js';

// if (!process.env.MAILGUN_API_KEY) {
//     console.warn('Warning: MAILGUN_API_KEY is not set in environment variables');
// }

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY || 'dummy_key', // Fallback to prevent crash
});

export const sendPasswordResetEmail = async (email, resetToken) => {
    if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
        console.error('Mailgun configuration is incomplete');
        return false;
    }

    try {
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        
        const messageData = {
            from: 'Imagify <noreply@yourdomain.com>',
            to: email,
            subject: 'Password Reset Request',
            text: `You requested a password reset. Please go to this link to reset your password: ${resetUrl}`,
            html: `
                <h1>Password Reset Request</h1>
                <p>You requested a password reset.</p>
                <p>Please click the link below to reset your password:</p>
                <a href="${resetUrl}">Reset Password</a>
                <p>If you didn't request this, please ignore this email.</p>
                <p>This link will expire in 1 hour.</p>
            `
        };

        await mg.messages.create(process.env.MAILGUN_DOMAIN, messageData);
        return true;
    } catch (error) {
        console.error('Send Email Error:', error);
        return false;
    }
};
// export const sendPasswordResetEmail = async (email, resetToken) => {
//   try {
//     const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    
//     const messageData = {
//       from: 'Imagify <noreply@yourdomain.com>',
//       to: email,
//       subject: 'Password Reset Request',
//       text: `You requested a password reset. Please go to this link to reset your password: ${resetUrl}`,
//       html: `
//         <h1>Password Reset Request</h1>
//         <p>You requested a password reset.</p>
//         <p>Please click the link below to reset your password:</p>
//         <a href="${resetUrl}">Reset Password</a>
//         <p>If you didn't request this, please ignore this email.</p>
//         <p>This link will expire in 1 hour.</p>
//       `
//     };

//     await mg.messages.create(process.env.MAILGUN_DOMAIN, messageData);
//     return true;
//   } catch (error) {
//     console.error('Send Email Error:', error);
//     return false;
//   }
// };