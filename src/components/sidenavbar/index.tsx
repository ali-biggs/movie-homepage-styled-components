import React from "react";
import styled, { css } from "styled-components";
import { NavLink as Link } from "react-router-dom";
import BackButton from "../backButton";
import * as colors from "../../colors";
import Arrow from "../../images/arrow-icon.png";
import SearchWhite from "../../images/search-icon-white.png";
import { media } from "../../utils/mediaBreakPoints";
import { useMediaQuery } from "../../utils/useMediaQuery";

interface NavIconProps {
  arrow?: boolean;
  search?: boolean;
}

interface SideNavBarContProps {
  isOpen?: boolean;
}

type SideNavBarProps = {
  isOpen: boolean;
  toggleNavBar: () => void;
};

export default function SideNavBar({ isOpen, toggleNavBar }: Readonly<SideNavBarProps>) {
  const isMobile: boolean = useMediaQuery("(max-width: 480px)");
  return (
    <SideNavBarCont
        isOpen={isOpen}
        role="navigation"
        aria-label="Main Navigation"
      >
        <SideNavMainLink
          className="menu_nav_link main_nav_link"
          to="/"
          //activeClassName="active"
          //exact
          role="link"
        >
          Wesley
          <NavIcon arrow aria-hidden="false"></NavIcon>
        </SideNavMainLink>
        <SideNavMainLink
          className="menu_nav_link"
          to="/discover"
          //activeClassName="active"
          role="link"
        >
          Discover
          <NavIcon search aria-hidden="false"></NavIcon>
        </SideNavMainLink>
        <SideNavHeader>
          <HeaderText>Watched</HeaderText>
        </SideNavHeader>
        <NavLink
          className="menu_nav_link"
          to="/watched/movies"
          //activeClassName="active"
          role="link"
        >
          Movies
        </NavLink>
        <NavLink
          className="menu_nav_link"
          to="/watched/tv-shows"
          //activeClassName="active"
          role="link"
        >
          Tv Shows
        </NavLink>
        <SideNavHeader>
          <HeaderText>Saved</HeaderText>
        </SideNavHeader>
        <NavLink
          className="menu_nav_link"
          to="/saved/movies"
          //activeClassName="active"
          role="link"
        >
          Movies
        </NavLink>
        <NavLink
          className="menu_nav_link"
          to="/saved/tv-shows"
          //activeClassName="active"
          role="link"
        >
          Tv Shows
        </NavLink>
        {isMobile && (
          <BackButtonCon>
            <BackButton onClick={toggleNavBar} aria-label="Back button" />
          </BackButtonCon>
        )}
      </SideNavBarCont>
  );
}

const SideNavBarCont = styled.div<SideNavBarContProps>`
  position: fixed;
  z-index: 9;
  width: 280px;
  height: 100%;
  background-color: ${colors.sideNavBar};

  @media ${media.tabletPortrait} {
    width: 200px;
  }

  @media ${media.mobile} {
    ${(props) =>
      props.isOpen
        ? css`
            display: block;
            width: 100%;
            transition: right 2s ease-in-out;
          `
        : css`
            transform: translateX(-100%);
          `}
  }
`;

const SideNavMainLink = styled(Link)`
  position: relative;
  display: block;
  padding: 25px 35px;
  font-size: 1.6em;
  font-weight: 700;
  color: white;



  &:hover {
    background: ${colors.primaryColor};
  }

  &:active {
    background: ${colors.primaryColor};
  }
`;

const NavIcon = styled.div<NavIconProps>`
  position: absolute;
  right: 35px;
  top: 50%;

  @media ${media.tabletPortrait} {
    right: 8px;
  }

  ${(props) =>
    props.arrow &&
    css`
      &::after {
        content: "";
        display: inline-block;
        background-image: url(${Arrow});
        background-size: contain;
        background-repeat: no-repeat;
        width: 30px;
        height: 30px;
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-40%);
      }
    `}

  ${(props) =>
    props.search &&
    css`
      &::before {
        content: "";
        display: inline-block;
        background-image: url(${SearchWhite});
        background-size: contain;
        background-repeat: no-repeat;
        width: 30px;
        height: 30px;
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-40%);
      }
    `}
`;

const SideNavHeader = styled.div`
  position: relative;
  display: block;
  padding: 25px 35px;
  margin-bottom: 10px;
  font-size: 1.6em;
  color: white;
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    margin-left: 35px;
    width: full;
    border-bottom: 0.5px solid white;
    margin-bottom: 5px;
  }
`;

const HeaderText = styled.div``;

const NavLink = styled(Link)`
  display: block;
  padding: 5px 35px;
  font-size: 1.2em;
  font-weight: 300;
  color: white;
`;

const BackButtonCon = styled.div`
  position: absolute;
  bottom: 10px;
  right: 30px;
`;
