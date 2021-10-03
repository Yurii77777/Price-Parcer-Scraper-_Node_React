export const createCsvFile = (data) => {
    const records = [];
    records.push(['CODE', 'VENDOR', 'TITLE', 'PRICE', 'SELLER', 'STATUS', 'URL', 'IMG-URL', 'DESCRIPTION']);

    data.forEach(
        ({ goodCode, goodBrand, goodImgUrl, goodPrice, goodSeller, goodStatus, goodTitle, goodUrl, goodDescription }) => {
            const goodArr = [];

            goodCode ? goodArr.push(String(goodCode)) : goodArr.push('');
            goodBrand ? goodArr.push(String(goodBrand)) : goodArr.push('');
            goodTitle ? goodArr.push(String(goodTitle)) : goodArr.push('');
            goodPrice ? goodArr.push(String(goodPrice)) : goodArr.push('');
            goodSeller ? goodArr.push(String(goodSeller)) : goodArr.push('');
            goodStatus ? goodArr.push(String(goodStatus)) : goodArr.push('');
            goodUrl ? goodArr.push(String(goodUrl)) : goodArr.push('');
            goodImgUrl ? goodArr.push(String(goodImgUrl)) : goodArr.push('');
            goodDescription ? goodArr.push(String(goodDescription).replace(/;/g, '.')) : goodArr.push('');

            records.push(goodArr);
        }
    );

    let csvString = records.map(e => e.join(';')).join('\n');

    return csvString;
};
