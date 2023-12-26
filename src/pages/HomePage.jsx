import React, { useEffect } from 'react'
import PropTypes from "prop-types";

import NotesContainer from '../components/NotesContainer'

const HomePage = ({ notes, deleteHandler, archivedHandler }) => {
  return (
    <section>
        <NotesContainer
          notes={notes}
          deleteHandler={deleteHandler}
          archivedHandler={archivedHandler}
        /> 
    </section>
  )
}

HomePage.propTypes = {
  notes: PropTypes.array.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  archivedHandler: PropTypes.func.isRequired,
};

export default HomePage