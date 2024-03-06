import React, { useEffect, useRef } from "react";
import Image from "next/image";

const ModalImage = ({ isOpen, onClose, title, content }) => {
  const modalOverlayRef = useRef(null);

  const handleOverlayClick = (e) => {
    if (modalOverlayRef.current && modalOverlayRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOverlayClick);

    return () => {
      document.removeEventListener("mousedown", handleOverlayClick);
    };
  }, [onClose]);

  return (
    <>
      {isOpen && (
        <div
          ref={modalOverlayRef}
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-[99999] transition-opacity duration-700 ease-in-out opacity-100"
        >
          <span
            className="absolute top-[20px] right-[20px] cursor-pointer text-[30px] text-[#ccc] hover:text-white"
            onClick={onClose}
          >
            X
          </span>
          <div>
            <Image
              alt={title || "#"}
              src={content || "/images/Banner-Safe-Space-Desktop.jpg"}
              width={1920}
              height={1080}
              className="w-full h-full object-cover rounded-[3px]"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ModalImage;
