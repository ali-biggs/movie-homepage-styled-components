import React, { useState, useCallback, useRef } from "react";
import styled, { css } from "styled-components";
import { media } from "../../utils/mediaBreakPoints";
import { useMediaQuery } from "../../utils/useMediaQuery";
import debounce from "debounce";
// import debounce from 'lodash/debounce';

import * as colors from "../../colors";
import SearchIcon from "../../images/search-icon-yellow.png";
import CalendarIcon from "../../images/year-icon.png";
import FilterIcon from "../../images/filter-icon.png";
import { useMovieStore } from "../../store";

interface KeySearchIconProps {
  magnifyingGlass?: boolean;
  calendar?: boolean;
  filter?: boolean;
}

export default function SearchBar() {
  const [keyWord, setKeyWord] = useState<string>("");
  const [releaseYear, setReleaseYear] = useState<string | undefined>("");
  const { setModalOpen, setModalErrors, searchMovies } = useMovieStore(
    (state: any) => state
  );
  const isMobile: boolean = useMediaQuery("(max-width: 480px)");

  // Keep track of the request timestamp to manage rate limiting
  const lastRequestTimeRef = useRef<number>(0);

  const handleMovieSearch = useCallback(
    debounce(async (keyword: string, year: number | undefined) => {
      const now = Date.now();
      const timeSinceLastRequest = now - lastRequestTimeRef.current;

      // If the time since the last request is less than the minimum allowed interval, wait
      const MIN_INTERVAL_MS = 1000;
      if (timeSinceLastRequest < MIN_INTERVAL_MS) {
        await new Promise((resolve) =>
          setTimeout(resolve, MIN_INTERVAL_MS - timeSinceLastRequest)
        );
      }

      try {
        await searchMovies(keyword, year);
        lastRequestTimeRef.current = Date.now(); // Update the last request time
        setModalErrors(null);
      } catch (err) {
        setModalErrors(
          ["An error occurred while searching. Please try again later."]
        );
        setModalOpen(true);
      }
    }, 300), // 300ms debounce delay
    [searchMovies]
  );

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newKeyword = e.target.value;
    setKeyWord(newKeyword);
    handleMovieSearch(
      newKeyword,
      releaseYear ? parseInt(releaseYear) : undefined
    );
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newYear = e.target.value;
    setReleaseYear(newYear);
    handleMovieSearch(keyWord, newYear ? parseInt(newYear) : undefined);
  };

  return (
    <>
      <MobileSearchWrapper>
        <SearchWrapper>
          <KeySearchIcon magnifyingGlass />
          <KeyWordInput
            onChange={handleKeywordChange}
            aria-label="Search for movie using keyword"
            value={keyWord}
          />
        </SearchWrapper>
        {isMobile && (
          <FilterButton
            aria-label="Filter options"
            aria-hidden={!isMobile}
            aria-expanded="false"
          />
        )}
      </MobileSearchWrapper>
      {!isMobile && (
        <SearchWrapper aria-hidden={!isMobile}>
          <KeySearchIcon calendar />
          <YearInput
            onChange={handleYearChange}
            aria-label="Search for movie using year"
            value={releaseYear || ""}
          />
        </SearchWrapper>
      )}
    </>
  );
}

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 2px solid ${colors.primaryColor};
  margin-bottom: 10px;
`;

const MobileSearchWrapper = styled.div`
  @media ${media.mobile} {
    display: flex;
    align-items: center;
    gap: 40px;
  }
`;

const KeyWordInput = styled.input.attrs({
  type: "text",
  placeholder: "Search for movies",
})`
  &::placeholder {
    font-weight: 200;
    color: ${colors.primaryColor};
  }

  border: none;
  width: 100%;
  padding-top: 2px;
  font-weight: 700;
  font-size: 1.4em;
  color: ${colors.primaryColor};
  margin-bottom: 10px;

  &:focus {
    outline: none;
    border: none;
  }
`;

const YearInput = styled.input.attrs({
  type: "number",
  placeholder: "Year of release",
})`
  &::placeholder {
    font-weight: 200;
    color: ${colors.primaryColor};
  }

  border: none;
  width: 100%;
  padding-top: 2px;
  font-weight: 700;
  font-size: 1.4em;
  color: ${colors.primaryColor};
  margin-bottom: 10px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  -moz-appearance: textfield;

  &:focus {
    outline: none;
    border: none;
  }
`;

const KeySearchIcon = styled.div<KeySearchIconProps>`
  ${(props) =>
    props.magnifyingGlass &&
    css`
      &::after {
        content: "";
        display: inline-block;
        background-image: url(${SearchIcon});
        background-size: contain;
        background-repeat: no-repeat;
        width: 20px;
        height: 20px;
        padding-bottom: 2px;
      }
    `}

  ${(props) =>
    props.calendar &&
    css`
      &::before {
        content: "";
        display: inline-block;
        background-image: url(${CalendarIcon});
        background-size: contain;
        background-repeat: no-repeat;
        width: 20px;
        height: 20px;
      }
    `}

  ${(props) =>
    props.filter &&
    css`
      &::before {
        content: "";
        display: inline-block;
        background-image: url(${FilterIcon});
        background-size: contain;
        background-repeat: no-repeat;
        width: 30px;
        height: 30px;
      }
    `}
`;

const FilterButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  border-bottom: 2px solid ${colors.primaryColor};
  margin-bottom: 5px;

  &::before {
    content: "";
    display: inline-block;
    background-image: url(${FilterIcon});
    background-size: contain;
    background-repeat: no-repeat;
    width: 30px;
    height: 30px;
  }
`;
