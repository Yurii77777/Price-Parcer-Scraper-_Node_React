import { Header } from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';
import { Faq } from '../Faq/Faq';
import { HomePage } from '../../pages/HomePage/HomePage';
import { Footer } from '../Footer/Footer';

export const App = () => {
    return (
        <div className="wrapper">
            <Header />

            <main className="content-container">
                <Sidebar />
                <HomePage />
            </main>

            <Footer />
            <Faq />
        </div>
    );
};
