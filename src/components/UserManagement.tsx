import React, { useState } from 'react';
import { User } from '../types';
import { api } from '../api';

interface UserManagementProps {
  users: User[];
  onUserUpdate: () => void;
}

export const UserManagement: React.FC<UserManagementProps> = ({ users, onUserUpdate }) => {
  const [newUser, setNewUser] = useState({ user: '', contraseña: '' });

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createUser(newUser);
      setNewUser({ user: '', contraseña: '' });
      onUserUpdate();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await api.deleteUser(id);
      onUserUpdate();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Gestión de Usuarios</h2>
      
      <form onSubmit={handleCreateUser} className="mb-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Usuario</label>
          <input
            type="text"
            value={newUser.user}
            onChange={(e) => setNewUser({ ...newUser, user: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            type="password"
            value={newUser.contraseña}
            onChange={(e) => setNewUser({ ...newUser, contraseña: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Crear Usuario
        </button>
      </form>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-3">Usuarios Existentes</h3>
        <div className="space-y-2">
          {users.map((user) => (
            <div key={user.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
              <span>{user.user}</span>
              {user.user !== 'adminRoot' && (
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Eliminar
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};