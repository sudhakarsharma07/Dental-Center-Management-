import type { User, Patient, Incident } from '../types';

const STORAGE_KEYS = {
  USER: 'dental_center_user',
  PATIENTS: 'dental_center_patients',
  INCIDENTS: 'dental_center_incidents',
  USERS: 'dental_center_users',
};

const initializeMockData = () => {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    const mockUsers: User[] = [
      {
        id: '1',
        role: 'Admin',
        email: 'admin@entnt.in',
        password: 'admin123',
        name: 'David Lee'
      },
      {
        id: '2',
        role: 'Patient',
        email: 'john@entnt.in',
        password: 'patient123',
        patientId: 'p1',
        name: 'John Doe'
      },
      {
        id: '2',
        role: 'Patient',
        email: 'emily@entnt.in',
        password: 'patient789',
        patientId: 'p2',
        name: 'Emily Johnson'
      }

    ];
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(mockUsers));
  }

  if (!localStorage.getItem(STORAGE_KEYS.PATIENTS)) {
    const mockPatients: Patient[] = [
      {


        id: 'p1',
        name: 'John Doe',
        dob: '1990-05-10',
        contact: '1234567890',
        email: 'john@entnt.in',
        address: '123 Main St, City, State 12345',
        emergencyContact: '0987654321',
        healthInfo: 'No allergies',
        allergies: 'None',
        medications: 'None',
        createdAt: '2025-04-10T11:00:00Z'
      },
      {
        id: 'p4',
        name: 'Emily Johnson',
        dob: '1992-11-05',
        contact: '8765432109',
        email: 'emily@entnt.in',
        address: '321 Maple St, Townsville, State 54321',
        emergencyContact: '1122334455',
        healthInfo: 'Asthma, uses inhaler occasionally',
        allergies: 'Dust, pollen',
        medications: 'Albuterol inhaler as needed',
        createdAt: '2025-03-22T16:45:00Z'
      }

    ];
    localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(mockPatients));
  }

  if (!localStorage.getItem(STORAGE_KEYS.INCIDENTS)) {
    const mockIncidents: Incident[] = [
      {

        id: "i1",
        patientId: "p1",
        title: "Toothache",
        description: "Upper molar pain",
        comments: "Sensitive to cold",
        appointmentDate: "2025-07-01T10:00:00",
        cost: 80,
        treatment: 'Tooth extraction, pain management',
        status: "Completed",

        files: [],
        createdAt: '2025-06-01T14:20:00Z',
        updatedAt: '2025-06-10T16:00:00Z'

      },
      {
        id: 'i2',
        patientId: 'p1',
        title: 'Routine Dental Checkup',
        description: 'Annual dental examination and cleaning',
        comments: 'Patient advised regular flossing',
        appointmentDate: '2025-08-10T10:30:00Z',
        status: 'Scheduled',
        files: [],
        createdAt: '2025-01-15T11:00:00Z',
        updatedAt: '2025-08-10T12:00:00Z'
      },
      {
        id: 'i3',
        patientId: 'p2',
        title: 'Cavity Treatment - Molar',
        description: 'Treated cavity on upper right molar with composite filling',
        comments: 'Next check-up in 3 months',
        appointmentDate: '2025-02-01T09:00:00Z',
        status: 'Scheduled',
        files: [],
        createdAt: '2025-01-20T15:30:00Z',
        updatedAt: '2025-02-01T10:15:00Z'
      }

    ];
    localStorage.setItem(STORAGE_KEYS.INCIDENTS, JSON.stringify(mockIncidents));
  }
};

initializeMockData();

export const getStoredUsers = (): User[] => {
  try {
    const users = localStorage.getItem(STORAGE_KEYS.USERS);
    return users ? JSON.parse(users) : [];
  } catch {
    return [];
  }
};

export const getStoredUser = (): User | null => {
  try {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

export const setStoredUser = (user: User | null): void => {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }
};

export const getStoredPatients = (): Patient[] => {
  try {
    const patients = localStorage.getItem(STORAGE_KEYS.PATIENTS);
    return patients ? JSON.parse(patients) : [];
  } catch {
    return [];
  }
};

export const setStoredPatients = (patients: Patient[]): void => {
  localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(patients));
};

export const getStoredIncidents = (): Incident[] => {
  try {
    const incidents = localStorage.getItem(STORAGE_KEYS.INCIDENTS);
    return incidents ? JSON.parse(incidents) : [];
  } catch {
    return [];
  }
};

export const setStoredIncidents = (incidents: Incident[]): void => {
  localStorage.setItem(STORAGE_KEYS.INCIDENTS, JSON.stringify(incidents));
};
