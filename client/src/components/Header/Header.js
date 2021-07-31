import PT from 'prop-types';

import logo from '../../resources/images/main-logo.svg';
import epicentr_logo from '../../resources/images/sites-icons/epicentrk.png';
import rozetka_logo from '../../resources/images/sites-icons/rozetka.png';

import './Header.scss';

export const Header = () => {
    const availableSites = [
        {
            id: 1,
            inputId: 'rozetka_com_ua',
            inputName: 'rozetka_com_ua',
            srcLogo: rozetka_logo,
            altLogo: 'rozetka.com.ua',
            url: 'https://rozetka.com.ua/'
        },
        {
            id: 2,
            inputId: 'epicetrk_ua',
            inputName: 'epicetrk_ua',
            srcLogo: epicentr_logo,
            altLogo: 'Epicentrk.ua',
            url: 'https://epicentrk.ua/'
        }
    ];

    const handleSelectedSite = e => {
        let userClick = e.target.id;
        let selectedSite = availableSites.filter(({inputId}) => {

            return inputId === userClick;
        });
        console.log('[selectedSite]', selectedSite);

        return selectedSite;
    };

    return (
        <header className="header">
            <section className="header__logo">
                <p className="header__logo-title">P&P</p>
                <img src={logo} alt={'Price Parcer logo'} className="header__logo-svg" />
                <p className="header__logo-subtitle">Price Parcer</p>
            </section>

            <section className="header__resources">
                <div>Search input here</div>
                <div className="header__sites-for-parse">
                    {availableSites.map(({ id, srcLogo, altLogo, inputId, inputName }) => {
                        return (
                            <div className="header__site" key={id} onClick={handleSelectedSite}>
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

            <section className="header__right-block"> SOME OTHER INFO</section>
        </header>
    );
};
