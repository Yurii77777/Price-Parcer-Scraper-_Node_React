import './Sidebar.scss';

export const Sidebar = ({ scapedCategories }) => {
    const categories = scapedCategories?.categories;
    console.log('[categories]', categories);

    return (
        <aside className="sidebar">
            <p className="sidebar__title">Available categories</p>

            <ul className="sidebar__categories-list">
                {categories
                    ? categories.map(({ categoryName, categoryId }) => {
                          return <li key={categoryId}>{categoryName}</li>;
                      })
                    : null}
            </ul>
        </aside>
    );
};
