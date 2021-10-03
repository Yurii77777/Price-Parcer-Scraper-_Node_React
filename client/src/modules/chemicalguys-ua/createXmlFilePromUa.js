export const createXmlFileChemicalProm = (data, categoryName) => {
    const builder = require('xmlbuilder');
    let xml = builder.create('shop');

    for (let i = 0; i < data.length; i++) {
        let good = data[i];
        let {
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
            goodVideoUrl
        } = good;

        xml
            .ele('catalog')
            .ele('category', {id: '1'})
            .txt(`${categoryName}`)
            .up().up()
            .ele('items')
            .ele('item', {
                id: `${goodCode.slice(0, 24) || 'Not defined'}`
            })
            .ele('name')
            .txt(`${goodTitle.slice(0, 99)}`) // max length 100 char
            .up()
            .ele('categoryId')
            .txt('1') // !IS REQUIRED!
            .up()
            .ele('priceuah')
            .txt(`${goodPrice}`)
            .up()
            .ele('image')
            .txt(`${goodImgUrl ? goodImgUrl : ''}`)
            .up()
            .ele('image')
            .txt(`${goodImgUrl2 ? goodImgUrl2 : ''}`)
            .up()
            .ele('vendor')
            .txt(`${goodBrand ? goodBrand : ''}`)
            .up()
            .ele('param', {name: 'Тип'})
            .txt(`${goodType ? goodType : ''}`)
            .up()
            .ele('param', {name: 'Аромат'})
            .txt(`${goodAroma ? goodAroma : ''}`)
            .up()
            .ele('param', {name: 'Назначение'})
            .txt(`${goodUse ? goodUse : ''}`)
            .up()
            .ele('param', {name: 'Консистенция'})
            .txt(`${goodConsistency ? goodConsistency : ''}`)
            .up()
            .ele('param', {name: 'Гарантия'})
            .txt(`${goodGuarantee ? goodGuarantee : ''}`)
            .up()
            .ele('param', {name: 'Вес'})
            .txt(`${goodWeight ? goodWeight : ''}`)
            .up()
            .ele('param', {name: 'Емкость'})
            .txt(`${goodCapacity ? goodCapacity : ''}`)
            .up()
            .ele('description')
            .txt(`${goodDescription ? goodDescription : ''}`)
            .up()
            .ele('available')
            .txt(`${goodStatus === 'В наличии ' ? 'true' : 'false'}`)
            .up()
            .ele('video')
            .txt(`${goodVideoUrl ? goodVideoUrl : ''}`)
    }

    let xmlString = xml.toString({ pretty: true });

    return xmlString;
};
