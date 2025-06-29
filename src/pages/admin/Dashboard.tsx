import React from 'react';
import { useData } from '../../contexts/DataContext';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import {
  Users,
  Calendar,
  DollarSign,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import { formatDate, formatTime, isUpcoming, isToday } from '../../utils/dateUtils';

export const Dashboard: React.FC = () => {
  const { patients, incidents, getPatientById } = useData();

  const upcomingAppointments = incidents
    .filter((incident) => isUpcoming(incident.appointmentDate))
    .sort((a, b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime())
    .slice(0, 10);

  const todayAppointments = incidents.filter((incident) => isToday(incident.appointmentDate));
  const completedTreatments = incidents.filter((incident) => incident.status === 'Completed');
  const totalRevenue = completedTreatments.reduce(
    (sum, incident) => sum + (incident.cost || 0),
    0
  );

  const statusCounts = {
    scheduled: incidents.filter((i) => i.status === 'Scheduled').length,
    inProgress: incidents.filter((i) => i.status === 'In Progress').length,
    completed: incidents.filter((i) => i.status === 'Completed').length,
    cancelled: incidents.filter((i) => i.status === 'Cancelled').length,
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return <Badge variant="primary">{status}</Badge>;
      case 'In Progress':
        return <Badge variant="warning">{status}</Badge>;
      case 'Completed':
        return <Badge variant="success">{status}</Badge>;
      case 'Cancelled':
        return <Badge variant="danger">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-10 px-4 py-6 sm:px-6 lg:px-8">
      {/* Dashboard Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900">Dashboard Overview</h1>
        <p className="mt-2 text-sm text-gray-600">Welcome to your dental center management system</p>
      </div>

      {/* Key Metrics */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Key Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Patients</p>
                <p className="text-2xl font-bold text-gray-900">{patients.length}</p>
              </div>
            </div>
          </Card>

          <Card className="shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-full">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Today's Appointments</p>
                <p className="text-2xl font-bold text-gray-900">{todayAppointments.length}</p>
              </div>
            </div>
          </Card>

          <Card className="shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-full">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${totalRevenue.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>

          <Card className="shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-full">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Appointments</p>
                <p className="text-2xl font-bold text-gray-900">{incidents.length}</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Status & Quick Stats */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Appointment Status</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-blue-500 mr-2" />
                <span className="text-gray-700">Scheduled</span>
              </div>
              <span className="font-semibold text-gray-900">{statusCounts.scheduled}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Activity className="w-5 h-5 text-yellow-500 mr-2" />
                <span className="text-gray-700">In Progress</span>
              </div>
              <span className="font-semibold text-gray-900">{statusCounts.inProgress}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-gray-700">Completed</span>
              </div>
              <span className="font-semibold text-gray-900">{statusCounts.completed}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-gray-700">Cancelled</span>
              </div>
              <span className="font-semibold text-gray-900">{statusCounts.cancelled}</span>
            </div>
          </div>
        </Card>

        <Card className="shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Avg. Treatment Cost</span>
              <span className="font-semibold">
                ${((totalRevenue / Math.max(completedTreatments.length, 1)).toFixed(2))}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Completion Rate</span>
              <span className="font-semibold">
                {((statusCounts.completed / Math.max(incidents.length, 1)) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Active Patients</span>
              <span className="font-semibold">
                {new Set(incidents.map((i) => i.patientId)).size}
              </span>
            </div>
          </div>
        </Card>
      </section>

      {/* Upcoming Appointments */}
      <section>
        <Card className="shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Appointments</h2>
          {upcomingAppointments.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No upcoming appointments</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      Patient
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      Treatment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {upcomingAppointments.map((appointment) => {
                    const patient = getPatientById(appointment.patientId);
                    return (
                      <tr key={appointment.id} className="hover:bg-gray-50 even:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {patient?.name || 'Unknown Patient'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {appointment.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {formatDate(appointment.appointmentDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {formatTime(appointment.appointmentDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(appointment.status)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </section>
    </div>
  );
};
