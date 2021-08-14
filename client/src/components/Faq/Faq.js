import { useState } from 'react';

import cn from 'classnames';

import { Button } from '../UI-elements/Button/Button';
import { updateAppLog } from '../../utils/updateAppLog';
import { useFetch } from '../../hooks/useFetch';

import faq_icon from '../../resources/images/faq.png';
import info_icon from '../../resources/images/info.png';
import './Faq.scss';

export const Faq = ({ userSelect, setScapedCategories }) => {
    let selectedSiteObj = userSelect;
    // console.log('selectedSiteObj', selectedSiteObj);
    const { isLoading, 
        data, 
        // error, 
        request } = useFetch();

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
                'Our magic scripts getting all available categories from selected site. Wait for results, please ;)'
        },
        {
            idMessage: 4,
            icon: faq_icon,
            alt_for_icon: 'Info info',
            message_en:
                'And now you can select category you need to parse from available categories'
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

    const handleCancel = () => {
        //TODO: Clear Faq messages by click, return by default appLog
    };

    const getSiteCategories = async () => {
        try {
            const data = await request('/api/categories/get', 'POST', appLog);
            setScapedCategories(data);
            // console.log('[data]', data);
        } catch (error) {
            console.log('[error]', error);
        }
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
                    <li
                        className={
                            appLog.lastIdFaqMes === 2 && !data
                                ? cn('submit-buttons')
                                : cn('submit-buttons hide')
                        }
                    >
                        <Button
                            className="submit-buttons__ok"
                            onClick={getSiteCategories}
                            disabled={isLoading}
                        >
                            Ok
                        </Button>
                        <Button
                            className="submit-buttons__cancel"
                            onClick={handleCancel}
                            disabled={isLoading}
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
                    {data
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
                </ul>

                <Button className="notifications__button" onClick={handleVisibleFaqWindow}>
                    <span></span>
                </Button>
            </div>
        </section>
    );
};
