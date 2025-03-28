import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
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
        {process.env.NEXT_PUBLIC_MICROSITE_ID == 7 && (
          <link
            rel="preload"
            as="font"
            href="/fonts/Circular.woff"
            type="font/woff"
            crossOrigin="anonymous"
          />
        )}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @font-face {
              font-family: "Circular";
              src: url('/fonts/Circular.woff') format('woff2');
              font-weight: 400;
              font-style: normal; 
              font-display: swap; 
          } 
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
          @font-face {
            font-family: 'Effra';
            src: url('/fonts/Effra-BoldItalic.woff2') format('woff2');
            font-weight: bold;
            font-style: italic;
            font-display: swap;
          }

          @font-face {
            font-family: 'Effra';
            src: url('/fonts/Effra-Bold.woff2') format('woff2');
            font-weight: bold;
            font-style: normal;
            font-display: swap;
          }

          @font-face {
            font-family: 'Effra';
            src: url('/fonts/EffraHeavy-Regular.woff2') format('woff2');
            font-weight: 900;
            font-style: normal;
            font-display: swap;
          }

          
          @font-face {
            font-family: 'Effra';
            src: url('/fonts/EffraMedium-Regular.woff2') format('woff2');
            font-weight: 500;
            font-style: normal;
            font-display: swap;
          }

          @font-face {
            font-family: 'Effra';
            src: url('/fonts/Effra-Italic.woff2') format('woff2');
            font-weight: normal;
            font-style: italic;
            font-display: swap;
          }

          @font-face {
            font-family: 'Effra';
            src: url('/fonts/EffraLight-Regular.woff2') format('woff2');
            font-weight: 300;
            font-style: normal;
            font-display: swap;
          }

          @font-face {
            font-family: 'Effra';
            src: url('/fonts/EffraHeavy-Italic.woff2') format('woff2');
            font-weight: 900;
            font-style: italic;
            font-display: swap;
          }

          @font-face {
            font-family: 'Effra';
            src: url('/fonts/EffraMedium-Italic.woff2') format('woff2');
            font-weight: 500;
            font-style: italic;
            font-display: swap;
          }

          @font-face {
            font-family: 'Effra';
            src: url('/fonts/EffraLight-Italic.woff2') format('woff2');
            font-weight: 300;
            font-style: italic;
            font-display: swap;
          }

          @font-face {
            font-family: 'Effra';
            src: url('/fonts/Effra-Regular.woff2') format('woff2');
            font-weight: normal;
            font-style: normal;
            font-display: swap; 
          }
          `,
          }}
        />
      </Head>
      <body
        className={`text-[#555555] st-${process.env.NEXT_PUBLIC_TEMPLATE} site-id-${process.env.NEXT_PUBLIC_MICROSITE_ID}`}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
