import React from 'react';
import './Payment.css'; // Предположим, что стили хранятся в отдельном CSS-файле

const Payment = () => {
  return (
    <div className="payment-delivery-container">
      <div className="title">
      <h1>Оплата и Доставка</h1>
      </div>

      {/* Секция Способы Доставки */}
      <section className="delivery-section">
        <h2>Способы Доставки</h2>
        <p>Доставка заказов осуществляется при помощи:</p>
        <ul>
          <li>Курьерских служб Сдек, Почта России, Boxberry</li>
          <li>Транспортных компаний (рекомендуем «ПЭК»)</li>
          <br />
          <li>По желанию клиента может быть выбрана любая другая транспортная компания</li>
        </ul>
        <p>
          Расчёт стоимости доставки производится индивидуально и зависит от:
        </p>
        <ul>
          <li>Населённого пункта</li>
          <li>Размеров изделия</li>
          <li>Веса</li>
          <li>Дополнительной защитной упаковки</li>
          <li>Типа доставки и ряда других параметров</li>
        </ul>
        <p>Доставка по городу БЕСПЛАТНАЯ.</p>
        <p>Более подробную информацию уточняйте у наших менеджеров.</p>
        <div className="deliveryImages">
            <img src="https://cdn.mypetstatic.ru/static/v4/img/ui/footer/delivery_companies_v3.png" alt="" />

        </div>
      </section>

      {/* Секция Способы Оплаты */}
      <section className="payment-section">
        <h2>Способы Оплаты</h2>
        <ul>
          <li>
            <strong>Наличными</strong>
            <p>Данный способ применим только при приобретении товара в г. Рязань.</p>
          </li>
          <li>
            <strong>Дебетовой или кредитной картой</strong>
            <p>Принимаются карты Visa, Mastercard, МИР.</p>
          </li>
          <li>
            <strong>Электронным сертификатом</strong>
            <p>Сертификат привязывается к банковской карте платёжной системы «Мир», возможна удаленная оплата из любой точки России.</p>
          </li>
          <li>
            <strong>Оплата товара по счёту</strong>
            <p>Менеджер согласует с вами все нюансы по товару и доставке, после чего отправляет вам счёт для оплаты по электронной почте.</p>
          </li>
          <li>
            <strong>«PayKeeper»</strong>
            <p>Платёжная платформа «PayKeeper» является сертифицированным партнёром крупнейших российских банков по интернет-эквайрингу.</p>
          </li>
        </ul>
        <div className="pass-list">
          <img  className='c-img1' src="https://i0.wp.com/virtuoso-krd.ru/wp-content/uploads/2022/08/Pay-Keeper.png?w=1610&ssl=1" alt="" />
          <img  className='c-img2' src="../img/sert.jfif" alt="" />
        </div>
      </section>
    </div>
  );
};

export default Payment;
