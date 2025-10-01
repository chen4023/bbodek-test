export interface KidRegistrationData {
  kidName: string;
  parentName: string;
  parentPhoneNumber: string;
  kindergartenUUID: string;
  roomUUID: string;
  packageUUID: string;
  serviceStartDate: string;
}

export async function registerKid(data: KidRegistrationData): Promise<void> {
  const res = await fetch("http://localhost:3000/api/kid", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to register kid");
  }
}
