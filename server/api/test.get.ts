

/** Test */
export default eventHandler(async (e) => {

    try {


        const supabase = await initService(e);
        const { data, error } = await supabase.storage.listBuckets();
        console.log('buckets:', data?.map(b => b.name));
        console.log('error:', error);

        return data;


    } catch (e) {
        throw createError({ status: 409, message: 'Test Fallido' })
    }
})