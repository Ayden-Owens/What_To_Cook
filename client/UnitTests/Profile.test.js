import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import Profile from '../src/Profile';

// global.fetch = jest.fn().mockResolvedValue({});

// // Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));
describe('Profile', () => {
  it('handleProfile function works correctly with valid input', async () => {
    // Mock Axios post method
    jest.spyOn(Axios, 'post').mockResolvedValue({
      data: { message: 'Profile' },
    });
    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );
    const input = getByPlaceholderText('Enter Ingredient Name');
   fireEvent.change(input, { target: { value: 'Chicken' } });
    fireEvent.click(getByText('Save'));
    expect(input.value).toBe('Chicken');


//ingredientName
//ingredientQuantity
    await waitFor(() => {
      expect(Axios.post).toHaveBeenCalledWith(
        'http://localhost:3000/users/profile',
      );
    });
  });
});
