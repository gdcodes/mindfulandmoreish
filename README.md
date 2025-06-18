# Mindful and Moreish

A modern and performant food blog platform built with Gatsby and TypeScript, designed for sharing recipes, cooking tips, and culinary adventures. Perfect for food enthusiasts who want to create a beautiful digital home for their delicious creations.

---

## 📖 About The Project

This project is a fully-featured, modern, and visually appealing blog ready for your delicious recipes. It's powered by [Contentful](https://www.contentful.com/), a headless CMS, which allows for easy management of your content. 

> **Note**: The branding assets in `src/images` were generated using ChatGPT.

### Built With

*   [Gatsby](https://www.gatsbyjs.com/)
*   [React](https://reactjs.org/)
*   [TypeScript](https://www.typescriptlang.org/)
*   [Contentful](https://www.contentful.com/)
*   [Emotion](https://emotion.sh/)
*   [Netlify](https://www.netlify.com/)
*   [Cursor](https://www.cursor.com/)
*   [ChatGPT](https://chatgpt.com/)
*   [Windsurf](https://www.windsurf.com/) 

---

## ✨ Features

- **CMS-Powered by Contentful**: Easily manage your recipes through a powerful and user-friendly CMS.
- **Modern Tech Stack**: Built with Gatsby, TypeScript, and Emotion for a fast, type-safe, and beautifully styled experience.
- **Interactive & Engaging**:
  - Scrapbook-style photo galleries for each recipe.
  - Search, filter, and sort functionality on the homepage.
- **Ready for Deployment**: Pre-configured for seamless deployment on Netlify.
- **SEO Optimized**: SEO component included for better search engine visibility.

---

## 🚀 Getting Started

Follow these steps to get your local development environment up and running.

### Prerequisites

*   Node.js (v18 or later recommended)
*   `npm` 

### Installation

1.  **Clone the repository**
    ```sh
    git clone https://github.com/your-username/mindfulandmoreish.git
    cd mindfulandmoreish
    ```

2.  **Install dependencies**
    ```sh
    npm install
    ```

3.  **Set up environment variables**
    - Create an environment file .env
    - The file will look like this. You need to fill it with your own Contentful credentials.
      ```
      # Contentful API keys
      CONTENTFUL_SPACE_ID="<your_space_id>"
      CONTENTFUL_ACCESS_TOKEN="<your_access_token>"
      ```
    - You can get these keys by signing up for a free [Contentful account](https://www.contentful.com/), creating a new **Space**, and navigating to **Settings > API keys**.
4.  **Set up the Contentful model**
    - For the blog to work, your Contentful space needs a specific `Recipe` content model. Please refer to the **[Contentful Setup Guide](./CONTENTFUL_SETUP.md)** for detailed instructions on how to configure it.

---

## 🛠️ Usage

Once the setup is complete, you can run the development server:

```bash
npm run develop
```

Your site will be running at `http://localhost:8000`. You can also access a GraphQL playground at `http://localhost:8000/___graphql` to explore your Contentful data.

### Available Scripts

- `npm run develop`: Starts the Gatsby development server.
- `npm run build`: Builds the static site for production.
- `npm run serve`: Serves the production build locally.
- `npm run clean`: Clears the Gatsby cache.
- `npm run typecheck`: Runs the TypeScript compiler to check for type errors.

---

## 🌐 Deployment

This project is pre-configured for deployment on [Netlify](https://www.netlify.com/).

1.  Push your code to a GitHub/GitLab/Bitbucket repository.
2.  Create a new site on Netlify and link it to your repository.
3.  Netlify will automatically detect the `netlify.toml` file and use the correct build settings.
4.  You will need to add your environment variables (`CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN`) in the Netlify UI under **Site settings > Build & deploy > Environment**.

---

## 🧪 Testing

This project uses **Jest** for unit and component testing, and **Cypress** for end-to-end (E2E) testing. Code coverage is collected from both test suites and merged into a single report.

---

### Running Tests

#### Unit Tests (Jest)

Run unit tests with:

```bash
npm test
```

Run unit tests with coverage:
```bash
npm run test:coverage
```

📂 Coverage reports from Jest will be saved under coverage/jest/.

#### End-to-End Tests (Cypress)

Make sure your Gatsby development server is not already running, as the E2E script will start it automatically.

Open Cypress Test Runner (interactive mode):
```bash
npm run cy:open
```

Run E2E tests headlessly against the Gatsby dev server:
```bash
npm run test:e2e
```

The E2E tests run against the Gatsby development server at http://localhost:8000.

#### Combined Coverage Report

To generate a combined coverage report from both Jest and Cypress tests, run:

```bash
npm run coverage:full
```

This command runs Jest tests with coverage, runs Cypress E2E tests (which collect coverage), then merges both coverage outputs into a unified report. The coverage merging uses NYC’s merge command to combine coverage files.

📂 The combined coverage reports will be saved in the coverage/ directory. Open coverage/lcov-report/index.html in a browser to view the detailed coverage report.

---

## 🙌 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📬 Feedback
Have feedback, questions, or ideas? Just drop us an email at info@mindfulandmoreish.com!

---

## 📄 License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.