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
          <p style="font-size: 14px; margin: 0;">
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
<body style="box-sizing: border-box; margin: 0; padding: 0; font-family: Play, sans-serif; font-weight: 400;">

<header style="text-align: center; height: 60px; background-color: #ececec; padding-top: 20px; margin-bottom: 15px;">
<a href="https://ps-rental-service.vercel.app/home" style="text-decoration: none; font-size: 32px; font-family: Play; color: #0070d1;" >PlayAtHome</a>
</header>

  <main style="box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 10px;">

    <div style="width: 100%; margin-bottom: 15px;">
      <h2 style="margin: 0 0 10px 0;">Замовлення від ${now}</h2>

      <p style="margin: 0 0 5px 0;">Заброньовані дні: ${bookedDays}</p>
      <p style="margin: 0 0 5px 0;">Спосіб доставки: ${deliveryOption}</p>
      <p style="margin: 0 0 5px 0;">Адреса доставки: ${deliveryAddress}</p>
      <p style="margin: 0 0 5px 0;">Сума: ${sumOfOrder}</p>

      <p style="margin: 0 0 5px 0;">Коментар:</p>
      <p style="margin: 0 0 5px 0;">${userComment}</p>
    </div>

    <div style="width: 100%;">
      <h3 style="margin-bottom: 15px;">Обрані ігри:</h3>

      ${renderedGames.split(',')}

    </div>

  </main>

  <footer style="box-sizing: border-box; text-align: center;  padding: 20px; font-size: 28px; color: #ececec; height: 100px; background-color: #0070d1;">
    <h3 style="margin: 0;">Footer</h3>
  </footer>
</body>
</html>

  `
}
