import React from "react";
import { useFormik } from "formik";
import { Navigate } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector} from 'react-redux';
import { loginUserAction } from "../../../redux/slices/users/userSlice";

//Form schema
const formSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {

    const dispatch = useDispatch();
  //formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: values => {
      //dispath the action
      dispatch(loginUserAction(values));
      formik.resetForm({ values: ''});
    },
    validationSchema: formSchema,
  });

  const store = useSelector(state => state?.users);
  const { userAuth, loading, serverError, appError} = store;

  if (userAuth) return <Navigate to='/profile' />;
  return (
    <>
      <section className="min-h-screen relative py-20 2xl:py-40 bg-gray-900 overflow-hidden">
        <div className="relative container px-4 mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center -mx-4">
              <div className="w-full lg:w-2/5 px-4">
                <div className="px-6 lg:px-12 py-12 lg:py-24 bg-white shadow-lg rounded-lg">
                  {/* Form */}
                  <form onSubmit={formik.handleSubmit}>
                    <h3 className="mb-10 text-2xl font-bold font-heading">
                      {/* Header */}
                      Login to your Account
                      {appError || serverError ? <div className="text-red-600">{appError}</div> : null}
                    </h3>
                    <div className="flex items-center pl-6 mb-3 border border-gray-400 bg-white rounded-full">
                      {/* Email */}
                      <input
                        value={formik.values.email}
                        onChange={formik.handleChange("email")}
                        onBlur={formik.handleBlur("email")}
                        className="w-full pr-6 pl-4 py-4 font-bold placeholder-gray-300 rounded-r-full "
                        type="email"
                        placeholder="enter email"
                      />
                    </div>
                    {/* Err message */}
                    <div className="text-red-400 mb-2">
                      {formik.touched.email && formik.errors.email}
                    </div>
                    <div className=" pl-6 mb-3 border border-gray-400 bg-white rounded-full ">
                      {/* Password */}
                      <input
                        value={formik.values.password}
                        onChange={formik.handleChange("password")}
                        onBlur={formik.handleBlur("password")}
                        className="w-full pr-6 pl-4 py-4 font-bold placeholder-gray-300 rounded-r-full "
                        type="password"
                        placeholder=" Password"
                      />
                    </div>
                    {/* Err msg */}
                    <div className="text-red-400 mb-2">
                      {formik.touched.password && formik.errors.password}
                    </div>
                    {/* Login btn */}
                    {loading ? (
                       <button
                      disabled
                      className="py-4 w-full bg-gray-500 text-white font-bold rounded-full transition duration-200"
                    >
                      Loading...
                    </button> 
                    ) : (
                        <button
                      type="submit"
                      className="py-4 w-full bg-blue-500 text-white font-bold rounded-full transition duration-200"
                    >
                      Login
                    </button> 
                    )
                }
                    
                  </form>
                </div>
              </div>
              <div className="w-full lg:w-3/5 px-4 mb-16 lg:mb-0 order-first lg:order-last">
                <h2 className="mb-10 text-center text-6xl lg:text-7xl text-gray-300 font-bold font-heading">
                  Login and start sharing your thoughts.
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;