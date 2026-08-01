# TaskFlow

Aplicación web CRUD desarrollada con HTML, CSS y JavaScript para la gestión de tareas, implementando la metodología **Git Flow** y control de versiones con **Git y GitHub**.

---

# TaskFlow - Sistema de Gestión de Tareas

Proyecto desarrollado como práctica de Git y Git Flow. La aplicación permite administrar tareas mediante las operaciones básicas de un CRUD (Crear, Consultar, Actualizar y Eliminar), almacenando la información en el navegador mediante LocalStorage.

## Funcionalidades

- Crear nuevas tareas.
- Visualizar todas las tareas.
- Editar tareas existentes.
- Eliminar tareas.
- Buscar tareas por título.
- Cambiar el estado de una tarea (Pendiente / Completada).
- Almacenamiento local utilizando LocalStorage.
- Diseño responsivo.

---

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript (ES6)
- LocalStorage
- Git
- GitHub
- Git Flow

---

## Estructura del proyecto

```
TaskFlow/
│
├── index.html
├── README.md
├── .gitignore
│
├── css/
│   └── styles.css
│
├── js/
│   └── app.js
│
└── assets/
    └── images/
```

---

## Funcionalidades CRUD

### Crear

Permite registrar una nueva tarea indicando:

- Título
- Descripción
- Fecha de vencimiento
- Estado

---

### Consultar

Visualiza todas las tareas registradas.

---

### Actualizar

Permite modificar la información de cualquier tarea existente.

---

### Eliminar

Elimina permanentemente una tarea del sistema.

---

## Git Flow implementado

El proyecto utiliza la metodología **Git Flow**, trabajando con las siguientes ramas:

- main
- develop
- qa
- feature/create-task
- feature/list-task
- feature/update-task
- feature/delete-task
- hotfix/date-format

Cada funcionalidad fue desarrollada en su propia rama y posteriormente integrada mediante Pull Requests.

---

## Pull Requests

Durante el desarrollo del proyecto se realizaron Pull Requests entre las diferentes ramas siguiendo el flujo:

Feature → Develop

Develop → QA

QA → Main

---

## Capturas

Aquí se agregarán las capturas de pantalla del sistema durante su funcionamiento.

---

## Autor

**Kendra Carvajal**

Matrícula: **2024-2572**

Carrera: Desarrollo de Software

ITLA

---

## Licencia

Proyecto desarrollado únicamente con fines académicos.

## Registro de tareas

Esta funcionalidad permite registrar nuevas tareas indicando título, descripción, fecha de vencimiento y estado.

## Búsqueda de tareas

La aplicación incluye un buscador que permite localizar tareas por título, descripción, estado o fecha, facilitando la administración de la información.
