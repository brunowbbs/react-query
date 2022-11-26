import { useState } from "react";
import { useMutation } from "react-query";

import api from "../../services/api";
import { queryClient } from "../../services/queryClient";

const Form = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    birthDate: "",
    phone: "",
  });

  const createUser = useMutation(
    async () => {
      await api.post("/users", {
        name: formData.nome,
        email: formData.email,
        birthDate: formData.birthDate,
        phone: formData.phone,
      });
    },
    {
      onSuccess: () => {
        alert("Usuário salvo com sucesso");
        queryClient.invalidateQueries("@users");
      },
    }
  );

  async function saveUser() {
    await createUser.mutateAsync();
  }

  return (
    <form>
      <input
        placeholder="Nome"
        onChange={(event) =>
          setFormData({ ...formData, nome: event.target.value })
        }
      />
      <input
        placeholder="Telefone"
        onChange={(event) =>
          setFormData({ ...formData, phone: event.target.value })
        }
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(event) =>
          setFormData({ ...formData, email: event.target.value })
        }
      />
      <input
        type="date"
        placeholder="Data de nascimento"
        onChange={(event) =>
          setFormData({ ...formData, birthDate: event.target.value })
        }
      />

      <button onClick={saveUser} type="button">
        Salvar
      </button>
    </form>
  );
};

export default Form;
