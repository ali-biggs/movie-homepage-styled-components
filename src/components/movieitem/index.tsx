import React from "react";
import styled from "styled-components";
import * as colors from "../../colors";
import { useMediaQuery } from "../../utils/useMediaQuery";
import { applyLastLineFade } from "../../utils/lastLineFade";
import { media } from "../../utils/mediaBreakPoints";
import { formatUkDate } from "../../utils/formatUkDate";

type MovieItemProps = {
  movie: {
    poster_path: string;
    title: string;
    vote_average: number;
    overview: string;
    release_date: string;
    genre_ids: number[];
  };
  genreList: { id: number; name: string }[];
};

export default function MovieItem({ movie, genreList }: MovieItemProps) {
  const isMobile: boolean = useMediaQuery("(max-width: 480px)");
  const getGenreLabels = (
    ids: number[],
    genreList: { id: number; name: string }[]
  ): string => {
    const unformattedLabels = ids.map((id: number) => {
      const genre = genreList.find((genre) => genre.id === id);
      return genre ? genre.name : "Unknown";
    });
    const formattedLabels = unformattedLabels.join(" | ");
    return formattedLabels;
  };

  return (
    <MovieItemWrapper
      tabIndex={0}
      aria-labelledby={`movie-title-${movie.title}`}
    >
      <LeftCont>
        <MoviePoster
          alt={`${movie.title} poster`}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        />
      </LeftCont>
      <RightCont>
        <MovieHeader>
          <MovieTitle id={`movie-title-${movie.title}`}>
            {movie.title}
          </MovieTitle>
          <RatingBox id={`movie-rating-${movie.vote_average.toFixed(1)}`}>
            {movie.vote_average.toFixed(1)}
          </RatingBox>
        </MovieHeader>
        <GenreRow>
          <Genre
            id={`movie-genres-${getGenreLabels(movie.genre_ids, genreList)}`}
          >
            {getGenreLabels(movie.genre_ids, genreList)}
          </Genre>
        </GenreRow>
        <DescriptionContainer>
          <MovieDescription aria-label="Movie description">
            {isMobile ? applyLastLineFade(movie.overview) : movie.overview}
          </MovieDescription>
          <MovieRelease
            id={`movie-release-date-${formatUkDate(movie.release_date)}`}
          >
            {formatUkDate(movie.release_date)}
          </MovieRelease>
        </DescriptionContainer>
      </RightCont>
    </MovieItemWrapper>
  );
}

const MovieItemWrapper = styled.div`
  position: relative;
  background-color: white;
  border-radius: 3px;
  display: grid;
  grid-template-columns: 0.5fr 2fr;
  grid-gap: 2px;
  padding: 20px;
`;

const LeftCont = styled.div`
  display: inline-block;
`;

const MoviePoster = styled.img`
  width: 100%;
  height: auto;
`;

const RightCont = styled.div`
  display: inline-block;
`;

const MovieHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 15px;
  padding-right: 15px;
  align-items: center;
`;

const MovieTitle = styled.div`
  font-size: 1.3em;
  font-weight: 900;
  color: ${colors.fontColor};
`;

const RatingBox = styled.div`
  font-weight: 700;
  color: white;
  background-color: ${colors.primaryColor};
  padding: 3px;
  border-radius: 5px;
`;

const GenreRow = styled.div`
  display: flex;
  align-items: center;
  padding-left: 15px;

  @media ${media.mobile} {
    padding-top: 5px;
  }
`;

const Genre = styled.div`
  font-size: 1em;
  font-weight: 700;
  color: ${colors.primaryColor};

  @media ${media.mobile} {
    font-size: 0.7em;
    font-weight: 700;
  }
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MovieDescription = styled.div`
  display: inline-block;
  padding-top: 10px;
  padding-left: 15px;
  padding-right: 15px;
  color: ${colors.fontColor};

  @media ${media.mobile} {
    height: 105px;
    overflow: hidden;
  }
`;

const MovieRelease = styled.div`
  padding-top: 40px;
  padding-left: 15px;
  font-size: 0.8em;
  font-weight: 500;
  color: ${colors.primaryColor};
`;
