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
        let selectedCategoryName = null;

        // console.log('[decetedCategoryItem]', decetedCategoryItem.nextSibling);

        availableCategories.forEach(({ siteName, categories }) => {
            selectedSite === siteName &&
                categories.forEach(siteObj => {
                    siteObj.categoryName === detectedCategoryName &&
                        (selectedCategoryName = siteObj);
                    siteObj.categoryName !== detectedCategoryName &&
                        siteObj.subcategories.forEach(siteObj => {
                            siteObj.categoryName === detectedCategoryName &&
                                (selectedCategoryName = siteObj);
                            siteObj.categoryName !== detectedCategoryName &&
                                siteObj.subcategories.forEach(siteObj => {
                                    siteObj.categoryName === detectedCategoryName &&
                                        (selectedCategoryName = siteObj);
                                });
                        });
                });
        });

        setUserSelectCategory(selectedCategoryName);
        // console.log('[selectedCategoryName]', selectedCategoryName);
    };

    return (
        <aside className="sidebar">
            <p className="sidebar__title">Available categories</p>

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

                                      <ul className="sidebar__subcategories-list">
                                          {subcategories.length
                                              ? subcategories.map(
                                                    ({
                                                        categoryId,
                                                        categoryName,
                                                        subcategories
                                                    }) => {
                                                        return (
                                                            <li
                                                                key={categoryId}
                                                                className="sidebar__subcategories-item"
                                                                onClick={handleCategorySelect}
                                                            >
                                                                {categoryName}

                                                                <ul className="sidebar__sub-subcategories-list">
                                                                    {subcategories.length
                                                                        ? subcategories.map(
                                                                              ({
                                                                                  categoryId,
                                                                                  categoryName,
                                                                                  subcategories
                                                                              }) => {
                                                                                  return (
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
                                                                                  );
                                                                              }
                                                                          )
                                                                        : null}
                                                                </ul>
                                                            </li>
                                                        );
                                                    }
                                                )
                                              : null}
                                      </ul>
                                  </li>
                              );
                          }
                      )
                    : null}
            </ul>
        </aside>
    );
};
