import './globals.css';

export const metadata = {
  title: 'Resume Builder',
  description: 'A simple resume builder application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
