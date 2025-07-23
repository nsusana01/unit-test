# Plan de Pruebas del Módulo CRUD para la Aplicación de Tareas

Este documento describe la estrategia de pruebas para el módulo CRUD (Crear, Leer, Actualizar, Eliminar) de la aplicación de gestión de tareas. El plan incluye pruebas unitarias, pruebas de integración y pruebas end-to-end (E2E).

## 1. Pruebas Unitarias

Las pruebas unitarias se enfocan en verificar el funcionamiento correcto de unidades individuales de código de manera aislada, generalmente a nivel de componente o función.

### Componentes a probar:

#### 1.1 TodoItem
- **Responsabilidad**: Mostrar una tarea individual y manejar acciones (editar, eliminar, cambiar estado)
- **Pruebas existentes**:
  - Renderización correcta del texto y botones
  - Acción de eliminar tarea
  - Edición y guardado de texto
  - Cambio de estado

#### 1.2 TaskForm
- **Pruebas a implementar**:
  - Renderización correcta del formulario
  - Cambio de texto en el input
  - Llamada a la función addTask al hacer clic en el botón "Agregar"
  - Validación de texto vacío

#### 1.3 SearchBar
- **Pruebas a implementar**:
  - Renderización correcta de la barra de búsqueda
  - Actualización del estado search al escribir en el campo

#### 1.4 TaskList
- **Pruebas a implementar**:
  - Renderización correcta de las columnas de tareas
  - Filtrado correcto de tareas por estado
  - Renderización de componentes TodoItem para cada tarea

## 2. Pruebas de Integración

Las pruebas de integración verifican que varios componentes o unidades del sistema funcionen correctamente juntos.

### Integraciones a probar:

#### 2.1 Flujo de creación de tareas
- Integración entre TaskForm y App
- Verificar que una nueva tarea aparezca en la columna "por hacer"

#### 2.2 Flujo de búsqueda
- Integración entre SearchBar y TaskList
- Verificar que el filtrado funcione correctamente y solo muestre las tareas que coincidan

#### 2.3 Flujo de cambio de estado
- Integración entre TodoItem, TaskList y App
- Verificar que al cambiar el estado de una tarea, se mueva a la columna correspondiente

#### 2.4 Flujo de edición de tareas
- Integración entre TodoItem y App
- Verificar que los cambios en el texto de la tarea se reflejen correctamente

#### 2.5 Flujo de eliminación
- Integración entre TodoItem y App
- Verificar que al eliminar una tarea, desaparezca de la lista

## 3. Pruebas End-to-End (E2E)

Las pruebas E2E simulan el comportamiento de un usuario real interactuando con la aplicación, probando el flujo completo desde la interfaz de usuario hasta la capa de datos.

### Escenarios a probar:

#### 3.1 Flujo completo de gestión de tareas
- Crear una nueva tarea
- Buscar la tarea
- Editar la tarea
- Cambiar su estado de "por hacer" a "haciendo" a "hechas"
- Eliminar la tarea

#### 3.2 Persistencia de datos
- Crear varias tareas
- Verificar que permanezcan después de recargar la página (requiere implementar almacenamiento)

#### 3.3 Interfaz responsiva
- Verificar que la aplicación funcione correctamente en diferentes tamaños de pantalla

## 4. Herramientas a utilizar

### Para pruebas unitarias y de integración:
- **Jest**: Framework de pruebas
- **React Testing Library**: Biblioteca para probar componentes React
- **User Event**: Simulación de eventos de usuario

### Para pruebas E2E:
- **Cypress**: Framework para pruebas E2E
- **Playwright**: Alternativa para pruebas E2E en múltiples navegadores

## 5. Implementación

### 5.1 Directorio de pruebas
```
/src
  /components
    /__tests__
      TodoItem.test.jsx     (existente)
      TaskForm.test.jsx     (a implementar)
      SearchBar.test.jsx    (a implementar)
      TaskList.test.jsx     (a implementar)
  /integration
    taskCreation.test.jsx   (a implementar)
    taskFiltering.test.jsx  (a implementar)
    taskStatusChange.test.jsx (a implementar)
  App.test.js              (existente - contiene algunas pruebas de integración)
/cypress
  /e2e
    taskFlow.cy.js         (a implementar)
    responsiveness.cy.js   (a implementar)
```

### 5.2 Convenciones de nombres
- Archivos de prueba unitaria: `[ComponentName].test.jsx`
- Archivos de prueba de integración: `[featureName].test.jsx`
- Archivos de prueba E2E: `[scenarioName].cy.js`

## 6. Proceso de ejecución de pruebas

1. **Pruebas unitarias y de integración**:
   ```
   npm test
   ```

2. **Pruebas E2E con Cypress**:
   ```
   npm run cypress:open
   ```
   o
   ```
   npm run cypress:run
   ```

## 7. Cobertura de código

Se establecerá un umbral mínimo de cobertura:
- Funciones: 80%
- Ramas: 70%
- Líneas: 80%
- Declaraciones: 80%

Para verificar la cobertura:
```
npm test -- --coverage
```

## 8. CI/CD

Integración con el pipeline de CI/CD para ejecutar todas las pruebas automáticamente ante cada pull request y despliegue.
