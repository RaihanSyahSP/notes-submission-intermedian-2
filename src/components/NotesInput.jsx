import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";


const NotesInput = ({ addNotes }) => {
	const bodyRef = useRef(null);
	const history = useNavigate();
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [limitInputChar, setLimitInputChar] = useState(50);
	const { enqueueSnackbar } = useSnackbar();

    const onTitleChangeHandler = (e) => {
        const newTitle = e.target.value;
        if (newTitle.length <= 50) {
          setTitle(newTitle);
          const remainingChars = 50 - newTitle.length;
          setLimitInputChar(remainingChars);
        } else {
          const trimmedTitle = newTitle.slice(0, 50);
          setTitle(trimmedTitle);
          setLimitInputChar(0);
        }
    }

    const onBodyChangeHandler = (e) => {
			setBody(bodyRef.current.innerHTML);
    }

	const onFormSubmitHandler =  async (e) => {
		e.preventDefault();
		try {
			await addNotes({
				title,
				body,
				createdAt: new Date().toISOString(),
				archived: false
			})
			enqueueSnackbar("Note added successfully", { variant: "success" });
			setTitle("");
			setBody("");
			setLimitInputChar(50);
			history("/");
		} catch(error) {
			console.log(error);
			enqueueSnackbar("Something goes wrong!", { variant: "error" });
		}
	}

  return (
    <div className="flex max-w-screen mx-auto gap-8 px-5 items-center justify-between h-screen xl:px-24">
        <div className="hidden w-[45opx] px-10 md:block">
            <img src="../public/write.svg" width="450px"></img>  
        </div>
				<aside className="flex flex-col font-semibold w-full mx-auto items-center max-h-96 lg:w-[450px] ">
					<h1 className="text-2xl font-bold lg:text-5xl">Add Note</h1>
						<form className="form-control w-full max-w-lg" onSubmit={onFormSubmitHandler} >
							<label className="label" htmlFor="title">
								<span className="label-text text-xl lg:text-2xl">Title</span>
								<span className="label-text-alt">Characters left : { limitInputChar }</span>
							</label>
							<input 
								type="text" 
								placeholder="Type here" 
								id="title" 
								value={title}
								onChange={onTitleChangeHandler}
								className="input input-bordered input-secondary w-full max-w-lg rounded-2xl" 
								required
							/>
								<label className="label">
									{
										limitInputChar === 0 && (
											<span className="label-text-alt text-red-500">Characters limit exceeded</span>
										)
									}
								</label> 

								<label className="label" htmlFor="notes">
									<span className="label-text text-xl lg:text-2xl">Note</span>
								</label>
								<div 
									className="textarea textarea-bordered textarea-secondary min-h-fit rounded-2xl font-normal" 
									id="notes" 
									data-placeholder="Type notes here"
									value={body}
									ref={bodyRef}
									onInput={onBodyChangeHandler}  
									contentEditable
								>             
								</div>
								<button className="btn btn-secondary mt-5" type="submit">Add</button>
						</form>
				</aside>  
		</div>
  );
}

export default NotesInput

NotesInput.propTypes = {
	addNotes: PropTypes.func.isRequired,
};