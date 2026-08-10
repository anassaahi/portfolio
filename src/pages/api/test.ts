export const POST = async ({ request }) => {
  console.log("HEADERS:", Object.fromEntries(request.headers.entries()));
  return new Response(JSON.stringify({ ok: true }));
}
