import { MongoClient } from "mongodb";
import type { VercelRequest, VercelResponse } from "@vercel/node";

let client: MongoClient | null = null;

async function getCollection() {
	if (!client) {
		client = new MongoClient(process.env.CODECK_DB_MONGODB_URI!);
		await client.connect();
	}
	return client.db("codeck").collection("waitlist");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	const { email } = req.body || {};
	if (!email || typeof email !== "string" || !email.includes("@")) {
		return res.status(400).json({ error: "Invalid email" });
	}

	const normalized = email.trim().toLowerCase();

	try {
		const col = await getCollection();
		const exists = await col.findOne({ email: normalized });

		if (exists) {
			return res.status(409).json({ error: "already_registered" });
		}

		await col.insertOne({ email: normalized, createdAt: new Date() });
		return res.status(200).json({ ok: true });
	} catch (err) {
		console.error("Waitlist error:", err);
		return res.status(500).json({ error: "Server error" });
	}
}
