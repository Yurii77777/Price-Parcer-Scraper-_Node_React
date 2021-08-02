import { useState } from 'react';

import cn from 'classnames';

import { Button } from '../UI-elements/Button/Button';

import faq_icon from '../../resources/images/faq.png';
import info_icon from '../../resources/images/info.png';
import './Faq.scss';

export const Faq = ({ altLogo }) => {
    const notifications = [
        {
            idMessage: 1,
            icon: faq_icon,
            alt_for_icon: 'FAQ info',
            message_en: 'At first you must check site for scraping in the top section of the App!'
        },
        {
            idMessage: 2,
            icon: info_icon,
            alt_for_icon: 'Info info',
            message_en: `You have selected ${altLogo} for scraping.`
        }
    ];

    let isHiddenFaqWindow = false;
    const [showFaqWindow, setShowFaqWindow] = useState(isHiddenFaqWindow);

    const handleShowFaqWindow = () => {
        showFaqWindow ? setShowFaqWindow(false) : setShowFaqWindow(true);
    };

    const initialFaqMessages = [];
    const [faqMessages, setFaqMessages] = useState(initialFaqMessages);

    return (
        <section className={showFaqWindow ? cn('notifications hide') : cn('notifications')}>
            <p className="notifications__title">Notifications | FAQ</p>

            <div className="notifications__content-wrapper">
                <ul className="notifications__list">
                    //TODO: Implement process interactive Faq. User select from header already is in altLogo.
                    // Rename altLogo prop in Faq component
                    {notifications.map(message => {
                        if (message.idMessage === 1) {
                            const { idMessage } = message;
                            const { icon } = message;
                            const { alt_for_icon } = message;
                            const { message_en } = message;

                            return (
                                <li key={idMessage}>
                                    <img
                                        src={icon}
                                        alt={alt_for_icon}
                                        className={cn('notifications__faq_logo')}
                                    />
                                    {message_en}
                                </li>
                            );
                        }

                        return null;
                    })}
                </ul>

                <Button className="notifications__button" onClick={handleShowFaqWindow}>
                    <span></span>
                </Button>
            </div>
        </section>
    );
};
