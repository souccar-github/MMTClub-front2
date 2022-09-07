import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'home-outline',
    link: '/app/home',
  },
  {
    title: 'Gift Request',
    link: '/app/setting/gift-request',
    icon: 'gift-outline'
  },
  {
    title: 'Complaints',
    link: '/app/setting/complaint',
    icon: 'message-circle-outline'
  },
  {
    title: 'Settings',
    icon: 'settings-outline',
    children: [
      {
        title: 'QR-Code',
        link: '/app/setting/qr-code',
      },
      {
        title: 'Category',
        link: '/app/setting/category',
      },
      {
        title: 'Products',
        link: '/app/setting/product',
      },
      {
        title: 'Level',
        link: '/app/setting/level',
      },
      
      {
        title: 'SocialMedia',
        link: '/app/setting/general-setting',
      },
    ],
  },
  {
    title: 'Auth',
    icon: 'lock-outline',
    children: [
      {
        title: 'Users',
        link: '/app/security/user',
      },
      {
        title: 'Roles',
        link: '/app/security/role',
      }
    ],
  },
  
];
