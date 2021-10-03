export const createXmlFile = (data, categoryName) => {
    const builder = require('xmlbuilder');
    let xml = builder.create('offers');

    for (let i = 0; i < data.length; i++) {
        let good = data[i];
        let {
            goodCode,
            goodImgUrl,
            goodPrice,
            goodBrand,
            goodSeller,
            goodStatus,
            goodTitle,
            goodUrl,
            goodDescription
        } = good;

        xml.ele('offer', {
            id: `${goodCode || 'Not defined'}`,
            available: `${goodStatus === 'В наличии ' ? 'true' : 'false'}`
        })
            .ele('url')
            .txt(`${goodUrl}`)
            .up()
            .ele('price')
            .txt(`${goodPrice}`)
            .up()
            .ele('currencyId')
            .txt('UAH')
            .up()
            .ele('category')
            .txt(`${categoryName}`)
            .up()
            .ele('vendor')
            .txt(`${goodBrand}`)
            .up()
            .ele('name')
            .txt(`${goodTitle}`)
            .up()
            .ele('seller')
            .txt(`${goodSeller}`)
            .up()
            .ele('description')
            .txt(`${goodDescription && goodDescription}`)
            .up()
            .ele('picture')
            .txt(`${goodImgUrl}`);
    }

    let xmlString = xml.toString({ pretty: true });

    return xmlString;
};
