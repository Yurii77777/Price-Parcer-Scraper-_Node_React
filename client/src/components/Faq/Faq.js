import faq_icon from '../../resources/images/faq.png';

import './Faq.scss';

export const Faq = () => {
    const notifications = [
        {id: 1,
        message: 'At first you must check site for scraping in the top section of the App!'}
    ];

    return (
        <section className="notifications">
                <p className="notifications__title">Notifications | FAQ</p>

                <div className="notifications__content-wrapper">
                    <ul className="notifications__list">
                        <li>
                            <img
                                src={faq_icon}
                                alt={'FAQ info for you'}
                                className="notifications__faq_logo"
                            />
                            At first you must check site for scraping in the top section of the App!
                        </li>
                    </ul>

                    <button type="button" className="notifications__button">
                        <span></span>
                    </button>
                </div>
            </section>
    );
};
