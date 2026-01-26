
# 🚨 Incident Ops (Incident Management System)

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?logo=tailwindcss)
![License: MIT](https://img.shields.io/badge/License-MIT-green)

**Enterprise-level Incident Management Dashboard** inspired by tools like **ServiceNow** and **Jira**, designed to track, manage, and analyze network incidents with **real-time SLA monitoring**, advanced filtering, and reporting capabilities.

---

## 🌐 Live Demo

🔗 **Live Demo:** _Coming Soon_  

---

## 🖼️ Screenshots

- Dashboard with charts
  <img width="1885" height="872" alt="image" src="https://github.com/user-attachments/assets/6af9aead-cc7c-4a19-b793-9b25beb8d83d" />
 
- Incidents list with filters & SLA timers
  <img width="1870" height="860" alt="image" src="https://github.com/user-attachments/assets/2a8e3dda-f7ee-4fd5-baa4-2180706877d8" />

- Create/Edit Incident form
  <img width="1889" height="860" alt="image" src="https://github.com/user-attachments/assets/8bb83927-d615-42df-9e37-40a3ca2f6ce8" />

- Reports & CSV export
  <img width="1853" height="843" alt="image" src="https://github.com/user-attachments/assets/8b07a6c8-b317-4781-9e13-2a02a2de4a9c" />


---

## ✨ Features

- 📊 **Interactive Dashboard** with KPIs & charts  
- 📋 **Incidents Management** with search, filters, sorting & pagination  
- ➕ **Create Incident** form with robust validation  
- ✏️ **Edit Incident** page with locked fields for closed incidents  
- ⏱️ **Real-time SLA Countdown Timers** with breach detection  
- 🚨 **SLA Breach Detection Algorithm**  
- 📑 **Advanced Reports Page** with multi-operator filtering (`is`, `is not`, `is one of`)  
- 📅 **Date Range Filtering** using React DatePicker  
- 📤 **CSV Export** for reports and incidents  
- 🔄 **Status Workflow:** New → In Progress → Resolved → Closed  
- 🔐 **Protected Routes** with authentication  
- 📱 **Fully Responsive UI** (mobile-first design)  

---

## 🛠️ Tech Stack

| Frontend | Libraries & Tools |
|--------|----------------|
| ⚛️ React | React Router v6 |
| 🎨 Tailwind CSS | Recharts |
| 📅 React DatePicker | React Icons |
| 🔄 Context API | Custom Hooks |

---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-username/Incident-Ops.git

# Navigate to project directory
cd Incident-Ops

# Install dependencies
npm install

# Start development server
npm start
````

The app will run at **[http://localhost:3000](http://localhost:3000)**

---

## 🔑 Demo Credentials

```
Username: admin
Password: admin123
```

> Used for accessing protected routes and authenticated pages.

---

## 🚀 Usage

1. Login using demo credentials
2. View real-time metrics on the **Dashboard**
3. Create, update, and manage incidents
4. Track SLA countdowns and breaches
5. Generate reports and export CSV files
6. Test role-based protected navigation

---

## 🗂️ Project Structure

```bash
src/
├── pages/
│   ├── Dashboard.jsx
│   ├── Incidents.jsx
│   ├── CreateIncident.jsx
│   ├── IncidentDetail.jsx
│   ├── Reports.jsx
│   └── Login.jsx
│
├── components/
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── SLATimer.jsx
│   └── ...
│
├── data/
│   └── mockIncidents.js
│
├── utils/
│   └── exportTable.js
│
├── context/
│   └── AuthContext.jsx
│
└── hooks/
    └── useFilters.js
```

---

## 🧠 Key Learnings

* Designing **enterprise-grade dashboards** in React
* Implementing **real-time countdown logic** with `setInterval`
* Building **advanced filtering systems** with multiple operators
* Managing global state using **Context API**
* Structuring scalable React applications
* Handling conditional form validation and workflows

---

## 🔮 Future Enhancements

* 💾 Persist incidents using **localStorage / backend API**
* 🔔 Real-time notifications for SLA breaches
* 👥 Role-based access control (RBAC)
* 🌐 Backend integration (Node.js)
* 📊 More advanced analytics & trend reports

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.
See the `LICENSE` file for details.

---

## 👤 Author / Contact

**Your Name**
📧 Email: [your.email@example.com](mailto:your.email@example.com)
💼 LinkedIn: [https://linkedin.com/in/your-profile](https://linkedin.com/in/your-profile)
🐙 GitHub: [https://github.com/your-username](https://github.com/your-username)

---

⭐ *If you found this project helpful, consider giving it a star!*

```
```
