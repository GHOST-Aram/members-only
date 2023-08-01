

class DB{
   
    createAndSaveDocument = async (Model, document) =>{
        await Model.create(document)
    }

    findById = async(Model, id) =>{
        return await Model.findById(id)
    }

    findOne = async(Model, document) =>{
        return await User.find(document)
    }

}

export const db = new DB()