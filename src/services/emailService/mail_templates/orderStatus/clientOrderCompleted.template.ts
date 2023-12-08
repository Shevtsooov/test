import { IUser } from "../../../../models/users";
import { footer } from "../general_templates/footer";
import { head } from "../general_templates/head";
import { header } from "../general_templates/header";

export const generateClientCompletedEmailHTML = (user: IUser) => {

  const reviewLink = `
    ${process.env.PRODUCTION_LINK}/feedback/${user.reviewLink}
  `;

  return `
      ${head}
      
      <body style="box-sizing: border-box; margin: 0; padding: 0; font-family: 'Trebuchet MS', Arial, sans-serif; font-weight: 400;">

        ${header}

        <main style="box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 10px;">

        <div style="font-size: 16px;">
          <h3>
            Дякуємо, що обрали наші послуги!
            \nВаше задоволення - наш головний пріоритет.
          </h3>

          <p>
            Будемо вдячні за ваші теплі слова або зауваження, якщо ви стикалися з якими-небудь труднощами.
          </p>

          <p>Ваша думка допоможе нам вдосконалити наші послуги.</p>
        </div>

        <a href="${reviewLink}" style="display: block; margin: 25px;">
          <button style="display: block; border: 0; border-radius: 30px; background-color: #0070d1; padding: 10px 25px; font-size: 20px; color: #fff; margin: 0 auto;">
            Залишити відгук
          </button>
        </a>

        </main>

        ${footer}
        
      </body>
    </html>
  `
}
