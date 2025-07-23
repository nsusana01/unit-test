// Prueba E2E para verificar la responsividad de la interfaz
describe('Pruebas de responsividad', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('La interfaz se adapta correctamente en pantallas grandes', () => {
    // Establecer viewport de escritorio
    cy.viewport(1280, 720);
    
    // Verificar que el layout es horizontal en pantallas grandes
    cy.get('div.flex.flex-col.md\\:flex-row').should('exist');
    
    // Verificar que las columnas de tareas están en una fila
    cy.get('div.grid.grid-cols-1.md\\:grid-cols-3').should('exist');
    
    // Verificar que los elementos de búsqueda y formulario tienen el ancho esperado
    cy.get('div.w-full.md\\:w-1\\/3').should('exist');
    cy.get('div.w-full.md\\:w-2\\/3').should('exist');
  });

  it('La interfaz se adapta correctamente en pantallas medianas', () => {
    // Establecer viewport de tablet
    cy.viewport(768, 1024);
    
    // Verificar que el layout sigue siendo horizontal en tablets
    cy.get('div.flex.flex-col.md\\:flex-row').should('exist');
    
    // Verificar que las columnas de tareas están en una fila
    cy.get('div.grid.grid-cols-1.md\\:grid-cols-3').should('exist');
  });

  it('La interfaz se adapta correctamente en pantallas pequeñas', () => {
    // Establecer viewport de móvil
    cy.viewport(375, 667);
    
    // En móvil, los elementos deberían apilarse verticalmente
    cy.get('div.flex.flex-col.md\\:flex-row')
      .should('have.css', 'flex-direction', 'column');
    
    // Las columnas de tareas deberían apilarse
    cy.get('div.grid.grid-cols-1.md\\:grid-cols-3')
      .should('have.css', 'grid-template-columns')
      .and('not.include', '3');
    
    // Verificar que los elementos ocupan todo el ancho disponible
    cy.get('div.w-full.md\\:w-1\\/3')
      .should('have.css', 'width', '100%');
    cy.get('div.w-full.md\\:w-2\\/3')
      .should('have.css', 'width', '100%');
  });

  it('Los elementos de la interfaz son usables en diferentes tamaños de pantalla', () => {
    // Probar funcionalidad en pantalla móvil
    cy.viewport(375, 667);
    
    // Agregar una tarea
    cy.get('input[placeholder="Nueva tarea"]').type('Tarea móvil');
    cy.get('button').contains('Agregar').click();
    cy.contains('Tarea móvil').should('be.visible');
    
    // Probar funcionalidad en pantalla mediana
    cy.viewport(768, 1024);
    
    // Buscar la tarea
    cy.get('input[placeholder="Buscar tarea..."]').type('móvil');
    cy.contains('Tarea móvil').should('be.visible');
    cy.contains('Estudiar React').should('not.exist');
    
    // Probar funcionalidad en pantalla grande
    cy.viewport(1280, 720);
    
    // Eliminar la tarea
    cy.get('input[placeholder="Buscar tarea..."]').clear();
    cy.contains('Tarea móvil')
      .parent()
      .contains('Eliminar')
      .click();
    cy.contains('Tarea móvil').should('not.exist');
  });
});
