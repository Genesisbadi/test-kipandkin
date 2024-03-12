import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import NProgress from "nprogress";
import blogCategoryTaxonomies from "@/lib/preBuildScripts/static/blog-categories.json";

export default function BlogBlock({ block }) {
  const blogCategories = blogCategoryTaxonomies.blogCategoryTaxonomies;
  const [selectedCategory, setSelectedCategory] = useState("");
  const router = useRouter();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

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

  const truncateHTML = (html, maxLength, linkUrl) => {
    const tempDiv = document.createElement("div");

    tempDiv.innerHTML = html;

    let textContent = tempDiv.textContent || tempDiv.innerText || "";

    if (textContent.length > maxLength) {
      textContent =
        textContent.slice(0, maxLength).trim() +
        "..." +
        " <button class='text-primary underline hover:text-[#2c0b14] read-more' route_url='" +
        linkUrl +
        "'>Continue Reading</button>";
    }

    return textContent;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get("pager");
    const initialPage = parseInt(pageParam) || 1;
    setCurrentPage(initialPage);
  }, []);

  const filterByCategory = (e) => {
    console.log("clicked!");
    if (e?.target?.getAttribute("id")) {
      setSelectedCategory(e.target.getAttribute("id"));
      setCurrentPage(1);
      window.history.pushState(
        {},
        "",
        `?category=${e.target.getAttribute("id")}`
      );
    }
  };

  useEffect(() => {
    const readMore = () => {
      setTimeout(() => {
        const readMoreButtons = document.querySelectorAll(".read-more");

        if (readMoreButtons) {
          readMoreButtons.forEach((readMoreButton) => {
            readMoreButton.addEventListener("click", (e) => {
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
            });
          });
        }
      }, 300);
    };

    const getArticles = async (page) => {
      setLoading(true);
      setHasPrevPage(false);
      setHasNextPage(false);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      try {
        const res = await axios.get(
          process.env.NEXT_PUBLIC_TENANT_API +
            `/api/contents/blog/entries?page[size]=3&page[number]=${currentPage}&includes=blueprintData,mediaHandler&filter[taxonomies][blog-category]=${selectedCategory}`
        );
        setArticles(res.data);
        setLoading(false);

        if (res.data.links.prev) {
          setHasPrevPage(true);
        }

        if (res.data.links.next) {
          setHasNextPage(true);
        }

        if (res.status === 200) {
          readMore();
          filterByCategory();
        }
        // window.history.pushState({}, "", `?pager=${page}`);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setLoading(false);
      }
    };

    getArticles(currentPage);
    truncateHTML();
    filterByCategory();
  }, [currentPage, router, selectedCategory]);

  return (
    <section className="py-[30px] bg-[#F1F1F1]">
      <div className="container">
        <div className="flex mx-[-15px]">
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
                  <>
                    {articles.data.map((item, index) => {
                      const date = new Date(item?.attributes?.published_at);
                      const options = {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      };
                      const post_date = date.toLocaleDateString(
                        "en-US",
                        options
                      );

                      return (
                        <div className="mb-[60px]" key={index}>
                          <h2 className="text-primary text-[25px] mb-[30px]">
                            <Link
                              href={item.attributes.route_url}
                              className="hover:underline"
                            >
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
                                        item?.attributes?.data?.main
                                          ?.description,
                                        100,
                                        item.attributes.route_url
                                      ),
                                    }}
                                  />
                                </span>
                              </div>
                            </>
                          )}

                          {post_date && (
                            <time
                              className="text-[#aaa] text-[14px] mt-[20px] block mb-[10px]"
                              dateTime={post_date}
                            >
                              {post_date}
                            </time>
                          )}
                          <span className="h-[1px] w-[30px] bg-[#aaa] block"></span>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <>No results to show at the moment. Please try again later.</>
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
          <div className="w-full max-w-[30%] px-[15px]">
            {blogCategories.taxonomyTerms &&
              blogCategories.taxonomyTerms.length > 0 && (
                <div className="bg-[#E2E2E2] p-[50px]">
                  <ul className="pl-[15px]">
                    {blogCategories.taxonomyTerms.map((item, index) => (
                      <li
                        className={`cursor-pointer hover:text-primary mb-[15px] border-b-[#ccc] border-b-[1px] pb-[10px] text-[14px] ${
                          selectedCategory === item.id ? "font-bold" : ""
                        }`}
                        onClick={filterByCategory}
                        key={index}
                        id={item.id}
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        </div>
      </div>
    </section>
  );
}
