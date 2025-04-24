# Attendence Management System - Backend

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-8.x-green)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

🎯 Backend API for a Wedding Management System built with Node.js, Express, and MongoDB.

---

## ✨ Features

- 🔐 User authentication (JWT)
- 📅 Wedding event management
- 👥 Guest list management
- 📧 Email notifications
- 🕒 Scheduled tasks
- 📘 API documentation

---

## 🛠️ Technologies Used

- ⚙️ **Runtime**: Node.js
- 🚀 **Framework**: Express.js
- 🗃️ **Database**: MongoDB (Mongoose ODM)
- 🔐 **Authentication**: JSON Web Tokens (JWT)
- ✉️ **Email**: Nodemailer
- ⏰ **Scheduling**: Node-cron
- 📲 **SMS**: Twilio
- ⚙️ **Environment**: Dotenv
- 🧹 **Linting**: ESLint
- 🎨 **Formatting**: Prettier

---

## 📋 Prerequisites

- Node.js (v18+)
- npm (v9+)
- MongoDB (v6+)
- Twilio account (📲 for SMS features)
- Email service credentials (📧)

---

## ⚙️ Installation

1. 📥 Clone the repository:
   ```bash
   git clone https://github.com/yourusername/backend-wedding.git
   cd backend-wedding
   📦 Install dependencies:
   ```

npm install
🧾 Create a .env file in the root directory with the following variables:

env
Copy
Edit
PORT=3000
MONGODB_URI=mongodb://localhost:27017/wedding_db
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=30d
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USERNAME=your_email@example.com
EMAIL_PASSWORD=your_email_password
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=+1234567890
🚀 Start the development server:

# npm start

📜 Scripts
npm start — Starts the dev server with nodemon 🔁

npm run lint — Runs ESLint to find code issues 🕵️

npm run lint:fix — Fixes lint issues automatically 🔧

npm run format — Formats code with Prettier 🎨

🗂️ Project Structure

backend-Att/
├── src/
│ ├── config/ # Configuration files ⚙️
│ ├── controllers/ # Route controllers 🔁
│ ├── middleware/ # Custom middleware 🧱
│ ├── models/ # MongoDB models 🗃️
│ ├── routes/ # API routes 🌐
│ ├── services/ # Business logic 🧠
│ ├── utils/ # Utility functions 🛠️
│ └── index.js # Main entry point 🚪
├── .env.example # Env template 📋
├── .eslintrc.js # ESLint config 📏
├── .prettierrc # Prettier config 🎨
└── package.json # Dependencies & scripts 📦
🤝 Contributing
🍴 Fork the project

🌿 Create a feature branch

git checkout -b feature/AmazingFeature
💾 Commit your changes

git commit -m "Add some AmazingFeature"
🚀 Push to the branch

git push origin feature/AmazingFeature
📥 Open a Pull Request

🪪 License
Distributed under the ISC License. See LICENSE for details.

📞 Contact
👨‍💻 Maintainer: Your Name
🔗 Project Link: GitHub Repository

---

Let me know if you want:

- ✅ Dark mode screenshots
- ✅ Example `.env` file
- ✅ Swagger/OpenAPI integration badges
- ✅ Or converting this into a `.md` file right now
