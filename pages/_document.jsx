import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="application-name" content="PWA App" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PWA App" />
        <meta name="description" content="Best PWA App in the world" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />

        <link
          rel="apple-touch-icon"
          sizes="192x192"
          href="/icons/icon-192x192.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="512x512"
          href="/icons/icon-512x512.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="mask-icon"
          href="/icons/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <link rel="shortcut icon" href="/favicon.ico" />

        <link
          rel="preload"
          as="font"
          href="/fonts/TenorSans-Regular.woff"
          type="font/woff"
          crossOrigin="anonymous"
        />

        <link
          rel="preload"
          as="font"
          href="/fonts/Gotham-Book.woff2"
          type="font/woff"
          crossOrigin="anonymous"
        />

        <style
          dangerouslySetInnerHTML={{
            __html: `
          @font-face {
            font-family: "Tenor";
            font-weight: 400;
            src: url("/fonts/TenorSans-Regular.woff");
            font-display: swap;
          }
          @font-face {
            font-display: swap; 
            font-family: 'Gotham';
            font-weight: 400;
            src: url('/fonts/Gotham-Book.woff2') format('woff2');
          }
          @font-face {
            font-display: swap; 
            font-family: 'Gotham';
            font-weight: 400;
            font-style: italic; 
            src: url('/fonts/Gotham-BookItalic.woff2') format('woff2');
          }
          @font-face {
            font-display: swap; 
            font-family: 'Gotham';
            font-weight: 700;
            src: url('/fonts/Gotham-Medium.woff2') format('woff2');
          }
          @font-face {
            font-display: swap; 
            font-family: 'Gotham';
            font-weight: 700;
            font-style: italic; 
            src: url('/fonts/Gotham-MediumItalic.woff2') format('woff2');
          }
          `,
          }}
        />
      </Head>
      <body className={`text-[#555555] st-${process.env.NEXT_PUBLIC_TEMPLATE}`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
