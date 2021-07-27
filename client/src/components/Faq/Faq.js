import { useState } from 'react';

import cn from 'classnames';

import faq_icon from '../../resources/images/faq.png';
import './Faq.scss';

const notifications = [
    {
        id: 1,
        icon: faq_icon,
        alt_for_icon: 'FAQ info',
        message_en: 'At first you must check site for scraping in the top section of the App!'
    }
];

export const Faq = () => {
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
                    {initialFaqMessages.length === 0
                        ? notifications.map(message => {
                              const { icon } = message;
                              const { alt_for_icon } = message;
                              const { message_en } = message;

                              return (
                                  <li>
                                      <img
                                          src={icon}
                                          alt={alt_for_icon}
                                          className={cn('notifications__faq_logo')}
                                      />
                                      {message_en}
                                  </li>
                              );
                          })
                        : null}
                </ul>

                <button
                    type="button"
                    className="notifications__button"
                    onClick={handleShowFaqWindow}
                >
                    <span></span>
                </button>
            </div>
        </section>
    );
};
