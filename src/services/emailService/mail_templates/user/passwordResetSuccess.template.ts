import { footer } from "../general_templates/footer";
import { head } from "../general_templates/head";
import { header } from "../general_templates/header";

export const generatePasswordResetSuccessEmail = () => {

  const href = `https://ps-rental-service.vercel.app/login`;

  const html = `
  <h1 style="text-align: left; margin: 0; font-size: 24px;">
    Ваш пароль було успішно оновлено
  </h1>

  <a href="${href}" style="display: block; margin-bottom: 25px;">
    <button style="display: block; border: 0; border-radius: 30px; background-color: #0070d1; padding: 10px 25px; font-size: 20px; color: #fff; margin: 0 auto;">
      Увійти
    </button>
  </a>
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
