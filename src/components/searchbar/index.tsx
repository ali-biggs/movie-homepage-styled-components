import React, { useState } from "react";
import styled, { css } from "styled-components";
import { media } from "../../utils/mediaBreakPoints";
import { useMediaQuery } from "../../utils/useMediaQuery";

import * as colors from "../../colors";
import SearchIcon from "../../images/search-icon-yellow.png";
import CalendarIcon from "../../images/year-icon.png";
import FilterIcon from "../../images/filter-icon.png";

interface KeySearchIconProps {
  magnifyingGlass?: boolean;
  calendar?: boolean;
  filter?: boolean;
}

type SearchBarProps = {
  searchMovies: (keyword: string | undefined, year: number | undefined) => void;
};

export default function SearchBar({ searchMovies }: Readonly<SearchBarProps>) {
  const [keyWord, setKeyWord] = useState<string | undefined>("");
  const [releaseYear, setReleaseYear] = useState<string | undefined>("");
  const isMobile: boolean = useMediaQuery("(max-width: 480px)");

  const handleMovieSearch = async () => {
    let year;
    if (releaseYear) {
      year = parseInt(releaseYear);
    }
    searchMovies(keyWord, year);
  };

  return (
    <>
      <MobileSearchWrapper>
        <SearchWrapper>
          <KeySearchIcon magnifyingGlass />
          <KeyWordInput
            onBlur={handleMovieSearch}
            onKeyDown={handleMovieSearch}
            onChange={(e) => setKeyWord(e.target.value)}
            aria-label="Search for movie using key word"
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
            onBlur={handleMovieSearch}
            onKeyDown={handleMovieSearch}
            onChange={(e) => setReleaseYear(e.target.value)}
            aria-label="Search for movie using year"
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
