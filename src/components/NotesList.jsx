import React from 'react'
import parser from 'html-react-parser'
import PropTypes from "prop-types";

import NotesItem from './NotesItem'


const NotesList = ({ notes, deleteHandler, archivedHandler }) => {
    return (
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        {notes.map(note => (
          <NotesItem
            key={note.id}
            id={note.id}
            title={note.title}
            body={parser(note.body)}
            createdAt={note.createdAt}
            archived={note.archived}
            deleteHandler={deleteHandler}
            archivedHandler={archivedHandler}
          />
        ))}                            
      </div>
  )
}

export default NotesList

NotesList.propTypes = {
  notes: PropTypes.array.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  archivedHandler: PropTypes.func.isRequired,
};