import { useEffect, useState } from "react"
import { useSnackbar } from "notistack";
import { useSearchParams, Route, Routes } from "react-router-dom";

import Navbar from "./Navbar"
import { getUserLogged, putAccessToken } from "../utils/network-data";
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
    const [searchParams, setSearchParams] = useSearchParams();
    const [notes, setNotes] = useState([]);
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
  
    useEffect(() => {
      checkAuth();
    }, []);

  
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