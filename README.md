<p align="center">
  <h1> 🐔 Sistema de Control Financiero - Empresa de Gallinas Ponedoras </h1>
  <h4>Sistema web completo para la gestión financiera de empresas avícolas, desarrollado con React (frontend) y Django REST Framework (backend).</h4>
</p>

## Índice
* [Características](#características)
* [Tecnologias Utilizadas](#tecnologias-utilizadas)
* [Requisitos Previos](#requisitos-previos)
* [Instalación](#instalacion)
* [Configuración](#configuracion)
* [Uso](#uso)
* [Estructura del Proyecto](#estructura-del-proyecto)
* [API Endpoints](#api-endpoints)
* [Contribuir](#contribuir)
* [Licencia](#licencia)

## ✨Características
* ✅ Sistema de autenticación con JWT
* 📊 Dashboard interactivo con estadísticas en tiempo real
* 💰 Registro de ingresos por ventas de huevos
* 🏗️ Control de gastos de construcción
* 🐣 Seguimiento de gastos de crianza y mantenimiento
* 📈 Resumen financiero con análisis de ROI
* 📥 Exportación de datos a CSV
* 🔐 Autenticación y autorización de usuarios
* 📱 Diseño responsive

## 🛠️Tecnologias Utilizadas
Frontend
* React 19.1.1
* React Router DOM 7.9.4
* Axios 1.13.0
* Vite 7.1.7
Backend
* Python 3.x
* Django 5.0.1
* Django REST Framework 3.14.0
* PostgreSQL 15
* JWT Authentication
* drf-yasg (Swagger/OpenAPI)

## 📦Requisitos Previos
Antes de comenzar, asegúrate de tener instalado:
* Node.js (v20.19.0 o superior)
* Python (3.10 o superior)
* Docker Desktop (para PostgreSQL)
* Git

## 🚀Instalación
1. Clonar el Repositorio
``` code:
git clone <url-del-repositorio>
cd <nombre-del-proyecto>
```
2. Configurar PostgreSQL con Docker
Instalar Docker Desktop
1. Descarga Docker Desktop desde docker.com
2. Instala siguiendo las instrucciones de tu sistema operativo
3. Verifica la instalación:
``` code:
docker --version
docker-compose --version
```
Levantar los Servicios de Base de Datos
``` code:
# Desde la raíz del proyecto
docker-compose up -d
```
Esto iniciará:
* PostgreSQL en el puerto 5432
* pgAdmin en el puerto 5050 (interfaz web para administrar la BD)
Acceder a pgAdmin
1. Abre tu navegador en http://localhost:5050
2. Credenciales (definidas en .env):
   * Email: tu.correo@correo.com
   * Password: tu-password-segura
3. Configurar el Backend (Django)
Crear y Activar Entorno Virtual
``` code:
cd backend

# Windows
python -m venv .venv
.venv\Scripts\activate

# Linux/Mac
python3 -m venv .venv
source .venv/bin/activate
```
Instalar Dependencias
``` code:
pip install -r requirements.txt
```
Configurar Variables de Entorno
Crea un archivo .env en la raíz del proyecto (mismo nivel que docker-compose.yml):
``` code:
# Base de datos PostgreSQL
DATABASE_ENGINE=django.db.backends.postgresql
DATABASE_NAME=avicola_db
DATABASE_USERNAME=avicola_user
DATABASE_PASSWORD=TuPasswordSeguro123!
DATABASE_HOST=localhost
DATABASE_PORT=5432

# PgAdmin
PGADMIN_EMAIL=admin@admin.com
PGADMIN_PASSWORD=AdminPassword123!
PGADMIN_PORT=5050

# Django Settings
SECRET_KEY=django-insecure-CAMBIAR-ESTO-POR-UNA-CLAVE-SEGURA
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# JWT Authentication
JWT_SECRET_KEY=414a3e488330d5d44974b1f4c64b3603e8a3d77bc816535a033eff234d6e7e9b
JWT_ACCESS_TOKEN_LIFETIME=60
JWT_REFRESH_TOKEN_LIFETIME=1440

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# Email (opcional para reset de contraseña)
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=tu_email@gmail.com
EMAIL_HOST_PASSWORD=tu_password
```

