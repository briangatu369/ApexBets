import { Suspense } from "react";
import { RouterProvider, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import useCheckAuthentication from "./Hooks/useCheckAuthentication";
import { router } from "./Config/router.jsx";
import LazyLoadingFallback from "./Components/LazyLoadingFallback.jsx";

function App() {
  useCheckAuthentication();

  return (
    <main className="max-w-[850px] mx-auto">
      <Toaster
        richColors
        position="top-center"
        expand={true}
        toastOptions={{
          style: {
            padding: "8px",
          },
          className: "class",
        }}
      />
      <Suspense fallback={<LazyLoadingFallback />}>
        <RouterProvider router={router} />
      </Suspense>
    </main>
  );
}

export default App;
