import React, { useState } from "react";
import "../css/MovieUpdate.css";
import axios from "axios";
import Swal from "sweetalert2";
import { TailSpin } from "react-loader-spinner";
import uploadToS3 from "./fileUpload_logic/fileUpload_Logic";
import { useUserContext } from "./auth/UserContext";

const MovieForm = () => {
  const [movie, setMovie] = useState({
    name: "",
    year: "",
    trailer: "",
    startDate: "",
    nowShowing: false,
  });
  const { isLoading, setLoading } = useUserContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    let coverImageUrl, bannerImageUrl;
    const coverImageInput = document.querySelector('input[type="file"]');
    const bannerImageInput = document.querySelector('input[type="file"]');
    if (coverImageInput && coverImageInput.files.length > 0) {
      coverImageUrl = await uploadToS3(coverImageInput.files[0]);
    }
    if (bannerImageInput && bannerImageInput.files.length > 0) {
      bannerImageUrl = await uploadToS3(bannerImageInput.files[0]);
    }
    const newMovieData = {
      ...movie,
      coverImage: coverImageUrl,
      bannerImage: bannerImageUrl,
    };
    const adminToken = localStorage.getItem("admin-token");
    console.log(newMovieData);
    try {
      await axios.post(
        `${process.env.REACT_APP_API_PATH}/movies`,
        newMovieData,
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      setLoading(false);
      Swal.fire({
        title: "Success!",
        text: "New movie added successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire({
        title: "Error!",
        text: "There was a problem adding the movie. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className={`movie-wrapper ${isLoading ? "blurred" : ""}`}>
      {isLoading && (
        <div className="loader-container">
          <TailSpin color="#00BFFF" height={100} width={100} />
        </div>
      )}
      <div className="movie-form-container">
        <form className="movie-form" onSubmit={handleSubmit}>
          <h2>Add a New Movie</h2>
          <input
            type="text"
            placeholder="Movie Name"
            onChange={(e) => setMovie({ ...movie, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Year"
            onChange={(e) => setMovie({ ...movie, year: e.target.value })}
          />
          <input
            type="text"
            placeholder="Trailer"
            onChange={(e) => setMovie({ ...movie, trailer: e.target.value })}
          />
          <input
            type="text"
            placeholder="Start Date"
            onChange={(e) => setMovie({ ...movie, startDate: e.target.value })}
          />
          <input
            type="boolean"
            placeholder="Now showing(True or False)"
            onChange={(e) => setMovie({ ...movie, nowShowing: e.target.value })}
          />
          <div className="upload-container">
            <div className="upload-sec-one">
              <label>Upload Cover Image:</label>
              <input type="file" />
            </div>
            <div className="upload-sec-one">
              <label>Upload Banner Image:</label>
              <input type="file" />
            </div>
          </div>
          <button type="submit">Add Movie</button>
        </form>
      </div>
    </div>
  );
};

export default MovieForm;
