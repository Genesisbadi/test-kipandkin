import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import NProgress from "nprogress";
import blogCategoryTaxonomies from "@/lib/preBuildScripts/static/blog-categories.json";

export default function BlogBlock({ block }) {
  const blogCategories = blogCategoryTaxonomies.blogCategoryTaxonomies;
  const router = useRouter();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  const getArticles = async (page) => {
    setLoading(true);
    setHasPrevPage(false);
    setHasNextPage(false);

    try {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_TENANT_API +
          `/api/contents/blog/entries?page[size]=1&page[number]=${currentPage}&includes=blueprintData,mediaHandler`
      );
      setArticles(res.data);
      setLoading(false);

      if (res.data.links.prev) {
        setHasPrevPage(true);
      }

      if (res.data.links.next) {
        setHasNextPage(true);
      }
      // window.history.pushState({}, "", `?pager=${page}`);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setLoading(false);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    // Extract page number from query parameter in URL on initial load
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get("pager");
    const initialPage = parseInt(pageParam) || 1;
    setCurrentPage(initialPage);
  }, []);

  useEffect(() => {
    getArticles(currentPage);
  }, [currentPage]);

  function sampleFunc(e) {
    const route_url = e.target.getAttribute("route_url");
    if (route_url) {
      NProgress.start();
      router
        .push(route_url)
        .then(() => {
          NProgress.done();
        })
        .catch(() => {
          NProgress.done();
        });
    }
  }
  function truncateHTML(html, maxLength, linkUrl) {
    const tempDiv = document.createElement("div");

    tempDiv.innerHTML = html;

    let textContent = tempDiv.textContent || tempDiv.innerText || "";

    if (textContent.length > maxLength) {
      textContent =
        textContent.slice(0, maxLength).trim() +
        "..." +
        " <button class='text-primary read-more' route_url='" +
        linkUrl +
        "'>Read More</button>";

      const readMoreButton = document.querySelector(".read-more");
      if (readMoreButton) {
        readMoreButton.addEventListener("click", sampleFunc);
      }
    }

    return textContent;
  }

  useEffect(() => {
    truncateHTML();
  }, []);

  return (
    <section className="py-[30px]">
      <div className="container">
        <div className="flex">
          <div className="max-w-[70%] w-full px-[15px]">
            {loading ? (
              <>
                {Array.from({ length: 2 }, (_, index) => (
                  <div key={index} className="mb-[60px]">
                    <div className="h-6 max-w-[50%] bg-gray-300 animate-pulse mb-[15px]"></div>
                    <div className="min-h-[300px] bg-gray-300 animate-pulse mb-[30px]"></div>

                    <div className="h-[15px] bg-gray-300 animate-pulse mb-[10px]"></div>
                    <div className="h-[15px] bg-gray-300 animate-pulse mb-[10px]"></div>
                    <div className="h-[15px] bg-gray-300 animate-pulse mb-[30px]"></div>

                    <div className="h-[15px] bg-gray-300 animate-pulse max-w-[250px]"></div>
                  </div>
                ))}
              </>
            ) : (
              <div>
                {articles && articles.data.length > 0 ? (
                  <div>
                    {articles.data.map((item, index) => (
                      <div key={index}>
                        <h2 className="text-primary text-[25px] mb-[15px]">
                          <Link href={item.attributes.route_url}>
                            {item?.attributes?.title}
                          </Link>
                        </h2>

                        {item?.attributes?.data?.main?.featured_image && (
                          <Link href={item.attributes.route_url}>
                            <Image
                              src={item.attributes.data.main.featured_image}
                              className="w-full mb-[15px]"
                              width={500}
                              height={200}
                              alt={item?.attributes?.title}
                            />
                          </Link>
                        )}

                        {item?.attributes?.data?.main?.description && (
                          <>
                            <div>
                              <span className="text-[15px] mt-[15px]]">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: truncateHTML(
                                      item?.attributes?.data?.main?.description,
                                      100,
                                      item.attributes.route_url
                                    ),
                                  }}
                                />
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <>No results </>
                )}
                <div className="mx-[-5px] mt-[30px] flex flex-wrap">
                  {hasPrevPage && (
                    <div className="px-[5px]">
                      <button
                        className="text-primary hover:text-[#aaa] underline"
                        onClick={goToPreviousPage}
                      >
                        Previous Posts
                      </button>
                    </div>
                  )}
                  {hasNextPage && (
                    <div className="px-[5px]">
                      <button
                        className="text-primary hover:text-[#aaa] underline"
                        onClick={goToNextPage}
                      >
                        Next Posts
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="w-full max-w-[30%]">
            {blogCategories.taxonomyTerms &&
              blogCategories.taxonomyTerms.length > 0 && (
                <>
                  {blogCategories.taxonomyTerms.map((item, index) => (
                    <div key={index}>{item.name}</div>
                  ))}
                </>
              )}
          </div>
        </div>
      </div>
    </section>
  );
}
