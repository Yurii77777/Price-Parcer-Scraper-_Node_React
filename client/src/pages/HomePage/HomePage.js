import { Loader } from '../../components/Loader/Loader';
import { InstrumentsPanel } from '../../components/InstrumentsPanel/InstrumentsPanel';

import './HomePage.scss';
import noImage from '../../resources/images/no-image-icon.png';

export const HomePage = ({ data, isLoading, language, userSelectCategory }) => {
    
    return (
        
        <ul className="goods-list">
            {isLoading && <Loader />}
            {data && <InstrumentsPanel data={data} userSelectCategory={userSelectCategory} />}
            {data && (
                <li className="goods-list__top-item" key={1.11}>
                    <p className="goods-list__top-item-image">
                        {(!language || language === 'EN') && 'Img'}
                        {language === 'UA' && 'Зображ.'}
                        {language === 'RU' && 'Изображ.'}
                    </p>
                    <p className="goods-list__top-item-brand">
                        {(!language || language === 'EN') && 'Brand'}
                        {language === 'UA' && 'Бренд'}
                        {language === 'RU' && 'Бренд'}
                    </p>
                    <p className="goods-list__top-item-title">
                        {(!language || language === 'EN') && 'Title'}
                        {language === 'UA' && 'Назва'}
                        {language === 'RU' && 'Наименование'}
                    </p>
                    <p
                        className="goods-list__top-item-price"
                    >
                        {(!language || language === 'EN') && 'Price, UAH'}
                        {language === 'UA' && 'Ціна, UAH'}
                        {language === 'RU' && 'Цена, UAH'}
                    </p>
                    <p className="goods-list__top-item-seller">
                        {(!language || language === 'EN') && 'Seller'}
                        {language === 'UA' && 'Продавець'}
                        {language === 'RU' && 'Продавец'}
                    </p>
                    <p className="goods-list__top-item-description">
                        {(!language || language === 'EN') && 'Info'}
                        {language === 'UA' && 'Інфо'}
                        {language === 'RU' && 'Инфо'}
                    </p>
                    <p className="goods-list__top-item-status">
                        {(!language || language === 'EN') && 'Status'}
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
                        goodDescription,
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
                                <p className="goods-list__item-description">i<span>{goodDescription}</span></p>
                                <p className="goods-list__item-status">{goodStatus}</p>
                                <a
                                    href={goodUrl}
                                    className="goods-list__item-url"
                                    title="Go to good page"
                                    target="_blank"
                                    rel="noreferrer"
                                > </a>
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
