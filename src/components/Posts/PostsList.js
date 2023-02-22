import { ThumbUpIcon, EyeIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPostsAction, toggleAddLikesAction } from "../../redux/slices/posts/postSlices";
import DateFormatter from "../../utilities/dateFormatter";
import { fetchCategoryAction } from "../../redux/slices/categories/categorySlice";
import LoadingComponent from "../../utilities/LoadingComponent";



export default function PostsList() {
  const [count, setCount] = useState(0)
  let catEvent;
  const post = useSelector(state => state?.post);
  const { postList, likes, loading, appError, serverError } = post;
  function eventCapture(event) {
    catEvent = event.target.textContent;
    setCount(count + 1)
    console.log('inside function catEvent', catEvent)
  }
  const dispatch = useDispatch();
  console.log('outside function:', catEvent)

  useEffect(() => {
    dispatch(fetchAllPostsAction());
  }, [dispatch, likes]);

  useEffect(() => {
    dispatch(fetchCategoryAction());
  }, [dispatch]);
  console.log('re render')
  
  //select post from store
  
  console.log('postList', postList)
const posts = postList?.data?.map(post => (
                    
    <div category={post.category._id} key={post.id} className="w-full lg:w-3/4 px-3 mt-8">
      <div className="flex flex-wrap bg-gray-900 -mx-3  lg:mb-6">
        <div className="mb-10  w-full lg:w-1/4 px-3">
          <Link>
            
              <img
                className="w-full h-full object-cover rounded"
                src={post.photo}
                alt=""
              />
            </Link>
            
            <div className="flex flex-row bg-gray-300 justify-center w-full  items-center ">
              
              <div className="flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1">
              
              <div className="">
                <ThumbUpIcon 
                  onClick={() => dispatch(toggleAddLikesAction(post?._id))}
                  className="h-7 w-7 text-indigo-600 cursor-pointer" />
              </div>
        <div className="pl-2 text-gray-600">{post.likes.length}</div>
      </div>
      
      
      <div className="flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1">
        <div>
          <EyeIcon className="h-7 w-7  text-gray-400" />
        </div>
        <div className="pl-2 text-gray-600">
          {post?.viewsCount}
        </div>
      </div>
    </div>
  </div>
  <div className="w-full lg:w-3/4 px-3">
    <Link className="hover:underline">
      <h3 className="mb-1 text-2xl text-green-400 font-bold font-heading">
        {post?.title}
      </h3>
    </Link>
    <p className="text-gray-300">{post?.category?.title}</p>
    
    <Link to={`/posts/${post._id}`} className="text-indigo-500 hover:underline">
      Read More..
    </Link>
    
    <div className="mt-6 flex items-center">
      <div className="flex-shrink-0">
        <Link>
          <img
            className="h-10 w-10 rounded-full"
            src={post?.user?.profilePhoto}
            alt=""
          />
        </Link>
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-900">
          <Link className="text-yellow-400 hover:underline ">
            {post.user.fullname}
          </Link>
        </p>
        <div className="flex space-x-1 text-sm text-green-500">
          <time>
            <DateFormatter date={post?.createdAt} /> 
            
          </time>
          <span aria-hidden="true">&middot;</span>
        </div>
      </div>
    </div>
    {/* <p class="text-gray-500">
          Quisque id sagittis turpis. Nulla sollicitudin rutrum
          eros eu dictum...
        </p> */}
  </div>
</div>
</div>
 ))
 
  const category = useSelector(state => state?.category);
  const { 
    categoryList,
    loading: catLoading,
    appError: catError,
    serverError: servError 
  } = category;

  return (
    <>
      <section>
        <div className="py-20 bg-gray-900 min-h-screen radius-for-skewed">
          <div className="container mx-auto px-4">
            <div className="mb-16 flex flex-wrap items-center">
              <div className="w-full lg:w-1/2">
                <span className="text-green-600 font-bold">
                 See What's Going On in Our Community!
                </span>
                <h2 className="text-4xl text-gray-300 lg:text-5xl font-bold font-heading">
                  Latest Posts
                </h2>
              </div>
              <div className=" block text-right w-1/2">
                
                <button className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-green-600 hover:bg-green-700 
                text-gray-50 font-bold leading-loose transition duration-200">
                  View All Posts
                </button>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3">
              <div className="mb-8 lg:mb-0 w-full lg:w-1/4 px-3">
                <div className="py-4 px-6 bg-gray-600 shadow rounded">
                  <h4 className="mb-4 text-gray-500 font-bold uppercase">
                    Categories
                  </h4>
                  <ul>
                    
                    {catLoading ? <LoadingComponent /> : (
                      categoryList?.data?.map(category => (
                      <li onClick={eventCapture} key={category._id}>
                      <p 
                        className="block cursor-pointer py-2 px-3 mb-4 rounded text-yellow-500 font-bold bg-gray-500"
                        
                      >
                        {category?.title}
                      </p>
                    </li>
                    )
                  )
                )
              }
                    
                    
                  </ul>
                </div>
              </div>
              
              {/* {loading ? (
                <h1 className='text-green-500'>Loading...</h1>
              ) : appError || serverError ? (
                <h1 className='text-red-600'>{appError}</h1>
              ) : !postList?.data?.length ? (
                <h1>No Posts Found</h1>
              ) :  */}
              {posts?.reverse()}
              </div>
              
            </div>
          </div>
        
        <div className="bg-gray-900">
          <div className="skew bg-green-500 skew-bottom mr-for-radius">
            <svg
              className="h-8 md:h-12 lg:h-10 w-full text-gray-900"
              viewBox="0 0 10 10"
              preserveAspectRatio="none"
            >
              <polygon fill="currentColor" points="0 0 10 0 0 10"></polygon>
            </svg>
          </div>
          <div className="skew bg-gray-500  skew-bottom ml-for-radius">
            <svg
              className="h-8 bg-gray-500 md:h-12 lg:h-20 w-full text-gray-900"
              viewBox="0 0 10 10"
              preserveAspectRatio="none"
            >
              <polygon fill="currentColor" points="0 0 10 0 10 10"></polygon>
            </svg>
          </div>
        </div>
      </section>
    </>
  );
}
