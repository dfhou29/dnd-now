import Link from "next/link";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export default async function Campaign() {
  let data = await sql`SELECT * FROM campaigns;`;
  const { rows: campaigns } = data;
  
  revalidatePath("/campaign");
  return (
    <>
      <h1>Your Champaigns</h1>
      <ul>
        {campaigns.map((campaign) => (
          <li key={campaign.id}>
            <Link href={`/campaign/${campaign.id}`}>
              {campaign.title}
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/campaign/new">Create Campaign</Link>
    </>
  );
}
