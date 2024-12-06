/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import React from 'react'
import { IoPersonAddSharp } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { RiShareFill } from "react-icons/ri";
import { FaRegComment } from "react-icons/fa6";
import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import {  toast } from "react-toastify";
import axios from "axios";

function PostCard({ postData }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [isShare, setIsShare] = useState(false);
  const [comment, setComment] = useState("");
  const [post, setPost] = useState(postData);

  const {
    postId,
    userId,
    userName,
    caption,
    time,
    avatar,
    likes,
    comments,
    author,
    imageUrl,
    imageSrc,
    timestamp,
  } = post;

  // console.log(post);

  const handleLike = () => {
    setIsLiked((prev) => !prev);
    console.log(imageUrl);
  };
  const handleComment = () => {
    setIsComment((prev) => !prev);
  };

  const handleShare = () => {
    setIsShare((prev) => !prev);
  };

  const handleContentChange = (event) => {
    setComment(event.target.value); // Update the post content
  };

  const handleSubmitComment = async (postId, userId, userName, comment) => {
    // Assuming you have `userId`, `userName`, and `comment` from the input fields or state
    console.log("postId :", postId, "userId :", userId, comment);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/posts/${postId}/comment`,
        {
          userId,
          userName,
          comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const updatedComments = response.data;

      console.log(updatedComments);
      setPost((prevPostData) => ({
        ...prevPostData,
        comments: [...prevPostData.comments, updatedComments], // Add the new comment to the array
      }));
      toast.success("Comment added successfully!");
      setIsComment(false);
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error('Comment is not added.');

    }
    // Assuming you want to update the state with the new comments
  };
  const handlelikePost = async (postId) => {
    console.log(postId, "POST ID");

    try {
      const response = await axios.post(
        `http://localhost:5000/api/posts/${postId}/likes`
      );

      // Log the updated likes count
      console.log("Updated Likes:", response.data.likes);
      post.likes++;
      toast.success("Post liked successfully!");
    } catch (error) {
      console.error(
        "Error liking post:",
        error.response ? error.response.data : error.message
      );
      toast.error('Like is not added.');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 w-full max-w-lg mx-auto">
      {/* Author Info */}
      <div className="HeadPost flex justify-between">
        <div className="flex items-center mb-4">
          <div className="Avatar w-11 h-11 rounded-full overflow-hidden border-2 border-blue-600">
            <img
              src={avatar}
              alt="Author Avatar"
              className="w-full h-full object-cover "
            />
          </div>
          <div>
            <h2 className="text-sm font-semibold cursor-pointer">{userName}</h2>
            <p className="text-gray-600 text-xs">{timestamp}</p>
          </div>
        </div>
        <div className="Request  cursor-pointer ">
          <IoPersonAddSharp className=" rounded-full p-1 text-3xl hover:bg-gray-100 text-blue-700" />
        </div>
      </div>

      {/* Post Title */}
      <h2 className="text-sm font-medium mb-2">{caption}</h2>

      {/* Post Content */}
      {imageSrc && (
        <div>
          <img
            src={imageSrc}
            alt="Post Content"
            className="w-full h-auto rounded-lg mb-4"
          />
        </div>
      )}

      {/* Like Button */}
      <div className="flex items-center mb-4 justify-stretch ">
        <button
          className={`px-2 py-2 rounded-full border ${
            isLiked ? "bg-red-600 text-white" : "bg-white text-red-500"
          } border-red-500 hover:bg-red-600 hover:text-white mr-2`}
          type="button"
          onClick={() => handlelikePost(post.postId)}
        >
          <IoMdHeartEmpty className=" " />
        </button>
        <button
          className={`px-2 py-2 rounded-full  mr-2 border ${
            isComment ? "bg-green-500 text-white" : "bg-white text-green-500"
          } border-green-500 hover:bg-green-600 hover:text-white`}
          type="button"
          onClick={handleComment}
        >
          <FaRegComment />
        </button>
        {/* <button
          className={`  px-2 py-2 rounded-full border  ${
            isShare ? "bg-yellow-500 text-white" : "bg-white text-yellow-500"
          } border-yellow-500 hover:bg-yellow-500 hover:text-white`}
          type="button"
          onClick={handleShare}
        >
          <RiShareFill />
        </button> */}
      </div>

      {/* Like and Comment Count */}
      <div className="flex items-center text-gray-600 justify-between ">
        <span className="mr-3" style={{ fontSize: "10px" }}>
          {likes} likes
        </span>
        <span
          className="cursor-pointer"
          style={{ fontSize: "11px" }}
          onClick={() => setOpenComment((prev) => !prev)}
        >
          {post.comments.length} comments ⩔
        </span>
      </div>

      {isComment && (
        <div className="mt-4">
          <div className="flex justify-between">
            <h3 className="text-xs font-semibold mb-2">Add Comments</h3>
            <span className="cursor-pointer">
              <IoMdSend
                className="mr-2 text-blue-700"
                onClick={() =>
                  handleSubmitComment(
                    post.postId,
                    post.userId,
                    post.userName,
                    comment
                  )
                }
              />{" "}
            </span>
          </div>
          <textarea
            className="w-full p-2 border rounded-md outline-none"
            placeholder="Add a comment..."
            value={comment}
            onChange={handleContentChange}
          />
        </div>
      )}

      {openComment && (
        <div className="mt-2">
          <h4 className="font-semibold text-xs">Comments:</h4>
          {post.comments && post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <div key={comment._id} className="border-t mt-2 pt-2">
                <div className="flex flex-row">
                  <p className="font-semibold" style={{ fontSize: "11px" }}>
                    {comment.userName || "Anonymous"}:
                  </p>{" "}
                  <p className="pl-2" style={{ fontSize: "11px" }}>
                    {comment.comment}
                  </p>
                </div>
                <p
                  className="text-xs text-gray-500"
                  style={{ fontSize: "9px" }}
                >
                  {comment.timestamp}
                </p>
              </div>
            ))
          ) : (
            <p className="text-xs">No comments yet.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default PostCard;
