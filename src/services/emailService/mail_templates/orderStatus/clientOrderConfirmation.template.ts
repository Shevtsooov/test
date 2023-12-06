import { Month } from "../../../../Types/Month";
import { ukrMonths } from "../../../../correctWordForms/months";
import { IGame } from "../../../../models/games";
import { footer } from "../general_templates/footer";
import { head } from "../general_templates/head";
import { header } from "../general_templates/header";

export const generateClientConfirmationEmailHTML = (
  bookedDays: string[],
  deliveryOption: string,
  deliveryAddress: string,
  // orderStatus: string,
  sumOfOrder: number,
  userComment: string,
  games: IGame[],
) => {

  const now = new Date().toDateString().slice(4).split(' ');
  let [month, day, year] = now;

  if (day[0] === '0') {
    day = day[1]
  };

  const date = `${day} ${ukrMonths[month as keyof Month]}, ${year} року`

  let [fbMonth, fbDay] = bookedDays[0].split(' ');
  if (fbDay[0] === '0') {
    fbDay = fbDay[1]
  };
  const firstDay = `${fbDay} ${ukrMonths[fbMonth as keyof Month]}`

  let [lbMonth, lbDay] = bookedDays[bookedDays.length - 1].split(' ');
  if (lbDay[0] === '0') {
    lbDay = lbDay[1]
  };
  const lastDay = `${lbDay} ${ukrMonths[lbMonth as keyof Month]}`

  const delivery = deliveryOption === 'Доставка'
    ? `<p style="margin: 0 0 5px 0;">Адреса доставки: <strong>${deliveryAddress}</strong></p>`
    : ``;

  const comment = userComment !== ''
    ? `<p style="margin: 0 0 5px 0;"><strong>Коментар:</strong></p>
    <p style="margin: 0 0 5px 0;"><em>"${userComment}"</em></p>`
    : ``;

  let correctDayWord = bookedDays.length > 4
    ? 'діб'
    : 'доби'


  const days = bookedDays.length > 1
    ? `
      <p style="margin: 0 0 5px 0; font-weight: 600px">
        Заброньовані дні: 
        <strong>${firstDay} - ${lastDay}: ${bookedDays.length} ${correctDayWord}</strong>
      </p>
    `
    : `
      <p style="margin: 0 0 5px 0; font-weight: 600px">
        Заброньований день: <strong>${firstDay}: 1 доба</strong>
      </p>
    `;

  const renderedGames = `
  ${games.map(game => (
    `
    <div style="box-sizing: border-box; display: flex; flex-direction: row; gap: 10px; width: 100%; margin-bottom: 15px;">
        <a href=${`${process.env.PRODUCTION_LINK}/games/${game.gameId}`} style="text-decoration: none;">
          <img
            src=${game.iconLink}
            alt=${game.gameId}
            style="box-sizing: border-box; display: block; width: 120px; height: 120px; border-radius: 10px; object-fit: cover;"
          >
        </a>

        <div style="box-sizing: border-box; flex-grow: 1; margin-left: 10px">
          <a
            href=${`${process.env.PRODUCTION_LINK}/games/${game.gameId}`}
            style="font-size: 18px; font-weight: 600; margin-bottom: 10px; color: #000; "
          >
            ${game.title}
          </a>
          <p style="font-size: 14px; margin: 0; max-width: 350px;">
            ${game.description}
          </p>
        </div>
      </div>
    `
  ))}
`

  return `
      ${head}
      
      <body style="box-sizing: border-box; margin: 0; padding: 0; font-family: 'Trebuchet MS', Arial, sans-serif; font-weight: 400;">

        ${header}

        <main style="box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 10px;">

          <div style="border-radius: 15px; background-color: #ececec; padding: 10px;">
          <h3 style="margin: 0 0 15px 0;">Замовлення від ${date}</h3>

            ${days}

            <p style="margin: 0 0 5px 0;">
              Спосіб доставки:
              <strong>
                ${deliveryOption}
              </strong>
            </p>

            ${delivery}
            
            <p style="margin: 0 0 5px 0;">
              Сума:
              <strong>
                ${sumOfOrder}грн
              </strong>
            </p>

            ${comment}
          </div>

          <div style="width: 100%;">
            <h3 style="margin-bottom: 15px;">Обрані ігри:</h3>

            ${renderedGames}

          </div>

        </main>

        ${footer}
        
      </body>
    </html>
  `
}
