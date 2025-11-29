Roast My Resume 

An AI-powered app that roasts resumes and GitHub profiles with witty, funny, and brutally honest feedback. Instead of the usual sugar-coated reviews, this project uses AI to point out flaws, highlight strengths, and give you a laugh while improving your profile.

**Features**

Roast your resume with savage AI-powered comments.

Analyze your GitHub profile for activity, code quality, and repo vibes.

Generates both funny roasts and constructive suggestions.

Clean and simple interface to upload or link your profiles.

**Tech Stack**

Frontend: **React (Vite)**

Backend: **Node.js + Express**

AI: OpenAI API (or any LLM integration you’ve used)

Database: (if used, e.g., MongoDB / PostgreSQL)

📂 Project Structure
.
├── client/        # Frontend (React + Vite)
├── server/        # Backend (Node + Express)
├── routes/        # API Routes
├── controllers/   # Roast logic & AI calls
└── README.md

⚡ Getting Started
1. Clone the repo
[git clone https://github.com/AmitSharma404/roast-me.git]

(cd roast-my-resume)

2. Install dependencies

Frontend:

cd client
npm install


Backend:

cd server
npm install

3. Add environment variables

Create a .env file in the server/ folder:

OPENAI_API_KEY=your_api_key_here
PORT=5000

4. Run the app

Start backend:

cd server
npm run dev


Start frontend:

cd client
npm run dev


Now open http://localhost:517

 Support LinkedIn profile roasting

 Add multiple roast modes (funny, sarcastic, professional)

 Export roast report as PDF
 
 **Contributing**

Pull requests are welcome! If you’d like to add new roast styles, improve AI prompts, or fix bugs, feel free to fork and PR.

**License**

MIT License.
