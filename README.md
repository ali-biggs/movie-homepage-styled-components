# Cohire Coding Challenge (Frontend)

## Last Updated

18-06-2024

### Introduction

Welcome! This coding challenge is designed to explore your React & SCSS frontend skills. You will have to create a simple SPA based off the provided mockup and make a few API calls to a public web API.

### The challenge

You have to complete the test and write any necessary code so that the search page looks like this [mockup]. All the images/icons you need are already imported into this repository.

The discover page should enable the user to search for movies as keywords are typed into the search bar. Functionality for filtering does not need to be implemented, however the filter categories should still be expandable upon clicking. On mobile devices, the navigation bar should slide in from left to right when the user clicks on the hamburger icon.

As you may have noticed, there are a few TypeScript errors that need to be fixed. Also, there are some UI bugs that you should spot and fix. If time permits, you would want to add responsive stylesheets for the app to run smoothly on mobile devices.

Movie data can be queried via:

- [theMovieDB]

Packages & Technologies used in the repo:

- `axios`
- `node-sass`
- `react-router-dom`
- `styled-components`
- `typescript`

### Setup guide

1. Clone this repo
2. `npm i` to install dependencies. Node v16^ preferable

### Submission guide

Please create a git repository of your solution and send the link to your contact person once you are done.

### How we review

- **Design**: Were you able to translate the mockup into a web application that works well on various browsers and devices? Does the output match the mockup? This is the most important aspect. Weight: 50%
- **Functionality**: Does the search function work? Do the results load instantly as the user types? If the API backend has rate limiting enforced, how do you implement the aforementioned while also taking rate limiting into account? Weight: 25%
- **Code quality**: Is the code easy to understand and maintain? Is the coding style consistent with the language's best practices? Do you demonstrate a good grasp of JavaScript, especially ES6? Weight: 15%
- **Performance**: Does the UI render quickly? Are the choice of libraries etc appropriate for the web page? Weight: 10%

### Bonus points

- **Documentation** - Is the README well written? Are the commit messages clear?
- **Automated Tests** - Are there any automated frontend tests?
- **Reporting** - React Profiler report with demonstrated knowledge of reading / reporting performance data
- **Production-readiness** - Is there proper error handling? Is the code ready to put into production? Code-Splitting?
- **Future-readiness** - React Hooks? Web workers? PWA? Client-side caching?

[mockup]: https://cord-coding-challenges.s3-eu-west-1.amazonaws.com/frontend-test-mockups.zip
[theMovieDB]: https://www.themoviedb.org/documentation/api

### My overview of the project
- **Zustrand** - I chose to use a Zustrand store for state mangement over the Context api or something like Redux due to the simple nature of the project, and it being easy to set up. Due to it being a subscription model it only re-renders components that use the state, making it more effienct for smaller scale projects. It's also very flexible, which would make it easier to scale up if the project were to grow. 
- **Reporting** - I used React Profiler for reporting. I haven't used this before so did some research about where to best place it. As the Discover page/component was the main part of the project, I thought it made most sense to be reporting on that page.
- **Testing** - I utilisied Jest and RTL for my testing. I had some difficulties with setting up the correct config, hence why only the unit tests are passing. If I had more time I would have looked at using either Cypress or Playwright for the integration/e2e testing, as I've had success using these in the past. 
- **Service Workers** - Based off the suggestion in the bonus points section I did a lot of research about service workers and what they're used for as I haven't used these before. I did try to create one following guides online, however I wasn't able to get it working successfully. I've left the code in so you can see my logic. 
- **Styled components** - This was my first time using styled components, which took some getting used to after having used Tailwind for the last 1.5 years. Apologies if these haven't been set up in the best way!
- **Compatibility for tablets** - I followed the mock-ups for the desktop and mobile view, but unfortunately what I created does not translate perfectly for smaller tablet devices. This is definitely something I would improve upon given more time. 
- **Accessibility** - I ran lighthouse reports to find ways to improve accessibility in my application, and made the recommended changes. The only recommendation I didn't implement was the contrast between the yellow and white (for example in the ratings box) not being sufficient, as this was what was present in the mockup. If I were to improve upon this I would create either a dark or high contrast theme which users could toggle as needed. 
