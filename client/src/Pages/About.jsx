import './about.css';

export function About() {
    return ( 
        <div className="about container">
            <div className="about-header">
               <div className="title">
                   <h1>О нашем магазине товаров для детей с особенностями в развитии</h1>
               </div>
                <p className="tagline"><i>Комфорт и доступность товаров для детей с особыми потребностями</i></p>
            </div>
            <div className="about-content">
                <div className="section">
                    <img src="https://avatars.mds.yandex.net/i?id=77f41e87cf1f72d1c689424cf52ca7b0_l-9181393-images-thumbs&n=13" alt="Детская реабилитация" className="about-image" />
                    <div className="text">
                        <h2>Наша миссия в области реабилитации и поддержки детей</h2>
                        <p>
                            Мы предлагаем широкий ассортимент товаров для детей с особенностями в развитии, включая специализированные коляски, реабилитационные устройства и другое оборудование. Наша цель — обеспечить максимальную доступность и комфорт для детей, чтобы они могли быть более независимыми и активными в повседневной жизни.
                        </p>
                    </div>
                </div>

                <div className="section reverse">
                    <img src="https://umc38.ru/wp-content/uploads/2021/08/C9FF40A8-BC30-4FFA-A5C6-FE7532395855.jpeg" alt="Специализированная продукция" className="about-image" />
                    <div className="text">
                        <h2>Качество и ассортимент товаров для детей с особыми потребностями</h2>
                        <p>
                            Мы тщательно отбираем продукцию, включая специализированные коляски и реабилитационные устройства, чтобы гарантировать их высокое качество и соответствие потребностям наших маленьких клиентов и их семей. Все товары соответствуют международным стандартам безопасности и комфорта.
                        </p>
                    </div>
                </div>

                <div className="section">
                    <img src="https://www.draeger.com/Media/Content/Content/technical-support-client-call-4-3-dl-1316-2019_519425898.jpg" alt="Консультации" className="about-image" />
                    <div className="text">
                        <h2>Индивидуальный подход и консультации по выбору товаров</h2>
                        <p>
                            Наша команда профессионалов готова предложить помощь и консультации в выборе необходимого оборудования для детей с особыми потребностями, обеспечивая персонализированные решения для каждой семьи. Мы уверены, что индивидуальный подход к каждому клиенту важен для правильного выбора товаров.
                        </p>
                    </div>
                </div>

                <div className="section reverse">
                    <img src="https://cdn.culture.ru/images/c94f415b-9672-5709-8a20-30ec4ccede5f" alt="Дружелюбная атмосфера" className="about-image" />
                    <div className="text">
                        <h2>Создаем дружелюбную атмосферу для родителей и детей</h2>
                        <p>
                            Мы ценим каждого клиента и стремимся создать поддерживающую атмосферу, чтобы вы могли чувствовать себя комфортно при выборе товаров для детей с особенностями в развитии. Наши специалисты всегда готовы помочь и предоставить полную информацию о продукции.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
