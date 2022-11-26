import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import Home from "./pages/Home";

import Details from "./pages/Details";
import Header from "./components/Header";
import { queryClient } from "./services/queryClient";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
