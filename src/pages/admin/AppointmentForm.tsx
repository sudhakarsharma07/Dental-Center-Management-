import React, { useState, useEffect } from 'react';
import { useData } from '../../contexts/DataContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { FileUpload } from '../../components/common/FileUpload';
import type { FileAttachment } from '../../types';

interface AppointmentFormProps {
  incidentId?: string | null;
  onClose: () => void;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({ incidentId, onClose }) => {
  const { incidents, patients, addIncident, updateIncident } = useData();

  const [formData, setFormData] = useState({
    patientId: '',
    title: '',
    description: '',
    comments: '',
    appointmentDate: '',
    cost: '',
    treatment: '',
    status: 'Scheduled' as 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled',
    nextAppointmentDate: ''
  });

  const [files, setFiles] = useState<FileAttachment[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (incidentId) {
      const incident = incidents.find(i => i.id === incidentId);
      if (incident) {
        setFormData({
          patientId: incident.patientId,
          title: incident.title,
          description: incident.description,
          comments: incident.comments,
          appointmentDate: incident.appointmentDate.slice(0, 16),
          cost: incident.cost ? incident.cost.toString() : '',
          treatment: incident.treatment || '',
          status: incident.status,
          nextAppointmentDate: incident.nextAppointmentDate
            ? incident.nextAppointmentDate.slice(0, 16)
            : ''
        });
        setFiles(incident.files || []);
      }
    }
  }, [incidentId, incidents]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.patientId) newErrors.patientId = 'Please select a patient';
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.appointmentDate) newErrors.appointmentDate = 'Appointment date is required';
    if (formData.cost && isNaN(Number(formData.cost))) newErrors.cost = 'Cost must be a number';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const appointmentData = {
        ...formData,
        appointmentDate: new Date(formData.appointmentDate).toISOString(),
        nextAppointmentDate: formData.nextAppointmentDate
          ? new Date(formData.nextAppointmentDate).toISOString()
          : undefined,
        cost: formData.cost ? Number(formData.cost) : undefined,
        files
      };

      if (incidentId) {
        updateIncident(incidentId, appointmentData);
      } else {
        addIncident(appointmentData);
      }

      onClose();
    } catch (error) {
      console.error('Error saving appointment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setFormData(prev => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
    };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          {incidentId ? 'Edit Appointment' : 'New Appointment'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient *</label>
              <select
                value={formData.patientId}
                onChange={handleChange('patientId')}
                className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                  errors.patientId ? 'border-red-400' : ''
                }`}
              >
                <option value="">Select a patient</option>
                {patients.map(patient => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name}
                  </option>
                ))}
              </select>
              {errors.patientId && (
                <p className="text-sm text-red-600 mt-1">{errors.patientId}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={handleChange('status')}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="Scheduled">Scheduled</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Title *"
              value={formData.title}
              onChange={handleChange('title')}
              error={errors.title}
              placeholder="e.g. Tooth Extraction"
            />
            <Input
              label="Appointment Date & Time *"
              type="datetime-local"
              value={formData.appointmentDate}
              onChange={handleChange('appointmentDate')}
              error={errors.appointmentDate}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea
              value={formData.description}
              onChange={handleChange('description')}
              rows={3}
              placeholder="Treatment description or reason for appointment"
              className={`block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                errors.description ? 'border-red-400' : ''
              }`}
            />
            {errors.description && (
              <p className="text-sm text-red-600 mt-1">{errors.description}</p>
            )}
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Cost (USD)"
              type="number"
              value={formData.cost}
              onChange={handleChange('cost')}
              error={errors.cost}
              placeholder="Treatment cost"
              min="0"
            />
            <Input
              label="Next Appointment Date"
              type="datetime-local"
              value={formData.nextAppointmentDate}
              onChange={handleChange('nextAppointmentDate')}
            />
          </div>

          {/* More fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Treatment Details</label>
            <textarea
              value={formData.treatment}
              onChange={handleChange('treatment')}
              rows={3}
              placeholder="Details about the treatment performed"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Comments / Notes</label>
            <textarea
              value={formData.comments}
              onChange={handleChange('comments')}
              rows={2}
              placeholder="Additional notes"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">File Attachments</label>
            <FileUpload
              files={files}
              onFilesChange={setFiles}
              maxFiles={10}
              acceptedTypes={['image/*', 'application/pdf', '.doc', '.docx']}
            />
            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Attached Files:</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  {files.map((file, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between bg-gray-100 p-2 rounded-md"
                    >
                      <div className="truncate max-w-xs">{file.name}</div>
                      <div className="text-xs text-gray-500 ml-2">
                        {(file.size / 1024).toFixed(1)} KB
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="secondary" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              {incidentId ? 'Update Appointment' : 'Schedule Appointment'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
