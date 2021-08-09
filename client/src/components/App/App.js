import { useState } from 'react';

import { Header } from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';
import { Faq } from '../Faq/Faq';
import { HomePage } from '../../pages/HomePage/HomePage';
import { Footer } from '../Footer/Footer';

export const App = () => {
    const [userSelect, setUserSelect] = useState({});
    const [scapedCategories, setScapedCategories] = useState();

    return (
        <div className="wrapper">
            <Header setUserSelect={setUserSelect} />

            <main className="content-container">
                <Sidebar scapedCategories={scapedCategories} />
                <HomePage />
            </main>

            <Footer />
            <Faq userSelect={userSelect} setScapedCategories={setScapedCategories} />
        </div>
    );
};
