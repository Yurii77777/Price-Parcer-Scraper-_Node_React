import logo from "../../resources/images/main-logo.png";

import { AVAILABLE_SITES } from "../../constants/availableSites";

import "./Header.scss";

export const Header = ({ setUserSelectSite, setLanguage, language }) => {
    const getSelectedSite = (e) => {
        let userClick = e.target.id;
        const [selectedSite] = AVAILABLE_SITES.filter(({ inputId }) => {
            return inputId === userClick;
        });

        // console.log('[selectedSite]', selectedSite);
        return setUserSelectSite(selectedSite);
    };

    const handleLanguageSelect = (e) => {
        let userClick = e.target;

        userClick.className === "header__laguage-ua" && setLanguage("UA");
        userClick.className === "header__laguage-en" && setLanguage("EN");
    };

    return (
        <header className="header">
            <section className="header__logo">
                <img
                    src={logo}
                    alt={"Price Parcer logo"}
                    className="header__logo-img"
                />
                <p className="header__logo-subtitle">Price Parcer</p>
            </section>

            <section className="header__resources">
                <div></div>
                <div className="header__sites-for-parse">
                    {AVAILABLE_SITES.map(
                        ({ idSite, srcLogo, altLogo, inputId, inputName }) => {
                            return (
                                <div
                                    className="header__site"
                                    key={idSite}
                                    onClick={getSelectedSite}
                                >
                                    <input
                                        type="checkbox"
                                        id={inputId}
                                        name={inputName}
                                    />
                                    <label
                                        htmlFor={inputId}
                                        className="header__site-label"
                                    >
                                        <img
                                            src={srcLogo}
                                            alt={altLogo}
                                            className="header__site_logo"
                                        />
                                    </label>
                                </div>
                            );
                        }
                    )}
                </div>
            </section>

            <section className="header__right-block">
                <p className="header__laguage-title">
                    {!language && "Мова"}
                    {language === "EN" && "Language"}
                    {language === "UA" && "Мова"}
                </p>
                <div className="header__laguage-container">
                    <p
                        className="header__laguage-en"
                        onClick={handleLanguageSelect}
                    >
                        EN
                    </p>
                    <p
                        className="header__laguage-ua"
                        onClick={handleLanguageSelect}
                    >
                        UA
                    </p>
                </div>
            </section>
        </header>
    );
};
