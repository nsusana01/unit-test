import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskForm from '../TaskForm';

describe('TaskForm', () => {
  const mockSetText = jest.fn();
  const mockAddTask = jest.fn();
  const defaultProps = {
    text: '',
    setText: mockSetText,
    addTask: mockAddTask
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza correctamente el formulario', () => {
    render(<TaskForm {...defaultProps} />);
    
    const inputElement = screen.getByPlaceholderText('Nueva tarea');
    const buttonElement = screen.getByText('Agregar');
    
    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('');
  });

  test('muestra el texto actual en el input', () => {
    const textValue = 'Texto de prueba';
    render(<TaskForm {...defaultProps} text={textValue} />);
    
    const inputElement = screen.getByPlaceholderText('Nueva tarea');
    expect(inputElement).toHaveValue(textValue);
  });

  test('llama a setText cuando se escribe en el input', async () => {
    render(<TaskForm {...defaultProps} />);
    
    const inputElement = screen.getByPlaceholderText('Nueva tarea');
    await userEvent.type(inputElement, 'a');
    
    expect(mockSetText).toHaveBeenCalledTimes(1);
    expect(mockSetText).toHaveBeenCalledWith('a');
  });

  test('llama a addTask cuando se hace clic en el botón Agregar', async () => {
    render(<TaskForm {...defaultProps} />);
    
    const buttonElement = screen.getByText('Agregar');
    await userEvent.click(buttonElement);
    
    expect(mockAddTask).toHaveBeenCalledTimes(1);
  });
});
