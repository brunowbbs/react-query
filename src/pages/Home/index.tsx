import ReactLoading from "react-loading";
import { Link } from "react-router-dom";

import Form from "../../components/Form";

import api from "../../services/api";
import { useUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryClient";

const Home = () => {
  const { data, isLoading, error, isFetching } = useUsers();

  async function handlePrefetchUser(id: string) {
    await queryClient.prefetchQuery(
      ["@user", id],
      async () => {
        const response = await api.get(`users/${id}`);

        return response.data;
      },
      { staleTime: 1000 * 5 }
    );
  }

  if (isLoading) {
    return <ReactLoading type="spin" color="#999999" height={30} width={30} />;
  }

  if (error instanceof Error) {
    return <h3>Erro ao carregar usuários: {error.message}</h3>;
  }

  return (
    <div>
      <Form />

      {!isLoading && isFetching && (
        <ReactLoading type="spin" color="#999999" height={30} width={30} />
      )}

      {data?.map((user) => (
        <div key={user._id}>
          <p>👀 {user.name}</p>
          <p>✨ {user.email}</p>
          <p>🍴 {user.birthDate}</p>
          <Link
            to={`/details/${user._id}`}
            onMouseEnter={() => handlePrefetchUser(user._id)}
          >
            Detalhes
          </Link>
          <br></br>
          <br></br>
        </div>
      ))}
    </div>
  );
};

export default Home;
