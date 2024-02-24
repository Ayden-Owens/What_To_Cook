import React from 'react';
import { render, fireEvent, waitFor, getByPlaceholderText, screen, getByText } from '@testing-library/react';
import Axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import PriceComparer from '../src/PriceComparer';
//import { renderBoxWithWatermark } from 'your-rendering-library';

global.fetch = jest.fn().mockResolvedValue({});

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Price', () => {
  it('handlePrice function works correctly with valid input', async () => {
    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <PriceComparer />
      </MemoryRouter>
    );
    const inputElement = screen.getByPlaceholderText('Search for a product...');
//const inputElement = screen.getByLabelText('Search for a product:');

    // expect(inputElement).toHaveValue('Chicken');
    // const inputElement = screen.getByPlaceholderText('Search for a product...');

    // fireEvent.change(inputElement, { target: { value: 'Chicken' } });
    // fireEvent.change(getByLabelText('Search for a product...'), { target: { value: 'Chicken' } });
    // fireEvent.click(getByText('Search'));

    await waitFor(() => {
      // Assert that Axios.post was called with the correct arguments
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/PriceComparer',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            inputElement: 'Chicken'
          }),
        }
      );

      //expect(mockNavigate).toHaveBeenCalledWith('/home');
    });
  });
});

