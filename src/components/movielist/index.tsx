import React from "react";
import styled from "styled-components";

import MovieItem from "../movieitem";

type MovieListProps = {
  movies: [];
  genres: [];
};

export default function MovieList({ movies, genres }: MovieListProps) {
  const testArray = movies.slice(0, 3);
  return (
    <MoviesWrapper role="list" aria-label="Movie list">
      {testArray.map((movie, index) => {
        return (
          <MovieContainer key={index} role="listitem">
            <MovieItem movie={movie} genreList={genres} />
          </MovieContainer>
        );
      })}
    </MoviesWrapper>
  );
}

const MoviesWrapper = styled.div`
  position: relative;
`;

const MovieContainer = styled.div`
  padding-bottom: 15px;
`;
