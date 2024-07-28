# CSV Uploader

CSV Uploader is a web application that allows users to upload, display, filter, sort, and download CSV files.

## Features

- Upload CSV files
- Display CSV data in a table format
- Filter data by search term
- Sort table columns in ascending or descending order
- Download the filtered and sorted data as a CSV file

## Technologies Used

- TypeScript
- Bootstrap
- HTML

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/luisaramicar11/outloader-drag-and-drop
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```

## Usage

1. Start the development server:
    ```bash
    npm run dev
    ```
2. Open your browser and navigate to `http://localhost:3000` to use the application.

## Project Structure

- `src/`
  - `controllers/`
    - `convertToCsv.controller.ts`: Contains the function to convert array data to CSV format.
    - `downloadCsv.controller.ts`: Contains the function to download CSV files.
    - `filter.controller.ts`: Contains the function to filter the data based on a search term.
    - `tableTemplate.controller.ts`: Contains the function to generate the HTML table with pagination and sorting.
  - `models/`
    - `file.model.ts`: Defines the TypeScript interfaces for the data structure.
  - `views/`
    - `css/`
      - `bootstrap.min.css`: Bootstrap CSS file.
      - `styles.css`: Own styles.
  - `index.ts`: Main TypeScript file for the application logic.
  - `index.html`: Main HTML file for the application.

## How It Works

1. **Upload CSV File**: The user can select a CSV file to upload using the file input.
2. **Display Data**: The uploaded CSV data is parsed and displayed in a table format.
3. **Filter Data**: The user can filter the displayed data by entering a search term in the search input.
4. **Sort Columns**: The user can sort the table columns in ascending or descending order by clicking on the column headers.
5. **Download CSV**: The user can download the filtered and sorted data as a CSV file by clicking the download button.

## Acknowledgements

- [Bootstrap](https://getbootstrap.com/)
- [TypeScript](https://www.typescriptlang.org/)

