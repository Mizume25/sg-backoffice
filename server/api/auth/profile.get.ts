/** Endpoitn de Autentificacion de Usuario */
export default eventHandler(async(e) => {

    const profile = await getProfile(e);

    return profile;
    
    
})