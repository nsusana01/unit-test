import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoItem from './TodoItem';

const mockUpdateStatus = jest.fn();
const mockDeleteTask = jest.fn();
const mockUpdateText = jest.fn();

const sampleTask = {
  id: 1,
  text: 'Tarea de prueba',
  status: 'por hacer',
};

describe('TodoItem', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpia mocks antes de cada test
  });

  test('muestra el texto de la tarea y botones', () => {
    render(
      <TodoItem
        task={sampleTask}
        updateStatus={mockUpdateStatus}
        deleteTask={mockDeleteTask}
        updateText={mockUpdateText}
      />
    );

    expect(screen.getByText('Tarea de prueba')).toBeInTheDocument();
    expect(screen.getByText('haciendo')).toBeInTheDocument(); // siguiente estado
    expect(screen.getByText('Editar')).toBeInTheDocument();
    expect(screen.getByText('Eliminar')).toBeInTheDocument();
  });

  test('ejecuta deleteTask cuando se hace clic en Eliminar', async () => {
    render(
      <TodoItem
        task={sampleTask}
        updateStatus={mockUpdateStatus}
        deleteTask={mockDeleteTask}
        updateText={mockUpdateText}
      />
    );

    const deleteButton = screen.getByText('Eliminar');
    await userEvent.click(deleteButton);

    expect(mockDeleteTask).toHaveBeenCalledWith(sampleTask.id);
  });

  test('permite editar el texto y guardar', async () => {
    render(
      <TodoItem
        task={sampleTask}
        updateStatus={mockUpdateStatus}
        deleteTask={mockDeleteTask}
        updateText={mockUpdateText}
      />
    );

    await userEvent.click(screen.getByText('Editar'));

    const input = screen.getByDisplayValue('Tarea de prueba');
    await userEvent.clear(input);
    await userEvent.type(input, 'Texto editado');

    await userEvent.click(screen.getByText('Guardar'));

    expect(mockUpdateText).toHaveBeenCalledWith(sampleTask.id, 'Texto editado');
  });

  test('cambia el estado al siguiente al hacer clic en el botón de estado', async () => {
    render(
      <TodoItem
        task={sampleTask}
        updateStatus={mockUpdateStatus}
        deleteTask={mockDeleteTask}
        updateText={mockUpdateText}
      />
    );

    const statusButton = screen.getByText('haciendo'); // siguiente estado
    await userEvent.click(statusButton);

    expect(mockUpdateStatus).toHaveBeenCalledWith(sampleTask.id, 'haciendo');
  });
});
