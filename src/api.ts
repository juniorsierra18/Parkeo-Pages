import axios from 'axios';
import { User, Client } from './types';

const API_URL = 'https://api-parkeo-railway-production.up.railway.app/apiparkeo';

export const api = {
  // User endpoints
  getUsers: () => axios.get<User[]>(`${API_URL}/users`),
  createUser: (user: Omit<User, 'id'>) => axios.post<User>(`${API_URL}/users`, user),
  updateUser: (id: number, user: Partial<User>) => axios.put<User>(`${API_URL}/users/${id}`, user),
  deleteUser: (id: number) => axios.delete(`${API_URL}/users/${id}`),

  // Client endpoints
  getClients: () => axios.get<Client[]>(`${API_URL}/clients`),
  getClientByCedula: (cedula: string) => axios.get<Client>(`${API_URL}/clients/cedula/${cedula}`),
  createClient: (client: Omit<Client, 'id'>) => axios.post<Client>(`${API_URL}/clients`, client),
  updateClient: (id: number, client: Partial<Client>) => 
    axios.put<Client>(`${API_URL}/clients/${id}`, client),
  deleteClient: (id: number) => axios.delete(`${API_URL}/clients/${id}`),
  deleteClientByCedula: (cedula: string) => axios.delete(`${API_URL}/clients/cedula/${cedula}`),
};