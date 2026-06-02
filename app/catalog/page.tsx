import { CatalogPage } from "@/app/catalog/CatalogPage";
import type { VolumeId } from "@/types/content";

export default async function Page({
  searchParams
}: {
  searchParams: Promise<{ volume?: string }>;
}) {
  const { volume } = await searchParams;
  const volumeId: VolumeId = volume === "g1b" ? "g1b" : "g1a";
  return <CatalogPage volumeId={volumeId} />;
}
