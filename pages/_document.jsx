import { Html, Head, Main, NextScript } from "next/document";

import globalState from "@/lib/store/globalState";

export default function Document() {
  return (
    <Html lang="en">
      <Head></Head>
      <body className="text-[#555555]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
