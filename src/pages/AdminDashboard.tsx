import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, LogOut } from 'lucide-react';
import { api } from '../api';
import { useParking } from '../context/ParkingContext';
import { ClientList } from '../components/ClientList';
import { UserManagement } from '../components/UserManagement';
import { Client, User } from '../types';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { 
    isAdmin, 
    isRootAdmin, 
    maxSpaces, 
    setMaxSpaces, 
    hourlyRate, 
    setHourlyRate,
    occupiedSpaces,
    availableSpaces
  } = useParking();
  const [clients, setClients] = useState<Client[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState<'all' | 'paid' | 'unpaid'>('all');
  const [searchCedula, setSearchCedula] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login');
      return;
    }
    fetchData();
  }, [isAdmin, navigate]);

  const fetchData = async () => {
    try {
      const [clientsResponse, usersResponse] = await Promise.all([
        api.getClients(),
        isRootAdmin ? api.getUsers() : Promise.resolve({ data: [] }),
      ]);
      setClients(clientsResponse.data);
      if (isRootAdmin) {
        setUsers(usersResponse.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleUpdateStatus = async (id: number, status: number) => {
    try {
      await api.updateClient(id, { estado: status });
      fetchData();
    } catch (error) {
      console.error('Error updating client status:', error);
    }
  };

  const filteredClients = clients
    .filter((client) => {
      if (filter === 'paid') return client.estado === 1;
      if (filter === 'unpaid') return client.estado === 0;
      return true;
    })
    .filter((client) => 
      searchCedula ? client.cedula.includes(searchCedula) : true
    );

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Panel de Administración
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {isRootAdmin && (
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-500"
                >
                  <Settings className="w-6 h-6" />
                </button>
              )}
              <button
                onClick={() => navigate('/')}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500"
              >
                <LogOut className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {showSettings && isRootAdmin && (
          <div className="mb-6 bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4">Configuración</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Espacios Máximos
                </label>
                <input
                  type="number"
                  value={maxSpaces}
                  onChange={(e) => setMaxSpaces(Number(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tarifa por Hora ($)
                </label>
                <input
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        )}

        <div className="mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900">
                Estado del Parqueadero
              </h2>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <p className="text-sm text-gray-500">Espacios Totales</p>
                  <p className="text-2xl font-bold text-gray-900">{maxSpaces}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Ocupados</p>
                  <p className="text-2xl font-bold text-orange-600">{occupiedSpaces}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Disponibles</p>
                  <p className="text-2xl font-bold text-green-600">{availableSpaces}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Clientes Registrados
                </h2>
                <div className="mt-4 md:mt-0 space-y-2 md:space-y-0 md:space-x-2">
                  <input
                    type="text"
                    placeholder="Buscar por cédula"
                    value={searchCedula}
                    onChange={(e) => setSearchCedula(e.target.value)}
                    className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as 'all' | 'paid' | 'unpaid')}
                    className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="all">Todos</option>
                    <option value="paid">Pagados</option>
                    <option value="unpaid">No Pagados</option>
                  </select>
                </div>
              </div>
              <ClientList
                clients={filteredClients}
                onUpdateStatus={handleUpdateStatus}
                showPaymentControls={true}
              />
            </div>
          </div>

          {isRootAdmin && (
            <UserManagement users={users} onUserUpdate={fetchData} />
          )}
        </div>
      </main>
    </div>
  );
};