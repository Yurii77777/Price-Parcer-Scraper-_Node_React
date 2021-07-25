import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { HomePage } from './pages/HomePage/HomePage';
import { Footer } from './components/Footer/Footer';

import faq_icon from './resources/images/faq.png';

export const App = () => {

    return (
        <div className="wrapper">
            <Header />

            <div className="content-container">
                <Sidebar />
                <HomePage />
            </div>

            <Footer />

            <section className="notifications">
                <p className="notifications__title">Notifications | FAQ</p>

                <div className="notifications__content-wrapper">
                    <ul className="notifications__list">
                        <li>
                            <img
                                src={faq_icon}
                                alt={'FAQ info for you'}
                                className="notifications__faq_logo"
                            />
                            At first you must check site for scraping in the top section of the App!
                        </li>
                    </ul>

                    <button type="button" className="notifications__button">
                        <span></span>
                    </button>
                </div>
            </section>
        </div>
    );
};
