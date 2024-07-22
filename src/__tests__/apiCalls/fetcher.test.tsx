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

const mock = new MockAdapter(axios);

describe("API Calls", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  //getGenreOptions tests
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

    it("should handle errors", async () => {
      mock
        .onGet(
          `${process.env.REACT_APP_TMDB_PUBLIC_URL}/genre/movie/list?language=en`
        )
        .reply(400, "Network Error");

      try {
        await expect(getGenreOptions()).rejects.toThrow("Network Error");
      } catch (error) {
        console.error("Test failed with error:", error);
      }
    });
  });

  //getLanguageOptions tests
  describe("getLanguageOptions", () => {
    it("Should return language options", async () => {
      const data = [
        {
          iso_639_1: "bi",
          english_name: "Bislama",
          name: "",
        },
        {
          iso_639_1: "ka",
          english_name: "Georgian",
          name: "ქართული",
        },
        {
          iso_639_1: "pa",
          english_name: "Punjabi",
          name: "ਪੰਜਾਬੀ",
        },
      ];

      mock
        .onGet(
          `${process.env.REACT_APP_TMDB_PUBLIC_URL}/configuration/languages`
        )
        .reply(200, data);

      try {
        const languages = await getLanguageOptions();
        console.log("Received languges:", languages);
        expect(languages).toEqual(
          data
            .map((item) => ({ id: item.iso_639_1, name: item.english_name }))
            .sort((a, b) => a.name.localeCompare(b.name))
        );
      } catch (error) {
        console.error("Test failed with error:", error);
      }
    });

    it("should handle errors", async () => {
      mock
        .onGet(
          `${process.env.REACT_APP_TMDB_PUBLIC_URL}/genre/movie/list?language=en`
        )
        .reply(400, "Network Error");

      try {
        await expect(getGenreOptions()).rejects.toThrow("Network Error");
      } catch (error) {
        console.error("Test failed with error:", error);
      }
    });
  });

  //getMovieByMinVote tests
  describe("getMovieByMinVote", () => {
    const vote = 7;
    it("Should return movie by min vote", async () => {
      const data = {
        results: [
          {
            adult: false,
            backdrop_path: "/kSbYfVDCcCv86BOfhc1Qpr8uX4q.jpg",
            genre_ids: [18, 80],
            id: 1255065,
            original_language: "cn",
            original_title: "谈判专家",
            overview:
              "Negotiator expert Cheuk Man Wai (played by Sean Lau) unexpectedly becomes the prime suspect in a murder case. Forced into a corner, he occupies the police station, taking officers hostage, and demands negotiations with the former negotiator Tse Ka Chun (played by Francis NG). With Tse's expertise in psychological manipulation and Check's exceptional skills, they engage in a battle of wits. As the verbal sparring deepens, their positions and mindsets gradually change...  This film is adapted from the American movie \"The Negotiator\".",
            popularity: 32.254,
            poster_path: "/3nBr1HD711Zo8pBFr5ZUDQ4Wyql.jpg",
            release_date: "2024-05-24",
            title: "Crisis Negotiators",
            video: false,
            vote_average: 7,
            vote_count: 6,
          },
          {
            adult: false,
            backdrop_path: "/tHnHTp50qDx7br1i9ulh74MUW0A.jpg",
            genre_ids: [18, 10749, 80],
            id: 511809,
            original_language: "en",
            original_title: "West Side Story",
            overview:
              "Two youngsters from rival New York City gangs fall in love, but tensions between their respective friends build toward tragedy.",
            popularity: 50.041,
            poster_path: "/myAX5qoD6YVLNGiWpk2wcU66Vfq.jpg",
            release_date: "2021-12-08",
            title: "West Side Story",
            video: false,
            vote_average: 7,
            vote_count: 1499,
          },
        ],
      };

      mock
        .onGet(
          `${process.env.REACT_APP_TMDB_PUBLIC_URL}/discover/movie?sort_by=popularity.desc&vote_average.gte=${vote}&vote_average.lte=${vote}`
        )
        .reply(200, data);

      try {
        const movies = await getGenreOptions();
        console.log("Received movies:", movies);
        expect(movies).toEqual(data.results);
      } catch (error) {
        console.error("Test failed with error:", error);
      }
    });

    it("should handle errors", async () => {
      mock
        .onGet(
          `${process.env.REACT_APP_TMDB_PUBLIC_URL}/discover/movie?sort_by=popularity.desc&vote_average.gte=${vote}&vote_average.lte=${vote}`
        )
        .reply(400, "Network Error");

      try {
        await expect(getGenreOptions()).rejects.toThrow("Network Error");
      } catch (error) {
        console.error("Test failed with error:", error);
      }
    });
  });

  //getMovieByKeywordAndYear tests
  describe("getMovieByKeywordAndYear", () => {
    const year = "1997";
    const keyword = "Monster";
    it("Should return movie by release year", async () => {
      const data = {
        results: [
          {
            adult: false,
            backdrop_path: "/vbtEoDHhwwsX34GbzhKezsleTPN.jpg",
            genre_ids: [28, 12, 18],
            id: 664,
            original_language: "en",
            original_title: "Twister",
            overview:
              "An unprecedented series of violent tornadoes is sweeping across Oklahoma. Tornado chasers, headed by Dr. Jo Harding, attempt to release a groundbreaking device that will allow them to track them and create a more advanced warning system. They are joined by Jo's soon to be ex-husband Bill, a former tornado chaser himself, and his girlfriend Melissa.",
            popularity: 331.286,
            poster_path: "/fZ0Y2qSDKQJolrQhIDpTwx3GlYB.jpg",
            release_date: "1996-05-10",
            title: "Twister",
            video: false,
            vote_average: 6.495,
            vote_count: 3189,
          },
          {
            adult: false,
            backdrop_path: "/sDH1LkdFOkQmTJaF1sIIniQyFOk.jpg",
            genre_ids: [18, 10749],
            id: 597,
            original_language: "en",
            original_title: "Titanic",
            overview:
              "101-year-old Rose DeWitt Bukater tells the story of her life aboard the Titanic, 84 years later. A young Rose boards the ship with her mother and fiancé. Meanwhile, Jack Dawson and Fabrizio De Rossi win third-class tickets aboard the ship. Rose tells the whole story from Titanic's departure through to its death—on its first and last voyage—on April 15, 1912.",
            popularity: 229.961,
            poster_path: "/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
            release_date: "1997-11-18",
            title: "Titanic",
            video: false,
            vote_average: 7.9,
            vote_count: 24852,
          },
        ],
      };
      mock
        .onGet(
          `${process.env.REACT_APP_TMDB_PUBLIC_URL}/${process.env.REACT_APP_TMDB_PUBLIC_URL}/discover/movie?sort_by=popularity.desc&year=${year}`
        )
        .reply(200, data);

      try {
        const movies = await getGenreOptions();
        console.log("Received movies:", movies);
        expect(movies).toEqual(data.results);
      } catch (error) {
        console.error("Test failed with error:", error);
      }
    });

    it("Should return movie by keyword", async () => {
      const data = {
        results: [
          {
            adult: false,
            backdrop_path: "/vbtEoDHhwwsX34GbzhKezsleTPN.jpg",
            genre_ids: [28, 12, 18],
            id: 664,
            original_language: "en",
            original_title: "Twister",
            overview:
              "An unprecedented series of violent tornadoes is sweeping across Oklahoma. Tornado chasers, headed by Dr. Jo Harding, attempt to release a groundbreaking device that will allow them to track them and create a more advanced warning system. They are joined by Jo's soon to be ex-husband Bill, a former tornado chaser himself, and his girlfriend Melissa.",
            popularity: 331.286,
            poster_path: "/fZ0Y2qSDKQJolrQhIDpTwx3GlYB.jpg",
            release_date: "1996-05-10",
            title: "Twister",
            video: false,
            vote_average: 6.495,
            vote_count: 3189,
          },
          {
            adult: false,
            backdrop_path: "/sDH1LkdFOkQmTJaF1sIIniQyFOk.jpg",
            genre_ids: [18, 10749],
            id: 597,
            original_language: "en",
            original_title: "Titanic",
            overview:
              "101-year-old Rose DeWitt Bukater tells the story of her life aboard the Titanic, 84 years later. A young Rose boards the ship with her mother and fiancé. Meanwhile, Jack Dawson and Fabrizio De Rossi win third-class tickets aboard the ship. Rose tells the whole story from Titanic's departure through to its death—on its first and last voyage—on April 15, 1912.",
            popularity: 229.961,
            poster_path: "/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
            release_date: "1997-11-18",
            title: "Titanic",
            video: false,
            vote_average: 7.9,
            vote_count: 24852,
          },
        ],
      };
      mock
        .onGet(
          `${process.env.REACT_APP_TMDB_PUBLIC_URL}/${process.env.REACT_APP_TMDB_PUBLIC_URL}/discover/movie?sort_by=popularity.desc&with_keywords=${keyword}`
        )
        .reply(200, data);

      try {
        const movies = await getGenreOptions();
        console.log("Received movies:", movies);
        expect(movies).toEqual(data.results);
      } catch (error) {
        console.error("Test failed with error:", error);
      }
    });

    it("should handle errors", async () => {
      mock
        .onGet(
          `${process.env.REACT_APP_TMDB_PUBLIC_URL}/discover/movie?sort_by=popularity.desc&year=${year}&with_keywords=${keyword}`
        )
        .reply(400, "Network Error");

      try {
        await expect(getGenreOptions()).rejects.toThrow("Network Error");
      } catch (error) {
        console.error("Test failed with error:", error);
      }
    });
  });

  //getPopularMovies tests
  describe("getPopularMovies", () => {
    it("Should return list of popular movies", async () => {
      const data = {
        results: [
          {
            backdrop_path: "/iIvjwrDPQHCU4NjbbKpNs88uk6G.jpg",
            id: 1048241,
            title: "My Spy the Eternal City",
            original_title: "My Spy the Eternal City",
            overview:
              "JJ, a veteran CIA agent, reunites with his protégé Sophie, in order to prevent a catastrophic nuclear plot targeting the Vatican.",
            poster_path: "/Bf3vCfM94bSJ1saZlyi0UW0e0U.jpg",
            media_type: "movie",
            adult: false,
            original_language: "en",
            genre_ids: [28, 35],
            popularity: 384.426,
            release_date: "2024-07-18",
            video: false,
            vote_average: 7.04,
            vote_count: 88,
          },
          {
            backdrop_path: "/6HpRZeA0JdY5fRgl89KKExsvvwR.jpg",
            id: 774531,
            title: "Young Woman and the Sea",
            original_title: "Young Woman and the Sea",
            overview:
              "This is the extraordinary true story of Trudy Ederle, the first woman to successfully swim the English Channel. Through the steadfast support of her older sister and supportive trainers, she overcame adversity and the animosity of a patriarchal society to rise through the ranks of the Olympic swimming team and complete the 21-mile trek from France to England.",
            poster_path: "/bZlecCuBVvKuarNGvchBwaOsQ3c.jpg",
            media_type: "movie",
            adult: false,
            original_language: "en",
            genre_ids: [36, 18],
            popularity: 69.079,
            release_date: "2024-05-31",
            video: false,
            vote_average: 7.8,
            vote_count: 54,
          },
          {
            backdrop_path: "/7aPrv2HFssWcOtpig5G3HEVk3uS.jpg",
            id: 718821,
            title: "Twisters",
            original_title: "Twisters",
            overview:
              "As storm season intensifies, the paths of former storm chaser Kate Carter and reckless social-media superstar Tyler Owens collide when terrifying phenomena never seen before are unleashed. The pair and their competing teams find themselves squarely in the paths of multiple storm systems converging over central Oklahoma in the fight of their lives.",
            poster_path: "/bYmszCd9kRbwmXWvxMai9Mm9B92.jpg",
            media_type: "movie",
            adult: false,
            original_language: "en",
            genre_ids: [28, 12, 53],
            popularity: 871.4,
            release_date: "2024-07-10",
            video: false,
            vote_average: 7.4,
            vote_count: 159,
          },
        ],
      };

      mock
        .onGet(`${process.env.REACT_APP_TMDB_PUBLIC_URL}/movie/popular`)
        .reply(200, data);

      try {
        const movies = await getPopularMovies();
        console.log("Received movies:", movies);
        expect(movies).toEqual(data.results);
      } catch (error) {
        console.error("Test failed with error:", error);
      }
    });

    it("should handle errors", async () => {
      mock
        .onGet(`${process.env.REACT_APP_TMDB_PUBLIC_URL}/movie/popular`)
        .reply(400, "Network Error");

      try {
        await expect(getGenreOptions()).rejects.toThrow("Network Error");
      } catch (error) {
        console.error("Test failed with error:", error);
      }
    });
  });

  //getMovieDetails tests
  describe("getMovieDetails", () => {
    const id = 123;
    it("Should return movie details", async () => {
      const data = {
        adult: false,
        backdrop_path: "/jOuCWdh0BE6XPu2Vpjl08wDAeFz.jpg",
        belongs_to_collection: null,
        budget: 4000000,
        genres: [
          {
            id: 12,
            name: "Adventure",
          },
          {
            id: 16,
            name: "Animation",
          },
          {
            id: 14,
            name: "Fantasy",
          },
        ],
        homepage: "",
        id: 123,
        imdb_id: "tt0077869",
        origin_country: ["US", "GB"],
        original_language: "en",
        original_title: "The Lord of the Rings",
        overview:
          "The Fellowship of the Ring embark on a journey to destroy the One Ring and end Sauron's reign over Middle-earth.",
        popularity: 42.085,
        poster_path: "/liW0mjvTyLs7UCumaHhx3PpU4VT.jpg",
        production_companies: [
          {
            id: 286,
            logo_path: null,
            name: "Fantasy Films",
            origin_country: "",
          },
          {
            id: 4921,
            logo_path: null,
            name: "Bakshi Productions",
            origin_country: "",
          },
          {
            id: 141322,
            logo_path: null,
            name: "Saul Zaentz Film Productions",
            origin_country: "",
          },
          {
            id: 60,
            logo_path: "/1SEj4nyG3JPBSKBbFhtdcHRaIF9.png",
            name: "United Artists",
            origin_country: "US",
          },
        ],
        production_countries: [
          {
            iso_3166_1: "GB",
            name: "United Kingdom",
          },
          {
            iso_3166_1: "US",
            name: "United States of America",
          },
        ],
        release_date: "1978-11-15",
        revenue: 30500000,
        runtime: 132,
        spoken_languages: [
          {
            english_name: "English",
            iso_639_1: "en",
            name: "English",
          },
        ],
        status: "Released",
        tagline: "Fantasy...beyond your imagination",
        title: "The Lord of the Rings",
        video: false,
        vote_average: 6.582,
        vote_count: 857,
      };

      mock
        .onGet(`${process.env.REACT_APP_TMDB_PUBLIC_URL}/movie/${id}`)
        .reply(200, data);

      try {
        const movie = await getMovieDetails(id);
        console.log("Received movie:", movie);
        expect(movie).toEqual(data);
      } catch (error) {
        console.error("Test failed with error:", error);
      }
    });

    it("should handle errors", async () => {
      mock
        .onGet(`${process.env.REACT_APP_TMDB_PUBLIC_URL}/movie/${id}`)
        .reply(400, "Network Error");

      try {
        await expect(getGenreOptions()).rejects.toThrow("Network Error");
      } catch (error) {
        console.error("Test failed with error:", error);
      }
    });
  });
});
