import React, { useEffect, useState, Suspense, Profiler } from "react";
import styled from "styled-components";
import SearchFilters from "../../components/searchfilter";
import MovieList from "../../components/movielist";
import BurgerMenuIcon from "../../components/burgerMenuIcon";
import {
  getLanguageOptions,
  getGenreOptions,
  getMovieByKeywordAndYear,
  getPopularMovies,
  getTotalMovieCount,
} from "../../utils/fetcher";
import { useMediaQuery } from "../../utils/useMediaQuery";
import { media } from "../../utils/mediaBreakPoints";
import { onRender } from "../../utils/onRender";
import ErrorModal from "../../components/errorModal";

type DiscoverProps = {
  toggleNavBar: () => void;
  isOpen: boolean;
};

export default function Discover({ toggleNavBar, isOpen }: Readonly<DiscoverProps>) {
  // You don't need to keep the current structure of this state object. Feel free to restructure it as needed.
  const [state, setState] = useState({
    keyword: "",
    year: 0,
    results: [],
    movieDetails: null,
    totalCount: 0,
    genreOptions: [],
    ratingOptions: [
      { id: 7.5, name: 7.5 },
      { id: 8, name: 8 },
      { id: 8.5, name: 8.5 },
      { id: 9, name: 9 },
      { id: 9.5, name: 9.5 },
      { id: 10, name: 10 },
    ],
    languageOptions: [
      { id: "GR", name: "Greek" },
      { id: "EN", name: "English" },
      { id: "RU", name: "Russian" },
      { id: "PO", name: "Polish" },
    ],
  });
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalErrors, setModalErrors] = useState<string[]>([]);
  const isMobile = useMediaQuery("(max-width: 480px)");

  const searchMovies = async (
    keyword: string | undefined,
    year: number | undefined
  ) => {
    // Write a function to trigger the API request and load the search results based on the keyword and year given as parameters
    const searchResults = await getMovieByKeywordAndYear(keyword, year);
    if (searchResults.length > 0) {
      setState((prevState) => ({
        ...prevState,
        results: searchResults,
        totalCount: searchResults.length,
      }));
    } else {
      setModalErrors(["There are no matches for this year"]);
      setModalOpen(true);
    }
  };

  const {
    genreOptions,
    languageOptions,
    ratingOptions,
    totalCount,
    results,
    movieDetails,
  } = state;

  // Write a function to preload the popular movies when page loads & get the movie genres
  const initialLoad = async () => {
    try {
      const popularMovies = await getPopularMovies();
      const movieGenres = await getGenreOptions();
      const totalCount = await getTotalMovieCount();
      const languageOptions = await getLanguageOptions();

      setState((prevState) => ({
        ...prevState,
        results: popularMovies,
        genreOptions: movieGenres,
        totalCount: totalCount,
        languageOptions: languageOptions,
      }));
    } catch (error) {
      console.log("Error fetching initial data: ", error);
    }
  };

  useEffect(() => {
    initialLoad();
  }, []);

  const handleModalClose = () => {
    setModalErrors([]);
    setModalOpen(false);
    initialLoad();
  };

  return (
    <Profiler id="Discover page" onRender={onRender}>
      <DiscoverWrapper>
        {isMobile && (
          <MobilePageHeader>
            <BurgerMenuIcon
              onClick={toggleNavBar}
              isOpen={isOpen}
              aria-label="Open menu"
            />
            <MobilePageTitle>Discover</MobilePageTitle>
          </MobilePageHeader>
        )}
        {!isMobile && totalCount > 0 && (
          <TotalCounter aria-label="Movie count">
            {totalCount} movies
          </TotalCounter>
        )}
        <GridContainer>
          <Suspense fallback={<Loading />}>
            <MovieResults>
              <MovieList
                movies={(results as []) || []}
                genres={(genreOptions as []) || []}
              />
            </MovieResults>
          </Suspense>
          {isMobile && totalCount > 0 && (
            <TotalCounter aria-label="Movie count">
              {totalCount} movies
            </TotalCounter>
          )}
          <MovieFilters>
            <SearchFilters
              genres={genreOptions}
              ratings={ratingOptions}
              languages={languageOptions}
              searchMovies={(
                keyword: string | undefined,
                year: number | undefined
              ) => searchMovies(keyword, year)}
            />
          </MovieFilters>
        </GridContainer>
      </DiscoverWrapper>

      {modalOpen && (
        <ErrorModal
          errors={modalErrors}
          isOpen={modalOpen}
          onClose={() => handleModalClose()}
        />
      )}
    </Profiler>
  );
}

const DiscoverWrapper = styled.div`
  padding: 60px 35px;

  @media ${media.mobile} {
    padding: 20px;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 16px;

  @media ${media.mobile} {
    display: flex;
    flex-direction: column-reverse;
  }
`;

const TotalCounter = styled.div`
  font-weight: 200;
  font-size: 0.8em;
  padding-bottom: 15px;

  @media ${media.mobile} {
    font-weight: 200;
    font-size: 0.8em;
    padding-bottom: 0px;
  }
`;

const MovieResults = styled.div``;

const MovieFilters = styled.div``;

const MobilePageHeader = styled.header`
  @media ${media.mobile} {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
  }
`;

const MobilePageTitle = styled.h1`
  @media ${media.mobile} {
    display: visibile;
    font-size: 30px;
  }
`;

function Loading() {
  return <h2>Loading...</h2>;
}
