import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
    Deno.env.get("SUPABASE_URL"),
    Deno.env.get("SUPABASE_ANON_KEY"));

interface Country {
    ID: number;
    COD: string;
    NAM: string;
}

interface Pick {
    USR_ID: string;
    CTR_ID: number;
    PTS: number;
    ORD: number;
    GRP: string;
}

interface PickWithCountry extends Pick {
    COD: string;
    NAM: string;
}

interface ResponseObject {
    countryId: number;
    code: string;
    name: string;
    points: number;
    order: number;
}

interface Group {
    [key: string]: PickWithCountry[];
}

interface Formatted {
    [key: string]: ResponseObject[];
}

let allowedOrigins = ["http://localhost:3000", "https://pickems-center.vercel.app/"];

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
    else if (req.method !== 'GET')
    return buildResponse(req,"Method not allowed. Please use GET!", 405)

    const url = new URL(req.url);

    const userUUID = url.searchParams.get('userUUID');

    if(!userUUID)
        return buildResponse(req,"The 'userUUID' parameter is required", 400);

    return await getValues(userUUID, req);
})

/**
 * Retrieves values from the database for a given user.
 *
 * @param {string} userUUID - The UUID of the user.
 *
 * @param req
 * @returns {Promise<Response>} - A Promise that resolves with the retrieved values.
 *
 * @throws {Error} - If an error occurred while retrieving the values.
 * @throws {NotFoundError} - If no data found for the given UUID.
 */
async function getValues(userUUID: string, req: Request): Promise<Response> {
    const { data: picksData, error: picksError } = await supabase
        .from<Pick>('Picks')
        .select('*')
        .eq('USR_ID', userUUID);

    const { data: countriesData, error: countriesError } = await supabase
        .from<Country>('Countries')
        .select('*');

    if (picksError) {
        return buildResponse(req, 'An error occurred while fetching data from Picks: ' + picksError.message, 500);
    }

    if (countriesError) {
        return buildResponse(req,'An error occurred while fetching data from Countries: ' + countriesError.message, 500);
    }

    if (!picksData || picksData.length == 0) {
        return buildResponse(req,"No data found for this UUID in Picks", 404);
    }

    if (!countriesData || countriesData.length == 0) {
        return buildResponse(req,"No data found in Countries", 404);
    }

    const group: Group = picksData.reduce((result: Group, item: Pick) => {
        const country = countriesData.find((country: Country) => country.ID === item.CTR_ID) || { COD: '', NAM: ''};
        const pickWithCountry: PickWithCountry = { ...item, ...country };
        (result[item.GRP] = result[item.GRP] || []).push(pickWithCountry);

        return result;
    }, {});

    const formatted: Formatted = Object.keys(group).sort().reduce((result: Formatted, key: string) => {
        result[key] = group[key]
            .map(({CTR_ID, PTS, ORD, COD, NAM}) => ({
                countryId: CTR_ID,
                code: COD,
                name: NAM,
                points: PTS,
                order: ORD
            }))
            .sort((a, b) => a.order - b.order);

        return result;
    }, {});

    return buildResponse(req,{groups: formatted}, 200);
}

/**
 * Builds a response object.
 *
 * @param req
 * @param {string | object} res - The message or payload to include in the response.
 * @param {number} status - The status code to set in the response.
 * @*/
function buildResponse(req: Request, res: string | object, status: number): Response {
    let payload: object;
    let origin = req.headers.get("Origin") ?? "";

    if (typeof res === 'string') {
        payload = { message: res };
    } else {
        payload = res;
    }

    let headers: Record<string, string> = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
    };

    if (allowedOrigins.includes(origin)) {
        headers["Access-Control-Allow-Origin"] = origin;
    }

    return new Response(JSON.stringify(payload), {
        status: status,
        headers: headers,
    });
}
