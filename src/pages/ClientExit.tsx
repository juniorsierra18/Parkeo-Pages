import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { api } from '../api';

export const ClientExit: React.FC = () => {
  const navigate = useNavigate();
  const [cedula, setCedula] = useState('');
  const [matricula, setMatricula] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState<{ message: string; isError: boolean } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setStatus(null);

    try {
      const response = await api.getClientByCedula(cedula);
      const client = response.data;
    
      // Check if the matricula matches
      if (client.matricula.toLowerCase() !== matricula.toLowerCase()) {
        setError('No se encontró el registro del vehículo');
        return;
      }
    
      if (client.estado === 0) {
        setStatus({
          message: `Debe pagar $${client.precio} antes de salir`,
          isError: true
        });
      } else {
        setStatus({
          message: 'Puede retirar su vehículo',
          isError: false
        });
      }
    } catch (error) {
      setError('Error al verificar el estado');
    }
  };

  const handleDeleteAndNavigate = async () => {
    try {
      await api.deleteClientByCedula(cedula);
      navigate('/');
    } catch (error) {
      setError('Error al eliminar el registro');
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
            Registro de Salida
          </h2>

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
                Matrícula
              </label>
              <input
                type="text"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            {status && status.isError && (
              <div className="p-4 rounded-md bg-red-50 text-red-700">
                {status.message}
              </div>
            )}

            {/* Display an alert with a delete-and-return button when the vehicle can be retrieved */}
            {status && !status.isError && (
              <div className="p-4 rounded-md bg-green-50 text-green-700">
                <p>{status.message}</p>
                <button
                  onClick={handleDeleteAndNavigate}
                  className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Volver al inicio
                </button>
              </div>
            )}

            {!status && (
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Verificar Estado
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
