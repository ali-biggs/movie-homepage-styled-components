import React, { Suspense, Profiler } from "react";
import styled from "styled-components";
import { useMovieStore } from "../../store";
import SearchFilters from "../../components/searchfilter";
import MovieList from "../../components/movielist";
import BurgerMenuIcon from "../../components/burgerMenuIcon";
import { useMediaQuery } from "../../utils/useMediaQuery";
import { media } from "../../utils/mediaBreakPoints";
import { onRender } from "../../utils/onRender";
import ErrorModal from "../../components/errorModal";
import LoadingSpinner from "../../components/loadingSpinner";

type DiscoverProps = {
  toggleNavBar: () => void;
  isOpen: boolean;
};

export default function Discover({
  toggleNavBar,
  isOpen,
}: Readonly<DiscoverProps>) {
  const {
    genreOptions,
    totalCount,
    results,
    modalOpen,
    modalErrors,
    setModalOpen,
    setModalErrors,
    initialLoad,
  } = useMovieStore((state: any) => state);
  console.log("store", { modalErrors, modalOpen });
  const isMobile = useMediaQuery("(max-width: 480px)");

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
          <MovieResults>
            <Suspense fallback={<LoadingSpinner />}>
              <MovieList />
            </Suspense>
          </MovieResults>

          {isMobile && totalCount > 0 && (
            <TotalCounter aria-label="Movie count">
              {totalCount} movies
            </TotalCounter>
          )}
          <MovieFilters>
            <SearchFilters />
          </MovieFilters>
        </GridContainer>
      </DiscoverWrapper>

      {modalOpen & modalErrors && (
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
