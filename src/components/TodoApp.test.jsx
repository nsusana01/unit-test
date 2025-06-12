import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoApp from './TodoApp';

describe('TodoApp con userEvent', () => {
  test('renderiza tareas iniciales', () => {
    render(<TodoApp />);
    expect(screen.getByText('Estudiar React')).toBeInTheDocument();
    expect(screen.getByText('Practicar testing')).toBeInTheDocument();
  });

  test('agrega una nueva tarea válida', async () => {
    render(<TodoApp />);
    const input = screen.getByPlaceholderText('Nueva tarea');
    const addButton = screen.getByText('Agregar');

    await userEvent.type(input, 'Aprender testing');
    await userEvent.click(addButton);

    expect(screen.getByText('Aprender testing')).toBeInTheDocument();
  });

  test('no agrega tarea vacía', async () => {
    render(<TodoApp />);
    const addButton = screen.getByText('Agregar');

    await userEvent.click(addButton);

    // Validamos que las tareas iniciales aún están presentes y no hay tarea vacía
    expect(screen.getByText('Estudiar React')).toBeInTheDocument();
    expect(screen.getByText('Practicar testing')).toBeInTheDocument();
    expect(screen.queryByText('')).not.toBeInTheDocument();
  });

  test('filtra tareas por texto', async () => {
    render(<TodoApp />);
    const searchInput = screen.getByPlaceholderText('Buscar tarea...');

    await userEvent.type(searchInput, 'React');

    expect(screen.getByText('Estudiar React')).toBeInTheDocument();
    expect(screen.queryByText('Practicar testing')).not.toBeInTheDocument();
  });

  test('elimina una tarea', async () => {
    render(<TodoApp />);
    const deleteButtons = screen.getAllByText('Eliminar');

    await userEvent.click(deleteButtons[0]);

    expect(screen.queryByText('Estudiar React')).not.toBeInTheDocument();
  });

  test('cambia el estado de una tarea', async () => {
    render(<TodoApp />);
    const statusButton = screen.getByText('hechas'); // botón correspondiente a 'Practicar testing'

    await userEvent.click(statusButton);

    // El botón de estado ahora debería ser "por hacer"
    expect(screen.getByText('por hacer')).toBeInTheDocument();
  });

  test('edita el texto de una tarea', async () => {
    render(<TodoApp />);
    const editButton = screen.getAllByText('Editar')[0];

    await userEvent.click(editButton);

    const input = screen.getByDisplayValue('Estudiar React');

    await userEvent.clear(input);
    await userEvent.type(input, 'Estudiar ReactJS');

    const saveButton = screen.getByText('Guardar');
    await userEvent.click(saveButton);

    expect(screen.getByText('Estudiar ReactJS')).toBeInTheDocument();
  });
});