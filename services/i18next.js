import 'intl-pluralrules/polyfill'

import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from '../locals/en.json';
import fr from '../locals/fr.json';
import es from '../locals/es.json';
import de from '../locals/de.json';
import ar from '../locals/ar.json';
export const languageResourcses = {
    en:{translation:en},
    fr:{translation:fr},
    es:{translation:es},
    de:{translation:de},
    ar:{translation:ar},
};
i18next.use(initReactI18next).init({
    compatibilityJson: 'v3',
    lng:'en',
    fallbackLng:'en',
    resources:languageResourcses,
});
export default i18next;