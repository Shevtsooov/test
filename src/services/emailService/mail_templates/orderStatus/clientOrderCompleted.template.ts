import { IUser } from "../../../../models/users";
import { footer } from "../general_templates/footer";
import { head } from "../general_templates/head";
import { header } from "../general_templates/header";

export const generateClientCompletedEmailHTML = (user: IUser) => {

  return `
      ${head}
      
      <body style="box-sizing: border-box; margin: 0; padding: 0; font-family: 'Trebuchet MS', Arial, sans-serif; font-weight: 400;">

        ${header}

        <main style="box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 10px;">

          <p>${user.fullName}</p>

        </main>

        ${footer}
        
      </body>
    </html>
  `
}
