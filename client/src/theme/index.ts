import { ThemeConfig } from 'antd/es/config-provider/context';

const colorPrimary = '#006666';
const colorSecondary = '#66b2b2';

export const theme: ThemeConfig = {
  components: {
    Button: {
      borderRadius: 8,
    },
    Typography: {
      colorTextHeading: '#131317'
    },
    Menu: {
      colorBgBase: '#09173B',
      colorSubItemBg: '#09173B'
    },
    Checkbox: {},
    Notification: {
      colorBgBase: '#3A4562',
      colorTextBase: '#fff'
    },
    Pagination: {
      borderRadius: 4,
      // colorText: '#f37f13'
      colorBgBase: '#f37f13',
      colorTextDisabled: '#8C8C92',
      colorTextBase: 'black',
      colorIcon: 'red',
      colorBorder: '#f37f13'
    },
    Tabs: {
      colorText: colorPrimary,
      colorBorder: '#F7F7F7'
    },

    Input: {
      borderRadius: 4,
      colorBorder: '#EAEAEA',
    }

  },
  token: {
    colorPrimary: colorPrimary,
    colorBorderSecondary: colorSecondary,
    colorTextDisabled: 'black',
  }
};
