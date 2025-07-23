import { render, screen } from '@testing-library/react';
import TaskList from '../TaskList';

// Mockear el componente TodoItem para simplificar las pruebas
jest.mock('../TodoItem', () => {
  return function MockTodoItem({ task }) {
    return <div data-testid={`todo-item-${task.id}`}>{task.text}</div>;
  };
});

describe('TaskList', () => {
  const mockUpdateStatus = jest.fn();
  const mockDeleteTask = jest.fn();
  const mockUpdateText = jest.fn();
  
  const sampleTasks = [
    { id: 1, text: 'Tarea 1', status: 'por hacer' },
    { id: 2, text: 'Tarea 2', status: 'haciendo' },
    { id: 3, text: 'Tarea 3', status: 'hechas' },
    { id: 4, text: 'Tarea 4', status: 'por hacer' },
  ];

  const defaultProps = {
    filteredTasks: sampleTasks,
    updateStatus: mockUpdateStatus,
    deleteTask: mockDeleteTask,
    updateText: mockUpdateText
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza correctamente las tres columnas', () => {
    render(<TaskList {...defaultProps} />);
    
    expect(screen.getByText('por hacer')).toBeInTheDocument();
    expect(screen.getByText('haciendo')).toBeInTheDocument();
    expect(screen.getByText('hechas')).toBeInTheDocument();
  });

  test('muestra las tareas en las columnas correctas', () => {
    render(<TaskList {...defaultProps} />);
    
    // Verificar que las tareas estén en las columnas correctas
    const porHacerColumn = screen.getByText('por hacer').closest('div');
    const haciendoColumn = screen.getByText('haciendo').closest('div');
    const hechasColumn = screen.getByText('hechas').closest('div');
    
    expect(porHacerColumn).toContainElement(screen.getByText('Tarea 1'));
    expect(porHacerColumn).toContainElement(screen.getByText('Tarea 4'));
    expect(haciendoColumn).toContainElement(screen.getByText('Tarea 2'));
    expect(hechasColumn).toContainElement(screen.getByText('Tarea 3'));
  });

  test('renderiza el componente TodoItem para cada tarea', () => {
    render(<TaskList {...defaultProps} />);
    
    expect(screen.getByTestId('todo-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('todo-item-2')).toBeInTheDocument();
    expect(screen.getByTestId('todo-item-3')).toBeInTheDocument();
    expect(screen.getByTestId('todo-item-4')).toBeInTheDocument();
  });

  test('no muestra tareas cuando no hay coincidencias', () => {
    render(<TaskList {...defaultProps} filteredTasks={[]} />);
    
    expect(screen.queryByTestId('todo-item-1')).not.toBeInTheDocument();
    expect(screen.queryByTestId('todo-item-2')).not.toBeInTheDocument();
    expect(screen.queryByTestId('todo-item-3')).not.toBeInTheDocument();
    expect(screen.queryByTestId('todo-item-4')).not.toBeInTheDocument();
  });
});
