import Link from "next/link";
import { Montserrat } from "next/font/google";
import Head from "next/head";

// If loading a variable font, you don't need to specify the font weight
const montserrat = Montserrat({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
});

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page not Found</title>
      </Head>
      <div
        className={`bg-gray-100 flex p-[30px] lg:p-[50px] xl:p-[100px] bg-cover items-center text-white relative min-h-screen ${montserrat.className}`}
        style={{ backgroundImage: "url('/images/404.webp')" }}
      >
        <span className="absolute top-0 left-0 w-full h-full bg-[#000] opacity-50 z-0" />
        <div className="max-w-[1140px] w-full mx-auto relative">
          <svg
            version="1.1"
            width="100"
            height="100"
            x="0"
            y="0"
            viewBox="0 0 100 100"
          >
            <g>
              <path
                d="M50 98C23.533 98 2 76.467 2 50S23.533 2 50 2s48 21.533 48 48-21.533 48-48 48zm0-90C26.841 8 8 26.841 8 50s18.841 42 42 42 42-18.841 42-42S73.159 8 50 8zm22.342 62.684a3 3 0 0 0 1.342-4.025C73.404 66.1 66.663 53 50 53S26.596 66.1 26.316 66.658a2.994 2.994 0 0 0 1.332 4.012 3.008 3.008 0 0 0 4.028-1.315C31.893 68.932 37.13 59 50 59s18.107 9.932 18.316 10.342A2.995 2.995 0 0 0 71.003 71c.45 0 .908-.101 1.339-.316zM65 44c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6zm-30 0c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z"
                fill="#fff"
                opacity="1"
              ></path>
            </g>
          </svg>
          <h1
            className={`text-[clamp(38px,5vw,100px)] mt-[30px] leading-[101%] font-black text-white font-bold `}
          >
            Sorry, it seems we’ve taken a wrong turn.
          </h1>
          <div className="mt-[50px] lg:mt-[100px]">
            <p className="text-lg mb-8">{`Get your journey back on track.`}</p>
            <Link
              href="/"
              className="text-[14px] transition md:text-lg font-bold border border-white bg-[#fff] hover:bg-opacity-100 hover:text-primary bg-opacity-10 py-[15px] px-[15px] lg:px-[30px] rounded-[15px] inline-block"
            >
              Go back to homepage
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
