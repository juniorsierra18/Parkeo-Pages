import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { api } from '../api';
import { useParking } from '../context/ParkingContext';

export const ClientEntry: React.FC = () => {
  const navigate = useNavigate();
  const { hourlyRate, availableSpaces } = useParking();
  const [cedula, setCedula] = useState('');
  const [matricula, setMatricula] = useState('');
  const [hours, setHours] = useState<'1' | '2' | '4' | 'flexible'>('1');
  const [error, setError] = useState('');

  const validateMatricula = (value: string) => {
    const regex = /^[a-zA-Z]{3}\d{3}$/;
    return regex.test(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateMatricula(matricula)) {
      setError('La matrícula debe tener el formato ABC123');
      return;
    }

    try {
      if (availableSpaces <= 0) {
        setError('No hay espacios disponibles');
        return;
      }

      const precio = hours === 'flexible' ? hourlyRate : Number(hours) * hourlyRate;
      
      await api.createClient({
        cedula,
        matricula: matricula.toUpperCase(),
        precio,
        estado: 0
      });

      navigate('/');
    } catch (error) {
      setError('Error al registrar el cliente');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto">
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver
        </button>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Registro de Entrada
          </h2>

          <div className="mb-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-lg font-medium text-gray-900">
                Espacios Disponibles
              </p>
              <p className={`text-3xl font-bold ${
                availableSpaces > 0 ? 'text-indigo-600' : 'text-red-600'
              }`}>
                {availableSpaces} espacios
              </p>
              <p className="text-sm text-gray-500">
                Tarifa: ${hourlyRate}/hora
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cédula
              </label>
              <input
                type="text"
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Matrícula (formato: ABC123)
              </label>
              <input
                type="text"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Plan de Estacionamiento
              </label>
              <select
                value={hours}
                onChange={(e) => setHours(e.target.value as '1' | '2' | '4' | 'flexible')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="1">1 hora (${hourlyRate})</option>
                <option value="2">2 horas (${hourlyRate * 2})</option>
                <option value="4">4 horas (${hourlyRate * 4})</option>
                <option value="flexible">Tiempo flexible</option>
              </select>
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Registrar Entrada
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};