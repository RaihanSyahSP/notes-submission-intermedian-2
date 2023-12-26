import React from 'react'
import PropTypes from "prop-types";

import NotesList from './NotesList';
import Message from './Message';
import { Link, useLocation } from 'react-router-dom';
import FloatingButton from './FloatingButton';

const NotesContainer = ({ notes, deleteHandler, archivedHandler }) => {
  const archivedNotes =  notes.filter((note) => note.archived);
  const unarchivedNotes = notes.filter((note) => !note.archived);
  const location = useLocation();

  return (
    <div className="grid grid-cols-1 gap-6 h-[100vh] px-4 lg:px-10">
      {location.pathname === "/" && (
        <div className="col-span-1 mt-24">
          <h2 className="text-3xl font-bold text-center md:text-5xl">All Notes</h2>
          <Link to="/add">
            <FloatingButton/>
          </Link>
          {
            unarchivedNotes.length > 0 ? (
              <NotesList notes={unarchivedNotes} deleteHandler={deleteHandler} archivedHandler={archivedHandler} />
            ) : (
              <Message title="There is no one note" />
            )
          }  
        </div>
      )}

      {location.pathname === "/archived" && (
        <div className="col-span-1 mt-24">
          <h2 className='text-3xl font-bold text-center md:text-5xl'>Archived Notes</h2>
          {archivedNotes.length > 0 ? (
            <NotesList notes={archivedNotes} deleteHandler={deleteHandler} archivedHandler={archivedHandler} />
          ) : (
            <Message title="There is no archived notes" />
          )}
        </div>
      )}
    </div>
  );
}

export default NotesContainer

NotesContainer.propTypes = {
  notes: PropTypes.array.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  archivedHandler: PropTypes.func.isRequired,
};
