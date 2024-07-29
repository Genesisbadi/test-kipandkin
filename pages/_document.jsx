import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html lang="en">
      <Head>
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
