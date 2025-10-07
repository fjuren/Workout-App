export const emailValidator = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const trimmedEmail = email?.trim();

  if (!trimmedEmail || trimmedEmail.length === 0) {
    return 'Email cannot be empty.';
  }
  if (!re.test(trimmedEmail)) {
    return 'Ooops! We need a valid email address.';
  }
  return '';
};

export const passwordValidator = (password: string) => {
  if (!password || password.length === 0) {
    return 'Password cannot be empty.';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters.';
  }
  if (password.length < 8) {
    return 'For better security, use at least 8 characters.';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Password should contain an uppercase letter.';
  }
  if (!/[0-9]/.test(password)) {
    return 'Password should contain a number.';
  }
  return '';
};

export const nameValidator = (name: string) => {
  const trimmedName = name?.trim();

  if (!trimmedName || trimmedName.length === 0) {
    return 'Name cannot be empty.';
  }
  if (trimmedName.length < 2) {
    return 'Name must be at least 2 characters.';
  }
  return '';
};
