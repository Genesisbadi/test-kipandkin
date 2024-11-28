import React, { useState, useRef, useEffect } from "react";
import ourCollectionSelections from "@/lib/preBuildScripts/static/ourCollectionSelections";
import Link from "next/link";
import { useRouter } from "next/router";

const OurCollectionSelection = ({ block, mediaHandler }) => {
  const router = useRouter();
  const currentPath = router.asPath;
  let collections = [];
  let selectionlinks = [];

  ourCollectionSelections?.items.map((item) => {
    if (
      item.filtered_dropdown &&
      router.asPath === item.link.attributes.route_url
    ) {
      collections = [];
      selectionlinks = [];
      ourCollectionSelections?.items.map((item) => {
        if (!item.hide_dropdown) {
          collections.push(item.link.attributes.name);
          selectionlinks.push(item.link.attributes.route_url);
        }
      });
    } else {
      collections.push(item.link.attributes.name);
      selectionlinks.push(item.link.attributes.route_url);
    }
  });

  // Set the default value based on currentPath
  const [selectedCollection, setSelectedCollection] = useState(
    collections.find(
      (collection, index) => selectionlinks[index] === currentPath
    ) || collections[0]
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [lastHoveredIndex, setLastHoveredIndex] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (collection) => {
    setSelectedCollection(collection);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleHover = (index) => {
    setLastHoveredIndex(index);
  };

  const handleScroll = (e) => {
    const dropdown = dropdownRef.current;

    if (dropdown && isHovered) {
      const isAtTop = dropdown.scrollTop === 0;
      const isAtBottom =
        dropdown.scrollHeight === dropdown.scrollTop + dropdown.clientHeight;

      if (isAtTop && e.deltaY < 0) {
        e.preventDefault();
      }
      if (isAtBottom && e.deltaY > 0) {
        e.preventDefault();
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("wheel", handleScroll, { passive: false });
    } else {
      document.removeEventListener("wheel", handleScroll);
    }

    return () => {
      document.removeEventListener("wheel", handleScroll);
    };
  }, [isDropdownOpen, isHovered]);

  return (
    <div className="bg-[#f1f1f1]">
      <div className="container flex flex-col pt-[40px]">
        <span className="text-center text-sm pb-3">{block?.main.title}</span>

        <div className="relative react-select">
          <div
            className="cursor-pointer border border-gray-300 rounded p-2 bg-white flex items-center justify-between"
            onClick={toggleDropdown}
          >
            {selectedCollection}
            <svg
              height="20"
              width="20"
              viewBox="0 0 20 20"
              aria-hidden="true"
              focusable="false"
              style={{
                fill: "currentColor",
                display: "inline-block",
              }}
            >
              <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
            </svg>
          </div>

          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute top-[100%] left-0 right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg z-10 max-h-[300px] overflow-y-auto"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {collections.map((collection, index) => {
                if (
                  collection !==
                  ourCollectionSelections.items[
                    ourCollectionSelections.items.length - 1
                  ].link.attributes.name
                ) {
                  return (
                    <Link
                      href={selectionlinks[index]}
                      key={index}
                      disabled={selectedCollection === collection}
                      className={`p-2 hover:bg-[#f1f1f1] w-full text-left react-select inline-block ${
                        selectedCollection === collection ? "opacity-[.3]" : ""
                      }`}
                      onClick={() => handleSelect(collection)}
                      onMouseEnter={() => handleHover(index)}
                      style={{
                        backgroundColor:
                          lastHoveredIndex === index ? "#f1f1f1" : "",
                      }}
                    >
                      {collection}{" "}
                    </Link>
                  );
                }
                return (
                  <>
                    {ourCollectionSelections.items[
                      ourCollectionSelections.items.length - 1
                    ].link.attributes.route_url !== currentPath && (
                      <Link
                        href={
                          ourCollectionSelections.items[
                            ourCollectionSelections.items.length - 1
                          ].link.attributes.route_url
                        }
                        key={index}
                        disabled={selectedCollection === collection}
                        className={`p-2 hover:bg-[#f1f1f1] w-full text-left react-select inline-block ${
                          selectedCollection === collection
                            ? "opacity-[.3]"
                            : ""
                        }`}
                        onClick={() => handleSelect(collection)}
                        onMouseEnter={() => handleHover(index)}
                        style={{
                          backgroundColor:
                            lastHoveredIndex === index ? "#f1f1f1" : "",
                        }}
                      >
                        {
                          ourCollectionSelections.items[
                            ourCollectionSelections.items.length - 1
                          ].link.attributes.name
                        }
                      </Link>
                    )}
                  </>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OurCollectionSelection;
