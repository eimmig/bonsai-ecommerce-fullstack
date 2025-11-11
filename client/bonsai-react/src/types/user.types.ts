export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  cpfCnpj?: string;        
  phone?: string;          
  birthDate?: string;      
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id?: number;
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  userId: string;
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
  user: User;
}
