import telegram_icon from '../../resources/images/social-icons/telegram.svg';
import instagram_icon from '../../resources/images/social-icons/instagram.svg';
import facebook_icon from '../../resources/images/social-icons/facebook.svg';
import github_icon from '../../resources/images/social-icons/github.svg';
import linkedin_icon from '../../resources/images/social-icons/linkedin.svg';
import './Footer.scss';

export const Footer = () => {
    return (
        <footer className="footer">
            <p className="footer__copyright">Made by Yurets in UA || Copyright &#169;</p>
            <div className="footer__social-icons-wrapper">
                <a
                    href="https://t.me/Yurets7777"
                    className="footer__profile-link"
                    title="Reach me on Telegram"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        src={telegram_icon}
                        alt="Reach me on Telegram"
                        className="footer__profile-link-icon"
                    />
                </a>

                <a
                    href="https://github.com/Yurii77777"
                    className="footer__profile-link"
                    title="Reach me on GitHub"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        src={github_icon}
                        alt="Reach me on GitHub"
                        className="footer__profile-link-icon"
                    />
                </a>

                <a
                    href="https://www.instagram.com/yurets_777/"
                    className="footer__profile-link"
                    title="Reach me on Instagram"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        src={instagram_icon}
                        alt="Reach me on Instagram"
                        className="footer__profile-link-icon"
                    />
                </a>

                <a
                    href="https://www.facebook.com/yuriy.andriyko"
                    className="footer__profile-link"
                    title="Reach me on Facebook"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        src={facebook_icon}
                        alt="Reach me on Facebook"
                        className="footer__profile-link-icon"
                    />
                </a>

                <a
                    href="https://www.linkedin.com/in/yurii-andriiko-389634112/"
                    className="footer__profile-link"
                    title="Reach me on Linkedin"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        src={linkedin_icon}
                        alt="Reach me on Linkedin"
                        className="footer__profile-link-icon"
                    />
                </a>
                
            </div>
        </footer>
    );
};
