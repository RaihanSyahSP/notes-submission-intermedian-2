import React from 'react'

const LoginPage = () => {
  return (
    <section className="hero min-h-screen">
      <div className="hero-content flex-col space-x-16 lg:flex-row">
        <div className="card shrink-0 w-full lg:w-1/2 max-w-lg shadow-2xl bg-base-100">
          <form className="card-body">
            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text">Email</span>
              </label>
              <input type="email" placeholder="email" id="email" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
              </label>
              <input type="password" id="password" className="input input-bordered" required />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
            <label className="label">
              <a href="#" className="label-text-alt link link-hover underline-offset-2">
                Dont have any account,register here
              </a>
            </label>
          </form>
        </div>
        <div className="text-center lg:text-left lg:w-1/2 max-w-lg">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">Capture your thoughts and ideas effortlessly. Access, edit, and organize your notes from any device. Never miss an important detail, whether you are at home or on the go.</p>
        </div>
      </div>
    </section>
  );
}

export default LoginPage