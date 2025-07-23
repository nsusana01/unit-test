import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../SearchBar';

describe('SearchBar', () => {
  const mockSetSearch = jest.fn();
  const defaultProps = {
    search: '',
    setSearch: mockSetSearch
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza correctamente la barra de búsqueda', () => {
    render(<SearchBar {...defaultProps} />);
    
    const inputElement = screen.getByPlaceholderText('Buscar tarea...');
    
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('');
  });

  test('muestra el valor actual de búsqueda', () => {
    const searchValue = 'React';
    render(<SearchBar {...defaultProps} search={searchValue} />);
    
    const inputElement = screen.getByPlaceholderText('Buscar tarea...');
    expect(inputElement).toHaveValue(searchValue);
  });

  test('llama a setSearch cuando se escribe en el input', async () => {
    render(<SearchBar {...defaultProps} />);
    
    const inputElement = screen.getByPlaceholderText('Buscar tarea...');
    await userEvent.type(inputElement, 'R');
    
    expect(mockSetSearch).toHaveBeenCalledTimes(1);
    expect(mockSetSearch).toHaveBeenCalledWith('R');
  });
});
