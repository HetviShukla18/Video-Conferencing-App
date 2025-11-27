# 📹 ZinkUp – Video Conferencing App  
### Real-time Meetings, Scheduling, and Secure Collaboration  

---

## 🔥 Why ZinkUp?  
As remote work and virtual collaboration grow, users need a **fast, reliable, and secure** way to connect.  
ZinkUp provides seamless **real-time video meetings**, **scheduled sessions**, and **one-click join links** — all inside a modern UI.

Built using **Next.js**, **Clerk Auth**, and **Stream Video SDK**, ZinkUp ensures HD-quality video with zero complexity.

---

## 🚀 Key Features  

- 🎥 **Instant Meetings** – Start a meeting with one click  
- 📅 **Schedule Meetings** – Pick date & time with a clean UI  
- 🔗 **Shareable Meeting Links** – Auto-generated unique meeting URLs  
- 👥 **Join via Link** – Paste the meeting link to enter  
- 📼 **View Recordings** – Access past meetings (if enabled)  
- 🔐 **User Authentication** – Secure login/signup with Clerk  
- ⚡ **HD Real-Time Video** – Powered by Stream Video SDK  
- 🎨 **Fully Responsive UI** – Smooth experience on all devices  

---

## 🛠️ Tech Stack  

**Frontend:** Next.js 15, React, TailwindCSS  
**Auth:** Clerk  
**Video Engine:** Stream Video SDK  
**UI Components:** ShadCN  
**State Management:** React Hooks  
**Deployment:** Vercel / Localhost  

---

## ⚙️ Setup & Installation  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/your-username/Video-Conferencing-App.git
cd Video-Conferencing-App

2️⃣ Install Dependencies
npm install

3️⃣ Add Environment Variables

Create a .env.local file and add your keys:

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=xxxx
CLERK_SECRET_KEY=xxxx
NEXT_PUBLIC_STREAM_API_KEY=xxxx
STREAM_SECRET_KEY=xxxx

4️⃣ Run the Application
npm run dev
➡️ App starts at: http://localhost:3000

5️⃣ If Server Crashes
Restart with:
npm run dev
