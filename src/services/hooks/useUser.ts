import { useQuery } from "react-query";
import { User } from "../../types/user";
import api from "../api";

export function useUser(id: string) {
  return useQuery(
    ["@user", id],
    async () => {
      const { data } = await api.get<User>(`/users/${id}`);

      const user = {
        _id: data._id,
        name: data.name,
        email: data.email,
        birthDate: new Date(data.birthDate).toLocaleDateString("pt-BR"),
      };

      return user;
    },
    { staleTime: 1000 * 5 }
  );
}
