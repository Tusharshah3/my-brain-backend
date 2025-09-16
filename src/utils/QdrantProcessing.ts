import { QdrantClient } from "@qdrant/js-client-rest";
import { ContentType } from "../types/Schemas";
import { cleanPayload } from "./cleanPayload";
import { getEmbeddings } from "./TextEmbeddings";

const client = new QdrantClient({ 
  url: process.env.QDRANT_HOST!,
  apiKey: process.env.QDRANT_API!,
  checkCompatibility: false,
  timeout: 30000,
});

export const ensureCollection = async (name: string) => {
  try {
    const collections = await client.getCollections();
    const exists = collections.collections.some((c) => c.name === name);

    if (!exists) {
      await client.createCollection(name, {
        vectors: {
          size: 1024, // dimension of your embeddings
          distance: "Cosine",
        },
      });
      console.log(` Collection '${name}' created`);
    } else {
      console.log(` Collection '${name}' already exists`);
    }
  } catch (error) {
    console.error("Error ensuring collection:", error);
  }
};

// Run once on startup to ensure the collection exists
(async () => {
  await ensureCollection("bigBrain");
})();

export const QdrantUpsertPoints = async (data: ContentType) => {
  const payload = cleanPayload(data);
  const embeddings = await getEmbeddings(payload);
  try {
    await ensureCollection("bigBrain");

    await client.upsert("bigBrain", {
      points: [
        {
          id: data.contentId,
          payload: payload,
          vector: embeddings,
        },
      ],
    });
    console.log("Qdrant Created id: ", data.contentId);
    return;
  } catch (error) {
    console.error("Error upserting points:", error);
  }
};

export const QdrantSearch = async (embeddings: number[]) => {
  try {
    await ensureCollection("bigBrain");

    const response = await client.search("bigBrain", {
      vector: embeddings,
      limit: 15,
    });
    return response.map((r) => r.id);
  } catch (error) {
    console.error("Error searching for points:", error);
  }
};

export const QdrantDelete = async (contentId: string) => {
  try {
    await ensureCollection("bigBrain");

    await client.delete("bigBrain", {
      points: [contentId],
    });
    console.log("Qdrant Deleting id: ", contentId);
    return;
  } catch (error) {
    console.error("Error deleting points:", error);
  }
};

