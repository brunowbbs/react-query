import ReactLoading from "react-loading";

import { useParams } from "react-router-dom";
import { useUser } from "../../services/hooks/useUser";

const Details = () => {
  const { id = "0" } = useParams();

  const { data, isLoading, error } = useUser(id);

  if (isLoading) {
    return <ReactLoading type="spin" color="#999999" height={30} width={30} />;
  }

  if (error) {
    return <h3>Erro ao buscar dado do usuário</h3>;
  }

  return (
    <>
      <h1>{data?.name}</h1>
      <h3>{data?.email}</h3>
      <h3>{data?.birthDate}</h3>
    </>
  );
};

export default Details;
