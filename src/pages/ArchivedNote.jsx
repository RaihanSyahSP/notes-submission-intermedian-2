import React from 'react'
import PropTypes from "prop-types";

import NotesContainer from '../components/NotesContainer'

const ArchivedNote = ({archivedNotes, deleteHandler, archivedHandler, unarchiveHandler}) => {
  return (
    <section>
        <NotesContainer
          notes={archivedNotes}
          deleteHandler={deleteHandler}
          archivedHandler={archivedHandler}
          unarchiveHandler={unarchiveHandler}
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