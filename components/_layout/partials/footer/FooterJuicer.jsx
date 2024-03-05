import Script from "next/script";
import { useRouter } from "next/router";
export default function FooterJuicer({ ...props }) {
  const { juicer_id } = props;
  const router = useRouter();
  return (
    <>
      {router.asPath === "/" && (
        <section className="py-[30px]">
          <link
            href="https://assets.juicer.io/embed.css"
            media="all"
            rel="stylesheet"
            type="text/css"
          />
          <Script src="https://assets.juicer.io/embed.js" />
          <div className="container">
            <h2 className="text-center text-primary text-[25px] mb-[30px]">
              We’re Social
            </h2>
            <div id="instafeed">
              <ul
                className="juicer-feed"
                data-feed-id={juicer_id}
                data-origin="embed-code"
                data-filter="Instagram"
                data-per="6"
              ></ul>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
