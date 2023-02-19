import { PlusCircleIcon, BookOpenIcon } from "@heroicons/react/solid";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import  * as Yup  from 'yup';
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCategoryDetailAction, updateCategoryAction, deleteCategoryAction } from './../../redux/slices/categories/categorySlice';
import React from 'react';

//Form schema
const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
});

const UpdateCategory = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  //fetch single category
  useEffect(() => {
    console.log('running')
    dispatch(getCategoryDetailAction(id));
  }, [])

  const state = useSelector(state => state?.category);
  const { loading, appError, serverError, selectedCategory, deletedCategory, isEdited, isDeleted } = state;
  
  //formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: selectedCategory?.title,
    },
    onSubmit: values => {
      //build data for update

      //dispath the action
      dispatch(updateCategoryAction({title: values.title, id}));
      formik.resetForm({ values: values.title});
    },
    validationSchema: formSchema,
  });
  // const user = useSelector(state => state?.users);
  // const  isAdmin  = user?.userAuth?.data?.isAdmin;
  // if (!isAdmin) return <h1 className='text-red-600'>You are not authorized</h1>
  if (isEdited || isDeleted) return <Navigate to='/category-list' />;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <BookOpenIcon className="mx-auto h-12 w-auto" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Update Category
          </h2>
          <div className="mt-2 text-center text-sm text-gray-600">
            <p className="font-medium text-indigo-600 hover:text-indigo-500">
              Select a single post category to update
            </p>
            {/* Display Errors */}
            <div className="text-red-500">
              {appError || serverError ? <h3>{appError}</h3> : null}
            </div>
          </div>
        </div>
        {/* Form */}
        <form onSubmit = {formik.handleSubmit} className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Name
              </label>
              {/* Title */}
              <input
                value={formik.values.title}
                onChange={formik.handleChange('title')}
                onBlur={formik.handleBlur('title')}
                type="text"
                autoComplete="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-center focus:z-10 sm:text-sm"
                placeholder="Enter an existing category"
              />
              <div className="text-red-400 mb-2">
                {formik.touched.title && formik.errors.title}
              </div>
            </div>
          </div>

          <div>
            <div>
              {/* Submit */}
              {loading ? (
                <button
                disabled
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <PlusCircleIcon
                    className="h-5 w-5 text-yellow-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Loading...
              </button>
              ) : (
                <>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white 
                   bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <PlusCircleIcon
                        className="h-5 w-5 text-yellow-500 group-hover:text-indigo-400"
                        aria-hidden="true"
                      />
                    </span>
                    Update Category Name 
                  </button>

                  <button
                    onClick={() => dispatch(deleteCategoryAction(id))}
                    type="submit"
                    className="group relative mt-2 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white 
                   bg-red-600 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Delete Category {!selectedCategory && <h6>You have successfullly deleted</h6>}
                  </button>
                </>
                
              ) 
                }
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
