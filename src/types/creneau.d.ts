export interface Creneau {
    _id: string;
    doctorId: {
        _id: string;
        name: string;
        specialite: string;
    };
    disponibiliteId: {
        _id: string;
        jour: string;
        dateHeureDebut: string;
        dateHeureFin: string;
        
    };
    status:string;
    dateHeureDebut: string;
    dateHeureFin: string;
    isAvailable: boolean;
    createdAt: string;
    updatedAt: string;
}