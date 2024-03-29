import faq_icon from "../../resources/images/faq.png";
import info_icon from "../../resources/images/info.png";

export const notifications = [
    {
        idMessage: 1,
        icon: faq_icon,
        alt_for_icon: "FAQ info",
        message_en:
            "At first you must check site for scraping in the top section of the App!",
        message_ua:
            "Спочатку виберіть сайт для парсингу у верхній частині програми!",
    },
    {
        idMessage: 2,
        icon: info_icon,
        alt_for_icon: "Info info",
        message_en: 'You have selected >> "site" << for scraping',
        message_ua: 'Ви вибрали >> "site" << для парсингу',
    },
    {
        idMessage: 3,
        icon: faq_icon,
        alt_for_icon: "FAQ info",
        message_en:
            "Our magic scripts getting all available goods from selected category. Wait for results, please ;)",
        message_ua:
            "Наші магічні скрипти отримують всі доступні товари з вибраної категорії. Зачекайте на результати, будь-ласка ;)",
    },
    {
        idMessage: 4,
        icon: faq_icon,
        alt_for_icon: "FAQ info",
        message_en:
            "And now you can select category you need to parse from available categories",
        message_ua:
            "Тепер Ви можете вибрати категорію із доступних для парсингу",
    },
    {
        idMessage: 5,
        icon: info_icon,
        alt_for_icon: "Info info",
        message_en: 'You have selected >> "category" << for scraping',
        message_ua: 'Ви вибрали >> "category" << для парсингу',
    },
    {
        idMessage: 6,
        icon: info_icon,
        alt_for_icon: "FAQ info",
        message_en:
            "And now you can download data to XML or CSV file. You can also start a new scraping",
        message_ua:
            "Наразі у Вас є змога завантажити дані в XML або ж CSV файл. Або розпочати новий парсинг",
    },
];
