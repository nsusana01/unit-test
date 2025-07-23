import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Integración - Creación de Tareas', () => {
  test('permite agregar una nueva tarea que aparece en la columna por hacer', async () => {
    // Arrange
    render(<App />);
    const inputTask = screen.getByPlaceholderText('Nueva tarea');
    const addButton = screen.getByText('Agregar');
    const newTaskText = 'Nueva tarea de integración';
    
    // Verificar estado inicial
    const initialToDoColumn = screen.getAllByText('por hacer')[0].closest('div').parentElement;
    expect(screen.queryByText(newTaskText)).not.toBeInTheDocument();
    
    // Act
    await userEvent.type(inputTask, newTaskText);
    await userEvent.click(addButton);
    
    // Assert
    const updatedToDoColumn = screen.getAllByText('por hacer')[0].closest('div').parentElement;
    expect(screen.getByText(newTaskText)).toBeInTheDocument();
    expect(updatedToDoColumn).toContainElement(screen.getByText(newTaskText));
    
    // Verificar que el input se haya limpiado
    expect(inputTask).toHaveValue('');
  });

  test('no agrega tareas con texto vacío', async () => {
    // Arrange
    render(<App />);
    const addButton = screen.getByText('Agregar');
    const initialTaskCount = screen.getAllByText(/Tarea|Estudiar|Practicar/).length;
    
    // Act
    await userEvent.click(addButton);
    
    // Assert
    const finalTaskCount = screen.getAllByText(/Tarea|Estudiar|Practicar/).length;
    expect(finalTaskCount).toBe(initialTaskCount);
  });

  test('integración con TaskForm permite agregar varias tareas consecutivas', async () => {
    // Arrange
    render(<App />);
    const inputTask = screen.getByPlaceholderText('Nueva tarea');
    const addButton = screen.getByText('Agregar');
    
    // Act - Agregar primera tarea
    await userEvent.type(inputTask, 'Primera tarea');
    await userEvent.click(addButton);
    
    // Act - Agregar segunda tarea
    await userEvent.type(inputTask, 'Segunda tarea');
    await userEvent.click(addButton);
    
    // Assert
    expect(screen.getByText('Primera tarea')).toBeInTheDocument();
    expect(screen.getByText('Segunda tarea')).toBeInTheDocument();
  });
});
