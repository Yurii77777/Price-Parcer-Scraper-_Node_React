import { Loader } from '../../components/Loader/Loader';

import './HomePage.scss';
import noImage from '../../resources/images/no-image-icon.png';

export const HomePage = ({ data, setData, isLoading, language }) => {
    //TODO: Sort by price Low and High
    const handleSortByPrice = data => {
        const sortedGoodsByPrice = [...data].sort((goodObj1, goodObj2) =>
            goodObj1.goodPrice > goodObj2.goodPrice ? 1 : -1
        );

        return setData(sortedGoodsByPrice);
    };

    return (
        <ul className="goods-list">
            {isLoading && <Loader />}
            {data && (
                <li className="goods-list__top-item" key={1.11}>
                    <p className="goods-list__top-item-image">
                        {!language && 'Img'}
                        {language === 'EN' && 'Img'}
                        {language === 'UA' && 'Зображ.'}
                        {language === 'RU' && 'Изображ.'}
                    </p>
                    <p className="goods-list__top-item-brand">
                        {!language && 'Brand'}
                        {language === 'EN' && 'Brand'}
                        {language === 'UA' && 'Бренд'}
                        {language === 'RU' && 'Бренд'}
                    </p>
                    <p className="goods-list__top-item-title">
                        {!language && 'Title'}
                        {language === 'EN' && 'Title'}
                        {language === 'UA' && 'Назва'}
                        {language === 'RU' && 'Наименование'}
                    </p>
                    <p className="goods-list__top-item-price" onClick={() => handleSortByPrice(data)}>
                        {!language && 'Price, UAH'}
                        {language === 'EN' && 'Price, UAH'}
                        {language === 'UA' && 'Ціна, UAH'}
                        {language === 'RU' && 'Цена, UAH'}
                    </p>
                    <p className="goods-list__top-item-seller">
                        {!language && 'Seller'}
                        {language === 'EN' && 'Seller'}
                        {language === 'UA' && 'Продавець'}
                        {language === 'RU' && 'Продавец'}
                    </p>
                    <p className="goods-list__top-item-status">
                        {!language && 'Status'}
                        {language === 'EN' && 'Status'}
                        {language === 'UA' && 'Статус'}
                        {language === 'RU' && 'Статус'}
                    </p>
                    <p className="goods-list__top-item-url">URL</p>
                </li>
            )}

            {data &&
                data.map(
                    ({
                        goodId,
                        goodBrand,
                        goodTitle,
                        goodPrice,
                        goodSeller,
                        goodStatus,
                        goodUrl,
                        goodImgUrl
                    }) => {
                        return (
                            <li className="goods-list__item" key={goodId}>
                                <p className="goods-list__item-image">
                                    {!goodImgUrl ? (
                                        <img
                                            src={noImage}
                                            alt="Poster is absent"
                                            className="goods-list__item-no-image"
                                        />
                                    ) : (
                                        <img
                                            src={goodImgUrl}
                                            alt="Poster"
                                            className="goods-list__item-good-image"
                                        />
                                    )}
                                </p>
                                <p className="goods-list__item-brand">{goodBrand}</p>
                                <p className="goods-list__item-title">{goodTitle}</p>
                                <p className="goods-list__item-price">
                                    {Number(goodPrice).toFixed(2)}
                                </p>
                                <p className="goods-list__item-seller">{goodSeller}</p>
                                <p className="goods-list__item-status">{goodStatus}</p>
                                <a
                                    href={goodUrl}
                                    className="goods-list__item-url"
                                    title="Go to good page"
                                    target="_blank"
                                    rel="noreferrer"
                                ></a>
                            </li>
                        );
                    }
                )}

            {data && (
                <li className="goods-list__bottom-item" key={3.33}>
                    <p className="goods-list__bottom-item-title">
                        {!language && 'Total goods, pcs'}
                        {language === 'EN' && 'Total goods, pcs'}
                        {language === 'UA' && 'Всього товарів, шт.'}
                        {language === 'RU' && 'Всего товаров, шт.'}
                    </p>
                    <p className="goods-list__bottom-item-quantity">{data.length + 1}</p>
                </li>
            )}
        </ul>
    );
};
