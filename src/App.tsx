import React, { useEffect, useState, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { useMovieStore } from "./store";
import SideNavBar from "./components/sidenavbar";
import { media } from "./utils/mediaBreakPoints";
import "./css/App.css";
import LoadingSpinner from "./components/loadingSpinner";

const Discover = React.lazy(() => import("./pages/discover"));

export default function App(props: any) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleNavBar = () => setIsOpen(!isOpen);

  const initialLoad = useMovieStore((state: any) => state.initialLoad);

  useEffect(() => {
    initialLoad();
  }, [initialLoad]);

  return (
    <Router>
      <PageContainer>
        <SideNavBar isOpen={isOpen} toggleNavBar={toggleNavBar} />
        <ContentWrapper>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route
                path="/discover"
                element={
                  <Discover
                    {...props}
                    isOpen={isOpen}
                    toggleNavBar={toggleNavBar}
                  />
                }
              />
            </Routes>
          </Suspense>
        </ContentWrapper>
      </PageContainer>
    </Router>
  );
}

const ContentWrapper = styled.main`
  padding-left: 280px;

  @media ${media.mobile} {
    padding-left: 10px;
    padding-right: 10px;
  }

  @media ${media.tabletPortrait} {
    padding-left: 200px;
    padding-right: 5px;
  }
`;

const PageContainer = styled.main`
  overflow-x: hidden;
`;
