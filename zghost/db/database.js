

class DB{
   
    createAndSaveDocument = async (Model, document) =>{
        await Model.create(document)
    }

}

export const db = new DB()