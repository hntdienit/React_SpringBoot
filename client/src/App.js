import { Fragment} from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import routes from "./routes";
import DefaultLayout from "./layouts/DefaultLayout";

import { UserProvider } from "./Helpers/Context/UserContext.jsx";

import "./App.css";

const queryClient = new QueryClient();

function App() {
  

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Router>
          <div className="App">
            <Routes>
              {routes.map((item, index) => {
                let Layout = DefaultLayout;
                if (item.layout) Layout = item.layout;
                if (item.layout === null) Layout = Fragment;
                let Page = item.component;
                return (
                  <Route
                    key={index}
                    path={item.path}
                    element={
                      <Layout>
                        <Page></Page>
                      </Layout>
                    }
                  ></Route>
                );
              })}
            </Routes>
          </div>
        </Router>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
