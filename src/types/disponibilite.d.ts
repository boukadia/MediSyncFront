export interface Disponibilite {
    _id: string;

dateHeureDebut: string;
dateHeureFin: string;
doctorId: {
    _id: string;
    name: string;
    specialite: string;
};
}