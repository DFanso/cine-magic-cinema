import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/Movie.css";
import uploadToS3 from "./fileUpload_logic/fileUpload_Logic";
import axios from "axios";
import Swal from "sweetalert2";

import { TailSpin } from "react-loader-spinner";
import { useUserContext } from "./auth/UserContext";

const MovieUpdate = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({
    name: "",
    year: "",
    trailer: "",
    startDate: "",
    nowShowing: false,
    description: "",
    cast: [],
    producedBy: [],
    writtenBy: [],
    directedBy: [],
  });

  const { isLoading, setLoading } = useUserContext();

  useEffect(() => {
    const fetchMovie = async () => {
      const adminToken = localStorage.getItem("admin-token");
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_API_PATH}/movies/${id}`,
          {
            headers: { Authorization: `Bearer ${adminToken}` },
          }
        );
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie:", error);
        setLoading(false);
        Swal.fire({
          title: "Error!",
          text: "Failed to fetch movie data. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };

    fetchMovie();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      let coverImageUrl = movie.coverImage;
      let bannerImageUrl = movie.bannerImage;

      const coverImageInput = document.querySelector(
        'input[type="file"][name="coverImage"]'
      );
      const bannerImageInput = document.querySelector(
        'input[type="file"][name="bannerImage"]'
      );

      if (coverImageInput && coverImageInput.files.length > 0) {
        coverImageUrl = await uploadToS3(coverImageInput.files[0]);
      }
      console.log(bannerImageInput.files);
      if (bannerImageInput && bannerImageInput.files.length > 0) {
        bannerImageUrl = await uploadToS3(bannerImageInput.files[0]);
        console.log(bannerImageUrl);
      }

      const updateData = {
        ...movie,
        coverImage: coverImageUrl,
        bannerImage: bannerImageUrl,
      };

      const adminToken = localStorage.getItem("admin-token");
      await axios.patch(
        `${process.env.REACT_APP_API_PATH}/movies/${id}`,
        updateData,
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );
      setLoading(false);
      Swal.fire({
        title: "Success!",
        text: "Movie updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      setLoading(false);
    } catch (error) {
      console.error("Error updating movie:", error);
      setLoading(false);
      Swal.fire({
        title: "Error!",
        text: "There was a problem updating the movie. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={`login-wrapper ${isLoading ? "blurred" : ""}`}>
      {isLoading && (
        <div className="loader-container">
          <TailSpin color="#00BFFF" height={100} width={100} />
        </div>
      )}
      <div className="movie-form-container">
        <form className="movie-form" onSubmit={handleSubmit}>
          <h2>Update a Movie</h2>
          <input
            type="text"
            placeholder="Movie Name"
            value={movie.name}
            onChange={(e) => setMovie({ ...movie, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Year"
            value={movie.year}
            onChange={(e) => setMovie({ ...movie, year: e.target.value })}
          />
          <input
            type="text"
            placeholder="Trailer"
            value={movie.trailer}
            onChange={(e) => setMovie({ ...movie, trailer: e.target.value })}
          />
          <input
            type="text"
            placeholder="Start Date"
            value={formatDate(movie.startDate)}
            onChange={(e) => setMovie({ ...movie, startDate: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={movie.description}
            onChange={(e) =>
              setMovie({ ...movie, description: e.target.value })
            }
          />
          {/* Additional input fields for cast, producedBy, writtenBy, directedBy */}
          <input
            type="text"
            placeholder="Cast (comma separated)"
            value={movie.cast.join(", ")}
            onChange={(e) =>
              setMovie({ ...movie, cast: e.target.value.split(", ") })
            }
          />
          <input
            type="text"
            placeholder="Produced By (comma separated)"
            value={movie.producedBy.join(", ")}
            onChange={(e) =>
              setMovie({ ...movie, producedBy: e.target.value.split(", ") })
            }
          />
          <input
            type="text"
            placeholder="Written By (comma separated)"
            value={movie.writtenBy.join(", ")}
            onChange={(e) =>
              setMovie({ ...movie, writtenBy: e.target.value.split(", ") })
            }
          />
          <input
            type="text"
            placeholder="Directed By (comma separated)"
            value={movie.directedBy.join(", ")}
            onChange={(e) =>
              setMovie({ ...movie, directedBy: e.target.value.split(", ") })
            }
          />
          <div className="upload-container">
            <div className="upload-sec-one">
              <label>Upload Cover Image:</label>
              <input type="file" name="coverImage" />
            </div>
            <div className="upload-sec-one">
              <label>Upload Banner Image:</label>
              <input type="file" name="bannerImage" />
            </div>
          </div>
          <button type="submit">Update Movie</button>
        </form>
      </div>
    </div>
  );
};

export default MovieUpdate;
