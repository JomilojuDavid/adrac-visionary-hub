const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const CLOUD_NAME = "dwxlbgncw";
const FOLDER = "Home";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("CLOUDINARY_API_KEY");
    const apiSecret = Deno.env.get("CLOUDINARY_API_SECRET");
    if (!apiKey || !apiSecret) {
      throw new Error("Cloudinary credentials not configured");
    }

    const auth = btoa(`${apiKey}:${apiSecret}`);
    const expression = encodeURIComponent(`folder:${FOLDER}/*`);

    const fetchType = async (resourceType: "image" | "video") => {
      const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/search`;
      const body = {
        expression: `folder:${FOLDER}/* AND resource_type:${resourceType}`,
        max_results: 500,
        sort_by: [{ created_at: "desc" }],
      };
      const r = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!r.ok) {
        const txt = await r.text();
        throw new Error(`Cloudinary ${resourceType} fetch failed [${r.status}]: ${txt}`);
      }
      const data = await r.json();
      return data.resources ?? [];
    };

    const [imgs, vids] = await Promise.all([fetchType("image"), fetchType("video")]);

    const images = imgs.map((r: any) => ({
      id: r.asset_id ?? r.public_id,
      src: r.secure_url,
      width: r.width,
      height: r.height,
    }));

    const videos = vids.map((r: any) => ({
      id: r.asset_id ?? r.public_id,
      src: r.secure_url,
      poster: `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/so_0/${r.public_id}.jpg`,
      width: r.width,
      height: r.height,
    }));

    return new Response(JSON.stringify({ images, videos }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("cloudinary-gallery error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
