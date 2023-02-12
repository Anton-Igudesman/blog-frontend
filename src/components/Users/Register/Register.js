import React from "react";
import { useFormik} from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { registerUserAction } from "../../../redux/slices/users/userSlice";
import { Navigate } from "react-router-dom";

//Form schema
const formSchema = Yup.object({
    firstname: Yup.string().required('First name is required'),
    lastname: Yup.string().required('Last name is required'),
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required')
})

//-------------------------------
//Register
//-------------------------------
const Register = () => {

    const dispatch = useDispatch();

    //formik
    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            password: ''
        },
        onSubmit:values => {
            //dispatch action
            dispatch(registerUserAction(values))
        },
        validationSchema: formSchema
    });

    //select state from store
    const storeData = useSelector(store => store?.users);
    const { loading, appError, serverError, registered} = storeData;
   console.log(registered)
   console.log(loading)

   //redirect
   if (registered) {
    return <Navigate to='/login' />
   }

  return (
    <section className="relative py-20 2xl:py-40 bg-gray-800 overflow-hidden">
      <div className="relative container px-4 mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center -mx-4">
            <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
              <div className="max-w-md">
                <span className="text-lg text-blue-400 font-bold">
                  Register Account
                </span>
                <h2 className="mt-8 mb-12 text-5xl font-bold font-heading text-white">
                  Create an account and start sharing your ideas with the rest of us!
                </h2>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4">
              <div className="px-6 lg:px-20 py-12 lg:py-24 bg-gray-600 rounded-lg">
                <form onSubmit={formik.handleSubmit}>
                  <h3 className="mb-10 text-2xl text-white font-bold font-heading">
                    Register Account
                    {appError || serverError ? <div className="text-red-600">{appError}</div> : null}
                  </h3>

                 
                  {/* First name */}
                  <div className="flex items-center pl-6 mb-3 bg-white rounded-full">
                    <input
                      value={formik.values.firstname}
                      onChange={formik.handleChange('firstname')}
                      onBlur={formik.handleBlur('firstname')}
                      className="w-full pl-4 pr-6 py-4 font-bold placeholder-gray-300 rounded-r-full focus:outline-none"
                      type="firstname"
                      placeholder="First Name"
                    />
                  </div>
                  
                  <div className="text-red-400 mb-2">
                    {formik.touched.firstname && formik.errors.firstname}
                  </div>
                  {/* Last name */}
                  <div className="flex items-center pl-6 mb-3 bg-white rounded-full">
                    <input
                      value={formik.values.lastname}
                      onChange={formik.handleChange('lastname')}
                      onBlur={formik.handleBlur('lastname')}
                      className="w-full pl-4 pr-6 py-4 font-bold placeholder-gray-300 rounded-r-full focus:outline-none"
                      type="lastname"
                      placeholder="Last Name"
                    />
                  </div>
                 
                  <div className="text-red-400 mb-2">
                    {formik.touched.lastname && formik.errors.lastname}
                  </div>
                  {/* Email */}
                  <div className="flex items-center pl-6 mb-3 bg-white rounded-full">
                    <input
                      value={formik.values.email}
                      onChange={formik.handleChange('email')}
                      onBlur={formik.handleBlur('email')}
                      className="w-full pl-4 pr-6 py-4 font-bold placeholder-gray-300 rounded-r-full focus:outline-none"
                      type="email"
                      placeholder="example@gmail.com"
                    />
                  </div>
                 
                  <div className="text-red-400 mb-2">
                    {formik.touched.email && formik.errors.email}
                  </div>
                  <div className="flex items-center pl-6 mb-3 bg-white rounded-full">
                    <input
                      value={formik.values.password}
                      onChange={formik.handleChange('password')}
                      onBlur={formik.handleBlur('password')}
                      className="w-full pl-4 pr-6 py-4 font-bold placeholder-gray-300 rounded-r-full focus:outline-none"
                      type="password"
                      placeholder="Password"
                    />
                  </div>
                  
                  <div className="text-red-400 mb-2">
                    {formik.touched.password && formik.errors.password}
                  </div>

                  <div className="inline-flex mb-10"></div>

                  {/* Check for Loading */}
                  {loading ? (
                    <button 
                        disabled 
                        className="py-4 w-full bg-gray-500 text-white font-bold rounded-full transition duration-200"
                        >
                            Loading - just a moment!!
                    </button>
                    ) : (
                    <button 
                        type="submit" 
                        className="py-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition duration-200"
                        >
                            Register
                    </button>
                    )}
                  
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;