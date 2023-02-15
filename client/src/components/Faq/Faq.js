import { useState } from "react";

import cn from "classnames";

import { notifications } from "./faqMessages";
import { Button } from "../UI-elements/Button/Button";

import "./Faq.scss";

export const Faq = ({
    userSelectSite = {},
    setUserSelectSite,
    userSelectCategory,
    setUserSelectCategory,
    setPropsForInstruments,
    data,
    setData,
    setIsLoading,
    isLoading,
    language,
    ws,
}) => {
    let selectedSite = Object.keys(userSelectSite).length > 0 && userSelectSite;
    // console.log('[selectedSite]', selectedSite);

    const [visibleFaqWindow, setVisibleFaqWindow] = useState();

    /**
     * Function changes state value on "true" or "false"
     * While state is "false", FAQ window (Component) is visible
     */
    const handleVisibleFaqWindow = () => {
        visibleFaqWindow
            ? setVisibleFaqWindow(false)
            : setVisibleFaqWindow(true);
    };

    const getGoodsData = () => {
        const { catogoryUrl: url } = userSelectCategory;
        const { categoryName } = userSelectCategory;
        const { altLogo: selectedSite } = userSelectSite;
        setPropsForInstruments({ site: selectedSite, category: categoryName });
        setData([]);
        setUserSelectSite({});
        setUserSelectCategory({});
        setIsLoading(true);
        ws.send(
            JSON.stringify({
                event: "getGoodsRequest",
                categoryName: categoryName,
                categoryUrl: url,
                selectedSite: selectedSite,
            })
        );
        // console.log('[userSelectSite]', userSelectSite);

        ws.onmessage = (message) => {
            const { data } = message;
            setData(JSON.parse(data));
            // console.log('[JSON.parse(data)]', JSON.parse(data));
            setIsLoading(false);
            // console.log('[isLoading]', isLoading);
        };
    };

    console.log(
        "%c* * * * * Next render * * * * *",
        "color: blue; font-weight: bold"
    );
    return (
        <section
            className={
                visibleFaqWindow
                    ? cn("notifications hide")
                    : cn("notifications")
            }
        >
            <p className="notifications__title">
                {!language && "Notifications | FAQ"}
                {language === "EN" && "Notifications | FAQ"}
                {language === "UA" && "Повідомлення | FAQ"}
            </p>

            <div className="notifications__content-wrapper">
                <ul className="notifications__list">
                    {!data && !selectedSite
                        ? notifications.map(
                              ({
                                  idMessage,
                                  icon,
                                  alt_for_icon,
                                  message_en,
                                  message_ua,
                              }) => {
                                  if (idMessage === 1) {
                                      return (
                                          <li key={idMessage}>
                                              <img
                                                  src={icon}
                                                  alt={alt_for_icon}
                                                  className={cn(
                                                      "notifications__faq_logo"
                                                  )}
                                              />
                                              {!language && message_en}
                                              {language === "EN" && message_en}
                                              {language === "UA" && message_ua}
                                          </li>
                                      );
                                  }

                                  return null;
                              }
                          )
                        : null}
                    {selectedSite
                        ? notifications.map(
                              ({
                                  idMessage,
                                  icon,
                                  alt_for_icon,
                                  message_en,
                                  message_ua,
                              }) => {
                                  if (idMessage === 2) {
                                      let messageEn = message_en.replace(
                                          /"site"/g,
                                          selectedSite?.altLogo
                                      );
                                      let messageUa = message_ua.replace(
                                          /"site"/g,
                                          selectedSite?.altLogo
                                      );

                                      return (
                                          <li key={idMessage}>
                                              <img
                                                  src={icon}
                                                  alt={alt_for_icon}
                                                  className={cn(
                                                      "notifications__faq_logo"
                                                  )}
                                              />
                                              {!language && messageEn}
                                              {language === "EN" && messageEn}
                                              {language === "UA" && messageUa}
                                          </li>
                                      );
                                  }

                                  return null;
                              }
                          )
                        : null}
                    {selectedSite && !Object.keys(userSelectCategory).length
                        ? notifications.map(
                              ({
                                  idMessage,
                                  icon,
                                  alt_for_icon,
                                  message_en,
                                  message_ua,
                              }) => {
                                  if (idMessage === 4) {
                                      return (
                                          <li key={idMessage}>
                                              <img
                                                  src={icon}
                                                  alt={alt_for_icon}
                                                  className={cn(
                                                      "notifications__faq_logo"
                                                  )}
                                              />
                                              {!language && message_en}
                                              {language === "EN" && message_en}
                                              {language === "UA" && message_ua}
                                          </li>
                                      );
                                  }

                                  return null;
                              }
                          )
                        : null}
                    {Object.keys(userSelectCategory).length
                        ? notifications.map(
                              ({
                                  idMessage,
                                  icon,
                                  alt_for_icon,
                                  message_en,
                                  message_ua,
                              }) => {
                                  if (idMessage === 5) {
                                      let messageEn = message_en.replace(
                                          /"category"/g,
                                          userSelectCategory.categoryName
                                      );
                                      let messageUa = message_ua.replace(
                                          /"category"/g,
                                          userSelectCategory.categoryName
                                      );

                                      return (
                                          <li key={idMessage}>
                                              <img
                                                  src={icon}
                                                  alt={alt_for_icon}
                                                  className={cn(
                                                      "notifications__faq_logo"
                                                  )}
                                              />
                                              {!language && messageEn}
                                              {language === "EN" && messageEn}
                                              {language === "UA" && messageUa}
                                          </li>
                                      );
                                  }

                                  return null;
                              }
                          )
                        : null}
                    <li
                        className={
                            Object.keys(userSelectCategory).length
                                ? cn("submit-buttons")
                                : cn("submit-buttons hide")
                        }
                    >
                        <Button
                            className="submit-buttons__ok"
                            onClick={getGoodsData}
                            disabled={isLoading}
                        >
                            Ok
                        </Button>
                        <Button className="submit-buttons__cancel">
                            Cancel
                        </Button>
                    </li>
                    {isLoading
                        ? notifications.map(
                              ({
                                  idMessage,
                                  icon,
                                  alt_for_icon,
                                  message_en,
                                  message_ua,
                              }) => {
                                  if (idMessage === 3) {
                                      return (
                                          <li key={idMessage}>
                                              <img
                                                  src={icon}
                                                  alt={alt_for_icon}
                                                  className={cn(
                                                      "notifications__faq_logo"
                                                  )}
                                              />
                                              {!language && message_en}
                                              {language === "EN" && message_en}
                                              {language === "UA" && message_ua}
                                          </li>
                                      );
                                  }

                                  return null;
                              }
                          )
                        : null}
                    {data && !isLoading
                        ? notifications.map(
                              ({
                                  idMessage,
                                  icon,
                                  alt_for_icon,
                                  message_en,
                                  message_ua,
                              }) => {
                                  if (idMessage === 6) {
                                      return (
                                          <li key={idMessage}>
                                              <img
                                                  src={icon}
                                                  alt={alt_for_icon}
                                                  className={cn(
                                                      "notifications__faq_logo"
                                                  )}
                                              />
                                              {!language && message_en}
                                              {language === "EN" && message_en}
                                              {language === "UA" && message_ua}
                                          </li>
                                      );
                                  }

                                  return null;
                              }
                          )
                        : null}
                </ul>

                <Button
                    className="notifications__button"
                    onClick={handleVisibleFaqWindow}
                >
                    <span></span>
                </Button>
            </div>
        </section>
    );
};
