interface exports {
    notes?: string;
    dateOrdered: string;
    patientId: {
        _id: string;
        name: string;
        email: string;
    };
    doctorId: {
        _id: string;
        name: string;
        specialite: string;
    };
    laboratoireId: {
        _id: string;
        name: string;
        responsable: string;
    };

    tests: {
        name: string;
        code: string;
        unite: string;
        prix: number;
        description: string;
        status: string;
    }[];
    consultationId:{
        id:string;
    }


    status: 'pending' | 'completed' | 'canceled';
    createdAt: string;
    updatedAt: string;
}