import nodemailer from 'nodemailer';
import { IGame } from '../models/games';
import { generateConfirmationEmailHTML } from '../mail_templates/test';

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.eu',
  port: 465,
  auth: {
    user: "contact.shevtsov@zohomail.eu",
    pass: "X738 XMc5 gwWc",
  },
});


// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   // send mail with defined transport object
//   const info = await transporter.sendMail({
//     from: 'contact.shevtsov@zohomail.eu', // sender address
//     to: "igorshevtsooov1995@gmail.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   //
//   // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
//   //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
//   //       <https://github.com/forwardemail/preview-email>
//   //
// };

// main().catch(console.error);

interface sendEmail {
  email: string | string[],
  subject: string,
  html: string,
};

const sendEmail = ({
  email,
  subject,
  html
}: sendEmail) => {
  return transporter.sendMail({
    from: "contact.shevtsov@zohomail.eu",
    to: email,
    subject,
    html,
  });
};

// ACTIVATION MAILS
const sendActivation = (
  email: string,
  token: string,
  ) => {
  const href = `https://ps-rental-service.vercel.app/activate/${token}`
  const html = `
    <h1>Активація аккаунту</h1>
    <p>Щоб активувати свій аккаунт, просто перейдіть за наступним посиланням</p>
    <a href="${href}">${href}</a>
  `;

  return sendEmail({
    email,
    html,
    subject: 'Активація аккаунту PlayAtHome'
  })
};

// ORDER CONFIRMATION MAILS

const sendOrderConfirmation = (
  email: string,
  bookedDays: string[],
  deliveryOption: string,
  deliveryAddress: string,
  orderStatus: string,
  sumOfOrder: number,
  userComment: string,
  games: IGame[],
) => {

  // const renderedGames = `
  // ${games.map(game => (
  //   `<div>
  //     <img src=${game.iconLink} alt=${game.gameId} />
  //     <h5>${game.title}</h5>
  //     <h6>${game.description}</h6>
  //   </div>`
  // ))}
`

  // const html = `
  //   <h1>Дякуємо за замовлення PlayAtHome</h1>
  //   <p>В найближчий час з вами зв'яжеться наш менеджер для уточненя деталей</p>

  //   <h5>Заброньовані дні:</h5>
  //   <p>${bookedDays.join(', ')}</p>

  //   <h5>Обраний спосіб доставки:</h5>
  //   <p>${bookedDays.join(', ')}</p>

  //   <h5>Статус замовлення:</h5>
  //   <p>${orderStatus}</p>

  //   <h5>Сума замовлення:</h5>
  //   <p>${sumOfOrder} грн</p>

  //   </hr>

  //   ${renderedGames}
  // `;

  const html = generateConfirmationEmailHTML(
    bookedDays,
    deliveryOption,
    deliveryAddress,
    // orderStatus,
    sumOfOrder,
    userComment,
    games,
  )

  return sendEmail({
    email,
    html,
    subject: 'Замовлення PlayAtHome'
  })
};

const sendAdminOrderConfirmation = (
  email: string[],
  bookedDays: string[],
  deliveryOption: string,
  deliveryAddress: string,
  orderStatus: string,
  sumOfOrder: number,
  userComment:string,
  games: IGame[],
) => {

//   const renderedGames = `
//   ${games.map(game => (
//     `<div>
//       <img src=${game.iconLink} alt=${game.gameId} />
//       <h5>${game.title}</h5>
//       <h6>${game.description}</h6>
//     </div>`
//   ))}
// `

//   const html = `
//     <h5>Заброньовані дні:</h5>
//     <p>${bookedDays.join(', ')}</p>

//     <h5>Обраний спосіб доставки:</h5>
//     <p>${deliveryOption}</p>

//     <h5>Статус замовлення:</h5>
//     <p>${orderStatus}</p>

//     <h5>Сума замовлення:</h5>
//     <p>${sumOfOrder} грн</p>

//     </hr>

//     ${renderedGames}
//   `;

  const html = generateConfirmationEmailHTML(
    bookedDays,
    deliveryOption,
    deliveryAddress,
    // orderStatus,
    sumOfOrder,
    userComment,
    games,
  )

  return sendEmail({
    email,
    html,
    subject: 'Нове замовлення PlayAtHome'
  })
};

export const mailService = {
  sendEmail,
  sendActivation,
  sendOrderConfirmation,
  sendAdminOrderConfirmation,
}
