import React from 'react'
import PropTypes from "prop-types";

import NotesContainer from '../components/NotesContainer'

const ArchivedNote = ({notes, deleteHandler, archivedHandler}) => {
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

export default ArchivedNote

ArchivedNote.propTypes = {
  notes: PropTypes.array.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  archivedHandler: PropTypes.func.isRequired,
};