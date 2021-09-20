import telegram_icon from '../../resources/images/social-icons/telegram.svg';
import instagram_icon from '../../resources/images/social-icons/instagram.svg';
import facebook_icon from '../../resources/images/social-icons/facebook.svg';
import './Footer.scss';

export const Footer = () => {
    return (
        <footer className="footer">
            <p className="footer__copyright">Made by Yurets in UA || Copyright &#169;</p>
            <div className="footer__social-icons-wrapper">
                <a
                    href="https://t.me/Yurets7777"
                    className="footer__telegram-link"
                    title="Reach me by Telegram"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        src={telegram_icon}
                        alt="Reach me by Telegram"
                        className="footer__telegram-icon"
                    />
                </a>

                <a
                    href="https://www.instagram.com/yurets_777/"
                    className="footer__instagram-link"
                    title="Reach me by Instagram"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        src={instagram_icon}
                        alt="Reach me by Instagram"
                        className="footer__instagram-icon"
                    />
                </a>

                <a
                    href="https://www.facebook.com/yuriy.andriyko"
                    className="footer__facebook-link"
                    title="Reach me by Facebook"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        src={facebook_icon}
                        alt="Reach me by Facebook"
                        className="footer__facebook-icon"
                    />
                </a>
            </div>
        </footer>
    );
};
