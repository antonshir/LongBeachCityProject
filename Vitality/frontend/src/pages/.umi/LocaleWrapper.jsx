


const baseNavigator = true;
const useLocalStorage = true;

import { LocaleProvider } from 'antd';
import moment from 'moment';
let defaultAntd = require('antd/lib/locale-provider/en_US');
defaultAntd = defaultAntd.default || defaultAntd;

const localeInfo = {
};

let appLocale = {
  locale: 'en-US',
  messages: {},
  data: require('react-intl/locale-data/en'),
  momentLocale: '',
};
if (useLocalStorage && localStorage.getItem('umi_locale') && localeInfo[localStorage.getItem('umi_locale')]) {
  appLocale = localeInfo[localStorage.getItem('umi_locale')];
} else if (localeInfo[navigator.language] && baseNavigator){
  appLocale = localeInfo[navigator.language];
} else {
  appLocale = localeInfo['en-US'] || appLocale;
}
window.g_lang = appLocale.locale;

export default function LocaleWrapper(props) {
  let ret = props.children;
  ret = (<LocaleProvider locale={appLocale.antd ? (appLocale.antd.default || appLocale.antd) : defaultAntd}>
    {ret}
  </LocaleProvider>);
  return ret;
}
