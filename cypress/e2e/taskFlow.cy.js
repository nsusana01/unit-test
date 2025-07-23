// Prueba E2E completa del flujo de gestión de tareas
describe('Flujo completo de gestión de tareas', () => {
  beforeEach(() => {
    // Visitar la aplicación antes de cada prueba
    cy.visit('/');
  });

  it('Permite gestionar completamente una tarea: crear, buscar, editar, cambiar estado y eliminar', () => {
    const taskText = 'Tarea de prueba E2E';
    const editedTaskText = 'Tarea de prueba E2E (editada)';
    
    // Verificar que la interfaz se cargue correctamente
    cy.contains('h1', 'Gestor de Tareas').should('be.visible');
    cy.get('input[placeholder="Nueva tarea"]').should('be.visible');
    cy.get('button').contains('Agregar').should('be.visible');
    
    // 1. Crear una nueva tarea
    cy.get('input[placeholder="Nueva tarea"]').type(taskText);
    cy.get('button').contains('Agregar').click();
    
    // Verificar que la tarea se ha creado en la columna "por hacer"
    cy.contains('div', 'por hacer')
      .parent()
      .contains(taskText)
      .should('be.visible');
    
    // 2. Buscar la tarea
    cy.get('input[placeholder="Buscar tarea..."]').type(taskText);
    
    // Verificar que solo aparece nuestra tarea
    cy.contains(taskText).should('be.visible');
    cy.contains('Estudiar React').should('not.exist');
    
    // Limpiar búsqueda
    cy.get('input[placeholder="Buscar tarea..."]').clear();
    
    // 3. Editar la tarea
    cy.contains(taskText)
      .parent()
      .contains('Editar')
      .click();
    
    // Encontrar el input y editar el texto
    cy.contains(taskText)
      .parent()
      .find('input')
      .clear()
      .type(editedTaskText);
    
    cy.contains('Guardar').click();
    
    // Verificar que el texto se actualizó
    cy.contains(editedTaskText).should('be.visible');
    
    // 4. Cambiar estado de "por hacer" a "haciendo"
    cy.contains(editedTaskText)
      .parent()
      .contains('haciendo')
      .click();
    
    // Verificar que la tarea ahora está en la columna "haciendo"
    cy.contains('div', 'haciendo')
      .parent()
      .contains(editedTaskText)
      .should('be.visible');
    
    // Cambiar estado de "haciendo" a "hechas"
    cy.contains(editedTaskText)
      .parent()
      .contains('hechas')
      .click();
    
    // Verificar que la tarea ahora está en la columna "hechas"
    cy.contains('div', 'hechas')
      .parent()
      .contains(editedTaskText)
      .should('be.visible');
    
    // 5. Eliminar la tarea
    cy.contains(editedTaskText)
      .parent()
      .contains('Eliminar')
      .click();
    
    // Verificar que la tarea ya no existe
    cy.contains(editedTaskText).should('not.exist');
  });
});
