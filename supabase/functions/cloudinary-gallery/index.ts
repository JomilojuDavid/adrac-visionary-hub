const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const CLOUD_NAME = "dwxlbgncw";
const FOLDER = ""; // empty = fetch all assets across the account

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

    const url = new URL(req.url);
    const debug = url.searchParams.get("debug") === "1";
    const folderParam = url.searchParams.get("folder") ?? FOLDER;

    const auth = btoa(`${apiKey}:${apiSecret}`);

    const fetchType = async (resourceType: "image" | "video") => {
      const expression = folderParam
        ? `(folder:"${folderParam}" OR folder:"${folderParam}/*" OR asset_folder:"${folderParam}" OR asset_folder:"${folderParam}/*") AND resource_type:${resourceType}`
        : `resource_type:${resourceType}`;
      const body = {
        expression,
        max_results: 500,
        sort_by: [{ created_at: "desc" }],
      };
      const r = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/search`, {
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

    if (debug) {
      // Also list root folders for inspection
      const foldersRes = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/folders`,
        { headers: { Authorization: `Basic ${auth}` } },
      );
      const folders = foldersRes.ok ? await foldersRes.json() : { error: await foldersRes.text() };
      return new Response(
        JSON.stringify({
          folderQueried: folderParam,
          imageCount: imgs.length,
          videoCount: vids.length,
          folders,
          sampleImage: imgs[0] ?? null,
          sampleVideo: vids[0] ?? null,
        }, null, 2),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 },
      );
    }

    const images = imgs.map((r: any) => ({
      id: r.asset_id ?? r.public_id,
      src: r.secure_url,
      width: r.width,
      height: r.height,
      created_at: r.created_at,
    }));

    const videos = vids.map((r: any) => ({
      id: r.asset_id ?? r.public_id,
      src: r.secure_url,
      poster: `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/so_0/${r.public_id}.jpg`,
      width: r.width,
      height: r.height,
      created_at: r.created_at,
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
