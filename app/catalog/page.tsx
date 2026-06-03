import { Suspense } from "react";
import { CatalogPage } from "@/app/catalog/CatalogPage";

export default function Page() {
  return (
    <Suspense>
      <CatalogPage />
    </Suspense>
  );
}
