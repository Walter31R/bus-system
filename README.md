# 🚍 Sistema de Gestión de Buses

Proyecto full stack desarrollado con **Spring Boot y React** que permite gestionar una flota de buses con autenticación, CRUD completo y búsqueda combinada.

---

## 🌐 Demo en vivo

- 🖥️ **Frontend:** https://bus-system-seven.vercel.app
- ⚙️ **Backend:** https://bus-system-production.up.railway.app

## 🔑 Credenciales de prueba
| Usuario | Contraseña |
|---|---|
| admin | 1234 |

---

## ✨ ¿Qué puede hacer?

- Iniciar sesión con autenticación JWT
- Ver la lista de buses con paginación
- Buscar buses por placa, marca y estado (activo/inactivo) de forma combinada
- Ver el detalle de un bus por ID
- Agregar, editar y eliminar buses
- Todo desplegado en la nube ☁️

---

## 🖥️ Capturas

📸 Login:
<img width="450" height="394" alt="login" src="https://github.com/user-attachments/assets/f2190829-ba27-42c4-bac0-e1b4932d63ff" />

📸 Vista principal:
<img width="1132" height="454" alt="react_1" src="https://github.com/user-attachments/assets/170dfac1-1633-481e-8be1-33a9ed97480d" />

📸 Búsqueda por ID:
<img width="819" height="450" alt="react_3" src="https://github.com/user-attachments/assets/ad4f8793-bb7c-4c79-9910-77e9e1e83e8a" />

---

## 🔗 Endpoints

| Método | Endpoint | Descripción |
|---|---|---|
| POST | /auth/login | Iniciar sesión |
| GET | /bus | Lista paginada |
| GET | /bus/{id} | Detalle de un bus |
| POST | /bus | Crear bus |
| PUT | /bus/{id} | Actualizar bus |
| DELETE | /bus/{id} | Eliminar bus |
| GET | /bus/buscar | Búsqueda combinada |
| GET | /marca | Lista de marcas |

---

## 🗄️ Base de datos

Dos tablas relacionadas en MySQL: `bus` y `marcas_bus`.
Relación: muchos buses pueden pertenecer a una misma marca.

<img width="446" height="286" alt="bd" src="https://github.com/user-attachments/assets/bc43f1b1-84e6-43e1-a57b-52eaad005061" />

---

## ⚙️ Tecnologías

**Backend:** Java 21, Spring Boot, Spring Security, JWT, JPA, MySQL, Railway

**Frontend:** React, Vite, Vercel

---

## 🚀 Correr el proyecto localmente

### Backend

1. Clona el repo y abre la carpeta `Backend-Bus` en IntelliJ
2. Crea la base de datos `db_bus` en MySQL
3. Crea el archivo `src/main/resources/application-local.properties`:

```properties
DB_URL=jdbc:mysql://localhost:3306/db_bus
DB_USERNAME=root
DB_PASSWORD=tu_password
JWT_SECRET=clave_secreta_cualquiera
```

4. Corre el proyecto desde IntelliJ

### Frontend

```bash
cd Frontend-Bus
npm install
npm run dev
```

Abre `http://localhost:5173` en tu navegador.

---

## 📁 Estructura

```
bus-system/
├── Backend-Bus/   → API REST con Spring Boot
└── Frontend-Bus/  → Interfaz con React + Vite
```
