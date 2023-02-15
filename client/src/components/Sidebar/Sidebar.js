import { rozetkacomuaCategories } from "../../modules/rozetka-com-ua/rozetkacomuaAvailableCategories";
import { epicetrkUaCategories } from "../../modules/epicentrk-ua/epicetrkAvailableCategories";
import { alloCategories } from "../../modules/allo-ua/alloAvailableCategories";

import "./Sidebar.scss";

export const Sidebar = ({
    userSelectSite,
    setUserSelectCategory,
    language,
}) => {
    let selectedSite = userSelectSite?.altLogo;
    // console.log('[selectedSite]', selectedSite);

    let filteredCategories = null;

    if (selectedSite && selectedSite === "Epicentrk.ua") {
        filteredCategories = epicetrkUaCategories.filter(
            ({ siteName }) => siteName === selectedSite
        );
    }

    if (selectedSite && selectedSite === "Rozetka.com.ua") {
        filteredCategories = rozetkacomuaCategories.filter(
            ({ siteName }) => siteName === selectedSite
        );
    }

    if (selectedSite && selectedSite === "Allo.ua") {
        filteredCategories = alloCategories.filter(
            ({ siteName }) => siteName === selectedSite
        );
    }

    const handleCategorySelect = (e) => {
        let detectedCategoryName = e.target.firstChild.data;
        // console.log('[detectedCategoryName]', detectedCategoryName);

        const getSelectedCategory = (availableCategories) => {
            let selectedCategory = null;

            availableCategories.forEach(({ categories }) => {
                categories.forEach((siteObj) => {
                    if (siteObj.categoryName === detectedCategoryName) {
                        selectedCategory = siteObj;
                    } else {
                        siteObj.subcategories &&
                            siteObj.subcategories.forEach((siteObj) => {
                                siteObj.categoryName === detectedCategoryName &&
                                    (selectedCategory = siteObj);
                            });
                    }
                });
            });

            return setUserSelectCategory(selectedCategory);
        };

        selectedSite === "Epicentrk.ua" &&
            getSelectedCategory(epicetrkUaCategories);
        selectedSite === "Rozetka.com.ua" &&
            getSelectedCategory(rozetkacomuaCategories);
        selectedSite === "Allo.ua" && getSelectedCategory(alloCategories);
    };

    return (
        <aside className="sidebar">
            <p className="sidebar__title">
                {!language && "Available categories"}
                {language === "EN" && "Available categories"}
                {language === "UA" && "Доступні категорії"}
            </p>

            <ul className="sidebar__categories-list">
                {filteredCategories
                    ? filteredCategories[0].categories.map(
                          ({ categoryId, categoryName, subcategories }) => {
                              return (
                                  <li
                                      key={categoryId}
                                      className="sidebar__categories-top-item"
                                      onClick={handleCategorySelect}
                                  >
                                      {categoryName}
                                  </li>
                              );
                          }
                      )
                    : null}
            </ul>
        </aside>
    );
};
