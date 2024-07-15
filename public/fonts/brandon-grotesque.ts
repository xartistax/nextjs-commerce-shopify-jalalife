import localFont from 'next/font/local';

export const brandonGrotesque = localFont({
  src: [
    {
      path: 'brandon-grotesque-regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: 'brandon-grotesque-bold.woff2',
      weight: '700',
      style: 'normal'
    }
  ]
});
