import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
    Deno.env.get("SUPABASE_URL"),
    Deno.env.get("SUPABASE_ANON_KEY"));

interface Group {
    [key: string]: any[];
}

interface Formatted {
    [key: string]: { countryId: number; pts: number; ord: number }[];
}

Deno.serve(async (req) => {
  if (req.method !== 'GET')
    return buildResponse("Method not allowed. Please use GET!", 405)

    const url = new URL(req.url);

    const userUUID = url.searchParams.get('userUUID');

    if(!userUUID)
        return buildResponse("The 'userUUID' parameter is required", 400);

    return await getValues(userUUID);
})

/**
 * Retrieves values from the database for a given user.
 *
 * @param {string} userUUID - The UUID of the user.
 *
 * @returns {Promise<Response>} - A Promise that resolves with the retrieved values.
 *
 * @throws {Error} - If an error occurred while retrieving the values.
 * @throws {NotFoundError} - If no data found for the given UUID.
 */
async function getValues(userUUID: string): Promise<Response> {
    const { data, error } = await supabase
        .from('Picks')
        .select('*')
        .eq('USR_ID', userUUID);

    if (error) {
        return buildResponse('An error occurred while updating data: ' + error.message, 500);
    } else if (!data || data.length == 0) {
        return buildResponse("No data found for this UUID", 404);
    } else {

        const grouped: Group = data.reduce((result: Group, item: any) => {
            (result[item.GRP] = result[item.GRP] || []).push(item);
            return result;
        }, {});

        const formatted:Formatted = Object.keys(grouped).reduce((result: Formatted, key: string) => {
            result[key] = grouped[key].map(({CTR_ID, PTS, ORD}) => ({countryId: CTR_ID, pts: PTS, ord: ORD}));
            return result;
        },{});

        return buildResponse({groups: formatted}, 200);
    }
}

/**
 * Builds a response object.
 *
 * @param {string | object} res - The message or payload to include in the response.
 * @param {number} status - The status code to set in the response.
 * @*/
function buildResponse(res: string | object, status: number): Response {
    let payload: object;

    if (typeof res === 'string') {
        payload = { message: res };
    } else {
        payload = res;
    }

    return new Response(JSON.stringify(payload), {
        status: status,
        headers: { "Content-Type": "application/json" }
    });
}
