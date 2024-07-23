import { create } from "zustand";
import {
  getLanguageOptions,
  getGenreOptions,
  getMovieByKeywordAndYear,
  getPopularMovies,
  getTotalMovieCount,
} from "../utils/fetcher";

export const useMovieStore = create((set) => ({
  keyword: "",
  year: 0,
  results: [],
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
  filtersModalOpen: false,
  errorModalOpen: false,
  modalErrors: [],

  setResults: (results: []) => set({ results, totalCount: results.length }),
  setGenreOptions: (genreOptions: []) => set({ genreOptions }),
  setLanguageOptions: (languageOptions: []) => set({ languageOptions }),
  setErrorModalOpen: (errorModalOpen: boolean) => set({ errorModalOpen }),
  setFiltersModalOpen: (filtersModalOpen: boolean) => set({ filtersModalOpen }),
  setModalErrors: (modalErrors: string[]) => set({ modalErrors }),
  setKeyword: (keyword: string) => set({ keyword }),
  setYear: (year: number) => set({ year }),

  searchMovies: async (keyword: string, year: number): Promise<void> => {
    const searchResults = await getMovieByKeywordAndYear(keyword, year);
    if (searchResults.length > 0) {
      set({ results: searchResults, totalCount: searchResults.length });
    } else {
      set({
        modalErrors: ["There are no matches for this search"],
        errorModalOpen: true,
      });
    }
  },

  initialLoad: async () => {
    try {
      const popularMovies = await getPopularMovies();
      const movieGenres = await getGenreOptions();
      const totalCount = await getTotalMovieCount();
      const languageOptions = await getLanguageOptions();

      set({
        results: popularMovies,
        genreOptions: movieGenres,
        totalCount,
        languageOptions,
      });
    } catch (error) {
      console.error("Error fetching initial data: ", error);
    }
  },
}));
