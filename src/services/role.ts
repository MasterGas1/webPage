import { RoleInterface } from "@/interfaces/roleInterface";
export const getRoleByToken = async (token: string) => {
  const response = await fetch(
    `${process.env.BACK_END_URL}/role/getRoleByToken`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const role = (await response.json()) as RoleInterface;

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return role;
};
