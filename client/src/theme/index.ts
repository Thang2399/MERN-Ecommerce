import { ThemeConfig } from 'antd/es/config-provider/context';

const colorPrimary = '#27374D';
const colorSecondary = '#526D82';
const colorDark = '#9DB2BF';
const colorLight = '#DDE6ED';

export const theme: ThemeConfig = {
  components: {
    Button: {
      borderRadius: 8,
    },
    Typography: {
      colorTextHeading: colorPrimary
    },
    Menu: {
      colorBgBase: colorPrimary,
      colorBgContainer: colorLight,
      colorTextBase: 'white',
      colorTextLabel: 'white',
      colorSubItemBg: '#09173B',
      borderRadius: 8,
    },
    Checkbox: {},
    Notification: {
      colorBgBase: colorPrimary,
      colorTextBase: '#fff'
    },
    Pagination: {
      borderRadius: 4,
      // colorText: '#f37f13'
      colorBgBase: colorPrimary,
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
    },
    Tooltip: {
      colorBgBase: '#526D82',
    }

  },
  token: {
    colorPrimary: colorPrimary,
    colorBorderSecondary: colorSecondary,
    colorTextDisabled: 'black',
  }
};
