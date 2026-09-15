# 🚍 Sistema de Gestión de Buses

Proyecto full stack desarrollado con **Spring Boot y React** que permite gestionar una flota de buses con autenticación, CRUD completo y búsqueda combinada.

---

## 🌐 Demo en vivo

- 🖥️ **Frontend:** https://bus-system-seven.vercel.app

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

<img width="805" height="473" alt="login" src="https://github.com/user-attachments/assets/57bd844e-c6ee-4d4a-afd4-089fcfe9b44c" />


📸 Vista principal:

<img width="1149" height="466" alt="react_1" src="https://github.com/user-attachments/assets/99e58682-ed42-4c17-99b6-d03d9d7fbe65" />


📸 Búsqueda por ID:

<img width="1152" height="506" alt="react_2" src="https://github.com/user-attachments/assets/ba33e674-7f8e-479b-a22d-c7c954c1fd93" />


📸 Agregar Bus:

<img width="601" height="512" alt="react_4" src="https://github.com/user-attachments/assets/8786bf96-9939-460b-bfdc-18931a80b024" />


<img width="1137" height="303" alt="react_5" src="https://github.com/user-attachments/assets/e3049b6f-8686-4a0a-a463-d872bbfc6c5c" />



📸 Editar Bus:

<img width="655" height="536" alt="react_6" src="https://github.com/user-attachments/assets/10dad771-cf61-4357-9237-9c1e4cbd1dc5" />


<img width="1160" height="343" alt="react_7" src="https://github.com/user-attachments/assets/34baa586-c815-478f-a21f-2a4558e7c910" />


📸 Búsqueda por Placa:

<img width="1152" height="302" alt="react_8" src="https://github.com/user-attachments/assets/6916c96c-5500-4758-b8f5-bcdfab6d3319" />


📸 Búsqueda por Marca:

<img width="1138" height="435" alt="react_9" src="https://github.com/user-attachments/assets/ff16fc10-8965-44c0-b4a9-b4783e1dfa78" />


📸 Búsqueda por Actividad:

<img width="1147" height="489" alt="react_10" src="https://github.com/user-attachments/assets/bdfd200e-67d3-4c27-a57d-2fcdc8da19cb" />


📸 Búsqueda Combinada:

<img width="1155" height="413" alt="react_11" src="https://github.com/user-attachments/assets/6941149a-788c-40c5-b78f-f1d665860aad" />

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
---

## 📌 Estado del proyecto

- ✅ API REST funcional
- ✅ Autenticación JWT
- ✅ CRUD completo
- ✅ Paginación
- ✅ Búsqueda combinada
- ✅ Integración con React
- ✅ Desplegado en Railway y Vercel
