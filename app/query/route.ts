import { db } from "@vercel/postgres";

const client = await db.connect();

async function listPlayers() {
    const data = await client.sql`
    SELECT players.id, players.player_name, players.image_url, players.position, players.league
    FROM players
  `;

    return data.rows;
}

export async function GET() {
 try {
   return Response.json(await listPlayers());
 } catch (error) {
   return Response.json({ error }, { status: 500 });
 }
}
