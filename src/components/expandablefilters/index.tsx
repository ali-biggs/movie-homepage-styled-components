import React, { useState } from "react";
import styled, { css } from "styled-components";
import * as colors from "../../colors";

import Checkbox from "../checkbox";
import { useMovieStore } from "../../store";

interface ExpandableIconProps {
  sectionExpanded?: boolean;
}
interface ExpandableSectionProps {
  expanded?: boolean;
}

export default function ExpandableFilters() {
  const [showGenres, setShowGenres] = useState<boolean>(true);
  const [showMinVote, setShowMinVote] = useState<boolean>(false);
  const [showLanguage, setShowLanguage] = useState<boolean>(false);

  const { genreOptions, languageOptions, ratingOptions } = useMovieStore(
    (state: any) => state
  );

  return (
    <>
      <SectionHeader>
        {genreOptions ? (
          <>
            <ExpandableIcon
              sectionExpanded={showGenres}
              onClick={() => setShowGenres((prev) => !prev)}
              aria-label={
                showGenres ? "Collapse genre section" : "Expand genre section"
              }
              aria-expanded={showGenres}
              aria-controls="genres-section"
            />
            <SectionLabel>Select genre(s)</SectionLabel>
          </>
        ) : (
          <SectionLabel>There was an error retrieving genres</SectionLabel>
        )}
      </SectionHeader>
      <ExpandableSection expanded={showGenres} id="genres-section">
        {genreOptions.map(
          (genre: { name: string; id: number }, index: number) => {
            return (
              <div key={index}>
                <Checkbox label={genre.name} id={genre.id} />
              </div>
            );
          }
        )}
      </ExpandableSection>

      <SectionHeader>
        {ratingOptions ? (
          <>
            <ExpandableIcon
              sectionExpanded={showMinVote}
              onClick={() => setShowMinVote((prev) => !prev)}
              aria-label={
                showMinVote
                  ? "Collapse min vote section"
                  : "Expand min vote section"
              }
              aria-expanded={showMinVote}
              aria-controls="min-vote-section"
            />
            <SectionLabel>Select min. vote</SectionLabel>
          </>
        ) : (
          <SectionLabel>
            There was an error retrieving minimum vote options
          </SectionLabel>
        )}
      </SectionHeader>
      <ExpandableSection expanded={showMinVote} id="min-vote-section">
        {ratingOptions.map(
          (rating: { name: number; id: number }, index: number) => {
            return (
              <div key={index}>
                <Checkbox label={rating.name.toString()} id={rating.id} />
              </div>
            );
          }
        )}
      </ExpandableSection>

      <SectionHeader>
        {languageOptions ? (
          <>
            <ExpandableIcon
              sectionExpanded={showLanguage}
              onClick={() => setShowLanguage((prev) => !prev)}
              aria-label={
                showLanguage
                  ? "Collapse language section"
                  : "Expand language section"
              }
              aria-expanded={showLanguage}
              aria-controls="language-section"
            />
            <SectionLabel>Select language</SectionLabel>
          </>
        ) : (
          <SectionLabel>
            There was an error retrieving language options
          </SectionLabel>
        )}
      </SectionHeader>
      <ExpandableSection expanded={showLanguage} id="language-section">
        {languageOptions.map(
          (language: { name: string; id: string }, index: number) => {
            return (
              <div key={index}>
                <Checkbox label={language.name} id={language.id} />
              </div>
            );
          }
        )}
      </ExpandableSection>
    </>
  );
}

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 3px;
`;

const SectionLabel = styled.div`
  font-weight: 200;
`;

const ExpandableSection = styled.div<ExpandableSectionProps>`
  margin-top: 20px;
  height: ${(props) => (props.expanded ? "300px" : "0px")};
  overflow-y: ${(props) => (props.expanded ? "auto" : "hidden")};
  transition: max-height 0.3s ease-in-out;

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${colors.fontColor};
    border-radius: 10px;
    border: 3px solid transparent;
    background-clip: content-box;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${colors.primaryColor};
  }
`;

const ExpandableIcon = styled.button<ExpandableIconProps>`
  position: relative;
  width: 15px;
  height: 15px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  ${(props) =>
    !props.sectionExpanded
      ? css`
          &::before,
          &::after {
            content: "";
            position: absolute;
            background-color: ${colors.fontColor};
          }

          &::before {
            top: 50%;
            left: 0;
            width: 100%;
            height: 2px;
            transform: translateY(-50%);
          }

          &::after {
            top: 0;
            left: 50%;
            width: 2px;
            height: 100%;
            transform: translateX(-50%);
          }
        `
      : css`
          &::before,
          &::after {
            content: "";
            position: absolute;
            background-color: ${colors.fontColor};
          }

          &::before {
            top: 50%;
            left: 0;
            width: 100%;
            height: 2px;
            transform: translateY(-50%);
          }
        `}
`;
