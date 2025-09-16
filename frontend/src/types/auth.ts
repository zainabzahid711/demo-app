// types/auth.ts
export interface FormData {
  firstName: string;
  lastName: string;
  city: string;
  email: string;
  phoneNumber: string;
  biologicalSex: string;
  language: string;
  password: string;
}

export interface InputFieldProps {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export interface SelectFieldProps {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

export interface PasswordFieldProps {
  label: string;
  placeholder: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SocialButtonProps {
  provider: "google" | "facebook";
  text: string;
  onClick?: () => void;
}

export interface AuthLayoutProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
}
