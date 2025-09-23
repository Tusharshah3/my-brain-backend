# 🧠 my-brain Backend

The **my-brain backend** powers a personal knowledge management system that allows users to store, organize, and search content such as notes, documents, and media.  
It integrates **semantic search** using embeddings + Qdrant vector database and supports secure authentication, file uploads (up to 16MB), and modular API design.

---

## 🚀 Features
- **Authentication & Authorization**: JWT-based user authentication with Express middleware.
- **Content Management**: APIs for creating, updating, deleting, and retrieving content.
- **Semantic Search**: Vector similarity search powered by **Qdrant** and embeddings.
- **File Uploads**: Support for documents, images, and media (up to 16MB).
- **Tagging & Metadata**: Automatic processing for better searchability.
- **Scalable Architecture**: Modular routers for users, brains, and content.

---

## 🛠️ Tech Stack
- **Runtime**: Node.js + TypeScript  
- **Framework**: Express.js  
- **Database**: MongoDB (user data + file storage with GridFS)  
- **Vector Database**: Qdrant (semantic search)  
- **Authentication**: JWT-based middleware  
- **Embeddings**: OpenAI API (for text embeddings)  
- **Deployment**: Render  

---

## 📂 Project Structure
backend/
│── src/
│ ├── routes/ # API route handlers (User, Brain, Content)
│ ├── middleware/ # Authentication & validation middleware
│ ├── controllers/ # Business logic for each feature
│ ├── utils/ # Utility functions (payload cleaning, tagging, etc.)
│ ├── db/ # MongoDB & Qdrant connection setup
│ └── index.ts # Entry point
│
├── package.json
├── tsconfig.json
└── README.md

yaml
Copy code

---

## ⚡ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/my-brain-backend.git
cd my-brain-backend
2. Install Dependencies
bash
Copy code
npm install
3. Environment Variables
Create a .env file in the root directory with the following keys:

env
Copy code
PORT=3000
MONGO_URI=your_mongo_connection_string
QDRANT_URL=http://localhost:6333
OPENAI_API_KEY=your_openai_api_key
JWT_SECRET=your_jwt_secret
4. Run the Server
bash
Copy code
npm run dev
The backend should now be running on:

arduino
Copy code
http://localhost:3000
📡 API Endpoints
Authentication
POST /auth/register → Register a new user

POST /auth/login → Authenticate user and get JWT

Content
POST /content → Create new content (note, document, media)

GET /content/:id → Fetch content by ID

PUT /content/:id → Update content

DELETE /content/:id → Delete content

Semantic Search
POST /search → Search content using embeddings + Qdrant

🧪 Scripts
bash
Copy code
# Development mode
npm run dev
