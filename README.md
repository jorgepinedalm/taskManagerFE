# 📝 Aplicación de Gestión de Tareas (Angular + .NET 8)

Este es un proyecto desarrollado en Angular para gestionar tareas mediante una interfaz sencilla. La aplicación permite crear, listar, actualizar y eliminar tareas (CRUD) y se conecta con un backend en .NET Core 8.

## 🚀 Características

- ✅ Lista de tareas con estado (pendiente / completado).
- ✅ Creación de nuevas tareas con título y descripción.
- ✅ Actualización del estado de una tarea (completar o marcar como pendiente).
- ✅ Eliminación de tareas.
- ✅ Consumo de una API en .NET Core 8 para gestionar los datos.
- ✅ Uso de Angular Services para la lógica de negocio.
- ✅ Estilización con Bootstrap y Tailwind CSS.

## 🛠️ Tecnologías Usadas

- ✅ [Angular 19](https://angular.dev/)
- ✅ [TypeScript](https://www.typescriptlang.org/)
- ✅ [ng-bootstrap](https://ng-bootstrap.github.io/) (para uso de modal)
- ✅ [Tailwind CSS](https://tailwindcss.com/)
- ✅ [Node.js 22.14.0 & npm](https://nodejs.org/en/download)
- ✅ [.NET 8 API REST (backend)](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)


##  📦 Instalación y Configuración

1. Clonar el Repositorio
    ```bash
    git clone https://github.com/jorgepinedalm/taskManagerFE.git
    cd task-manager-angular
    ```

1. Instalar Dependencias
    ```bash
    npm install
    ```
   
2. Configurar el Backend

    El frontend está diseñado para trabajar con un backend en .NET 8. Los environments estan configurados para funcionar con la versión desplegada del backend en una App service de Azure creada para esta aplicación. Sin embarbo, si desea configurar el backend en local, puede seguir estos pasos:
    - Clone el repositorio del backend en .NET Core 8: `git clone https://github.com/jorgepinedalm/taskManagerApi.git`
    - Sigue las instrucciones en su README para ejecutarlo.
    - Por defecto, la API al ejecutarse deberia correr el swagger habilitado a proposito para el desarrollo de esta aplicación: `https://localhost:44320/swagger/index.html`
    
    Si la dirección es diferente, aseguresé de cambiar la URL base en el archivo `src/environments/environment.ts`.

## ▶️ Ejecución del Proyecto

Para iniciar el servidor de desarrollo de Angular, ejecute:

```bash
ng serve
```

Luego, abra tu navegador y acceda a:

`http://localhost:4200/`

## 🔌 Conexión con el Backend

El frontend consume la API en .NET 8. La URL del backend se configura en `src/environments/environment.ts`:

```bash
export const environment = {
  production: false,
  apiUrl: 'https://localhost:44320/api/tasks'
};
```

Si el backend se ejecuta en otro puerto o dominio, modifique este valor.

## 📑 Endpoints Consumidos

| Método   | Endpoint          | Descripción              |
| -------- | ----------------- | ------------------------ |
| `GET`    | `/api/tasks`      | Obtener todas las tareas |
| `POST`   | `/api/tasks`      | Crear una nueva tarea    |
| `PUT`    | `/api/tasks/{id}` | Actualizar una tarea     |
| `DELETE` | `/api/tasks/{id}` | Eliminar una tarea       |

## 🌍 Despliegue (Opcional)

Para desplegar el proyecto en GitHub Pages se usa el paquete `angular-cli-ghpages` y se ejecuta el comando:

```bash
ng deploy --base-href=https://jorgepinedalm.github.io/taskManagerFE/
```

Para ver la versión desplegada de esta aplicación puede acceder a: [https://jorgepinedalm.github.io/taskManagerFE/](https://jorgepinedalm.github.io/taskManagerFE/)