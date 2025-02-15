import React from "react";
import styled, { css } from "styled-components";
import * as colors from "../../colors";
import ExpandableFilters from "../expandablefilters";
import SearchBar from "../searchbar";
import { media } from "../../utils/mediaBreakPoints";

interface SearchFiltersContProps {
  marginBottom?: boolean;
}

export default function SearchFilters() {
  return (
    <FiltersWrapper>
      <SearchFiltersCont marginBottom className="search_inputs_cont">
        <SearchBar />
      </SearchFiltersCont>
      <ExpandableFiltersCont className="expandable_filters_cont">
        <CategoryTitle>Movie</CategoryTitle>
        <ExpandableFilters />
      </ExpandableFiltersCont>
    </FiltersWrapper>
  );
}

const FiltersWrapper = styled.div`
  position: relative;
`;

const SearchFiltersCont = styled.div<SearchFiltersContProps>`
  background-color: white;
  padding: 20px;
  border-radius: 3px;
  transition: all 0.3s ease-in-out;

  ${(props) =>
    props.marginBottom &&
    css`
      margin-bottom: 15px;
    `}

  @media ${media.mobile} {
    background-color: ${colors.lightBackground};
    padding: 0px;
  }
`;

const ExpandableFiltersCont = styled.div`
  background-color: white;
  padding-top: 10px;
  padding-left: 20px;
  border-radius: 3px;
  transition: all 0.3s ease-in-out;

  @media ${media.mobile} {
    display: none;
  }
`;

const CategoryTitle = styled.h2`
  font-size: 1.2em;
  margin-bottom: 10px;
`;
