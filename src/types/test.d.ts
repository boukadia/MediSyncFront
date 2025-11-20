
export interface Test{
    _id: string;
    isNormal:boolean;
    labOrderTestId:{
         nom: string
         code:string
         unite:string
         prix: number
         description: string
         status:string
         labOrderId:{
             doctorId:{
                    _id:string
                    name:string
                    specialite:string
             },
             laboratoireId:{
                    _id:string
                    name:string
                    responsable:string
             }
         }
    };
    resultValue:number
    commentaire:string
    date:string
    status:string
     createdAt: string;
    updatedAt: string;



}