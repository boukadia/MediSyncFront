export interface Disponibilite {
    _id: string;
jour: string;
dateHeureDebut: string;
dateHeureFin: string;
doctorId: {
    _id: string;
    name: string;
    specialite: string;
};
}