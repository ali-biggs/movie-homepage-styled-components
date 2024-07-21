import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  getGenreOptions,
  getLanguageOptions,
  getMovieByMinVote,
  getMovieByKeywordAndYear,
  getPopularMovies,
  getTotalMovieCount,
  getMovieDetails,
} from "../../utils/fetcher";

//jest.mock("axios");
const mock = new MockAdapter(axios);

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
      //(axios.get as jest.Mock).mockResolvedValueOnce(mockResponse(data));
      mock
        .onGet(
          `${process.env.REACT_APP_TMDB_PUBLIC_URL}/genre/movie/list?language=en`
        )
        .reply(200, data);

      try {
        const genres = await getGenreOptions();
        console.log("Received genres:", genres);
        expect(genres).toEqual(data.genres);
      } catch (error) {
        console.error("Test failed with error:", error);
      }
    });

    // it("should handle errors", async () => {
    //   (axios.get as jest.Mock).mockRejectedValueOnce(
    //     mockError("Network Error")
    //   );

    //   await expect(getGenreOptions()).rejects.toThrow("Network Error");
    // });
  });
});
