import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.scss";
import Game from "./pages/Game";
import LeaderBoard from "./pages/LeaderBoard";
import UserLogin from "./pages/UserLogin";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <UserLogin /> },
    { path: "/game", element: <Game /> },
    {
      path: "/leaderboard",
      element: <LeaderBoard />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
