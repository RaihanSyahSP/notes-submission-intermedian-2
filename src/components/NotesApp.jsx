import { useEffect, useState } from "react"
import { useSnackbar } from "notistack";
import { useSearchParams } from "react-router-dom";

import Navbar from "./Navbar"
import ErrorPage from "../pages/ErrorPage";
import { getInitialData } from "../utils/data"
import HomePage from "../pages/HomePage";
import { Route, Routes } from "react-router-dom";
import AddNote from "../pages/AddNote";
import ArchivedNote from "../pages/ArchivedNote";
import NoteDetailPage from "../pages/NoteDetail";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";

const NotesApp = () => {
    const [initialNotes, setInitialNotes] = useState(getInitialData());
    const [searchParams, setSearchParams] = useSearchParams();
    const [notes, setNotes] = useState(initialNotes);
    const { enqueueSnackbar } = useSnackbar();
    const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");

    const changeSearchParams = (search) => {
      setSearchParams({ keyword: search });
      setKeyword(search);
    };

    const onAddNotesHandler = ({ title, body, createdAt, archived }) => {
      const newNote = {
        id: +new Date(),
        title,
        body,
        createdAt,
        archived,
      };

      setNotes((prevState) => [...prevState, newNote]);
      setInitialNotes((prevInitialNotes) => [...prevInitialNotes, newNote]);
    };

    const onDeleteNoteHandler = (id) => {  
      setNotes((prevState) => prevState.filter((note) => note.id !== id));
      setInitialNotes((prevInitialNotes) => prevInitialNotes.filter((note) => note.id !== id));
      enqueueSnackbar("Note deleted successfully", { variant: "success" });
    };

    const onArchivedNoteHandler = (id) => {
      setNotes((prevState) => {
        return prevState.map((note) => {
          if (note.id === id) {
            return {
              ...note,
              archived: !note.archived,
            };
          }
          return note;
        });
      });

      setInitialNotes((prevState) => {
        return prevState.map((note) => {
          if (note.id === id) {
            return {
              ...note,
              archived: !note.archived,
            };
          }
          return note;
        });
      });
      enqueueSnackbar("Note archived successfully", { variant: "success" });
    };

    const onSearchHandler = (search) => {
      if (search === "") {
        setNotes(initialNotes);
      } else {
        const filteredNotes = initialNotes.filter((note) => note.title.toLowerCase().includes(search.toLowerCase()));
        setNotes(filteredNotes);
      }
      changeSearchParams(search);
    };
  
   useEffect(() => {
     setKeyword(searchParams.get("keyword") || ""); 
     const initialKeyword = searchParams.get("keyword") || "";
     if (initialKeyword) {
       const filteredNotes = initialNotes.filter((note) => note.title.toLowerCase().includes(initialKeyword.toLowerCase()));
       setNotes(filteredNotes);
     } else {
       setNotes(initialNotes);
     }
   }, [searchParams, initialNotes]);
    

  return (
    <div className="mx-auto h-screen">
      <header>
        <Navbar onSearch={(search) => onSearchHandler(search)} keyword={keyword} />
      </header>

      <main className="max-w-7xl mx-auto">
        <Routes>
          <Route path="/" element={
            <HomePage
              notes={notes}
              deleteHandler={onDeleteNoteHandler}
              archivedHandler={onArchivedNoteHandler}
            />}
          />
          <Route path= "/login" element={<LoginPage/>} />
          <Route path= "/register" element={<RegisterPage/>} />
          <Route path="/add" element={<AddNote onAddNotesHandler={onAddNotesHandler} />} />
          <Route path="/archived" element={
            <ArchivedNote
              notes={notes}
              archivedHandler={onArchivedNoteHandler}
              deleteHandler={onDeleteNoteHandler}
            />}
          />
          <Route path="/note/:id" element={
            <NoteDetailPage
              notes={notes}
            />}
          />
           <Route path='*' element={<ErrorPage/>} />
        </Routes>
      </main>
    </div>
  );
}

export default NotesApp