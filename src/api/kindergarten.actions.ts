export interface Kindergarten {
  UUID: string;
  displayValue: string;
}

export interface Room {
  UUID: string;
  displayValue: string;
}

export async function getKindergartens(): Promise<Kindergarten[]> {
  const res = await fetch("http://localhost:3000/api/kindergartens", {
    cache: "no-store",
  });
  const data = await res.json();
  return data.kindergartens;
}

export async function getRoomsByKindergarten(
  kindergartenUUID: string
): Promise<Room[]> {
  const res = await fetch(
    `http://localhost:3000/api/kindergartens/${kindergartenUUID}/rooms`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data.rooms;
}
