import React from 'react'
import PropTypes from "prop-types";

import NotesInput from '../components/NotesInput'

const AddNote = ({onAddNotesHandler}) => {
  return (
    <NotesInput addNotes={onAddNotesHandler} />
  )
}

export default AddNote

AddNote.propTypes = {
  onAddNotesHandler: PropTypes.func.isRequired,
};