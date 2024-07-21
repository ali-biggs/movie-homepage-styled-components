import axios from "axios";
import {
  getGenreOptions,
  getLanguageOptions,
  getMovieByMinVote,
  getMovieByKeywordAndYear,
  getPopularMovies,
  getTotalMovieCount,
  getMovieDetails,
} from "../../utils/fetcher";

jest.mock("axios");

const mockResponse = (data: any) => Promise.resolve({ data });
const mockError = (message: string) => Promise.reject(new Error(message));

describe("API Calls", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getGenreOptions", () => {
    it("Should return genre options", async () => {
      const data = {
        genres: [
          {
            id: 28,
            name: "Action",
          },
          {
            id: 14,
            name: "Fantasy",
          },
          {
            id: 27,
            name: "Horror",
          },
        ],
      };
      (axios.get as jest.Mock).mockResolvedValueOnce(mockResponse(data));

      const genres = await getGenreOptions();
      expect(genres).toEqual(data.genres);

      it("should handle errors", async () => {
        (axios.get as jest.Mock).mockRejectedValueOnce(
          mockError("Network Error")
        );

        await expect(getGenreOptions()).rejects.toThrow("Network Error");
      });
    });
  });
});
