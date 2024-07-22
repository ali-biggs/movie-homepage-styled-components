import React from "react";
import styled from "styled-components";

import MovieItem from "../movieitem";
import { useMovieStore } from "../../store";

export default function MovieList() {
  const { results } = useMovieStore((state: any) => state);
  const testArray = results.slice(0, 3);
  return (
    <MoviesWrapper role="list" aria-label="Movie list">
      {testArray.map((movie: any, index: number) => {
        return (
          <MovieContainer key={index} role="listitem">
            <MovieItem movie={movie} />
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
