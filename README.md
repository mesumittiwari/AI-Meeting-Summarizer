# AI-Meeting-Summarizer

![Project Banner](https://github.com/user-attachments/assets/e61ab72a-c820-4daa-b753-8be9d39ca3d2)


[![Python](https://img.shields.io/badge/Python-3.9%2B-blue?logo=python&logoColor=white)](https://www.python.org/)
[![Framework](https://img.shields.io/badge/Backend-FastAPI%20/%20Flask-green?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/) [![Language Model](https://img.shields.io/badge/LLM-Gemini%20/%20HuggingFace-orange?logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)  [![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/mesumittiwari/AI-Meeting-Summarizer)](https://github.com/mesumittiwari/AI-Meeting-Summarizer/commits/main)
[![Deployment](https://img.shields.io/badge/Deployed%20on-Render-46E0B4?logo=render&logoColor=white)](https://render.com/) 

## Table of Contents

* [Overview](#overview)
* [Features](#features)
* [Technologies Used](#technologies-used)
* [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Local Installation](#local-installation)
    * [Environment Variables](#environment-variables)
    * [Running the Backend](#running-the-backend)
    * [Running the Frontend](#running-the-frontend)
* [Usage](#usage)
* [Project Structure](-project-structure)
* [Deployment](#-deployment)
* [Contact](#-contact)
* [Acknowledgments](#-acknowledgments)

---

## Overview

The **AI Meeting Summarizer** is a powerful web application designed to streamline your post-meeting workflows. It leverages state-of-the-art Artificial Intelligence to automatically transcribe spoken meeting audio and generate concise, actionable summaries. Say goodbye to manual note-taking and missed key points – focus on the discussion, and let the AI handle the rest!

This project aims to provide a robust solution for:
* Converting raw meeting audio into accurate text transcripts.
* Extracting the most important information, decisions, and action items.
* Saving valuable time for individuals and teams.

The output is categorized into:
- 📌 **Pain Points**
- 🛑 **Objections**
- ✅ **Next Steps**
- ⏳ **Timeline**

## Features

* **Audio Transcription:** Upload audio files (e.g., MP3, WAV) and get accurate text transcripts using advanced Speech-to-Text models.
* **AI-Powered Summarization:** Utilizes large language models to condense lengthy transcripts into clear, coherent, and concise summaries.
* **Key Information Extraction:** Automatically identifies and highlights critical decisions, action items, and discussion points.
* **User-Friendly Interface:** An intuitive web interface for easy audio upload, transcription, and summary viewing.
* **Scalable Backend:** Designed with a modular backend for easy integration of different AI models and future enhancements.
* **Secure API Key Handling:** Emphasizes best practices for managing sensitive API keys.

## Technologies Used

This project is built using a modern stack to ensure performance, scalability, and ease of development.

**Backend:**
* **Python:** The core programming language.
* **[FastAPI]:** FastAPI for high performance.
* **[Speech Recognition Library]:** WHISPER For converting audio to text.
* **[Large Language Model (LLM) API]:** Used 'gemini-1.5-flash-latest' for text summarization, Hugging Face API for fast trancription.
* **`python-dotenv`:** For managing environment variables.

**Frontend:**
* **[React]:** React + Tailwind CSS for dynamic user experience.

**Deployment & Hosting:**
* **GitHub:** Code hosting.
* **Render:** Cloud platform for deploying the web service.

## Getting Started

Follow these instructions to set up and run the AI Meeting Summarizer on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

* **Python 3.9+** 
* **pip** (Python package installer)
* **Git**

### Local Installation

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/mesumittiwari/AI-Meeting-Summarizer.git](https://github.com/mesumittiwari/AI-Meeting-Summarizer.git)
    cd AI-Meeting-Summarizer
    ```

2.  **Create and activate a virtual environment:**

    ```bash
    python -m venv venv
    # On Windows
    .\venv\Scripts\activate
    # On macOS / Linux
    source venv/bin/activate
    ```

3.  **Install backend dependencies:**
    Navigate into the `backend` directory and install the required Python packages.

    ```bash
    cd backend
    pip install -r requirements.txt
    cd .. # Go back to the project root
    ```
    *Make sure you have a `requirements.txt` file in your `backend` directory. If not, generate one from your current environment:*
    ```bash
    # In the backend directory
    pip freeze > requirements.txt
    ```

### Environment Variables

This project uses environment variables to manage sensitive API keys. You need to create a `.env` file in the `backend` directory.

1.  **Create a `.env` file:**
    In the `backend/` directory, create a new file named `.env` (note the leading dot).

2.  **Add your API keys:**
    Populate the `.env` file with your API keys. Replace the placeholder values with your actual keys.

    ```dotenv
    # backend/.env

    # Example for OpenAI API Key
    OPENAI_API_KEY=your_openai_api_key_here

    # Example for Hugging Face API Token (if used, e.g., for inference API)
    HF_ACCESS_TOKEN=your_huggingface_access_token_here

    # Add any other API keys or environment-specific variables your backend needs
    ```
    **IMPORTANT:** Never commit your `.env` file to version control. It is already included in `.gitignore` for your security.

### Running the Backend

Once the dependencies are installed and environment variables are set, you can start the backend server.

1.  **Navigate to the `backend` directory:**

    ```bash
    cd backend
    ```

2.  **Start the server:**
    (Choose the command based on your backend framework: FastAPI with Uvicorn, Flask with Gunicorn, etc.)

    **If using FastAPI with Uvicorn:**
    ```bash
    uvicorn main:app --host 0.0.0.0 --port 8000 --reload
    ```
    *(`main:app` assumes your FastAPI app instance is named `app` in `main.py`)*

    **If using Flask with a simple Python script:**
    ```bash
    python app.py
    ```
    *(`app.py` would be your main Flask application file)*

    The backend server should now be running, typically accessible at `http://127.0.0.1:8000` (or the port you configured).

### Running the Frontend

1.  **Navigate to the `frontend` directory:**
    ```bash
    cd ../frontend # From the backend directory, or cd frontend from project root
    ```

2.  **Install frontend dependencies (e.g., for a React app):**
    ```bash
    npm install # or yarn install
    ```

3.  **Start the frontend development server:**
    ```bash
    npm start # or yarn start
    ```
    The frontend application should then open in your browser, usually at `http://localhost:3000`.

---

## Usage

1.  **Access the Application:** Open your web browser and navigate to the frontend URL (e.g., `http://localhost:3000`).
2.  **Upload Audio:** Use the provided interface to upload your meeting audio file (e.g., MP3, WAV).
3.  **Process:** It will automatically generate trancscription of uploaded auddio file. Click the "Copy to Analysis Input" button. The application will then:
    * Take transcription as text input.
    * Process the transcript with the AI model.
    * Display the generated summary and extracted key points.
4.  **View Summary:** Read the concise summary and review the extracted action items.
    * You can dowload the summarised text in CSV and JSON format.
    * You can e-mail it to a predefined receiver email from your email (see envrironment variables for more clarity).


## 📂 Project Structure
```plaintext
AI-Meeting-Summarizer/
│── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── ...
│── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
│── README.md
```

## 🎥 Live Demo

[![Watch the demo](https://img.youtube.com/vi/ZccZPmXawIw/maxresdefault.jpg)](https://youtu.be/ZccZPmXawIw)

## 🧠 AI Flow Explanation (Input → Transcription → LLM Summarization)

### 1. 🔊 Audio Input Upload
- User uploads a `.mp3`, `.wav`, or similar audio file via the frontend.
- The file is sent to the backend for processing.

### 2. 🎙️ Transcription via Whisper (Hugging Face)
- Backend converts audio to `.wav` if required using `ffmpeg`.
- Whisper (Hugging Face) processes the audio and generates the transcript (text).

### 3. 📝 Summarization via Gemini API
- The transcript is sent to **Google Gemini** (`gemini-1.5-flash-latest`).
- Gemini generates a structured summary categorized into:
  - **Pain Points**
  - **Objections**
  - **Next Steps**
  - **Timeline**

### 4. 📤 Output Delivery
- Results are displayed in the frontend UI.
- Users can optionally:
  - Download the output as **CSV** or **JSON**.
  - Email the summary.

---

## 🚀 Deployment

The AI Meeting Summarizer is deployed on **Render** for backend hosting and can be accessed live via the following link:

🔗 **Live App:** [AI Meeting Summarizer](https://ai-meeting-summarizer-1-sfrq.onrender.com/)

**Deployment Steps (if self-hosting):**
1. **Backend Deployment:**
   - Push the backend code to your GitHub repository.
   - Link your repository to a hosting platform such as **Render**, **Railway**, or **Heroku**.
   - Configure environment variables (API keys, etc.) in the platform’s settings.
   - Deploy and note the backend API URL.

2. **Frontend Deployment:**
   - Update API endpoints in the frontend code to point to the deployed backend.
   - Deploy the frontend using **Vercel**, **Netlify**, or **Render**.
   - Link your domain or use the default deployment URL provided by the hosting service.

3. **Testing:**
   - Test both frontend and backend integrations to ensure smooth performance.
   - Verify file uploads, summarization accuracy, and API connections.

---


## 📧 Contact  
**Sumit Tiwari**  
📩 Email: [sumittiwari2414@gmail.com](mailto:sumittiwari2414@gmail.com)  
🔗 GitHub: [mesumittiwari](https://github.com/mesumittiwari)


## 🙌 Acknowledgments

A huge thank you to all the amazing technologies, platforms, and people who made this project possible:

- **[Google Gemini API](https://deepmind.google/technologies/gemini/)** – for providing powerful summarization capabilities.
- **[Hugging Face](https://huggingface.co/)** – for robust transcription models like Whisper.
- **[FastAPI](https://fastapi.tiangolo.com/)** – for creating a high-performance backend.
- **[React](https://react.dev/)** and **[Tailwind CSS](https://tailwindcss.com/)** – for building a fast and responsive frontend.
- **[Render](https://render.com/)** – for reliable cloud deployment.
---
