// @ts-ignore
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// @ts-ignore
const supabase = createClient(
    // @ts-ignore
    Deno.env.get("SUPABASE_URL"),
    // @ts-ignore
    Deno.env.get("SUPABASE_ANON_KEY"));

// @ts-ignore
const defaultUserUUID = Deno.env.get("NEXT_PUBLIC_DEFAULT_USER_ID");

console.log(defaultUserUUID);

interface IThirdsToAdvanceItem {
    countryId: number;
}

interface IData {
    userUUID: string;
    groups: IGroupMap;
    thirdsToAdvance: IThirdsToAdvanceItem[];
}

interface IGroupMap {
    [key: string]: IGroup[];
}

interface IGroup {
    countryId: number;
    points: number;
    order: number;
}

let allowedOrigins = ["http://localhost:3000", "https://pickems-center.vercel.app/"];

// @ts-ignore
Deno.serve(async (req) => {
    let origin = req.headers.get("origin");

    if (req.method === 'OPTIONS') {
        if(allowedOrigins.includes(origin)) {
            return new Response(null, {
                headers: {
                    "Access-Control-Allow-Origin": origin,
                    "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE",
                    "Access-Control-Allow-Headers": "Content-Type, Authorization",
                    "Access-Control-Allow-Credentials": "true",
                },
            });
        }
    }
    else if (req.method !== 'POST')
        return buildResponse(req, "Method not allowed. Please use POST!", 405)

    const {userUUID, groups, thirdsToAdvance} = await req.json() as IData;;

    await updateOrCreateValues(groups, userUUID? userUUID : defaultUserUUID, thirdsToAdvance, req);

    return buildResponse(req, 'Updated Successfully!', 200);
})



/**
 * Updates or creates values in the database for each group and item provided.
 *
 * @param {IGroupMap} groups - An object containing group names as keys and an array of group items as values.
 * @param {string} userUUID - The UUID of the user.
 * @param thirdsToAdvance
 * @param req
 * @returns {Promise<void>} - A Promise that resolves after the values have been updated or created.
 */
async function updateOrCreateValues(groups: IGroupMap, userUUID: string, thirdsToAdvance: IThirdsToAdvanceItem[], req: Request): Promise<void> {
    for (const group in groups) {
        const groupItems: IGroup[] = groups[group];
        for (const item of groupItems) {

            const shouldAdvance = item.order <= 2 || thirdsToAdvance.some(({countryId}) => countryId === item.countryId);

            const {error} = await supabase
                .from('Picks')
                .upsert({
                    CTR_ID: item.countryId,
                    USR_ID: userUUID,
                    GRP: group,
                    ORD: item.order,
                    PTS: item.points,
                    ADV_PLF: shouldAdvance
                }, {onConflict: ['CTR_ID', 'USR_ID']})


            if (error)
                buildResponse(req, 'An error occurred while updating data: ' + error.message, 500);
        }
    }
}

/**
 * Builds a response object.
 *
 * @param req
 * @param {string} msg - The message to include in the response.
 * @param {number} status - The status code to set in the response.
 **/
function buildResponse(req: Request, msg: String, status: number): any{

    let origin = req.headers.get("Origin") ?? "";

    let headers: Record<string, string> = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
    };

    if (allowedOrigins.includes(origin)) {
        headers["Access-Control-Allow-Origin"] = origin;
    }

    return new Response(
        JSON.stringify({message: msg}),
        {
            status: status,
            headers: headers,
        },
    );
}