import './HomePage.scss';

export const HomePage = ({ data }) => {
    return (
        <ul className="goods-list">
            {data && (
                <li className="goods-list__top-item" key={1.11}>
                    <p className="goods-list__top-item-title">Title</p>
                    <p className="goods-list__top-item-price">Price, UAH</p>
                </li>
            )}

            {data &&
                data.map(({ goodTitle, goodPrice, goodId }) => {
                    return (
                        <li className="goods-list__item" key={goodId}>
                            <p className="goods-list__item-title">{goodTitle}</p>
                            <p className="goods-list__item-price">{goodPrice}</p>
                        </li>
                    );
                })}
        </ul>
    );
};
