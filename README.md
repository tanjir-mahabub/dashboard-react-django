
# Dashboard React-Django

A full-stack application combining a **Django backend** with a **React frontend** to create a feature-rich dashboard. The project uses Django REST framework for APIs and React with TailwindCSS for the user interface.

## Features

- Django backend for API management
- React frontend with Vite, TailwindCSS, and TypeScript
- Fully integrated authentication
- Responsive UI design
- Scalable and modular structure

---

## Project Structure

```plaintext
dashboard-react-django/
├── dashboard_backend/     # Django project with API backend
├── frontend/              # React frontend
├── venv/                  # Python virtual environment (to be created)
├── requirements.txt       # Python dependencies
```

---

## Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/tanjir-mahabub/dashboard-react-django.git
cd dashboard-react-django
```

### 2. Backend Setup

#### Create and Activate Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate  # For Linux/Mac
venv\Scripts\activate     # For Windows
```

#### Install Python Dependencies

```bash
pip install -r requirements.txt
```

#### Migrate the Database

Navigate to the backend folder and run migrations:

```bash
cd dashboard_backend
python manage.py makemigrations
python manage.py migrate
```

#### Create a Superuser

```bash
python manage.py createsuperuser
```

#### Run the Django Server

```bash
python manage.py runserver
```

The backend will now be available at: `http://127.0.0.1:8000/`

### 3. Frontend Setup

Navigate to the frontend folder:

```bash
cd ../frontend
```

#### Install Node.js Dependencies

```bash
npm install
```

#### Run the React Development Server

```bash
npm run dev
```

The frontend will now be available at: `http://127.0.0.1:5173/`

---

## Usage

1. Start the **backend server**:
   ```bash
   cd dashboard_backend
   python manage.py runserver
   ```

2. Start the **frontend development server**:
   ```bash
   cd frontend
   npm run dev
   ```

3. Open the frontend in your browser at `http://127.0.0.1:5173/`.

4. Interact with the dashboard. The frontend communicates with the Django API for data.

---

## Key Commands Summary

| Command                               | Description                        |
|---------------------------------------|------------------------------------|
| `python3 -m venv venv`                | Create a virtual environment       |
| `source venv/bin/activate` (Linux/Mac) <br> `venv\Scripts\activate` (Windows) | Activate the virtual environment  |
| `pip install -r requirements.txt`     | Install backend dependencies       |
| `python manage.py makemigrations`     | Generate migrations                |
| `python manage.py migrate`            | Apply migrations                   |
| `python manage.py createsuperuser`    | Create an admin user               |
| `python manage.py runserver`          | Start the backend server           |
| `npm install`                         | Install frontend dependencies      |
| `npm run dev`                         | Start the frontend server          |

---

## Technologies Used

### Backend
- Python 3.10+
- Django
- Django REST Framework

### Frontend
- React
- Vite
- TailwindCSS
- TypeScript

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any features, bugs, or improvements.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Author

**Tanjir Mahabub**  
[GitHub](https://github.com/tanjir-mahabub) | [LinkedIn](https://www.linkedin.com/in/tanjir-mahabub/)

---
