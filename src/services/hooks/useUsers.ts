import { useQuery } from "react-query";
import { User } from "../../types/user";
import api from "../api";

export function useUsers() {
  return useQuery<User[]>(
    "@users",
    async () => {
      const { data } = await api.get("/users");

      const users = data.map((user: User) => ({
        _id: user._id,
        name: user.name,
        email: user.email,
        birthDate: new Date(user.birthDate).toLocaleDateString("pt-BR"),
      }));

      return users;
    },
    { staleTime: 1000 * 5 }
  );
}
