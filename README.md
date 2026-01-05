# AI Background Removal Tool

A web-based background removal application that allows users to upload images and automatically remove backgrounds using an AI-powered API, delivering clean cutouts through a simple and intuitive interface.

---

## 📌 Features
- Upload and preview images before processing  
- AI-powered background removal  
- Side-by-side comparison of original vs processed image  
- Clean, responsive UI for quick interactions  
- Download processed image after background removal  

---

## 🧱 How It Works
1. User uploads an image  
2. Image is sent to a background-removal API  
3. The API processes the image and removes the background  
4. The processed image is displayed and made available for download  

The frontend manages file handling, loading states, and result rendering.

---

## 🛠 Tech Stack
- **Frontend:** React.js
- **Styling:** Tailwind CSS  
- **Backend / API:** Background Removal API *(external service)*  
- **Deployment:** Vercel  

*(API keys and sensitive credentials are not committed to the repository)*

---

## ▶️ How to Run Locally
1. Clone the repository:
```bash
git clone https://github.com/prabhavmishra/bg-removal.git
Navigate to the project directory:

bash
Copy code
cd bg-removal
Install dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm run dev
🔐 Environment Variables
Create a .env file in the root directory and add:

ini
Copy code
VITE_API_KEY=your_api_key_here
(Ensure .env is added to .gitignore)

📚 Learning Outcomes
Handling file uploads in frontend applications

Integrating third-party AI APIs

Managing async operations and loading states

Building responsive, user-friendly interfaces

Secure handling of environment variables

📌 Notes
This project focuses on frontend integration with AI services, emphasizing usability, clean UI, and practical API consumption rather than model training.

👤 Author
Prabhav Mishra
