export interface Package {
  UUID: string;
  displayValue: string;
}

export async function getPackages(): Promise<Package[]> {
  const res = await fetch("http://localhost:3000/api/packages", {
    cache: "no-store",
  });
  const data = await res.json();
  return data.packages;
}
