import { IGame } from "../../../../models/games";

export const generateAdminConfirmationEmailHTML = (
  bookedDays: string[],
  deliveryOption: string,
  deliveryAddress: string,
  // orderStatus: string,
  sumOfOrder: number,
  userComment: string,
  games: IGame[],
) => {

  const now = new Date().toDateString().slice(3);

  const delivery = deliveryOption === 'Доставка'
    ? `<p style="margin: 0 0 5px 0;">Адреса доставки: ${deliveryAddress}</p>`
    : ``

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

      <header
        style="text-align: center; height: 60px; background-color: #ececec; padding-top: 20px; border-radius: 15px; margin-bottom: 15px;"
      >
        <a href="https://ps-rental-service.vercel.app/home">
          <img
            src="https://i.ibb.co/cv6k6gY/1.png"
            alt=""
            style="width: 220px; object-fit: cover;"
          >
        </a>
      </header>

        <main style="box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 10px;">

          <div style="border-radius: 15px; background-color: #ececec; padding: 10px;">
            <h2 style="margin: 0 0 15px 0;">Замовлення від ${now}</h2>

            <p style="margin: 0 0 5px 0;">Заброньовані дні: ${bookedDays}</p>
            <p style="margin: 0 0 5px 0;">Спосіб доставки: ${deliveryOption}</p>
            ${delivery}
            <p style="margin: 0 0 5px 0;">Сума: ${sumOfOrder}</p>

            <p style="margin: 0 0 5px 0;">Коментар:</p>
            <p style="margin: 0 0 5px 0;"><em>"${userComment}"</em></p>
          </div>

          <div style="width: 100%;">
            <h3 style="margin-bottom: 15px;">Обрані ігри:</h3>

            ${renderedGames}

          </div>

        </main>

        <footer style="box-sizing: border-box; padding: 10px; font-size: 28px; color: #ececec; background-color: #0070d1; border-radius: 15px;">
          <a href="https://ps-rental-service.vercel.app/home">
            <img
              src="https://i.ibb.co/DK2867S/123.png"
              alt=""
              style="width: 200px; object-fit: cover;"
            >
          </a>
          <hr style="color: #ececec; margin-top: 0;">
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