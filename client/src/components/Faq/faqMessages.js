import faq_icon from '../../resources/images/faq.png';
import info_icon from '../../resources/images/info.png';

export const notifications = [
    {
        idMessage: 1,
        icon: faq_icon,
        alt_for_icon: 'FAQ info',
        message_en: 'At first you must check site for scraping in the top section of the App!',
        message_ua: 'Спочатку виберіть сайт для парсингу у верхній частині програми!',
        message_ru: 'Сначала выберите сайт для парсинга в верхней части программы!'
    },
    {
        idMessage: 2,
        icon: info_icon,
        alt_for_icon: 'Info info',
        message_en: 'You have selected >> "site" << for scraping',
        message_ua: 'Ви вибрали >> "site" << для парсингу',
        message_ru: 'Вы выбрали >> "site" << для парсинга'
    },
    {
        idMessage: 3,
        icon: faq_icon,
        alt_for_icon: 'FAQ info',
        message_en:
            'Our magic scripts getting all available goods from selected category. Wait for results, please ;)',
        message_ua:
            'Наші магічні скрипти отримують всі доступні товари з вибраної категорії. Зачекайте на результати, будь-ласка ;)',
        message_ru:
            'Наши магические скрипты получают все доступные товары с выбранной категории. Ожидайте на результаты, пожалуйста ;)'
    },
    {
        idMessage: 4,
        icon: faq_icon,
        alt_for_icon: 'FAQ info',
        message_en:
            'And now you can select category you need to parse from available categories',
        message_ua: 'Тепер Ви можете вибрати категорію із доступних для парсингу',
        message_ru: 'Теперь Вы можете выбрать категорию из доступных для парсинга'
    },
    {
        idMessage: 5,
        icon: info_icon,
        alt_for_icon: 'Info info',
        message_en: 'You have selected >> "category" << for scraping',
        message_ua: 'Ви вибрали >> "category" << для парсингу',
        message_ru: 'Вы выбрали >> "category" << для парсинга'
    },
    {
        idMessage: 6,
        icon: info_icon,
        alt_for_icon: 'FAQ info',
        message_en:
            'And now you can download data to XML or CSV file. You can also start a new scraping',
        message_ua:
            'Наразі у Вас є змога завантажити дані в XML або ж CSV файл. Або розпочати новий парсинг',
        message_ru:
            'Сейчас у Вас есть возможность скачать данные в XML или CSV файл. Или начать новый парсинг'
    }
];
