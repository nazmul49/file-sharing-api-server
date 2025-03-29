# File Sharing API Server

A simple file-sharing API server built with Node.js, Express, Sequelize, and SQLite. This server allows users to upload, download, and delete files, with support for background jobs to clean up inactive files.

## Features

- **File Upload:** Upload files and store metadata in the database.
- **File Download:** Retrieve files using a public key.
- **File Deletion:** Delete files using a private key.
- **Background Jobs:** Automatically delete inactive files after a specified period.
- **Database Integration:** Store file metadata in a relational database using Sequelize.
- **Logging:** Logging with timestamps using Winston.
- **Test:** Integration tests using mocha.


---

## Installation

### Prerequisites

- Node.js (v22 or higher)
- npm or yarn

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/nazmul49/file-sharing-api-server.git
   cd file-sharing-api-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure the following variables:
   ```env
   PORT=3009
   STORAGE_PROVIDER=local
   UPLOAD_DIR=uploads
   MAX_FILE_SIZE=10485760 # 10 MB
   LOGGER_LEVEL=info
   LOGGER_DIR=logs
   DELETE_THRESHOLD=6 # For deleting 6 months unused files
   ```


---

## Usage

### Start the Server

To start the server, run:
```bash
npm start
```

The server will be available at `http://localhost:3009`.

---

## API Endpoints

### File Upload
- **Endpoint**: `POST /files`
- **Description**: Upload a file.
- **Headers**: `Content-Type: multipart/form-data`
- **Body**: A file with the field name `file`.
- **Response**:
  ```json
  {
    "publicKey": "public-key",
    "privateKey": "private-key"
  }
  ```

### File Download
- **Endpoint**: `GET /files/:publicKey`
- **Description**: Download a file using its public key.
- **Response**: The file content.

### File Deletion
- **Endpoint**: `DELETE /files/:privateKey`
- **Description**: Delete a file using its private key.
- **Response**:
  ```json
  {
    "message": "File deleted successfully"
  }
  ```

---

## Background Jobs

### Delete Inactive Files
- **Description**: Deletes files that haven't been accessed in the last 6 months.
- **Implementation**: Runs daily at midnight using `cron`.
- **File**: `bg-jobs.js`

To start background jobs, ensure the `bg-jobs.js` is imported and started in `index.js`.

---

## Project Structure

```
file-sharing-api-server/
├── config/
│   ├── conf.js            # Configuration file
│   ├── database.js        # Sequelize database configuration
│   ├── logger.js          # Winston logger configuration
├── modules/
│   ├── files/
│   │   ├── routes/        # API routes
│   │   ├── controllers/   # API controllers
│   │   ├── services/      # Business logic and file handling
│   │   ├── models/        # Sequelize models
├── tasks/
│   ├── deleteInactiveFiles.js # Task to delete inactive files
├── tasks/
│   ├── test_fileOperations.js # Integration tests for the endpoints
├── uploads/               # Directory for uploaded files
├── logs/                  # Directory for logs
├── bg-jobs.js             # Background job scheduler
├── .gitignore             # Git ignore file
├── package.json           # Project dependencies and scripts
├── README.md              # Project documentation
```

---

## Logging

- **Library**: Winston
- **Log Levels**: Configurable via `.env` (`info`, `error`, etc.).
- **Log Files**: Stored in the `logs/` directory.

---

## Development

### Run in Development Mode
```bash
npm run dev
```

### Run Tests
```bash
npm test
```

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
