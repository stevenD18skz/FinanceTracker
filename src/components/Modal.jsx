import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="bg-smoke-light fixed inset-0 z-50 flex overflow-auto">
      <div className="relative m-auto flex w-full max-w-md flex-col rounded-lg bg-white p-8 shadow-lg">
        <span className="absolute right-0 top-0 p-4">
          <button
            onClick={onClose}
            className="text-gray-200 hover:text-gray-500"
          >
            <svg
              className="h-6 w-6 fill-current"
              role="button"
              viewBox="0 0 20 20"
            >
              <path d="M10 8.586l-4.95-4.95-1.414 1.414L8.586 10l-4.95 4.95 1.414 1.414L10 11.414l4.95 4.95 1.414-1.414L11.414 10l4.95-4.95-1.414-1.414L10 8.586z" />
            </svg>
          </button>
        </span>
        <h2 className="mb-4 text-2xl">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Modal;
