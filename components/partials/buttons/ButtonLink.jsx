import { useState, useEffect } from "react";
import Link from "next/link";
import utilService from "@/lib/services/util";
import Image from "next/image";
export default function ButtonLink({ href, target, className, children }) {
  const [modal, setModal] = useState({
    open: false,
    src: "",
    type: "",
    title: "",
  });

  const imageExtensions = ["jpg", "jpeg", "png", "bmp", "webp"];

  const fileExtension = utilService.getFileExtension(href).toLowerCase();
  let fileType = "link";

  if (fileExtension === "pdf") {
    fileType = "file";
  } else if (imageExtensions.includes(fileExtension)) {
    fileType = "image";
  }

  const closeModal = () => {
    document.body.style.overflow = "auto";
    setModal({ open: false, src: "", type: "", title: "" });
  };

  if (fileType === "file" || fileType === "image") {
    return (
      <>
        <button
          className={className}
          onClick={() => {
            setModal({
              open: true,
              src: href,
              type: fileType,
              title: children,
            });
            document.body.style.overflow = "hidden";
          }}
        >
          {children}
        </button>
        {modal.open && <ModalComponent modal={modal} closeModal={closeModal} />}
      </>
    );
  }

  return (
    <Link href={href} className={className} target={target}>
      {children}
    </Link>
  );
}

const ModalComponent = ({ modal, closeModal }) => {
  const { open, src, type, title } = modal;

  if (open) {
    return (
      <div className="fixed z-[9000] inset-0 bg-black bg-opacity-50 flex items-center justify-center p-[15px]">
        <span
          onClick={closeModal}
          className="absolute top-0 left-0 w-full h-full z-[-1]"
        />
        <div className="[&::-webkit-scrollbar]:[width:8px] [&::-webkit-scrollbar]:[background:#ccc] [&::-webkit-scrollbar-thumb]:[borderRadius:8px] [&::-webkit-scrollbar-thumb]:bg-[#333] bg-white pt-[65px] p-[15px] relative min-h-[30vh] rounded-lg max-w-[1140px] w-full max-h-[calc(100vh-15px)] overflow-y-auto">
          <div className="absolute bg-white p-[15px] top-0 left-0 w-full z-[222] text-right">
            <button onClick={closeModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={35}
                height={35}
                color={"#000000"}
                fill={"none"}
              >
                <path
                  d="M14.9994 15L9 9M9.00064 15L15 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
          </div>
          {type === "image" ? (
            <div className="relative">
              <Image
                src={src}
                alt={title}
                width={600}
                height={600}
                className="w-full bg-[#f8f8f8] min-[300px] block relative z-[100]"
              />
            </div>
          ) : (
            <div className="relative">
              <iframe
                src={`https://docs.google.com/gview?url=${src}&embedded=true`}
                // src={`${src}#toolbar=0&navpanes=0&scrollbar=0`}
                width="1140"
                height="600"
                className="bg-transparent w-full"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
};
