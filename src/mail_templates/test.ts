import { IGame } from "../models/games"

export const generateConfirmationEmailHTML = (
  bookedDays: string[],
  deliveryOption: string,
  deliveryAddress: string,
  // orderStatus: string,
  sumOfOrder: number,
  userComment: string,
  games: IGame[],
) => {

  const now = new Date().toDateString().slice(3);

  const renderedGames = `
  ${games.map(game => (
    `
    <div style="box-sizing: border-box; display: flex; flex-direction: row; gap: 10px; width: 100%; margin-bottom: 15px;">
        <a href=${`https://ps-rental-service.vercel.app/games/${game.gameId}`} style="text-decoration: none;">
          <img
            src=${game.iconLink}
            alt=${game.gameId}
            style="box-sizing: border-box; display: block; width: 120px; height: 120px; border-radius: 10px; object-fit: cover;"
          >
        </a>

        <div style="box-sizing: border-box; flex-grow: 1; margin-left: 10px">
          <a
            href=${`https://ps-rental-service.vercel.app/games/${game.gameId}`}
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
    <!DOCTYPE html>
    <html lang="ua" style="box-sizing: border-box; margin: 0">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css2?family=Play:wght@400;700&display=swap" rel="stylesheet">
      </head>
      <body style="box-sizing: border-box; margin: 0; padding: 0; font-family: 'Trebuchet MS', Arial, sans-serif; font-weight: 400;">

        <main style="box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 10px;">

          <div style="border-radius: 15px; background-color: #ececec; padding: 10px;">
            <h2 style="margin: 0 0 15px 0;">Замовлення від ${now}</h2>

            <p style="margin: 0 0 5px 0;">Заброньовані дні: ${bookedDays}</p>
            <p style="margin: 0 0 5px 0;">Спосіб доставки: ${deliveryOption}</p>
            <p style="margin: 0 0 5px 0;">Адреса доставки: ${deliveryAddress}</p>
            <p style="margin: 0 0 5px 0;">Сума: ${sumOfOrder}</p>

            <p style="margin: 0 0 5px 0;">Коментар:</p>
            <p style="margin: 0 0 5px 0;"><em>"${userComment}"</em></p>
          </div>

          <div style="width: 100%;">
            <h3 style="margin-bottom: 15px;">Обрані ігри:</h3>

            ${renderedGames.split(',')}

          </div>

        </main>

        <footer style="box-sizing: border-box; padding: 10px; font-size: 28px; color: #ececec; background-color: #0070d1; border-radius: 15px;">
        <a href="https://ps-rental-service.vercel.app/home" style="text-decoration: none; font-size: 32px; color: #ececec; margin: 0;" >PlayAtHome</a>
        <hr style="color: #ececec;">
        <a href="https://ps-rental-service.vercel.app/home" style="display: block; text-decoration: none; margin: 0; font-size: 16px; color: #ececec; margin-bottom: 10px;">Головна</a>
        <a href="https://ps-rental-service.vercel.app/games" style="display: block; text-decoration: none; margin: 0; font-size: 16px; color: #ececec; margin-bottom: 10px;">Ігри</a>
        <a href="https://ps-rental-service.vercel.app/plans" style="display: block; text-decoration: none; margin: 0; font-size: 16px; color: #ececec; margin-bottom: 10px;">Тарифи і доставка</a>
        <a href="https://ps-rental-service.vercel.app/agreement" style="display: block; text-decoration: none; margin: 0; font-size: 16px; color: #ececec; margin-bottom: 10px;">Умови договору</a>
        <a href="https://ps-rental-service.vercel.app/login" style="display: block; text-decoration: none; margin: 0; font-size: 16px; color: #ececec; margin-bottom: 25px;">Увійти</a>
      </footer>
      </body>
    </html>
  `
}