import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Users, LogIn, LogOut } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Sistema de Gestión de Parqueo
          </h1>
          <p className="text-xl text-gray-600">
            Seleccione su tipo de usuario
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <button
            onClick={() => navigate('/admin/login')}
            className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 space-y-4"
          >
            <Users className="w-16 h-16 text-indigo-600" />
            <span className="text-2xl font-semibold text-gray-800">
              Administrador
            </span>
          </button>

          <button
            onClick={() => navigate('/client/entry')}
            className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 space-y-4"
          >
            <LogIn className="w-16 h-16 text-green-600" />
            <span className="text-2xl font-semibold text-gray-800">
              Entrada Cliente
            </span>
            <span className="text-sm text-gray-600">
              Registrar nuevo vehículo
            </span>
          </button>

          <button
            onClick={() => navigate('/client/exit')}
            className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 space-y-4"
          >
            <LogOut className="w-16 h-16 text-red-600" />
            <span className="text-2xl font-semibold text-gray-800">
              Salida Cliente
            </span>
            <span className="text-sm text-gray-600">
              Verificar estado y salir
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};