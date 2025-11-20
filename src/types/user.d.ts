// user types
export interface User {
    _id: string,
    email: string,
  name: string,
  phone: string,
  role: string,
  
  // Doctor fields
  specialite?: string,
  numLicence?: string,
  anneExperience?: string,
  
  // Patient fields
  dateNaissance?: string,
  sexe?: string,
  ContactUrgence?: string,
  
  // Pharmacy fields
  PharmacyName?: string,
   // Laboratoire fields
  laboratoireName?: string,
  responsable?: string,
  horaires?: string,
  
  // Admin/Secretary fields
  employeeId?: string,
  
  // Common address field
  address?: string,
}