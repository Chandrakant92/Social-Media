import { useState, useContext } from "react";
import { IoMdSend } from "react-icons/io";
import { MdAttachFile } from "react-icons/md";
import { AiOutlinePicture } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";
// import { IoIosRemoveCircle } from "react-icons/io";
import {  toast } from "react-toastify";
import { TiDelete } from "react-icons/ti";
import { FaFileCircleCheck } from "react-icons/fa6";
import { AuthContext } from "../Context/AuthContext";

function CreatePost() {
  const { user, accessToken } = useContext(AuthContext);
  const [fileDetails, setFileDetails] = useState(null);
  const [imageDetails, setImageDetails] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // console.log(user, "USER");

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (fileDetails !== null) {
      alert("Select one attachment");
    }
    if (file) {
      setFileDetails(file);
      console.log("File selected:", file);
    }
  };

  const handleImageInputChange = (event) => {
    const image = event.target.files[0];
    if (image) {
      setImageDetails(image);
      setImagePreview(URL.createObjectURL(image));
      console.log("Image selected:", image);
    }
  };
  const handleRemoveImage = () => {
    setImageDetails(null);
  };
  const handleRemoveFile = () => {
    setFileDetails(null);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value); // Update the post content
  };

  const handleSubmit = async () => {
   
    if (!content && !imageDetails && !fileDetails) {
      alert("Post content, image, or file is required.");
      return;
    }

    // Create a FormData object to send the post data
    setIsLoading(true);
    const formData = new FormData();
    formData.append("caption", content); // Add the post content

    if (imageDetails) {
      formData.append("image", imageDetails); // Add the image file
    }

    if (fileDetails) {
      formData.append("file", fileDetails); // Add the attachment
    }
    formData.append("userId", user.id);
    formData.append("userName", user.name);

    // const logFormData = (formData) => {
    //   for (let [key, value] of formData.entries()) {
    //     console.log(`${key}: ${value}`);
    //   }
    // };

    // logFormData(formData);

    try {
      const response = await fetch(
        "http://localhost:5000/api/posts/create-post",
        {
          method: "POST",
          headers: {
            // No need for Content-Type header, it will be set automatically by FormData
            Authorization: `Bearer ${accessToken}`, // If authorization is needed
          },
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Post created successfully:", data);
        toast.success("Post created successfully!");
        // Clear the form after successful submission
        setContent("");
        setFileDetails(null);
        setImageDetails(null);
        setImagePreview("");
      } else {
        console.error("Failed to create post:", response.statusText);
        toast.error('Failed to create post.');

      }
    } catch (error) {
      console.error("Error:", error);
      toast.error('Failed to create post.');

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <div className="bg-white shadow-md rounded-lg p-4 mb-4 w-full max-w-lg mx-auto">
          <p className="text-xs font-semibold">Create Your Post Here</p>
          <textarea
            placeholder="What's on your mind?"
            className="w-full p-2 mb-4 border rounded outline-none"
            value={content}
            onChange={handleContentChange}
          ></textarea>
          {imageDetails && (
            <div className="mt-4 border w-fit m-1 flex">
              {/* <p className="text-xs text-gray-600">{imageDetails.name}</p> */}
              <img
                src={imagePreview}
                alt="Selected Image"
                className="mt-2 w-32 h-32 object-cover rounded"
              />
              <span
                className=" rounded-full  h-fit  "
                onClick={handleRemoveImage}
              >
                <TiDelete className="text-xl cursor-pointer text-red-600" />
              </span>
            </div>
          )}
          {fileDetails && (
            <div className="mt-4 flex m-1">
              <span className="mr-2 rounded-full  h-fit  ">
                <FaFileCircleCheck className="text-blue-700 text-xs" />
              </span>
              <p className="text-xs text-gray-600 mr-2">{fileDetails.name}</p>
              <span
                className="mr-2 rounded-full  h-fit  "
                onClick={handleRemoveFile}
              >
                {" "}
                <TiDelete className="text-sm cursor-pointer text-red-600" />
              </span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="flex space-x-3">
              <label className="flex items-center cursor-not-allowed">
                <MdAttachFile className="text-gray-600 text-xl" />
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileInputChange}
                  disabled={true}
                />
              </label>
              <label className="flex items-center cursor-pointer">
                <AiOutlinePicture className="text-gray-600 text-xl" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageInputChange}
                 
                />
              </label>
              <label className="flex items-center cursor-not-allowed">
                <FaRegEdit className="text-gray-600 text-xl" />
              </label>
            </div>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <FaSpinner className="animate-spin mr-2" /> 
              ) : (
                <IoMdSend className="mr-2" /> 
              )}
             
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePost;
