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
    const [isLoading, setIsLoading] = useState(false);
    const [language, setLanguage] = useState();
    const [propsForInstruments, setPropsForInstruments] = useState({
        site: null,
        category: null
    });

    return (
        <div className="wrapper">
            <Header
                setUserSelectSite={setUserSelectSite}
                setLanguage={setLanguage}
                language={language}
            />

            <main className="content-container">
                <Sidebar
                    userSelectSite={userSelectSite}
                    setUserSelectCategory={setUserSelectCategory}
                    language={language}
                />
                <HomePage
                    data={data}
                    isLoading={isLoading}
                    language={language}
                    propsForInstruments={propsForInstruments}
                />
            </main>

            <Faq
                userSelectSite={userSelectSite}
                setUserSelectSite={setUserSelectSite}
                userSelectCategory={userSelectCategory}
                setUserSelectCategory={setUserSelectCategory}
                setPropsForInstruments={setPropsForInstruments}
                data={data}
                setData={setData}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
                language={language}
            />
            <Footer />
        </div>
    );
};
