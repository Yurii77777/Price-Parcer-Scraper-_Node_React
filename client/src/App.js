import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Faq } from './components/Faq/Faq';
import { HomePage } from './pages/HomePage/HomePage';
import { Footer } from './components/Footer/Footer';

export const App = () => {
    return (
        <div className="wrapper">
            <Header />

            <div className="content-container">
                <Sidebar />
                <HomePage />
            </div>

            <Footer />
            <Faq />
        </div>
    );
};
