import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Discover from "../../pages/discover";
import { useMovieStore } from "../../store";
import { useMediaQuery } from "../../utils/useMediaQuery";

//Mock modules and hooks
jest.mock("../../store", () => ({
  useMovieStore: jest.fn(),
}));

jest.mock("../../utils/useMediaQuery", () => ({
  useMediaQuery: jest.fn(),
}));

const mockUseMovieStore = useMovieStore as unknown as jest.Mock;
const mockUseMediaQuery = useMediaQuery as unknown as jest.Mock;

describe("Discover component integration tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should display loading spinner when movies are being loaded", () => {
    mockUseMovieStore.mockReturnValue({
      genreOptions: [],
      languageOptions: [],
      ratingOptions: [],
      totalCount: 0,
      results: [],
      modalOpen: false,
      modalErrors: [],
      setModalOpen: jest.fn(),
      setModalErrors: jest.fn(),
      searchMovies: jest.fn(),
      initialLoad: jest.fn(),
    });

    render(<Discover toggleNavBar={() => {}} isOpen={false} />);

    expect(screen.getByRole("loading-spinner")).toBeInTheDocument();
  });
});
