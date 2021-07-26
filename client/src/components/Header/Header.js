import PT from 'prop-types';

import logo from '../../resources/images/main-logo.svg';
import epicentr_logo from '../../resources/images/sites-icons/epicentrk.png';

import './Header.scss';

export const Header = () => {

    return (
        <header className="header">
            <section className="header__logo">
                <p className="header__logo-title">P&P</p>
                    <img src={logo} alt={"Price Parcer logo"} className="header__logo-svg" />
                <p className="header__logo-subtitle">Price Parcer</p>
            </section>

            <section className="header__resources">
                <div>Search input here</div>
                <div className="header__sites-for-parse">
                    <div className="header__epicentrk">
                        <input type="checkbox" id="epicetrk_ua" name="epicetrk_ua" />
                        <label htmlFor="epicetrk_ua" className="header__epicentrk-label">
                            <img src={epicentr_logo} alt={"Epicentrk.ua"} className="header__epicentrk_logo" />
                        </label>
                    </div>
                </div>
            </section>

            <section className="header__right-block"> SOME OTHER INFO</section>
        </header>
    );
}
