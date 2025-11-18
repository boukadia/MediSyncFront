// prescription types

export interface Medication {
    name: string;
    dosage: string;
    frequency: string;
    duration: number;
    instructions?: string;
    remainingDays?: number;
    progress?: number;
}

export interface Prescription {
    _id: string;
    patientId: string;
    doctorId: {
        _id: string;
        name: string;
        // specialty: string;
    };
    // consultationId:{
    //     diagnostic:string
    //     symptomes:string
    //     notes:string
    // }
    date: string;
    medications: Medication[];
    status: 'draft' | 'signed' ;
    notes?: string;
    // warnings?: string;
    createdAt: string;
    updatedAt: string;
}
