import {createClient} from "https://esm.sh/@supabase/supabase-js@2";

const defaultUserUUID = '00000000-0000-0000-0000-000000000000';

interface IData {
    userUUID: string;
    groups: IGroupMap;
}

interface IGroupMap {
    [key: string]: IGroup[];
}

interface IGroup {
    countryId: number;
    pts: number;
    ord: number;
}

const supabase = createClient(
    Deno.env.get("SUPABASE_URL"),
    Deno.env.get("SUPABASE_ANON_KEY"));


// @ts-ignore
Deno.serve(async (req) => {
    if (req.method !== 'POST')
        buildResponse("Method not allowed. Please use POST!", 405)


    const {userUUID, groups} = await req.json();

    if (!userUUID)
        await updateDefaultValues(groups);
    else
        await updateOrCreateValues(groups, userUUID);

    buildResponse('Updated Successfully!', 200);
})

/**
 * Function to update default values in the 'Picks' table in the database
 * It iterates through all groups and runs an UPDATE query through supabase client's .from('Picks').update()
 * @async
 * @param {IGroupMap} groups - An object mapping group names to array of groups' items
 * @returns {Promise<void>}
 */
async function updateDefaultValues(groups: IGroupMap): Promise<void> {
    for (const group in groups) {
        const groupItems: IGroup[] = groups[group];
        for (const item of groupItems) {
            const {error} = await supabase
                .from('Picks')
                .update({
                    PTS: item.pts,
                    ORD: item.ord
                })
                .match({
                    CTR_ID: item.countryId,
                    USR_ID: defaultUserUUID,
                    GRP: group
                });

            if (error)
                buildResponse('An error occurred while updating data: ' + error.message, 500);
        }
    }
}

/**
 * Function to update or insert values in the 'Picks' table in the database
 * It iterates through all groups and runs an UPSERT query through supabase client's .from('Picks').upsert()
 * @async
 * @param {IGroupMap} groups - An object mapping group names to array of groups' items
 * @param {string} userUUID - A UUID representing the user
 * @returns {Promise<void>}
 */
async function updateOrCreateValues(groups: IGroupMap, userUUID: IData): Promise<void> {
    for (const group in groups) {
        const groupItems: IGroup[] = groups[group];
        for (const item of groupItems) {
            const {error} = await supabase
                .from('Picks')
                .upsert({
                    CTR_ID: item.countryId,
                    USR_ID: userUUID,
                    GRP: group,
                    ORD: item.ord
                }, {conflict_fields: ['USR_ID'], returning: "minimal"});

            if (error)
                buildResponse('An error occurred while updating data: ' + error.message, 500);
        }
    }
}

/**
 * Builds a response object.
 *
 * @param {string} msg - The message to include in the response.
 * @param {number} status - The status code to set in the response.
 **/
function buildResponse(msg: String, status: number): any{

    return new Response(
        JSON.stringify({message: msg}),
        {
            status: status,
            headers: {"Content-Type": "application/json"}
        },
    );
}