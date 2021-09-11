import './InstrumentsPanel.scss';

import iconXML from '../../resources/images/instruments-icons/xml-icon.png';
import { type } from 'os';

export const InstrumentsPanel = ({ data, userSelectCategory }) => {
    const fs = require('fs');

    const { categoryName } = userSelectCategory;

    const instruments = [
        {
            id: 1,
            imgSrc: `${iconXML}`,
            imgTitle: 'Create XML file'
        }
    ];

    const downloadXmlFile = (xmlString, categoryName) => {
        //TODO: Write XML file from Browser in selected folder by user
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

    return (
        <ul className="instruments-panel">
            {instruments.map(({ id, imgSrc, imgTitle }) => {
                return (
                    <li
                        className="instruments-panel__element"
                        key={id}
                    >
                        <img
                            className="instruments-panel__logo"
                            src={imgSrc}
                            title={imgTitle}
                            alt={imgTitle}
                            onClick={id === 1 && createXmlFile}
                        />
                    </li>
                );
            })}
        </ul>
    );
};
