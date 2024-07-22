import axios from "axios";

export const getGenreOptions = async (languageCode: string = "en") => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_TMDB_PUBLIC_URL}/genre/movie/list?language=${languageCode}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
        },
      }
    );
    return response.data.genres;
  } catch (error) {
    console.log("Error retreiving genres: ", error);
  }
};

export const getLanguageOptions = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_TMDB_PUBLIC_URL}/configuration/languages`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
        },
      }
    );
    const formattedLanguageOptions = response.data
      .map((item: any) => ({
        id: item.iso_639_1,
        name: item.english_name,
      }))
      .sort((a: any, b: any) => a.name.localeCompare(b.name));

    return formattedLanguageOptions;
  } catch (error) {
    console.log("Error retreiving languages: ", error);
  }
};

export const getMovieByMinVote = async (vote: number) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_TMDB_PUBLIC_URL}/discover/movie?sort_by=popularity.desc&vote_average.gte=${vote}&vote_average.lte=${vote}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
        },
      }
    );
    return response.data.results;
  } catch (error) {
    console.log("Error retreiving min vote: ", error);
    return error;
  }
};

export const getMovieByKeywordAndYear = async (
  keyword?: string,
  year?: number
) => {
  if (keyword || (keyword && year)) {
    try {
      const baseUrl = `${process.env.REACT_APP_TMDB_PUBLIC_URL}/search/movie?query=${keyword}&include_adult=false&language=en-US&page=1`;
      const yearParam = year ? `&primary_release_year=${year}` : undefined;
      const url = `${baseUrl}${yearParam}`;
      const response = await axios.get(url, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
        },
      });
      return response.data.results;
    } catch (error) {
      console.log("Error retreiving by keyword or keyword+year: ", error);
      return error;
    }
  } else if (year) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_TMDB_PUBLIC_URL}/discover/movie?sort_by=popularity.desc&primary_release_year=${year}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
          },
        }
      );
      return response.data.results;
    } catch (error) {
      console.log("Error retreiving movie list: ", error);
      return error;
    }
  } else {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_TMDB_PUBLIC_URL}/discover/movie?sort_by=popularity.desc`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
          },
        }
      );
      return response.data.results;
    } catch (error) {
      console.log("Error retreiving movie list: ", error);
      return error;
    }
  }
};

export const getPopularMovies = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_TMDB_PUBLIC_URL}/movie/popular`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
        },
      }
    );
    return response.data.results;
  } catch (error) {
    console.log("Error retreiving popular movies: ", error);
    return error;
  }
};

export const getTotalMovieCount = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_TMDB_PUBLIC_URL}/discover/movie`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
        },
      }
    );
    return response.data.total_results;
  } catch (error) {
    console.log("Error retreiving popular movies: ", error);
    return error;
  }
};

export const getMovieDetails = async (id: number) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_TMDB_PUBLIC_URL}/movie/${id}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error retreiving movie details: ", error);
    return error;
  }
};
