import React from 'react'
import PropTypes from "prop-types";


const Message = ({title}) => {
  return (
    <div className="card w-full shadow-xl mt-10 bg-error">
      <div className="card-body p-5">
        <h2 className="card-title">{title}</h2>
      </div>
    </div>
  );
}

export default Message

Message.propTypes = {
  title: PropTypes.string,
};