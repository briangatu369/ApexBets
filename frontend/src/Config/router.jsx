import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

// Lazy loading components
const Home = lazy(() => import("../Pages/Home/Home"));
const Login = lazy(() => import("../Pages/Auth/Login/Login"));
const Deposit = lazy(() => import("../Pages/Deposit/Deposit"));
const Register = lazy(() => import("../Pages/Auth/Register/Register"));
const Mines = lazy(() => import("../Pages/Games/Mines/Mines"));
const Plinko = lazy(() => import("../Pages/Games/Plinko/Plinko"));
const Crash = lazy(() => import("../Pages/Games/Crash/Crash"));
const Dice = lazy(() => import("../Pages/Games/Dice/Dice"));
const JungleGames = lazy(() =>
  import("../Pages/Games/JungleGames/JungleGames")
);
const MagicNumbers = lazy(() =>
  import("../Pages/Games/MagicNumbers/MagicNumbers")
);
const Peperuka = lazy(() => import("../Pages/Games/Peperuka/Peperuka"));
const RockPaperScissors = lazy(() =>
  import("../Pages/Games/RockPaperScissors/RockPaperScissors")
);
const GameLayout = lazy(() => import("../Pages/Games/GameLayout"));
const PageNotFound = lazy(() => import("../Pages/404Page/PageNotFound"));

const gamesChildren = [
  {
    path: "mines",
    element: <Mines />,
  },
  {
    path: "plinko",
    element: <Plinko />,
  },
  {
    path: "crash",
    element: <Crash />,
  },
  {
    path: "dice",
    element: <Dice />,
  },
  {
    path: "jungleGames",
    element: <JungleGames />,
  },
  {
    path: "magicNumbers",
    element: <MagicNumbers />,
  },
  {
    path: "peperuka",
    element: <Peperuka />,
  },
  {
    path: "rockPaperScissors",
    element: <RockPaperScissors />,
  },
];

export const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  { path: "/login", element: <Login /> },
  { path: "/", element: <Home /> },
  { path: "/deposit", element: <Deposit /> },
  {
    path: "/games/",
    element: <GameLayout />,
    children: gamesChildren,
  },
  { path: "*", element: <PageNotFound /> },
]);
