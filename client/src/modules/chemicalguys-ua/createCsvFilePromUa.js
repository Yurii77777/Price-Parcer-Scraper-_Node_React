export const createCsvFileChemicalProm = data => {
    const records = [];
    records.push([
        'Код_товара',
        'Название_позиции',
        'Название_позиции_укр',
        'Описание',
        'Описание_укр',
        'Цена',
        'Валюта',
        'Единица_измерения',
        'Ссылка_изображения',
        'Наличие',
        'Производитель',
        'Идентификатор_товара',
        'Тип_Значение_характеристики',
        'Аромат_Значение_характеристики',
        'Назначение_Значение_характеристики',
        'Консистенция_Значение_характеристики',
        'Гарантия_Значение_характеристики',
        'Ссылка_видео',
    ]);

    data.forEach(
        ({
            goodCode,
            goodTitle,
            goodDescription,
            goodPrice,
            goodWeight,
            goodCapacity,
            goodImgUrl,
            goodImgUrl2,
            goodStatus,
            goodBrand,
            goodType,
            goodAroma,
            goodUse,
            goodConsistency,
            goodGuarantee,
            goodVideoUrl,
        }) => {
            const goodArr = [];
            // Code length for prom.ua = max 25 char
            goodCode ? goodArr.push(String(goodCode).slice(0, 24)) : goodArr.push(String(''));

            // !IS REQUIRED! Title length for prom.ua = max 100 char
            goodTitle ? goodArr.push(String(goodTitle).slice(0, 99)) : goodArr.push(String(''));

            // !IS REQUIRED! Title_UA version length for prom.ua = max 100 char
            goodTitle ? goodArr.push(String(goodTitle).slice(0, 99)) : goodArr.push(String(''));

            // !IS REQUIRED! Description length for prom.ua = max 12160 char
            goodDescription
                ? goodArr.push(String(goodDescription.replace(/;/g, '.').slice(0, 12159)))
                : goodArr.push(String(''));

            // !IS REQUIRED! Description_UA version length for prom.ua = max 12160 char
            goodDescription
                ? goodArr.push(String(goodDescription.replace(/;/g, '.').slice(0, 12159)))
                : goodArr.push(String(''));

            // Price = number
            goodPrice ? goodArr.push(String(goodPrice)) : goodArr.push(String(''));

            // Currency = UAH | USD | EUR | CHF | RUB | GBP | JPY | PLZ | другая | BYN | KZT | MDL | р | руб | дол | $ | грн
            goodArr.push(String('грн'));

            // Unit = 2г | 5г | 10 г | 50 г | 100г | 10см | шт. | 10 шт. | 20 шт. | 50 шт. | 100 шт. | ампула | баллон | банка etc.
            goodWeight
                ? goodArr.push(String(goodWeight).replace(/\d/g, ''))
                : goodCapacity
                ? goodArr.push(String(goodCapacity).replace(/\d/g, ''))
                : goodArr.push(String('шт.'));

            // Img URL. If good item has a few img URLs it must be pushed with commas and space
            if (goodImgUrl && goodImgUrl2) {
                goodArr.push(String(goodImgUrl + ', ' + goodImgUrl2));
            } else if (goodImgUrl) {
                goodArr.push(String(goodImgUrl));
            } else {
                goodArr.push(String(''));
            }

            // Product availability "+" — есть в наличии, "!" — гарантия наличия (для сертифицированных компаний), "-" — нет в наличии, "&" — ожидается, "@" — услуга, цифра, например, "9" — кол-во дней на доставку, если товар под заказ, Важно! При пустом поле статус вашего товара станет «Нет в наличии».
            goodStatus === 'В наличии ' ? goodArr.push('+') : goodArr.push('-');

            // Vendor, string max. length for prom.ua = 255 char
            goodBrand ? goodArr.push(String(goodBrand).slice(0, 254)) : goodArr.push(String(''));

            // !IS REQUIRED! Product ID = ID of product on prom.ua in your store
            goodCode ? goodArr.push(String(goodCode).slice(0, 24)) : goodArr.push(String(''));

            // First characteristic Tyre
            goodType ? goodArr.push(String(goodType)) : goodArr.push(String(''));
            
            // Second characteristic Aroma
            goodAroma ? goodArr.push(String(goodAroma)) : goodArr.push(String(''));
            
            // Third characteristic Usage
            goodUse ? goodArr.push(String(goodUse)) : goodArr.push(String(''));
            
            // Fourth characteristic Consistency
            goodConsistency ? goodArr.push(String(goodConsistency)) : goodArr.push(String(''));
            
            // Fifth characteristic Guarantee
            goodGuarantee ? goodArr.push(String(goodGuarantee)) : goodArr.push(String(''));

            //Video URL
            goodVideoUrl ? goodArr.push(String(goodVideoUrl)) : goodArr.push(String(''));

            records.push(goodArr);
        }
    );

    let csvString = records.map(e => e.join(';')).join('\n');

    return csvString;
};
