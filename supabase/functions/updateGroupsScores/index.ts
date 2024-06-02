import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
    Deno.env.get("SUPABASE_URL"),
    Deno.env.get("SUPABASE_ANON_KEY"));

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
    points: number;
    order: number;
}

Deno.serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response(null, {
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                "Access-Control-Allow-Credentials": "true",
            },
        });
    }
    else if (req.method !== 'POST')
        return buildResponse("Method not allowed. Please use POST!", 405)

    const {userUUID, groups} = await req.json();

    await updateOrCreateValues(groups, userUUID? userUUID : defaultUserUUID);

    return buildResponse('Updated Successfully!', 200);
})



/**
 * Updates or creates values in the database for each group and item provided.
 *
 * @param {IGroupMap} groups - An object containing group names as keys and an array of group items as values.
 * @param {string} userUUID - The UUID of the user.
 * @returns {Promise<void>} - A Promise that resolves after the values have been updated or created.
 */
async function updateOrCreateValues(groups: IGroupMap, userUUID: string): Promise<void> {
    for (const group in groups) {
        const groupItems: IGroup[] = groups[group];
        for (const item of groupItems) {

            const {error} = await supabase
                .from('Picks')
                .upsert({
                    CTR_ID: item.countryId,
                    USR_ID: userUUID,
                    GRP: group,
                    ORD: item.order,
                    PTS: item.points
                }, {onConflict: ['CTR_ID', 'USR_ID']})

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
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                "Access-Control-Allow-Credentials": "true",
            },
        },
    );
}