import './InstrumentsPanel.scss';

import iconXML from '../../resources/images/instruments-icons/xml-icon.png';
import iconCSV from '../../resources/images/instruments-icons/csv-icon.png';

export const InstrumentsPanel = ({ data, userSelectCategory }) => {
    const { categoryName } = userSelectCategory;

    const instruments = [
        {
            id: 1,
            imgSrc: `${iconXML}`,
            imgTitle: 'Create XML file'
        },
        {
            id: 2,
            imgSrc: `${iconCSV}`,
            imgTitle: 'Create CSV file'
        }
    ];

    const downloadXmlFile = (xmlString, categoryName) => {
        const xmlFile = new Blob([xmlString], { type: 'application/xml' });

        if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(xmlFile, categoryName);
        } else {
            let a = document.createElement('a');
            let url = URL.createObjectURL(xmlFile);
            a.href = url;
            a.download = categoryName;
            document.body.appendChild(a);
            a.click();
            setTimeout(function () {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }
    };

    const createXmlFile = () => {
        const builder = require('xmlbuilder');
        let xml = builder.create('offers');

        for (let i = 0; i < data.length; i++) {
            let good = data[i];
            let { goodId, goodImgUrl, goodPrice, goodSeller, goodStatus, goodTitle, goodUrl } =
                good;
            // console.log('[good]', good);

            xml.ele('offer', {
                id: `${goodId}`,
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
                .ele('name')
                .txt(`${goodTitle}`)
                .up()
                .ele('seller')
                .txt(`${goodSeller}`)
                .up()
                .ele('picture')
                .txt(`${goodImgUrl}`);
        }

        let xmlString = xml.toString({ pretty: true });
        // console.log('[xmlString]', xmlString);

        downloadXmlFile(xmlString, categoryName);
    };

    const downloadCsvFile = (csvString, categoryName) => {
        let encodedUri = encodeURI(csvString);
        let link = document.createElement('a');
        link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodedUri);
        link.setAttribute('download', `${categoryName}.csv`);
        document.body.appendChild(link);
        link.click();

        setTimeout(function () {
            document.body.removeChild(link);
        }, 0);
    };

    const createCsvFile = () => {
        const records = [];
        records.push(['CODE', 'TITLE', 'PRICE', 'SELLER', 'STATUS', 'URL', 'IMG-URL']);

        data.forEach(
            ({ goodId, goodImgUrl, goodPrice, goodSeller, goodStatus, goodTitle, goodUrl }) => {
                const goodArr = [];

                goodArr.push(String(goodId));
                goodArr.push(String(goodTitle));
                goodArr.push(String(goodPrice));
                goodArr.push(String(goodSeller));
                goodArr.push(String(goodStatus));
                goodArr.push(String(goodUrl));
                goodArr.push(String(goodImgUrl));

                records.push(goodArr);
            }
        );

        let csvString = records.map(e => e.join(';')).join('\n');

        downloadCsvFile(csvString, categoryName);
    };

    return (
        <ul className="instruments-panel">
            {instruments.map(({ id, imgSrc, imgTitle }) => {
                return (
                    <li
                        className="instruments-panel__element"
                        key={id}
                        onClick={id === 1 ? createXmlFile : createCsvFile}
                    >
                        <img
                            className="instruments-panel__logo"
                            src={imgSrc}
                            title={imgTitle}
                            alt={imgTitle}
                        />
                    </li>
                );
            })}
        </ul>
    );
};
