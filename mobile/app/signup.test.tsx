import { supabase } from '@/config/supabase';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { useRouter } from 'expo-router';
import Signup from './signup';

// supabase mock
jest.mock('@/config/supabase', () => ({
  supabase: {
    auth: {
      signUp: jest.fn(),
    },
  },
}));

// expo router mock
jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

// theme mock
jest.mock('@/hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    colors: {
      background: '#fff',
      surface: '#fff',
      onBackground: '#000',
      tertiary: '#0000ff',
    },
    spacing: { md: 16 },
    borderRadius: { md: 8 },
    typography: {
      titleLarge: {
        fontSize: 22,
        lineHeight: 28,
        fontWeight: '500' as const,
      },
    }
  }),
}));

describe('Signup Screen', () => {
  const mockPush = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it('should render all form fields', () => {
    render(<Signup />);
    
    expect(screen.getByText('Create Account')).toBeTruthy();
    expect(screen.getByTestId('Name')).toBeTruthy();
    expect(screen.getByTestId('Email')).toBeTruthy();
    expect(screen.getByTestId('Password')).toBeTruthy();
    expect(screen.getByText('Sign Up')).toBeTruthy();
  });

  it('should show validation errors for empty fields', async () => {
    render(<Signup />);
    
    const signUpButton = screen.getByText('Sign Up');
    fireEvent.press(signUpButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Name cannot be empty./i)).toBeTruthy();
      expect(screen.getByText(/Email cannot be empty./i)).toBeTruthy();
      expect(screen.getByText(/Password cannot be empty./i)).toBeTruthy();
    });
    
    expect(supabase.auth.signUp).not.toHaveBeenCalled();
  });

  it('should show error for invalid email format', async () => {
    render(<Signup />);
    
    const nameInput = screen.getByTestId('Name');
    const emailInput = screen.getByTestId('Email');
    const passwordInput = screen.getByTestId('Password');
    const signUpButton = screen.getByText('Sign Up');
    
    fireEvent.changeText(nameInput, 'John Doe');
    fireEvent.changeText(emailInput, 'not-an-email');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(signUpButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Ooops! We need a valid email address./i)).toBeTruthy();
    });
    
    expect(supabase.auth.signUp).not.toHaveBeenCalled();
  });

  it('should successfully sign up with valid credentials', async () => {
    render(<Signup />);
    
    (supabase.auth.signUp as jest.Mock).mockResolvedValue({
      data: {
        user: { id: '123', email: 'test@example.com' },
        session: { access_token: 'fake-token' },
      },
      error: null,
    });
    
    const nameInput = screen.getByTestId('Name');
    const emailInput = screen.getByTestId('Email');
    const passwordInput = screen.getByTestId('Password');
    const signUpButton = screen.getByText('Sign Up');
    
    fireEvent.changeText(nameInput, 'John Doe');
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'Password123');
    fireEvent.press(signUpButton);
    
    await waitFor(() => {
      expect(supabase.auth.signUp).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'Password123',
        options: {
          data: {
            name: 'John Doe',
          },
        },
      });
    });
    
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('should navigate to verify email when email confirmation is required', async () => {
    render(<Signup />);
    
    (supabase.auth.signUp as jest.Mock).mockResolvedValue({
      data: {
        user: { id: '123', email: 'test@example.com' },
        session: null,  // no session = email confirmation needed (supabase rules)
      },
      error: null,
    });
    
    const nameInput = screen.getByTestId('Name');
    const emailInput = screen.getByTestId('Email');
    const passwordInput = screen.getByTestId('Password');
    const signUpButton = screen.getByText('Sign Up');
    
    fireEvent.changeText(nameInput, 'John Doe');
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'Password123');
    fireEvent.press(signUpButton);
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith({
        pathname: '/verifyemail',
        params: { email: 'test@example.com' },
      });
    });
  });

  it('should display error message from Supabase', async () => {
    render(<Signup />);
    
    (supabase.auth.signUp as jest.Mock).mockResolvedValue({
      data: { user: null, session: null },
      error: { message: 'Password must be at least 8 characters.' },
    });
    
    const nameInput = screen.getByTestId('Name');
    const emailInput = screen.getByTestId('Email');
    const passwordInput = screen.getByTestId('Password');
    const signUpButton = screen.getByText('Sign Up');
    
    fireEvent.changeText(nameInput, 'John Doe');
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'short'); // should fail validation
    fireEvent.press(signUpButton);
    
    await waitFor(() => {
      expect(screen.getByText('Password must be at least 8 characters.')).toBeTruthy();
    });
  });
});