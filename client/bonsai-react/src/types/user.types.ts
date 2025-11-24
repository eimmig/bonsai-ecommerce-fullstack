export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  cpfCnpj?: string;
  phone?: string;
  birthDate?: string;
  addresses: Address[];
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id?: string;
  street: string;
  number: string;
  complement?: string;
  zipCode: string;
  neighborhood: string;
  city: string;
  state: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  cpfCnpj?: string;  
  phone?: string;    
  birthDate?: string;
}

export interface AuthResponse {
  token: string;
  userId: string;
  name: string;
  email: string;
}

export interface RegisterResponse {
  id: string;
  name: string;
  email: string;
  cpfCnpj?: string;
  phone?: string;
  birthDate?: string;
  addresses: Address[];
  createdAt: string;
  updatedAt: string;
}
