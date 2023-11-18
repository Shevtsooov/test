"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.zoho.eu',
    port: 465,
    auth: {
        user: "contact.shevtsov@zohomail.eu",
        pass: "X738 XMc5 gwWc",
    },
});
;
const sendEmail = ({ email, subject, html }) => {
    return transporter.sendMail({
        from: "contact.shevtsov@zohomail.eu",
        to: email,
        subject,
        html,
    });
};
const sendActivation = (email, token) => {
    const href = `https://ps-rental-service.vercel.app/activate/${token}`;
    const html = `
    <h1>Активація аккаунту</h1>
    <p>Щоб активувати свій аккаунт, просто перейдіть за наступним посиланням</p>
    <a href="${href}">${href}</a>
  `;
    return sendEmail({
        email,
        html,
        subject: 'Активація аккаунту PlayAtHome'
    });
};
exports.mailService = {
    sendEmail,
    sendActivation,
};
