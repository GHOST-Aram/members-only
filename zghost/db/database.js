

class DB{
   
    createAndSaveDocument = async (Model, document) =>{
        await Model.create(document)
    }

    findByIdAndDelete = async(Model, id) =>{
        await Model.findByIdAndDelete(id)
    }

    findById = async(Model, id) =>{
        return await Model.findById(id)
    }

    findOne = async(Model, document) =>{
        return await Model.findOne(document)
    }

    findByIdWithPopulate = async(Model, id, refs) =>{
        return await Model.findById(id)
            .populate(refs.join(' '))
    }
}

export const db = new DB()