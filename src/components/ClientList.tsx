import React from 'react';
import { Check, X, DollarSign } from 'lucide-react';
import { Client } from '../types';

interface ClientListProps {
  clients: Client[];
  onUpdateStatus: (id: number, status: number) => void;
  showPaymentControls?: boolean;
}

export const ClientList: React.FC<ClientListProps> = ({ 
  clients, 
  onUpdateStatus,
  showPaymentControls = true
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cédula
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Matrícula
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Precio
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </th>
            {showPaymentControls && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {clients.map((client) => (
            <tr key={client.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {client.cedula}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {client.matricula}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${client.precio}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  client.estado === 1
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {client.estado === 1 ? 'Pagado' : 'No Pagado'}
                </span>
              </td>
              {showPaymentControls && (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => onUpdateStatus(client.id, client.estado === 1 ? 0 : 1)}
                    className={`inline-flex items-center px-3 py-1 rounded-md text-sm ${
                      client.estado === 1
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {client.estado === 1 ? (
                      <X className="w-4 h-4 mr-1" />
                    ) : (
                      <DollarSign className="w-4 h-4 mr-1" />
                    )}
                    {client.estado === 1 ? 'Marcar No Pagado' : 'Registrar Pago'}
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};