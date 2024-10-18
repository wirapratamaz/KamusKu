# KamusKu

KamusKu is a digital Indonesian dictionary app built with Next.js. It allows users to explore the richness of the Indonesian language with features that are fast, accurate, and easy to use.

## Features

- **Quick Search**: Find word definitions quickly and accurately in seconds.
- **Comprehensive Dictionary**: Easily access thousands of words and terms in Indonesian.
- **Offline Access**: Use the dictionary anytime, anywhere, even without an internet connection.
- **Word of the Day**: Get a new word every day to expand your vocabulary.
- **Bookmark**: Save your favorite words for easy reference.
- **AI Exploration (Coming Soon)**: Dive deeper into words with AI assistance for broader insights.

## Requirements

- Node.js 14.x or higher
- npm, yarn, or pnpm
- Docker (to run the app in a container)

## Installation

1. **Clone this repository:**

   ```bash
   git clone https://github.com/wirapratamaz/KamusKu.git
   cd kamusku
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

## Running the Development Server

Run the following command to start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Building for Production

To build the app in production mode:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

After the build process is complete, you can start the production server:

```bash
npm run start
# or
yarn start
# or
pnpm start
```

## Using Docker

To run the app using Docker, make sure Docker is installed on your system. Then, run the following commands to build and run the container:

```bash
docker build -t kamusku .
docker run -p 3000:3000 kamusku
```

## Project Structure

- **/pages**: Contains the app's pages.
- **/components**: Contains reusable React components.
- **/lib**: Contains utility functions and libraries.
- **/public**: Contains static files like images and icons.
- **/styles**: Contains global styling files.
- **/src/types/dictionary.ts**: Defines data types for the dictionary API response.
  - `DictionaryResponse`: Data structure for word and definition response.
  - `KBBDictionaryData`: Data structure for KBBI dictionary entries.
  - `KBBIAPIResponse`: Data structure for KBBI API response.
  - Code reference:
    ```typescript:src/types/dictionary.ts
    startLine: 1
    endLine: 15
    ```

## Dataset

The dataset used in this app is a collection of basic Indonesian words stored in the `kata-dasar.original.txt` file. This dataset is used to provide a complete and accurate dictionary.

## Contribution

Contributions are welcome! Please open an issue or submit a pull request for improvements and new features.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For further questions, please contact us at [support@kamusku.com](mailto:support@kamusku.com).

---

_Thank you for using KamusKu! Explore and preserve the Indonesian language with us._

```

```
