import React from 'react';
import './Payment.css'; // Предположим, что стили хранятся в отдельном CSS-файле

const Payment = () => {
  return (
    <div className="payment-delivery-container">
      <div className="title">
        <h1>Оплата и доставка</h1>
      </div>

      {/* Секция способов доставки */}
      <section className="delivery-section">
        <h2>Способы доставки</h2>
        <p>Доставка заказов осуществляется при помощи:</p>


          <li>курьерских служб СДЭК, Почта России, Boxberry;</li>
          <li>транспортных компаний (рекомендуем «ПЭК»);</li>
          <li>по желанию клиента может быть выбрана любая другая транспортная компания.</li>
  

        <p>Расчёт стоимости доставки производится индивидуально и зависит от:</p>

   
          <li>населённого пункта;</li>
          <li>размеров изделия;</li>
          <li>веса;</li>
          <li>дополнительной защитной упаковки;</li>
          <li>типа доставки и ряда других параметров.</li>
  

        <p>Доставка по городу бесплатная.</p>
        <p>Более подробную информацию уточняйте у наших менеджеров.</p>
        
        <div className="deliveryImages">
          <img src="./img/delivery/delivery.png" alt="Delivery options" />
        </div>
      </section>

      {/* Секция способов оплаты */}
      <section className="payment-section">
        <h2>Способы оплаты</h2>


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
            <p>Сертификат привязывается к банковской карте платёжной системы «Мир». Возможна удалённая оплата из любой точки России.</p>
          </li>
          <li>
            <strong>Оплата товара по счёту</strong>
            <p>Менеджер согласует с вами все нюансы по товару и доставке, после чего отправляет вам счёт для оплаты по электронной почте.</p>
          </li>
          <li>
            <strong>«PayKeeper»</strong>
            <p>Платёжная платформа «PayKeeper» является сертифицированным партнёром крупнейших российских банков по интернет-эквайрингу.</p>
          </li>


        <div className="pass-list">
          <img className="c-img1" src="https://i0.wp.com/virtuoso-krd.ru/wp-content/uploads/2022/08/Pay-Keeper.png?w=1610&ssl=1" alt="PayKeeper logo" />
          <img className="c-img2" src="../img/sert.jfif" alt="Certificate image" />
        </div>
      </section>
    </div>
  );
};

export default Payment;
