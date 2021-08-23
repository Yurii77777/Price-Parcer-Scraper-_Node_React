import { useState } from 'react';

import { Header } from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';
import { Faq } from '../Faq/Faq';
import { HomePage } from '../../pages/HomePage/HomePage';
import { Footer } from '../Footer/Footer';

export const App = () => {
    const [userSelectSite, setUserSelectSite] = useState({});
    const [userSelectCategory, setUserSelectCategory] = useState({});
    const [data, setData] = useState();

    return (
        <div className="wrapper">
            <Header setUserSelectSite={setUserSelectSite} />

            <main className="content-container">
                <Sidebar
                    userSelectSite={userSelectSite}
                    setUserSelectCategory={setUserSelectCategory}
                />
                <HomePage data={data} />
            </main>

            <Faq userSelectSite={userSelectSite} userSelectCategory={userSelectCategory} setData={setData} />
            <Footer />
        </div>
    );
};
