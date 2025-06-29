# 🦷 Dental Center Management Dashboard

A modern, fully responsive dental clinic management system built with React. This project simulates real-world features like patient tracking, appointment management, and health records – ideal for both Admins (Doctors) and Patients.

---

## 🚀 Live Demo

🌐 [View Live App](https://your-live-demo-link.com)

---

## 📁 Project Structure

```bash
📦 Dental-Center-Management
├── public/
├── src/
│   ├── assets/            # Images, icons, and static files
│   ├── components/        # Reusable UI components (Button, Card, Modal)
│   ├── contexts/          # Global state providers (Auth, Data)
│   ├── pages/             # Route-level components (Dashboard, Patients)
│   ├── utils/             # Utility functions (formatting, validations)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
└── README.md
```

---

## 🧰 Tech Stack

| Technology        | Purpose                                 |
|------------------|-----------------------------------------|
| React            | Frontend UI with hooks and JSX          |
| React Router DOM | Routing between pages                   |
| Context API      | Global state (auth, data, etc.)         |
| Tailwind CSS     | Utility-first responsive styling        |
| Vite             | Fast build tool and development server  |
| localStorage     | Simulated backend for data persistence  |

---

## 📌 Features

### 👨‍⚕️ Admin Panel
- View & manage all patients
- Schedule appointments and add incidents
- Upload treatment records (PDF/images)
- Visualize appointments in a calendar view
- Track upcoming visits, revenue, top patients

### 🧑‍💻 Patient Dashboard
- View personal medical profile
- Track appointments and health history
- View uploaded treatment files

### 📦 Other Highlights
- Role-based login (Admin / Patient)
- Fully mobile responsive UI
- Data stored in `localStorage` for persistence

---

## 🔐 Demo Credentials

```json
[
  {
    "role": "Admin",
    "email": "admin@entnt.in",
    "password": "admin123"
  },
  {
    "role": "Patient",
    "email": "john@entnt.in",
    "password": "patient123"
  }
]
```

---

## 🛠️ Installation & Setup

```bash
git clone https://github.com/your-username/Dental-Center-Management
cd Dental-Center-Management
npm install
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

## 🧪 Development Notes

- Authentication is simulated using hardcoded credentials.
- All forms include client-side validation.
- File uploads are encoded as base64/blobs and stored locally.
- Tailwind makes layout easily customizable and responsive.

---

## 📸 Screenshots

> Add your project screenshots here (Dashboard, Patient Profile, etc.)

---

## 🙌 Acknowledgements

Thanks to [ENTNT](https://entnt.in) for the technical challenge and concept inspiration.

---

## 📄 License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.