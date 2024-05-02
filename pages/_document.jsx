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
          rel="preconnect"
          href="https://haspcms-discovery-suites.s3.ap-southeast-1.amazonaws.com"
        />

        {process.env.NEXT_PUBLIC_TEMPLATE === "2" && (
          <link
            rel="preload"
            as="font"
            href="/fonts/Domine-Regular.woff"
            type="font/woff"
            crossOrigin="anonymous"
          />
        )}
        <style
          dangerouslySetInnerHTML={{
            __html: `@font-face {
            font-family: "Domine";
            font-weight: 400;
            src: url("/fonts/Domine-Regular.woff");
            font-display: swap;
          }
          @font-face {
            font-family: "Tenor";
            font-weight: 400;
            src: url("/fonts/TenorSans-Regular.woff");
            font-display: swap;
          }
          /* montserrat-regular - latin */
          @font-face {
            font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
            font-family: 'Montserrat';
            font-style: normal;
            font-weight: 400;
            src: url('/fonts/montserrat-regular.woff2') format('woff2'); /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
          }
          /* montserrat-italic - latin */
          @font-face {
            font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
            font-family: 'Montserrat';
            font-style: italic;
            font-weight: 400;
            src: url('/fonts/montserrat-v26-latin-italic.woff2') format('woff2'); /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
          }
          /* montserrat-700 - latin */
          @font-face {
            font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
            font-family: 'Montserrat';
            font-style: normal;
            font-weight: 700;
            src: url('/fonts/montserrat-v26-latin-700.woff2') format('woff2'); /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
          }
          /* montserrat-700italic - latin */
          @font-face {
            font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
            font-family: 'Montserrat';
            font-style: italic;
            font-weight: 700;
            src: url('/fonts/montserrat-v26-latin-700italic.woff2') format('woff2'); /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
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
