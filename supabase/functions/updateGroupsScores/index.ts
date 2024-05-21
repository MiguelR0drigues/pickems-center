import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Create a client
const supabase = createClient(
    Deno.env.get("SUPABASE_URL"),
    Deno.env.get("SUPABASE_ANON_KEY"));

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response(
        JSON.stringify({ message: 'Method not allowed. Please use POST.' }),
        {
          status: 405,
          headers: { "Content-Type": "application/json" } },
    );
  }

  const { groups } = await req.json();

  for(const group in groups) {
    for(const item of groups[group]) {
      const { data, error } = await supabase
          .from('Picks')
          .update({
            PTS: item.pts,
            ORD: item.ord
          })
          .match({
            CTR_ID: item.countryId,
            USR_ID: '00000000-0000-0000-0000-000000000000',
            GRP: group
          });

      if (error) {
        return new Response(
            JSON.stringify({ message: 'An error occurred while updating data.', error }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" } },
        );
      }
    }
  }

  return new Response(
      JSON.stringify({ message: 'Data updated successfully.' }),
      { headers: { "Content-Type": "application/json" } },
  );
})