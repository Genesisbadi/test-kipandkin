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

        {process.env.NEXT_PUBLIC_TEMPLATE === "2" && (
          <link
            rel="preload"
            as="font"
            href="/fonts/Domine-Regular.woff"
            type="font/woff"
            crossOrigin="anonymous"
          />
        )}
      </Head>
      <body className="text-[#555555]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
