import './home.css';
import { ImageGallery } from './ImageGallery';
import React from "react";

export function Home() {
  const reviews = [
    {
      name: "Анна Петрова",
      text: "Отличный магазин с большим выбором товаров! Нашла все, что нужно, и даже больше.",
      date: "20 октября 2024",
      img: "https://avatars.mds.yandex.net/i?id=ec3d285e2dcdf350db3b154d75465e86_l-9271022-images-thumbs&n=13"
    },
    {
      name: "Сергей Иванов",
      text: "Очень приятный и отзывчивый персонал. Помогли подобрать нужный товар. Рекомендую!",
      date: "15 октября 2024",
      img: "https://avatars.mds.yandex.net/i?id=43c622040f7b97eed4c09abc45faac11_l-10878212-images-thumbs&n=13"
    },
    {
      name: "Мария Смирнова",
      text: "Хорошие цены и быстрая доставка. Очень довольна покупкой.",
      date: "5 октября 2024",
      img: "https://avatars.mds.yandex.net/i?id=09bf955ea87ebf6407eb55187d7b24c76724f31b-9093405-images-thumbs&n=13"
    },
    {
      name: "Дмитрий Кузнецов",
      text: "Большой ассортимент и хорошее качество. Буду заказывать еще!",
      date: "28 сентября 2024",
      img: "https://avatars.mds.yandex.net/i?id=1d860edc07779ffc26b7211d5169d0f12f51cd32-10331033-images-thumbs&n=13"
    },
    {
      name: "Екатерина Соколова",
      text: "Приятный опыт покупки. Персонал помог с выбором, осталась довольна!",
      date: "18 сентября 2024",
      img: "https://avatars.mds.yandex.net/i?id=a44843aaf59a84011674a1ce71b4f118_l-5334710-images-thumbs&n=13"
    },
    {
      name: "Алексей Фролов",
      text: "Быстрая доставка и отличное обслуживание. Рекомендую!",
      date: "12 сентября 2024",
      img: "https://avatars.mds.yandex.net/i?id=ec8eea11fb544c6caa7f4d8fcb104104e598051a-9234023-images-thumbs&n=13"
    },
    {
      name: "Ольга Никитина",
      text: "Нашла здесь то, что долго искала. Хорошее качество, доступные цены.",
      date: "1 сентября 2024",
      img: "https://pp.userapi.com/PfNle0R5zZbnHhvd9z8kDf6NDHKhf6E2_YmjLg/A3_QFt3evb8.jpg"
    }
  ];
  

  return (
    <section className="main container">
      {/* Main image section */}
      <section>
        <div className="main-img">
          <img src="./img/main.jpg" alt="background" />
          <div className="overlay">
            <div className="content-section">
              <h1 className="img-title">
                <div className="title-strong">НАЗВАНИЕ</div>
                <br /> специализированный магазин товаров для людей с инвалидностью
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section><ImageGallery /></section>
      <div className="title">
          <h1>Отзывы наших клиентов</h1>
        </div>

      <section className="reviews-section  ">
        <div className="reviews-slider">
            {[...reviews, ...reviews, ...reviews ].map((review, index) => (
            <div key={index} className="review-item">
        
              <p className="review-text">"{review.text}"</p>
              <div className="review-photo">
                <img src={review.img} alt={review.name} />
              </div>
              <p className="review-author">- {review.name}</p>
              <p className="review-date">{review.date}</p>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
