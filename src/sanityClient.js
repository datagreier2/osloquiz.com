import {createClient} from "@sanity/client";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || "mswxffvr";
const dataset = import.meta.env.VITE_SANITY_DATASET || "production";
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || "2023-10-01";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
