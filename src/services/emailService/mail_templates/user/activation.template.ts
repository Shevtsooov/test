export const generateActivationEmail = (
 token: string
) => {

  const href = `https://ps-rental-service.vercel.app/activate/${token}`

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

        
        <main style="padding: 10px;">
          
          ${html}

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
          <a href="https://ps-rental-service.vercel.app/contacts" style="display: block; text-decoration: none; margin: 0; font-size: 16px; color: #ececec; margin-bottom: 10px;">Контакти</a>
          <a href="https://ps-rental-service.vercel.app/login" style="display: block; text-decoration: none; margin: 0; font-size: 16px; color: #ececec; margin-bottom: 25px;">Увійти</a>
        </footer>
      </body>
    </html>
  `
}
