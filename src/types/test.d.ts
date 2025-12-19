
export interface Test{
    _id: string;
    isNormal:boolean;
    labOrderTestId:{
         name: string
         code:string
         unite:string
         prix: number
         description: string
         status:string
         labOrderId:{
            doctorId:string,
            laboratoireId:string,
            patientId:string
            dateOrdered:string
            notes?:string
            status:string
            createdAt: string;
            updatedAt: string;
         }
    };
    resultValue:number
    commentaire:string
    date:string
    status:string
     createdAt: string;
    updatedAt: string;



}