import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

import * as action from '../../actions/creators';

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionData = useSelector((store) => store.authReducers.sessionData);
  const authAlert = useSelector((store) => store.authReducers.authAlert);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitHandler = (values) => {
    setIsSubmitting(true);
    action.doLogin(values, dispatch);
  };

  useEffect(() => {
    // sidebar - mini;
    if (authAlert.fire) {
      Swal.fire({
        title: authAlert.message,
        icon: 'error',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
      }).then(() => {
        action.setAlert(dispatch, '', false);
      });
      setIsSubmitting(false);
    }
    if (sessionData.loggedIn) {
      setIsSubmitting(true);
      Swal.fire({
        title: 'You are logged in, redirecting...',
        icon: 'success',
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        history.push('/');
      });
    }
    return () => {
      const body = document.getElementsByTagName('body');
      body[0].classList.remove('register-page');
      body[0].classList.add('sidebar-mini');
      action.redirect(dispatch);
      action.setAlert(dispatch);
    };
  }, [sessionData, dispatch, history, authAlert.fire, authAlert.message]);

  return (
    <div className="login-page" style={{ minHeight: 466 }}>
      <div className="login-box">
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <div className="h1">
              <b>Finance</b>App
            </div>
          </div>
          <div className="card-body">
            <p className="login-box-msg">Sign in to start your session</p>
            <Formik
              initialValues={{ email: '', password: '' }}
              validateOnMount
              onSubmit={submitHandler}
              validationSchema={Yup.object().shape({
                email: Yup.string().email().required('required'),
                password: Yup.string().required('required'),
              })}
            >
              {(props) => {
                const {
                  dirty,
                  isValid,
                  handleBlur,
                  values,
                  handleChange,
                  handleSubmit,
                  errors,
                  touched,
                } = props;
                return (
                  <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                      <input
                        id="email"
                        type="email"
                        name="email"
                        className={`form-control 
                        ${errors.email && touched.email ? 'is-invalid' : ''}
                        ${!errors.email && touched.email ? 'is-valid' : ''}
                        ${values.email !== '' && !errors.email ? 'is-valid' : ''}
                        ${values.email !== '' && errors.email ? 'is-invalid' : ''}
                        ${values.email !== '' && dirty && errors.email ? 'is-invalid' : ''}
                        `}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Email"
                        value={values.email}
                        required
                        autoComplete="off"
                      />
                      <div className="input-group-append">
                        <div className="input-group-text">
                          <span className="fas fa-envelope" />
                        </div>
                      </div>
                      <span id="exampleInputEmail1-error" className="error invalid-feedback">
                        {errors.email}
                      </span>
                    </div>
                    <div className="input-group mb-3">
                      <input
                        id="password"
                        type="password"
                        name="password"
                        className={`form-control 
                        ${errors.password && touched.password ? 'is-invalid' : ''}
                        ${!errors.password && touched.password ? 'is-valid' : ''}
                        ${values.password !== '' && !errors.password ? 'is-valid' : ''}
                        ${values.password !== '' && errors.password ? 'is-invalid' : ''}
                        ${values.password !== '' && dirty && errors.password ? 'is-invalid' : ''}
                        `}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Password"
                        value={values.password}
                        autoComplete="off"
                      />
                      <div className="input-group-append">
                        <div className="input-group-text">
                          <span className="fas fa-lock" />
                        </div>
                      </div>
                      <span id="exampleInputEmail1-error" className="error invalid-feedback">
                        {errors.password}
                      </span>
                    </div>
                    <div className="row">
                      <div className="col-8">
                        <div className="icheck-primary">
                          <label htmlFor="remember">
                            <input type="checkbox" id="remember" />
                            Remember Me
                          </label>
                        </div>
                      </div>
                      <div className="col-4">
                        <button
                          disabled={!isValid}
                          type="submit"
                          className="btn btn-primary btn-block"
                        >
                          Sign In
                        </button>
                      </div>
                    </div>
                  </form>
                );
              }}
            </Formik>
            <div className="social-auth-links text-center mt-2 mb-3">
              <Link to="/login" className="btn btn-block btn-primary">
                <i className="fab fa-facebook mr-2" /> Sign in using Facebook
              </Link>
              <Link to="/login" className="btn btn-block btn-danger">
                <i className="fab fa-google-plus mr-2" /> Sign in using Google+
              </Link>
            </div>

            <p className="mb-1">
              <Link to="/login">I forgot my password</Link>
            </p>
            <p className="mb-0">
              <Link to="/register" className="text-center">
                Register a new membership
              </Link>
            </p>
          </div>
          <div className={`overlay dark ${!isSubmitting ? 'd-none' : ''}`}>
            <i className={`fas fa-3x fa-sync-alt fa-spin ${authAlert.fire ? 'd-none' : ''}`} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
