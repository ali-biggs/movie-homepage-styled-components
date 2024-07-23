import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
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
      errorModalOpen: false,
      modalErrors: [],
      setErrorModalOpen: jest.fn(),
      setModalErrors: jest.fn(),
      searchMovies: jest.fn(),
      initialLoad: jest.fn(),
    });

    render(<Discover toggleNavBar={() => {}} isOpen={false} />);

    expect(screen.getByRole("loading-spinner")).toBeInTheDocument();
  });

  it("Should show error modal when there are errors", async () => {
    mockUseMovieStore.mockReturnValue({
      genreOptions: [],
      languageOptions: [],
      ratingOptions: [],
      totalCount: 0,
      results: [],
      errorModalOpen: true,
      modalErrors: ["An error occurred"],
      setErrorModalOpen: jest.fn(),
      setModalErrors: jest.fn(),
      searchMovies: jest.fn(),
      initialLoad: jest.fn(),
    });

    render(<Discover toggleNavBar={() => {}} isOpen={false} />);
    expect(screen.getByText("An error occurred")).toBeInTheDocument();

    //Test for modal close
    fireEvent.click(screen.getByRole("close-button", { name: /close/i }));
    await waitFor(() =>
      expect(screen.queryByText("An error occurred")).not.toBeInTheDocument()
    );
  });

  it("Should toggle navbar visability when burger menu icon is clicked", () => {
    let isOpen = false;
    const toggleNavBar = () => {
      isOpen = !isOpen;
    };

    mockUseMediaQuery.mockReturnValue(true); //Setting mobile view to true
    mockUseMovieStore.mockReturnValue({
      genreOptions: [],
      languageOptions: [],
      ratingOptions: [],
      totalCount: 0,
      results: [],
      errorModalOpen: false,
      modalErrors: [],
      setErrorModalOpen: jest.fn(),
      setModalErrors: jest.fn(),
      searchMovies: jest.fn(),
      initialLoad: jest.fn(),
    });

    render(<Discover toggleNavBar={toggleNavBar} isOpen={isOpen} />);
    const burgerMenuButton = screen.getByLabelText("Menu");
    fireEvent.click(burgerMenuButton);

    expect(isOpen).toBe(true);
  });
});
