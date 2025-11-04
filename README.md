<div align="center">
  <h1> 🐔 Sistema de Control Financiero - Empresa de Gallinas Ponedoras </h1>
  <p>Sistema web completo para la gestión financiera de empresas avícolas, desarrollado con React (frontend) y Django REST Framework (backend).<p>
</div>

## Índice
- [Índice](#índice)
- [✨Características](#características)
- [🛠️Tecnologias Utilizadas](#️tecnologias-utilizadas)
- [📦Requisitos Previos](#requisitos-previos)
- [🚀Instalación](#instalación)
- [⚙️ Configuración](#️-configuración)
- [📖Uso](#uso)
- [🗂️Estructura del Proyecto](#️estructura-del-proyecto)
- [🔌API Endpoints](#api-endpoints)
- [🔧Comandos Útiles](#comandos-útiles)
- [🐛Solución de Problemas](#solución-de-problemas)
- [📝Notas de Desarrollo](#notas-de-desarrollo)
- [🚀Despliegue en Producción](#despliegue-en-producción)
- [🤝Contribuir](#contribuir)
- [📄Licencia](#licencia)
- [👨‍💻Autor](#autor)
- [📞Contacto](#contacto)
- [](#)

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
* Frontend
  * React 19.1.1
  * React Router DOM 7.9.4
  * Axios 1.13.0
  * Vite 7.1.7
* Backend
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
1. **Clonar el Repositorio**
  ``` code:
  git clone <url-del-repositorio>
  cd <nombre-del-proyecto>
  ```
2. **Configurar PostgreSQL con Docker**  
  **Instalar Docker Desktop**
    1. Descarga Docker Desktop desde docker.com
    2. Instala siguiendo las instrucciones de tu sistema operativo
    3. Verifica la instalación:
  ``` code:
  docker --version
  docker-compose --version
  ```
  **Levantar los Servicios de Base de Datos**
  ``` code:
  # Desde la raíz del proyecto
  docker-compose up -d
  ```
  Esto iniciará:
    * **PostgreSQL** en el puerto `5432`
    * **pgAdmin** en el puerto `5050` (interfaz web para administrar la BD)

  **Acceder a pgAdmin**
  1. Abre tu navegador en http://localhost:5050
  2. Credenciales (definidas en `.env`):
     * Email: tu.correo@correo.com
      * Password: `tu-password-segura`

3. **Configurar el Backend (Django)**  
**Crear y Activar Entorno Virtual**
``` code:
cd backend

# Windows
python -m venv .venv
.venv\Scripts\activate

# Linux/Mac
python3 -m venv .venv
source .venv/bin/activate
```
**Instalar Dependencias**
``` code:
pip install -r requirements.txt
```
**Configurar Variables de Entorno**  
Crea un archivo `.env` en la raíz del proyecto (mismo nivel que `docker-compose.yml`):
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
**⚠️ IMPORTANTE: Genera nuevas claves secretas para producción:**

``` code:
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

**Crear Superusuario**

``` code:
python manage.py createsuperuser
```

Sigue las instrucciones para crear tu usuario administrador.

**Iniciar el Servidor de Desarrollo**
``` code:
python manage.py runserver
```
El backend estará disponible en http://localhost:8000

4. **Configurar el Frontend (React)**  
   **Instalar Dependencias**
``` code: 
cd frontend
npm install
```
**Iniciar el Servidor de Desarrollo**
``` code:
npm run dev
```
El frontend estará disponible en http://localhost:5173

## ⚙️ Configuración
**Estructura de Archivos**

El archivo `.env` debe estar en la **raíz del proyecto** (no dentro de `backend/` ni `frontend/`):
``` code:
proyecto/
├── .env                    ← Aquí va el archivo .env
├── docker-compose.yml
├── backend/
│   ├── manage.py
│   └── ...
└── frontend/
    ├── package.json
    └── ...
```
**Variables de Entorno Importantes**

| Variable               | Descripción                | Ejemplo                 |
| ---------------------- | -------------------------- | ----------------------- |
| `DATABASE_NAME`        | Nombre de la base de datos | `avicola_db`            |
| `DATABASE_USERNAME`    | Usuario de PostgreSQL      | `avicola_user`          |
| `DATABASE_PASSWORD`    | Contraseña de PostgreSQL   | `tu_password_seguro`    |
| `SECRET_KEY`           | Clave secreta de Django    | Generada con Django     |
| `JWT_SECRET_KEY`       | Clave para tokens JWT      | Cadena aleatoria segura |
| `DEBUG`                | Modo desarrollo/producción | `True` / `False`        |
| `CORS_ALLOWED_ORIGINS` | URLs permitidas para CORS  | `http://localhost:5173` |

## 📖Uso

**1. Registro de Usuario**

1. Accede a http://localhost:5173/registro
2. Completa el formulario con tu información
3. Serás redirigido al dashboard automáticamente

**2. Iniciar Sesión**
1. Accede a http://localhost:5173/login
2. Ingresa tu email y contraseña
3. Accede al dashboard principal

**3. Funcionalidades Principales**  

**Registrar Gastos de Construcción**

- Haz clic en "Registrar Gasto"
- Completa: descripción, cantidad, precio unitario
- Los totales se calculan automáticamente

**Registrar Gastos de Crianza**

- Selecciona el tipo de gasto (pollitos, concentrado, vacunas, etc.)
- Ingresa descripción y costo
- El sistema mantiene un historial completo

**Registrar Ventas**

- Haz clic en "Registrar Ingreso"
- Ingresa: cliente, cantidad, precio unitario
- Visualiza el total calculado

**Ver Resumen Financiero**

- Haz clic en "Ver Resumen"
- Observa indicadores clave: ROI, ganancia/pérdida, distribución de gastos
- Análisis automático del estado financiero

**Exportar Datos**

- Haz clic en "Exportar"
- Descarga un CSV completo con todos tus datos
- Compatible con Excel y LibreOffice Calc

## 🗂️Estructura del Proyecto

``` code:
proyecto/
├── backend/
│   ├── accounts/              # App de autenticación
│   │   ├── models.py         # Modelo de Usuario personalizado
│   │   ├── serializers.py    # Serializadores de usuario
│   │   ├── views.py          # Vistas de auth
│   │   └── urls.py
│   ├── finanzas/             # App de gestión financiera
│   │   ├── models.py         # Modelos de gastos y ventas
│   │   ├── serializers.py    # Serializadores
│   │   ├── views.py          # ViewSets y lógica de negocio
│   │   └── urls.py
│   ├── backend/
│   │   ├── settings.py       # Configuración de Django
│   │   └── urls.py           # URLs principales
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   │   ├── components/   # Componentes React
│   │   │   │   ├── dashboard.jsx
│   │   │   │   ├── login.jsx
│   │   │   │   ├── registro.jsx
│   │   │   │   ├── gastos.jsx
│   │   │   │   ├── ingresos.jsx
│   │   │   │   ├── resumen.jsx
│   │   │   │   └── exportar.jsx
│   │   │   └── css/          # Estilos CSS
│   │   ├── services/         # Servicios API
│   │   │   ├── authService.js
│   │   │   └── finanzasService.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── docker-compose.yml        # Configuración de Docker
├── .env                      # Variables de entorno
└── README.md
```

## 🔌API Endpoints

**Autenticación**

```
POST   /api/auth/registro/          - Registrar nuevo usuario
POST   /api/auth/login/             - Iniciar sesión
POST   /api/auth/logout/            - Cerrar sesión
POST   /api/auth/token/refresh/     - Refrescar token JWT
GET    /api/auth/perfil/            - Obtener perfil de usuario
PUT    /api/auth/perfil/            - Actualizar perfil
PUT    /api/auth/cambiar-password/  - Cambiar contraseña
```

**Finanzas**

```
GET    /api/finanzas/gastos-construccion/     - Listar gastos de construcción
POST   /api/finanzas/gastos-construccion/     - Crear gasto de construcción
PUT    /api/finanzas/gastos-construccion/{id}/ - Actualizar gasto
DELETE /api/finanzas/gastos-construccion/{id}/ - Eliminar gasto

GET    /api/finanzas/gastos-crianza/          - Listar gastos de crianza
POST   /api/finanzas/gastos-crianza/          - Crear gasto de crianza
PUT    /api/finanzas/gastos-crianza/{id}/     - Actualizar gasto
DELETE /api/finanzas/gastos-crianza/{id}/     - Eliminar gasto

GET    /api/finanzas/ventas/                  - Listar ventas
POST   /api/finanzas/ventas/                  - Crear venta
PUT    /api/finanzas/ventas/{id}/             - Actualizar venta
DELETE /api/finanzas/ventas/{id}/             - Eliminar venta

GET    /api/finanzas/resumen/resumen/         - Obtener resumen financiero
GET    /api/finanzas/resumen/exportar_csv/    - Exportar datos a CSV
```

**Documentación de la API**

Una vez que el servidor backend esté corriendo:

- Swagger UI: http://localhost:8000/swagger/
- ReDoc: http://localhost:8000/redoc/

## 🔧Comandos Útiles

**Backend**

```
# Activar entorno virtual
# Windows
.venv\Scripts\activate
# Linux/Mac
source .venv/bin/activate

# Crear migraciones
python manage.py makemigrations

# Aplicar migraciones
python manage.py migrate

# Crear superusuario
python manage.py createsuperuser

# Correr servidor de desarrollo
python manage.py runserver

# Correr tests
python manage.py test

# Recolectar archivos estáticos (producción)
python manage.py collectstatic
```

**Frontend**

```
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build para producción
npm run build

# Vista previa del build
npm run preview

# Linter
npm run lint
```

**docker**

```
# Levantar servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down

# Detener y eliminar volúmenes (¡Cuidado! Borra los datos)
docker-compose down -v

# Ver estado de contenedores
docker ps
```

## 🐛Solución de Problemas

**Error: "Connection refused" al conectar a la base de datos**

**Solución:** Verifica que Docker Desktop esté corriendo y que los contenedores estén activos:

```
docker ps
```

**Error: "Module not found" en el frontend**

**Solución:** Reinstala las dependencias:

```
cd frontend
rm -rf node_modules package-lock.json
npm install
```

**Error: "Token has expired" al hacer peticiones**

**Solución:** El token JWT expiró. Cierra sesión y vuelve a iniciar sesión.

**Error de CORS en el navegador**

**Solución:** Verifica que `CORS_ALLOWED_ORIGINS` en `.env` incluya la URL de tu frontend:

```
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

**La base de datos no se crea**

**Solución:**

1. Detén los contenedores: `docker-compose down`
2. Elimina los volúmenes: `docker-compose down -v`
3. Vuelve a levantar: `docker-compose up -d`
4. Ejecuta las migraciones: `python manage.py migrate`

## 📝Notas de Desarrollo
**Buenas Prácticas**

**1. Nunca subas el archivo .env al repositorio**

- Ya está incluido en `.gitignore`
- Crea un `.env.example` con valores de ejemplo

**2. Genera nuevas claves secretas para producción**

```
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

**3. Mantén las dependencias actualizadas**

```
# Backend
pip list --outdated

# Frontend
npm outdated
```

**4. Usa ramas para nuevas características**

```
git checkout -b feature/nueva-caracteristica
```

## 🚀Despliegue en Producción

**Consideraciones Importantes**

1. Cambia `DEBUG=False` en `.env`
2. Configura un servidor web (Nginx)
3. Usa Gunicorn para servir Django
4. Configura HTTPS con SSL
5. Usa una base de datos PostgreSQL en la nube
6. Configura variables de entorno en el servidor
7. Habilita compresión y caché

**Ejemplo con Heroku o DigitalOcean**

```
# Build del frontend
cd frontend
npm run build

# Configura las variables de entorno en tu plataforma
# Sube el código
git push heroku main
```

## 🤝Contribuir

Las contribuciones son bienvenidas. Para cambios importantes:

1. Haz fork del proyecto
2. Crea una rama para tu característica ( `git checkout -b feature/AmazingFeature`)
3. Commit de tus cambios (`git commit -m 'Add: amazing feature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](https://github.com/jesus018/proyecto-avicola/blob/aa19105971712914092d668b6c51ac1b4ce0e0e5/LICENSE.md) para más detalles.

## 👨‍💻Autor

<div>
Desarrollado por
<table align="center">
<tr>
<td align="center"><a href="https://github.com/jesus018"><img src="https://avatars.githubusercontent.com/u/48538509?v=4" width="100px;" alt=""/><br /><sub><b>  jesus018 </b></sub></a><br/><a href="#maintenance-tbenning" title="Maintenance"></a> </td>
</tr>
</table>
</div>

## 📞Contacto

- Email: jesus.agreda018@outlook.com
- GitHub: @jesus018

##
⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub!