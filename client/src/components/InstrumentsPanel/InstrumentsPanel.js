import { createCsvFile } from "../../utils/createCsvFile";
import { createXmlFile } from "../../utils/createXmlFile";
import { downloadCsvFile } from "../../utils/downloadCsvFile";
import { downloadXmlFile } from "../../utils/downloadXmlFile";

import "./InstrumentsPanel.scss";

import iconXML from "../../resources/images/instruments-icons/xml-icon.svg";
import iconCSV from "../../resources/images/instruments-icons/csv-icon.svg";

export const InstrumentsPanel = ({ data, propsForInstruments, language }) => {
    const instruments = [
        {
            id: 1,
            imgSrc: `${iconXML}`,
            imgTitleEng: "Create XML file",
            imgTitleUa: "Створити XML файл",
            imgTitleRu: "Создать XML файл",
            submenu: [
                {
                    id: 1.1,
                    titleEng: "XML short data",
                    titleUa: "XML компактний",
                    titleRu: "XML компактный",
                },
                {
                    id: 1.2,
                    titleEng: "XML for prom.ua",
                    titleUa: "XML для prom.ua",
                    titleRu: "XML для prom.ua",
                },
            ],
        },
        {
            id: 2,
            imgSrc: `${iconCSV}`,
            imgTitleEng: "Create CSV file",
            imgTitleUa: "Створити CSV файл",
            imgTitleRu: "Создать CSV файл",
            submenu: [
                {
                    id: 2.1,
                    titleEng: "CSV short data",
                    titleUa: "CSV компактний",
                    titleRu: "CSV компактный",
                },
                {
                    id: 2.2,
                    titleEng: "CSV for prom.ua",
                    titleUa: "CSV для prom.ua",
                    titleRu: "CSV для prom.ua",
                },
            ],
        },
    ];

    const handleClickOnSubmenu = (id, propsForInstruments) => {
        let { category } = propsForInstruments;
        let { site } = propsForInstruments;

        if (id === 1.1) {
            let xmlString = createXmlFile(data);
            downloadXmlFile(xmlString, category);
        }

        if (id === 2.1) {
            let csvString = createCsvFile(data);
            downloadCsvFile(csvString, category);
        }
    };

    return (
        <ul className="instruments-panel">
            {instruments.map(
                ({
                    id,
                    imgSrc,
                    imgTitleEng,
                    imgTitleUa,
                    imgTitleRu,
                    submenu,
                }) => {
                    return (
                        <li className="instruments-panel__element" key={id}>
                            <img
                                className="instruments-panel__logo"
                                src={imgSrc}
                                title={
                                    ((!language || language === "EN") &&
                                        imgTitleEng) ||
                                    (language === "UA" && imgTitleUa) ||
                                    (language === "RU" && imgTitleRu)
                                }
                                // eslint-disable-next-line
                                alt={
                                    ((!language || language === "EN") &&
                                        imgTitleEng) ||
                                    (language === "UA" && imgTitleUa) ||
                                    (language === "RU" && imgTitleRu)
                                }
                            />
                            <ul className="instruments-panel__submenu">
                                {submenu && submenu.length
                                    ? submenu.map(
                                          ({
                                              id,
                                              titleEng,
                                              titleUa,
                                              titleRu,
                                          }) => {
                                              return (
                                                  <li
                                                      className="instruments-panel__submenu-item"
                                                      key={id}
                                                      onClick={() =>
                                                          handleClickOnSubmenu(
                                                              id,
                                                              propsForInstruments
                                                          )
                                                      }
                                                  >
                                                      {((!language ||
                                                          language === "EN") &&
                                                          titleEng) ||
                                                          (language === "UA" &&
                                                              titleUa) ||
                                                          (language === "RU" &&
                                                              titleRu)}
                                                  </li>
                                              );
                                          }
                                      )
                                    : null}
                            </ul>
                        </li>
                    );
                }
            )}
        </ul>
    );
};
