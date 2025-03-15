# **Coupon Management System: Secure & Fair Distribution**  

## **Introduction**  
Coupons are an essential tool for businesses to attract customers, increase sales, and reward loyalty. However, without a proper system in place, **coupon misuse, fraud, and unfair distribution** can become major challenges.  

To address these issues, I have built a **secure and efficient Coupon Management System** that ensures:  
- **Fair distribution** using a **round-robin** method.  
- **Prevention of fraud** using **IP tracking, cookie tracking, and device fingerprinting (via Redis)**.  
- **One coupon per hour policy** for logged-in users (tracked in MongoDB).  
- **Unique coupon code generation** to avoid guesswork and brute-force attacks.  
- **An Admin Dashboard** for managing coupons and monitoring distribution.  

This document provides a **detailed breakdown of the implementation**, **how the system works**, and **why it's effective**.  

---

## **System Implementation**  

### **1️⃣ Backend & Data Management**  

The backend is deployed on **Render** and built using **Node.js and Express** with **MongoDB** as the database.  

### **Coupon Storage & Issuance Flow**  
- Coupons are **stored in a MongoDB collection**.  
- A **round-robin algorithm** fetches the next available coupon for fair issuance.  
- A **unique code** is generated every time a coupon is issued, ensuring security.  
- Once issued, the **coupon code is stored** in the **Issued Coupons DB** for validation during redemption.  

### **2️⃣ Security & Fraud Prevention Measures**  

Since coupons can be misused by **spammers, bots, or malicious users**, I implemented **multiple security layers**:  

#### **✔ IP Tracking & Cookie Tracking**  
- The system **logs user IP addresses** to ensure they **cannot claim multiple coupons** from the same network.  
- Cookies are stored to identify returning users, preventing them from bypassing IP tracking using VPNs.  

#### **✔ Redis-Based Device Fingerprinting**  
- **Redis is used to store device fingerprints** (based on **browser, OS, and hardware specs**).  
- If the system detects **the same device** trying to claim another coupon, the request is **denied**.  
- This prevents users from **bypassing IP tracking using incognito mode or clearing cookies**.  

#### **✔ MongoDB-Based User Tracking (For Logged-in Users)**  
- Each **registered user’s profile** contains the **last coupon issuance timestamp**.  
- A user **can only claim one coupon per hour**—the system checks the timestamp before issuing a new one.  

#### **✔ Unique Coupon Code Generation**  
- Instead of issuing predictable coupon codes like `FOOD30`, a **unique alphanumeric code** is created.  
- Example:  
  - **Coupon Name:** `FOOD30`  
  - **Generated Code:** `FOOD30-3425658sg57`  
- This prevents spammers from guessing common codes and **using them without authorization**.  

---

## **How the System Works**  

### **🔹 For Guest Users (Non-Logged-In)**  
1. The user visits the website and requests a coupon.  
2. **IP tracking, cookies, and Redis-based fingerprinting check** if they have already claimed one.  
3. If not, a **coupon is issued**, and the **unique code is displayed**.  
4. The **device fingerprint and IP are stored** to block duplicate requests.  

### **🔹 For Logged-In Users**  
1. The user logs into their account.  
2. They request a coupon.  
3. The system **checks MongoDB** to see when their **last coupon was issued**.  
4. If it has been **more than one hour**, a new **coupon is issued**.  
5. The **new issuance time is updated** in the database.  

### **🔹 For Admins (Admin Dashboard)**  
- **Admin Login Credentials:**  
  - **Username:** `admin`  
  - **Password:** `securepassword123`  
- **Dashboard Features:**  
  - View all available coupons.  
  - Add new coupons.  
  - Monitor issued coupons.  

---

## **Key Features & Benefits**  

### **1️⃣ Secure & Fair Coupon Distribution**  
- **Round-robin algorithm** ensures fair coupon rotation.  
- **MongoDB tracking** prevents users from claiming multiple coupons in a short time.  

### **2️⃣ Prevention of Coupon Misuse**  
- **IP tracking and cookies** prevent multiple claims.  
- **Redis-based device fingerprinting** blocks duplicate claims even if IP or cookies change.  
- **Unique coupon code generation** makes it **impossible** to guess valid codes.  

### **3️⃣ User-Friendly Experience**  
- **Simple interface** for both **guests and logged-in users**.  
- **Admin dashboard** allows businesses to **easily manage coupons**.  

### **4️⃣ High Performance & Scalability**  
- **Redis caching** speeds up fingerprint checks.  
- **MongoDB indexing** ensures quick lookups of issued coupons.  
- **Backend hosted on Render**, ensuring reliability and scalability.  

---

## **Deployment & Access Links**  

- **Frontend (Netlify)**: [Visit Frontend](your-frontend-url)  
- **Backend (Render)**: [Visit Backend](https://roundrobinbackend-sn4n.onrender.com)  
- **GitHub Repository**:  
  - [Frontend Repo](your-frontend-github)  
  - [Backend Repo](your-backend-github)  

---

## **Interview Takeaways: Why This System Stands Out**  

This **Coupon Management System** is designed with **security, fairness, and efficiency** in mind. Here’s why it’s impressive:  

✅ **Advanced Fraud Prevention**: Uses **IP tracking, Redis-based device fingerprinting, and MongoDB tracking** to **block multiple claims**.  
✅ **Unique Code Generation**: Prevents hackers from guessing coupon codes, reducing misuse.  
✅ **Round Robin Issuance**: Ensures fairness by **distributing coupons sequentially** instead of randomly.  
✅ **Admin Dashboard for Control**: Allows easy **monitoring and management of coupons**.  
✅ **Scalable & Efficient**: **Redis caching, MongoDB indexing, and API-based architecture** make it **fast and scalable**.  

This system ensures **businesses can distribute coupons fairly while preventing fraud and spam**—a **real-world solution** to an ongoing problem.  

---

