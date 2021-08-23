import { availableCategories } from '../modules/epicetrkAvailableCategories';

import './Sidebar.scss';

export const Sidebar = ({ userSelectSite, setUserSelectCategory }) => {
    let selectedSite = userSelectSite?.altLogo;
    // console.log('[selectedSite]', selectedSite);

    let filteredCategories = null;
    // console.log('[availableCategories]', availableCategories);

    if (selectedSite) {
        filteredCategories = availableCategories.filter(
            ({ siteName }) => siteName === selectedSite
        );
    }

    const handleCategorySelect = e => {
        let detectedCategoryName = e.target.firstChild.data;
        // console.log('[detectedCategoryName]', detectedCategoryName);
        let selectedCategoryName = null;

        availableCategories.forEach(({ siteName, categories }) => {
            selectedSite === siteName &&
                categories.forEach(siteObj => {
                    siteObj.categoryName === detectedCategoryName && (selectedCategoryName = siteObj);
                    siteObj.categoryName !== detectedCategoryName && (siteObj.subategories.forEach((siteObj) => {
                        siteObj.categoryName === detectedCategoryName && (selectedCategoryName = siteObj);
                        siteObj.categoryName !== detectedCategoryName && (siteObj.subategories.forEach((siteObj) => {
                            siteObj.categoryName === detectedCategoryName && (selectedCategoryName = siteObj);
                        }));
                    }));
                });
        });

        setUserSelectCategory(selectedCategoryName);
        console.log('[selectedCategoryName]', selectedCategoryName);
    };

    return (
        <aside className="sidebar">
            <p className="sidebar__title">Available categories</p>

            <ul className="sidebar__categories-list">
                {filteredCategories
                    ? filteredCategories[0].categories.map(
                          ({ categoryId, categoryName, subategories }) => {
                              return (
                                  <li
                                      key={categoryId}
                                      className="sidebar__categories-top-item"
                                      onClick={handleCategorySelect}
                                  >
                                      {categoryName}

                                      {subategories.length
                                          ? subategories.map(
                                                ({ categoryId, categoryName, subategories }) => {
                                                    return (
                                                        <ul
                                                            className="sidebar__subcategories-list"
                                                            key={categoryId + 1}
                                                        >
                                                            <li
                                                                key={categoryId}
                                                                className="sidebar__subcategories-item"
                                                                onClick={handleCategorySelect}
                                                            >
                                                                {categoryName}

                                                                {subategories.length
                                                                    ? subategories.map(
                                                                          ({
                                                                              categoryId,
                                                                              categoryName,
                                                                              subategories
                                                                          }) => {
                                                                              return (
                                                                                  <ul
                                                                                      className="sidebar__sub-subcategories-list"
                                                                                      key={
                                                                                          categoryId +
                                                                                          1
                                                                                      }
                                                                                  >
                                                                                      <li
                                                                                          key={
                                                                                              categoryId
                                                                                          }
                                                                                          className="sidebar__sub-subcategories-item"
                                                                                          onClick={
                                                                                              handleCategorySelect
                                                                                          }
                                                                                      >
                                                                                          {
                                                                                              categoryName
                                                                                          }
                                                                                      </li>
                                                                                  </ul>
                                                                              );
                                                                          }
                                                                      )
                                                                    : null}
                                                            </li>
                                                        </ul>
                                                    );
                                                }
                                            )
                                          : null}
                                  </li>
                              );
                          }
                      )
                    : null}
            </ul>
        </aside>
    );
};
