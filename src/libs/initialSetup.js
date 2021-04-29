import Role from '../models/Role';


export const createRoles = async () => {
    
    try{

        const counterRole = await Role.estimatedDocumentCount();
        
        if(counterRole > 0) return;
        
        const values = await Promise.all([  
            new Role({name:'USER'}).save(),
            new Role({name:'MODERATOR'}).save(),
            new Role({name:'ADMIN'}).save()
        ])
        
    }catch(err){
        console.error(err);
    }
}