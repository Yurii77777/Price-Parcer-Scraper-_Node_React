import logo from '../../resources/images/main-logo.png';
import epicentr_logo from '../../resources/images/sites-icons/epicentrk.png';
// import rozetka_logo from '../../resources/images/sites-icons/rozetka.png';

import './Header.scss';

export const Header = ({ setUserSelectSite, setLanguage, language }) => {
    const availableSites = [
        // {
        //     idSite: 1,
        //     inputId: 'rozetka_com_ua',
        //     inputName: 'rozetka_com_ua',
        //     srcLogo: rozetka_logo,
        //     altLogo: 'rozetka.com.ua',
        //     url: 'https://rozetka.com.ua/'
        // },
        {
            idSite: 2,
            inputId: 'epicetrk_ua',
            inputName: 'epicetrk_ua',
            srcLogo: epicentr_logo,
            altLogo: 'Epicentrk.ua',
            url: 'https://epicentrk.ua/'
        }
    ];

    const getSelectedSite = e => {
        let userClick = e.target.id;
        const [selectedSite] = availableSites.filter(({ inputId }) => {
            return inputId === userClick;
        });

        // console.log('[selectedSite]', selectedSite);
        return setUserSelectSite(selectedSite);
    };

    const handleLanguageSelect = e => {
        let userClick = e.target;

        userClick.className === 'header__laguage-en' && setLanguage('EN');
        userClick.className === 'header__laguage-ua' && setLanguage('UA');
        userClick.className === 'header__laguage-ru' && setLanguage('RU');
    }

    return (
        <header className="header">
            <section className="header__logo">
                <img src={logo} alt={'Price Parcer logo'} className="header__logo-img" />
                <p className="header__logo-subtitle">Price Parcer</p>
            </section>

            <section className="header__resources">
                <div>Search input here</div>
                <div className="header__sites-for-parse">
                    {availableSites.map(({ idSite, srcLogo, altLogo, inputId, inputName }) => {
                        return (
                            <div className="header__site" key={idSite} onClick={getSelectedSite}>
                                <input type="checkbox" id={inputId} name={inputName} />
                                <label htmlFor={inputId} className="header__site-label">
                                    <img
                                        src={srcLogo}
                                        alt={altLogo}
                                        className="header__site_logo"
                                    />
                                </label>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="header__right-block">
                <p className="header__laguage-title">
                    {!language && 'Language'}
                    {language === 'EN' && 'Language'}
                    {language === 'UA' && 'Мова'}
                    {language === 'RU' && 'Язык'}
                </p>
                <div className="header__laguage-container">
                    <p className="header__laguage-en" onClick={handleLanguageSelect}>EN</p>
                    <p className="header__laguage-ua" onClick={handleLanguageSelect}>UA</p>
                    <p className="header__laguage-ru" onClick={handleLanguageSelect}>RU</p>
                </div>
            </section>
        </header>
    );
};
