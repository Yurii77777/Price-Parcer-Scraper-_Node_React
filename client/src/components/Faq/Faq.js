import { useState } from 'react';

import cn from 'classnames';

import { Button } from '../UI-elements/Button/Button';
import { updateAppLog } from '../../utils/updateAppLog';

import faq_icon from '../../resources/images/faq.png';
import info_icon from '../../resources/images/info.png';
import './Faq.scss';

export const Faq = ({ userSelectSite, userSelectCategory, setData }) => {
    let selectedSiteObj = userSelectSite;
    // console.log('selectedSiteObj', selectedSiteObj);
    const ws = new WebSocket('ws://localhost:5050');
    ws.onopen = () => console.log('Соединение установлено');

    const [isLoading, setIsLoading] = useState(false);

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
            message_en: 'You have selected "site" for scraping'
        },
        {
            idMessage: 3,
            icon: faq_icon,
            alt_for_icon: 'FAQ info',
            message_en:
                'Our magic scripts getting all available goods from selected category. Wait for results, please ;)'
        },
        {
            idMessage: 4,
            icon: faq_icon,
            alt_for_icon: 'FAQ info',
            message_en:
                'And now you can select category you need to parse from available categories'
        },
        {
            idMessage: 5,
            icon: info_icon,
            alt_for_icon: 'Info info',
            message_en: 'You have selected "category" for scraping'
        }
    ];

    let appLog = {
        appAtStart: false,
        lastIdFaqMes: null,
        checkedSite: null
    };
    // console.log('[appLog]', appLog);

    let isHiddenFaqWindow = false;
    const [visibleFaqWindow, setVisibleFaqWindow] = useState(isHiddenFaqWindow);

    /**
     * Function changes state value on "true" or "false"
     * While state is "false", FAQ window (Component) is visible
     */
    const handleVisibleFaqWindow = () => {
        visibleFaqWindow ? setVisibleFaqWindow(false) : setVisibleFaqWindow(true);
    };

    let updAppLog = updateAppLog(appLog);
    // console.log('[updAppLog]', updAppLog);

    const handleSelectedSite = (selectedSiteObj = {}) => {
        if (Object.keys(selectedSiteObj).length > 0) {
            appLog.appAtStart = false;
            appLog.lastIdFaqMes = 2;
            appLog.checkedSite = selectedSiteObj.url;

            return selectedSiteObj;
        }
    };

    let selectedSite = handleSelectedSite(selectedSiteObj);
    // console.log('[selectedSite]', selectedSite);

    const getGoodsData = () => {
        const { catogoryUrl: url } = userSelectCategory;
        ws.send(JSON.stringify({ event: 'getGoodsRequest', categoryUrl: url }));
        setIsLoading(true);

        ws.onmessage = message => {
            const { data } = message;
            setData(JSON.parse(data));
            // console.log('[JSON.parse(data)]', JSON.parse(data));
        };

        setIsLoading(false);
    };

    console.log('%c* * * * * Next render * * * * *', 'color: blue; font-weight: bold');
    return (
        <section className={visibleFaqWindow ? cn('notifications hide') : cn('notifications')}>
            <p className="notifications__title">Notifications | FAQ</p>

            <div className="notifications__content-wrapper">
                <ul className="notifications__list">
                    {updAppLog.appAtStart
                        ? notifications.map(({ idMessage, icon, alt_for_icon, message_en }) => {
                              if (idMessage === 1) {
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
                          })
                        : null}
                    {selectedSite
                        ? notifications.map(({ idMessage, icon, alt_for_icon, message_en }) => {
                              if (idMessage === 2) {
                                  let messageEn = message_en.replace(
                                      /"site"/g,
                                      selectedSite.altLogo
                                  );

                                  return (
                                      <li key={idMessage}>
                                          <img
                                              src={icon}
                                              alt={alt_for_icon}
                                              className={cn('notifications__faq_logo')}
                                          />
                                          {messageEn}
                                      </li>
                                  );
                              }

                              return null;
                          })
                        : null}
                    {selectedSite && !userSelectCategory
                        ? notifications.map(({ idMessage, icon, alt_for_icon, message_en }) => {
                              if (idMessage === 4) {
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
                          })
                        : null}
                    {Object.keys(userSelectCategory).length
                        ? notifications.map(({ idMessage, icon, alt_for_icon, message_en }) => {
                              if (idMessage === 5) {
                                  let messageEn = message_en.replace(
                                      /"category"/g,
                                      userSelectCategory.categoryName
                                  );

                                  return (
                                      <li key={idMessage}>
                                          <img
                                              src={icon}
                                              alt={alt_for_icon}
                                              className={cn('notifications__faq_logo')}
                                          />
                                          {messageEn}
                                      </li>
                                  );
                              }

                              return null;
                          })
                        : null}
                    <li
                        className={
                            Object.keys(userSelectCategory).length
                                ? cn('submit-buttons')
                                : cn('submit-buttons hide')
                        }
                    >
                        <Button
                            className="submit-buttons__ok"
                            onClick={getGoodsData}
                            disabled={isLoading}
                        >
                            Ok
                        </Button>
                        <Button
                            className="submit-buttons__cancel"
                            // disabled={isLoading}
                        >
                            Cancel
                        </Button>
                    </li>
                    {isLoading
                        ? notifications.map(({ idMessage, icon, alt_for_icon, message_en }) => {
                              if (idMessage === 3) {
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
                          })
                        : null}
                </ul>

                <Button className="notifications__button" onClick={handleVisibleFaqWindow}>
                    <span></span>
                </Button>
            </div>
        </section>
    );
};
