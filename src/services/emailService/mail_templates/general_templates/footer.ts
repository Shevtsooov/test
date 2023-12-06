export const footer = `
  <footer style="box-sizing: border-box; padding: 10px; font-size: 28px; color: #ececec; background-color: #0070d1; border-radius: 15px;">
    <a href="${process.env.PRODUCTION_LINK}/home">
      <img
        src="https://i.ibb.co/DK2867S/123.png"
        alt=""
        style="width: 200px; object-fit: cover;"
      >
    </a>
    <hr style="color: #ececec; margin-top: 0;">
    <a href="${process.env.PRODUCTION_LINK}/home" style="display: block; text-decoration: none; margin: 0; font-size: 16px; color: #ececec; margin-bottom: 10px;">Головна</a>
    <a href="${process.env.PRODUCTION_LINK}/games" style="display: block; text-decoration: none; margin: 0; font-size: 16px; color: #ececec; margin-bottom: 10px;">Ігри</a>
    <a href="${process.env.PRODUCTION_LINK}/plans" style="display: block; text-decoration: none; margin: 0; font-size: 16px; color: #ececec; margin-bottom: 10px;">Тарифи і доставка</a>
    <a href="${process.env.PRODUCTION_LINK}/agreement" style="display: block; text-decoration: none; margin: 0; font-size: 16px; color: #ececec; margin-bottom: 10px;">Умови договору</a>
    <a href="${process.env.PRODUCTION_LINK}/contacts" style="display: block; text-decoration: none; margin: 0; font-size: 16px; color: #ececec; margin-bottom: 10px;">Контакти</a>
    <a href="${process.env.PRODUCTION_LINK}/login" style="display: block; text-decoration: none; margin: 0; font-size: 16px; color: #ececec; margin-bottom: 25px;">Увійти</a>
  </footer>
`;
