import { footer } from "../general_templates/footer";
import { head } from "../general_templates/head";
import { header } from "../general_templates/header";
import dotenv from 'dotenv';
dotenv.config();

export const generateActivationEmail = (
 token: string
) => {

  const href = `${process.env.PRODUCTION_LINK}/activate/${token}`

  const html = `
  <h1 style="text-align: left; margin: 0; font-size: 24px;">
    Активація аккаунту
  </h1>
  <p style="margin-bottom: 25px;">Щоб активувати свій аккаунт, натисніть кнопку "Активувати":</p>

  <a href="${href}" style="display: block; margin-bottom: 25px;">
    <button style="display: block; border: 0; border-radius: 30px; background-color: #0070d1; padding: 10px 25px; font-size: 20px; color: #fff; margin: 0 auto;">
      Активувати
    </button>
  </a>

  <p style="font-size: 14px;">або перейдіть за наступним посиланням:</p>
  <a href="${href}" style="display: block; text-decoration: none; color: #0070d1; margin-bottom: 35px;">${href}</a>

  <p style="margin-bottom: 25px; ">
    <em>
      *Тільки активовані користувачі мають змогу увійти на сервіс та скористатись нашими послугами, саме тому активація аккаунту необхідна.
    </em>
  </p>
  `;

  return `
    ${head}
      <body style="box-sizing: border-box; margin: 0; padding: 0; font-family: 'Trebuchet MS', Arial, sans-serif; font-weight: 400;">

      ${header}

        
        <main style="padding: 10px;">
          
          ${html}

        </main>

        ${footer}

      </body>
    </html>
  `
}
