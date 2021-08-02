import { useState } from 'react';

import { Header } from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';
import { Faq } from '../Faq/Faq';
import { HomePage } from '../../pages/HomePage/HomePage';
import { Footer } from '../Footer/Footer';

export const App = () => {
    const [userSelect, setUserSelect] = useState({});

    return (
        <div className="wrapper">
            <Header setUserSelect={setUserSelect} />

            <main className="content-container">
                <Sidebar />
                <HomePage />
            </main>

            <Footer />
            <Faq userSelect={userSelect} />
        </div>
    );
};
