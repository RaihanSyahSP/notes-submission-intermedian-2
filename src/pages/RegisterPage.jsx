import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import useInput from '../customHooks/useInput';
import { register } from '../utils/network-data';



const RegisterPage = () => {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();

    const [name, onNameChange] = useInput('')
    const [email, onEmailChange] = useInput('')
    const [password, onPasswordChange] = useInput('')
    const [passwordConfirmation, onPasswordConfirmationChange] = useInput('')
    const [isPassCorrect, setIsPassCorrect] = useState(true)

    
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (password !== passwordConfirmation) {
               setIsPassCorrect(false);
               return;
            }
            
            const { error, res } = await register({ name, email, password });
            
            if (!error) {
                enqueueSnackbar(res.message, { variant: "success" });
                navigate('/login')
            } else {
                enqueueSnackbar(res.message, { variant: "error" });
            }
        }
        catch (error) {
            enqueueSnackbar(error.message, { variant: "error" });
        }
    }

  return (
    <section className="hero min-h-screen">
      <div className="hero-content flex-col space-x-16 lg:flex-row">
        <div className="card shrink-0 w-full lg:w-1/2 max-w-lg shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label" htmlFor="name">
                <span className="label-text">Name</span>
              </label>
              <input type="text" value={name} placeholder="name" id="name" className="input input-bordered" onChange={onNameChange} required />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text">Email</span>
              </label>
              <input type="email" value={email} placeholder="email" id="email" className="input input-bordered" onChange={onEmailChange} required />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
              </label>
              <input type="password" value={password} id="password" className="input input-bordered" onChange={onPasswordChange} required />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="password-confirmation">
                <span className="label-text">Confirmation Password</span>
              </label>
              <input type="password" value={passwordConfirmation} id="password-confirmation" className="input input-bordered" onChange={onPasswordConfirmationChange} required />
              {!isPassCorrect && <p className="text-error mt-1">Password and Confirmation Password must match</p>}
            </div>
            <label className="label">
              <a href="/login" className="label-text-alt link link-hover">
                Back to Login
              </a>
            </label>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
        <div className="text-center lg:text-left lg:w-1/2 max-w-lg">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">Capture your thoughts and ideas effortlessly. Access, edit, and organize your notes from any device. Never miss an important detail, whether you are at home or on the go.</p>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage