import React from "react";
import styled from "styled-components";
import * as colors from "../../colors";
import { useMediaQuery } from "../../utils/useMediaQuery";
import { applyLastLineFade } from "../../utils/lastLineFade";
import { media } from "../../utils/mediaBreakPoints";
import { formatUkDate } from "../../utils/formatUkDate";
import { useMovieStore } from "../../store";

type MovieItemProps = {
  movie: {
    poster_path: string;
    title: string;
    vote_average: number;
    overview: string;
    release_date: string;
    genre_ids: number[];
  };
};

export default function MovieItem({
  movie,
}: Readonly<MovieItemProps>) {
  const {
    genreOptions,
  } = useMovieStore((state: any) => state);
  const isMobile: boolean = useMediaQuery("(max-width: 480px)");
  const getGenreLabels = (
    ids: number[],
    genreList: { id: number; name: string }[]
  ): string => {
    const unformattedLabels = ids.map((id: number) => {
      const genre = genreOptions.find((genre: { id: number; name: string }) => genre.id === id);
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
          <MovieTitleContainer>
          <MovieTitle id={`movie-title-${movie.title}`}>
            {movie.title}
          </MovieTitle>
          </MovieTitleContainer>
          <RatingBox id={`movie-rating-${movie.vote_average.toFixed(1)}`}>
            {movie.vote_average.toFixed(1)}
          </RatingBox>
        </MovieHeader>
        <GenreRow>
          <Genre
            id={`movie-genres-${getGenreLabels(movie.genre_ids, genreOptions)}`}
          >
            {getGenreLabels(movie.genre_ids, genreOptions)}
          </Genre>
        </GenreRow>
        <DescriptionContainer>
          <MovieDescription aria-label="Movie description">
            {isMobile ? applyLastLineFade(movie.overview) : movie.overview}
          </MovieDescription>
        </DescriptionContainer>
        <MovieRelease
          id={`movie-release-date-${formatUkDate(movie.release_date)}`}
        >
          {formatUkDate(movie.release_date)}
        </MovieRelease>
      </RightCont>
    </MovieItemWrapper>
  );
}

const MovieItemWrapper = styled.div`
  position: relative;
  background-color: white;
  display: grid;
  grid-template-columns: 0.5fr 2fr;
  grid-gap: 2px;
  padding: 20px;

  @media ${media.tabletPortrait} {
    width: 100%;
    height: 200px;
  }
`;

const LeftCont = styled.div`
  display: inline-block;
`;

const RightCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MoviePoster = styled.img`
  width: 100%;
  height: 100%;

  @media ${media.mobile} {
    width: 100px;
    height: 100%;
  }
`;

const MovieHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 15px;
  align-items: flex-start;
`;

const MovieTitleContainer = styled.div`
  flex: 1;
  padding-right: 10px; 
`;

const MovieTitle = styled.div`
  font-size: 1.3em;
  font-weight: 900;
  color: ${colors.fontColor};
  line-height: 1.2; 
  white-space: pre-wrap;
`;

const RatingBox = styled.div`
  font-weight: 700;
  color: white;
  background-color: ${colors.primaryColor};
  padding: 3px;
  border-radius: 5px;
  flex-shrink: 0;
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
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MovieDescription = styled.div`
  /* display: inline-block; */
  padding-top: 10px;
  padding-left: 15px;
  color: ${colors.fontColor};

  @media ${media.mobile} {
    height: 103px;
    overflow: hidden;
    font-size: 0.8em;
  }
`;

const MovieRelease = styled.div`
  /* padding-top: 40px; */
  padding-left: 15px;
  font-size: 0.8em;
  font-weight: 500;
  color: ${colors.primaryColor};
  align-self: flex-start;
`;
