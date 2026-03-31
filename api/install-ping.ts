import { MongoClient } from "mongodb";
import type { VercelRequest, VercelResponse } from "@vercel/node";

let client: MongoClient | null = null;

async function getCollection() {
	if (!client) {
		client = new MongoClient(process.env.CODECK_DB_MONGODB_URI!);
		await client.connect();
	}
	return client.db("codeck").collection("installs");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
	if (req.method === "GET") {
		try {
			const col = await getCollection();
			const counter = await col.findOne({ _id: "counter" as any });
			const recent = await col
				.find({ _id: { $ne: "counter" as any } })
				.sort({ ts: -1 })
				.limit(10)
				.toArray();
			return res.status(200).json({
				total: counter?.total || 0,
				recent: recent.map((r) => ({
					ts: r.ts,
					version: r.version,
					os: r.os,
				})),
			});
		} catch {
			return res.status(500).json({ error: "Failed to read stats" });
		}
	}

	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	try {
		const col = await getCollection();
		const forwarded = req.headers["x-forwarded-for"];
		const ip =
			typeof forwarded === "string"
				? forwarded.split(",")[0].trim()
				: "unknown";

		await col.insertOne({
			ts: new Date(),
			ip,
			version: req.body?.version || "unknown",
			os: req.body?.os || "unknown",
		});

		// Also increment a simple counter doc for quick reads
		await col.updateOne(
			{ _id: "counter" as any },
			{ $inc: { total: 1 } },
			{ upsert: true },
		);

		return res.status(200).json({ ok: true });
	} catch {
		return res.status(200).json({ ok: true }); // never block installer
	}
}
