import { useFormik } from "formik";
import  * as Yup  from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { createPostAction } from "../../redux/slices/posts/postSlices";
import CategoryDropdown from "../Categories/CategoryDropdown";
import { Navigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import styled from 'styled-components';

//Form schema
const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.object().required("Category is required"),
  image: Yup.string().required('Image is required')
});

const Container = styled.div`
    flex:1;
    display:flex;
    flex-direction:column;
    align-items:center;
    padding:20px;
    border-width:2px;
    border-radius:2px;
    border-style:dashed;
    background-color:#fafafa;
    color:#bdbdbd;
      border-color:'red'
    transition:border .24s ease-in-out;
  `;

export default function CreatePost() {

  const dispatch = useDispatch();

  const post = useSelector(state => state?.post);
  const { isCreated, loading, appError, serverError} = post;

  //formik
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      image: ""
    },
    onSubmit: values => {
      const data = {
        category: values?.category?.value,
        title: values?.title,
        description: values?.description,
        image: values?.image
      }
      
      //dispath the action
      dispatch(createPostAction(data));
      formik.resetForm({ values: ''});
      
    },
    validationSchema: formSchema,
  });

  
  if (isCreated) return <Navigate to='/posts' />
  return (
    <>
      <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
            Create Post
          </h2>

          <div className="mt-2 text-center text-sm text-gray-600">
            <p className="font-medium text-green-600 hover:text-indigo-500">
              Share your ideas with us! Posts must conform to profanity rules described in guidelines
            </p>
          </div>
          {appError || serverError ? <div className="mt-2 text-center text-sm text-gray-600">
            <p className="font-medium text-red-600 hover:text-indigo-500">
              {`${appError} : ${serverError}`}
            </p>
          </div> : null}
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <div className="mt-1">
                  {/* Title */}
                  <input
                    value={formik.values.title}
                    onChange={formik.handleChange('title')}
                    onBlur={formik.handleBlur('title')}
                    id="title"
                    name="title"
                    type="title"
                    autoComplete="title"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                    placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                {/* Err msg */}
                <div className="text-red-500">
                  {formik?.touched?.title && formik?.errors?.title}
                </div>
              </div>
              <label
                  htmlFor="category-select"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Category
                </label>
                <CategoryDropdown 
                  name='category-select'
                  value={formik.values.category?.label}
                  onChange={formik.setFieldValue}
                  onBlur={formik.setFieldTouched}
                  error={formik.errors.category}
                  touched={formik.touched.category}
                  />
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Post Content
                </label>
                {/* Description */}
                <textarea
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange('description')}
                  onBlur={formik.handleBlur('description')}
                  rows="5"
                  cols="10"
                  className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
                  type="text"
                ></textarea>
                <Container className='container bg-gray-600 mt-4'>
                  <Dropzone
                   onBlur={formik.handleBlur('image')}
                   accept={{
                       'image/png': ['.png'],
                       'image/jpeg': ['.jpeg', '.jpg']
                     }} 
                    onDrop={acceptedFiles => {
                      formik.setFieldValue('image', acceptedFiles[0]);
                      document.getElementById('image-field').textContent=formik.values.image.path
                    }}>
                    {({getRootProps, getInputProps}) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                          <p className='text-blue-500 cursor-pointer' id='image-field'>{formik.values.image.path ? 
                          `${formik.values.image.path}` : 
                          'Drag and Drop or Click Here to Select Post image'}
                          </p>
                      </div>
                    </section>
                    )}
                  </Dropzone>
                </Container>
                {/* Err msg */}
                <div className="text-red-500">{formik.touched.description && formik.errors.description}</div>
              </div>
              <div>
                {/* Submit btn */}
                {loading ? (
                  <button
                  disabled
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-400"
                >
                  Loading...
                </button>
                ) : (
                  <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create
                </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

