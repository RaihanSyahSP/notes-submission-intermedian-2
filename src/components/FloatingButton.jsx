import React from "react";
import { IoMdAddCircle, IoMdTrash, IoMdArchive } from "react-icons/io";
import PropTypes from "prop-types";

const FloatingButton = ({ type, onClick }) => {
  let icon;
  let className;

  switch (type) {
    case "delete":
      icon = <IoMdTrash />;
      className = "text-error fixed left-4 bottom-4 z-10 ";
      break;
    case "archive":
      icon = <IoMdArchive />;
      className = "text-warning fixed right-4 bottom-4 z-10";
      break;
    default:
      icon = <IoMdAddCircle />;
      className = "text-secondary fixed right-4 bottom-4 z-10 ";
  }

  return (
    <button className={`btn btn-circle btn-lg rounded-full hover:scale-105 ${className}`} onClick={onClick}>
      <span className="text-6xl">{icon}</span>
    </button>
  );
};

export default FloatingButton;

FloatingButton.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
};