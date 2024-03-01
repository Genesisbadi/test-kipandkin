import globalData from "@/lib/preBuildScripts/static/globalData.json";
import Link from "next/link";

export default function FooterNewsletter() {
  const { tenantDetails } = globalData;

  return (
    <section className="footer-newsletter py-[40px]">
      <h2 className="text-center text-primary text-[25px] mb-[30px] mb-[15px]">
        Stay Updated
      </h2>

      <div className="container !max-w-[550px]">
        <p className="text-[#555] text-center">
          Enter your email address below to receive our newsletter
        </p>

        <form>
          <div className="flex flex-wrap items-center mt-[30px]">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full sm:w-[calc(100%-150px)] text-primary border-[1px] border-[#ced4da] px-[15px] py-[10px] mb-[15px] sm:mb-0 h-[60px]"
            />
            <button
              type="submit"
              className="w-full text-uppercase sm:w-[150px] text-primary border-primary border px-[15px] py-[15px] h-[60px] hover:bg-primary hover:text-[#fff] transition-all duration-300 ease-in-out"
            >
              Submit
            </button>
          </div>
          <div className="text-[#555] text-[12px] mt-[15px] relative">
            <input
              className="absolute inline-block top-[8px] left-0 overflow-hidden"
              type="checkbox"
              name="agree"
              id="agree"
            />
            <label
              htmlFor="agree"
              className="pl-[20px] block leading-4  select-none cursor-pointer"
            >
              I Agree to the {tenantDetails.name}{" "}
              <span>
                <Link className="text-primary" href="/terms-condition">
                  Terms and Conditions
                </Link>
              </span>{" "}
              and have read the{" "}
              <span>
                <Link className="text-primary" href="/privacy-policy">
                  Privacy Policy
                </Link>
              </span>
            </label>
          </div>
        </form>
      </div>
    </section>
  );
}
