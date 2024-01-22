/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useSnackbar } from "notistack";
import { useSearchParams, Route, Routes } from "react-router-dom";

import Navbar from "./Navbar"
import {
  getUserLogged,
  putAccessToken,
  getActiveNotes,
  addNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
  getArchivedNotes
} from "../utils/network-data";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import AddNote from "../pages/AddNote";
import ArchivedNote from "../pages/ArchivedNote";
import NoteDetailPage from "../pages/NoteDetail";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";

const NotesApp = () => {
    const [authUser, setAuthUser] = useState(null)
    const [initialNotes, setInitialNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [notes, setNotes] = useState([]);
    const [archivedNotes, setArchivedNotes] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");

    const changeSearchParams = (search) => {
      setSearchParams({ keyword: search });
      setKeyword(search);
    };
    
    const onLoginSuccess = async ({ accessToken }) => {
      putAccessToken(accessToken)
      
      const { data } = await getUserLogged()

      setAuthUser(data)
    }
  
    const onLogoutHandler = () => {
      localStorage.removeItem("accessToken");
      setAuthUser(null);
    }
  
    const checkAuth = async () => {
      const storedToken = localStorage.getItem("accessToken");

      if (storedToken) {
        try {
          const { data } = await getUserLogged();
          setAuthUser(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
       setLoading(false);
    };
  
    const getActiveNotesHandler = async () => {
      try {
        const { data } = await getActiveNotes();
        setNotes(data);
        setInitialNotes(data);
      } catch (error) {
        enqueueSnackbar("Error fetching notes", { variant: "error" });
      }
    };
    
    const getArchivedNotesHandler = async () => {
      try {
        const { data } = await getArchivedNotes();
        setArchivedNotes(data);
        // setInitialNotes(data);
      } catch (error) {
        enqueueSnackbar("Error fetching archived notes", { variant: "error" });
      }
    };


    const onAddNotesHandler = async ({ title, body, createdAt, archived }) => {
      const newNote = {
        id: +new Date(),
        title,
        body,
        createdAt,
        archived,
      };

      await addNote(newNote)
    };

    const onDeleteNoteHandler = async (id) => {  
      try {
        await deleteNote(id)
        enqueueSnackbar("Note deleted successfully", { variant: "success" });
      } catch {
        enqueueSnackbar("Error deleting note", { variant: "error" });
      }
    };

    const onArchivedNoteHandler = async (id) => {
      try {
        await archiveNote(id)
        enqueueSnackbar("Note archived successfully", { variant: "success" });
      } catch (error) {
          enqueueSnackbar("Error archiving note", { variant: "error" });
      } 
    };
  

    const unarchiveNoteHandler = async (id) => {
      try {
        await unarchiveNote(id);
        enqueueSnackbar("Note unarchived successfully", { variant: "success" });
      } catch (error) {
        enqueueSnackbar("Error unarchived note", { variant: "error" });
      } 
    }

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
  
    useEffect(() => {
      checkAuth();
      getActiveNotesHandler();
      getArchivedNotesHandler();
    }, []);
  
  useEffect(() => {
    getArchivedNotesHandler();
    getActiveNotesHandler();
  }, [notes]);
    
     if (loading) {
       return <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 loading loading-spinner loading-lg"></span>;
     }

  
  if (authUser === null) {
   return (
        <div>
          <main>
            <Routes>
              <Route path="/*" element={<LoginPage loginSuccess={onLoginSuccess} />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </main>
      </div>
    );
  }
    

  return (
    <div className="mx-auto h-screen">
      <header>
        <Navbar
          onSearch={(search) => onSearchHandler(search)}
          keyword={keyword}
          logout={onLogoutHandler}
          name={authUser.name}
        />
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
              archivedNotes={archivedNotes}
              archivedHandler={onArchivedNoteHandler}
              deleteHandler={onDeleteNoteHandler}
              unarchiveHandler={unarchiveNoteHandler}
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