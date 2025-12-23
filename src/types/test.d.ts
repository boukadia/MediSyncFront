// Interface pour LabOrderTest (retourné par le backend)
export interface Test {
    _id: string;
    resultValue?: number;
    name: string;
    code: string;
    unite: string;
    prix: number;
    description: string;
    valeur_normale_min?: number;
    valeur_normale_max?: number;
    normalRange?: number;
    status: string;
    isNormal?: boolean;
    commentaire?: string;
    labOrderId: {
        _id: string;
        patientId: {
            _id: string;
            name: string;
            email?: string;
            phone?: string;
        };
        doctorId: {
            _id: string;
            name: string;
            email?: string;
        };
        laboratoireId: {
            _id: string;
            name: string;
        };
        consultationId?: string;
        tests?: Array<{ name: string }>;
        status: string;
        notes?: string;
        dateOrder: string;
        createdAt: string;
        updatedAt: string;
    };
    createdAt: string;
    updatedAt: string;
}