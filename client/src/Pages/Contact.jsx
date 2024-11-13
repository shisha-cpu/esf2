import './contact.css';

export function Contact() {
  return (
    <div className="contact container">
      <div className="title">
        <h1>Контакты</h1>
        <div className="contact-content">
          <div className="contacts">
    
    <li><a href="tel:+79156234300">📞 Телефон: +7 915 623 4300</a></li>
    <li><a href="https://wa.me/79156234300">💬 WatsApp</a></li>
    <li><a href="https://t.me/iriska05050">📱 Telegram</a></li>
    <li><a href="https://m.vk.com/ortoshic">🔗 Вконтакте</a></li>


          </div>
          <div style={{ position: 'relative', overflow: 'hidden' }}>
      <a
        href="https://yandex.ru/maps/11/ryazan/?utm_medium=mapframe&utm_source=maps"
        style={{
          color: '#eee',
          fontSize: '12px',
          position: 'absolute',
          top: '0px',
        }}
      >
        Рязань
      </a>
      <a
        href="https://yandex.ru/maps/11/ryazan/house/ulitsa_yesenina_45k1/Z0AYcQJlTkUBQFtufXpweHtrYw==/?ll=39.755707%2C54.619787&utm_medium=mapframe&utm_source=maps&z=17"
        style={{
          color: '#eee',
          fontSize: '12px',
          position: 'absolute',
          top: '14px',
        }}
      >
        Улица Есенина, 45к1 на карте Рязани — Яндекс Карты
      </a>
      <iframe
        src="https://yandex.ru/map-widget/v1/?ll=39.755707%2C54.619787&mode=whatshere&whatshere%5Bpoint%5D=39.755706%2C54.619787&whatshere%5Bzoom%5D=17&z=17"
        width="560"
        height="400"
        frameBorder="1"
        allowFullScreen="true"
        style={{ position: 'relative' }}
      ></iframe>
    </div>

        </div>
      </div>

      {/* <div className="title">
        <h1>Обратная связь :</h1>
        <div className="form">
          <form>
            <div className="form-group">
              <label htmlFor="name">Имя</label>
              <input type="text" id="name" name="name" placeholder="Введите ваше имя" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Введите ваш email" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Телефон</label>
              <input type="tel" id="phone" name="phone" placeholder="Введите ваш телефон" required />
            </div>
            <button type="submit" className="submit-btn">Отправить</button>
          </form>
        </div>
      </div> */}

      <div className="title">
        <h1>Мы принимаем к оплате платежные системы :</h1>
        <div className="pass-list">
          <img style={{maxWidth : '600px'}} src="https://i0.wp.com/virtuoso-krd.ru/wp-content/uploads/2022/08/Pay-Keeper.png?w=1610&ssl=1" alt="" />
        </div>
      </div>
    </div>
  );
}
