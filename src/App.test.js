import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Todo App', () => {

  test('renderiza el título de la aplicación', () => {
    //Arrange
    render(<App />);

    //Act
    const heading = screen.getByText(/Gestor de Tareas/);

    //Assert
    expect(heading).toBeInTheDocument();
  });

  test('permite agregar una nueva tarea y la muestra en la lista', async () => {
    //Arrange
    render(<App />);
    const inputTask = screen.getByPlaceholderText('Nueva tarea');
    const addButton = screen.getByText('Agregar');
    const newTaskText = 'Estudiar React test';

    //Act
    await userEvent.type(inputTask, newTaskText);
    await userEvent.click(addButton);

    const newTaskElement = screen.getByText(newTaskText);
    const toDoSection = screen.getAllByText('por hacer')[0].closest('div').parentElement;

    //Assert
    expect(toDoSection).toContainElement(newTaskElement);
    expect(inputTask).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    expect(inputTask).toHaveValue('');
    expect(newTaskElement).toBeInTheDocument();
  });
  
  test('permite cambiar una tarea de "por hacer" a "haciendo"', async () => {
    //Arrange
    render(<App />);
    const inputTask = screen.getByPlaceholderText('Nueva tarea');
    const addButton = screen.getByText('Agregar');
    const newTaskText = 'Tarea para cambiar estado';

    await userEvent.type(inputTask, newTaskText);
    await userEvent.click(addButton);
    

    const newTaskElement = screen.getByText(newTaskText);

    const taskContainer = newTaskElement.closest('.bg-white');

    const statusButton = within(taskContainer).getByText('haciendo');
    
    //Act
    await userEvent.click(statusButton);
    
    //Assert

    await waitFor(() => {
      expect(screen.getByText(newTaskText)).toBeInTheDocument();
    });

    const updatedTaskElement = screen.getByText(newTaskText);
    

    const updatedTaskContainer = updatedTaskElement.closest('.bg-white');

    const nextStateButton = within(updatedTaskContainer).getByText('hechas');
    expect(nextStateButton).toBeInTheDocument();

    const oldStateButton = within(updatedTaskContainer).queryByText('haciendo');
    expect(oldStateButton).toBeNull();
  });
  
  test('permite buscar tareas existentes', async () => {
    //Arrange
    render(<App />);
    const searchInput = screen.getByPlaceholderText('Buscar tarea...');

    expect(screen.getByText('Estudiar React')).toBeInTheDocument();
    expect(screen.getByText('Practicar testing')).toBeInTheDocument();
    
    //Act
    await userEvent.type(searchInput, 'React');
    
    //Assert
    expect(screen.getByText('Estudiar React')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText('Practicar testing')).not.toBeInTheDocument();
    });
    
    //Act
    await userEvent.clear(searchInput);
    
    //Assert
    await waitFor(() => {
      expect(screen.getByText('Estudiar React')).toBeInTheDocument();
      expect(screen.getByText('Practicar testing')).toBeInTheDocument();
    });
  });

  test('permite cambiar una tarea de "haciendo" a "hechas"', async () => {
    //Arrange
    render(<App />);
    const existingTaskText = 'Practicar testing';
    const taskElement = screen.getByText(existingTaskText);

    const taskContainer = taskElement.closest('.bg-white');

    const statusButton = within(taskContainer).getByText('hechas');
    expect(statusButton).toBeInTheDocument();
    
    //Act
    await userEvent.click(statusButton);
    
    //Assert
    await waitFor(() => {
      expect(screen.getByText(existingTaskText)).toBeInTheDocument();
    });

    const updatedTaskElement = screen.getByText(existingTaskText);

    const updatedTaskContainer = updatedTaskElement.closest('.bg-white');

    const nextStateButton = within(updatedTaskContainer).getByText('por hacer');
    expect(nextStateButton).toBeInTheDocument();

    const oldStateButton = within(updatedTaskContainer).queryByText('hechas');
    expect(oldStateButton).toBeNull();
  });

  test('permite eliminar una tarea existente', async () => {
    //Arrange
    render(<App />);
    const inputTask = screen.getByPlaceholderText('Nueva tarea');
    const addButton = screen.getByText('Agregar');
    const taskToDeleteText = 'Tarea para eliminar';
    
    await userEvent.type(inputTask, taskToDeleteText);
    await userEvent.click(addButton);
    
    const taskElement = screen.getByText(taskToDeleteText);
    expect(taskElement).toBeInTheDocument();
    
    const taskContainer = taskElement.closest('.bg-white');
    const deleteButton = within(taskContainer).getByText('Eliminar');
    expect(deleteButton).toBeInTheDocument();
    
    //Act
    await userEvent.click(deleteButton);
    
    //Assert
    await waitFor(() => {
      expect(screen.queryByText(taskToDeleteText)).not.toBeInTheDocument();
    });
    
    expect(screen.getByText('Estudiar React')).toBeInTheDocument();
    expect(screen.getByText('Practicar testing')).toBeInTheDocument();
  });
});
