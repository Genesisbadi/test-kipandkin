import { useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import tenantDetailsMain from "@/lib/preBuildScripts/static/tenantDetailsMain.json";

export default function FooterJuicer() {
  const { juicer_id, social_embed } = tenantDetailsMain;
  const router = useRouter();
  const SectionAccordion = dynamic(() =>
    import("@/components/partials/collapsibles/SectionAccordion")
  );

  useEffect(() => {
    if (social_embed) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(social_embed, "text/html");
      const scripts = doc.querySelectorAll("script");

      scripts.forEach((script) => {
        const newScript = document.createElement("script");
        if (script.src) {
          newScript.src = script.src;
        } else {
          newScript.textContent = script.textContent;
        }
        document.head.appendChild(newScript);
      });
    }
  }, [social_embed]);

  return (
    <>
      {router.asPath === "/" && (
        <SectionAccordion title={`Instagram`}>
          <section className="py-[30px]">
            <div className="container">
              {social_embed ? (
                <div dangerouslySetInnerHTML={{ __html: social_embed }} />
              ) : (
                juicer_id && (
                  <>
                    <h2 className="font-tenor text-center hidden md:block text-primary text-[25px] mb-[30px]">
                      {`Let's Get Social!`}
                    </h2>
                    <link
                      href="https://assets.juicer.io/embed.css"
                      media="all"
                      rel="stylesheet"
                      type="text/css"
                    />
                    <Script src="https://assets.juicer.io/embed.js" />
                    <div id="instafeed">
                      <ul
                        className="juicer-feed"
                        data-feed-id={juicer_id}
                        data-origin="embed-code"
                        data-filter="Instagram"
                        data-per="6"
                      ></ul>
                    </div>
                  </>
                )
              )}
            </div>
          </section>
        </SectionAccordion>
      )}
    </>
  );
}
