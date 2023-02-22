import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { fetchAllPostsAction } from "../../redux/slices/posts/postSlices";
import { useDispatch, useSelector } from "react-redux";
import DateFormatter from "../../utilities/dateFormatter";

const PostDetails = () => {
  
  const id = window.location.href.split('/')[4];
  const dispatch = useDispatch();
  const state = useSelector(state => state?.post)
  const { postList, rejectWithValue, getState } = state
  
  
  useEffect(() => {
    dispatch(fetchAllPostsAction())
  }, []);

  const filteredPost = postList?.data.filter(post => post.id === id);
  console.log('filteredPost', filteredPost)
  
  return (
    <>
      <section className="py-20 2xl:py-40 bg-gray-800 overflow-hidden">
        <div className="container px-4 mx-auto">
          {/* Post Image */}
          <img
            className="mb-24 w-full h-96 object-cover"
            src={filteredPost[0].photo}
            alt=""
          />
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="mt-7 mb-14 text-6xl 2xl:text-7xl text-white font-bold font-heading">
              {filteredPost[0].title}
            </h2>

            {/* User */}
            <div className="inline-flex pt-14 mb-14 items-center border-t border-gray-500">
              <img
                className="mr-8 w-20 lg:w-24 h-20 lg:h-24 rounded-full"
                src={filteredPost[0].user.profilePhoto}
                alt=""
              />
              <div className="text-left">
                <h4 className="mb-1 text-2xl font-bold text-gray-50">
                  <span className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 to-orange-600">
                    {filteredPost[0].user.fullname}
                  </span>
                </h4>
                <p className="text-gray-500">
                 created On <DateFormatter date={filteredPost[0]?.createdAt} /> 
                  
                </p>
              </div>
            </div>
            {/* Post description */}
            <div className="max-w-xl mx-auto">
              <div className="mb-6 text-left  text-xl text-gray-200">
                {filteredPost[0].description}
                
                {/* Show delete and update btn if created user */}
                <p className="flex">
                  <Link to={{
                    pathname: `/update-post/${filteredPost[0]?._id}`,
                    state: filteredPost
                    }}
                    className="p-3">
                    <PencilAltIcon className="h-8 mt-3 text-yellow-300" />
                  </Link>
                  <button className="ml-3">
                    <TrashIcon className="h-8 mt-3 text-red-600" />
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Add comment Form component here */}

        <div className="flex justify-center  items-center">
          {/* <CommentsList comments={post?.comments} postId={post?._id} /> */}
          CommentsList
        </div>
      </section>
    </>
  );
};

export default PostDetails;
