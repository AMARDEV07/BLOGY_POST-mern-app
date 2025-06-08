import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// routes
import HomePage from "./Routes/HomePage";
import PostListPage from "./Routes/PostListPage";
import SinglePostPage from "./Routes/SinglePostPage";
import MainLayout from "./Layouts/MainLayout";
import WritePage from "./Routes/WritePage";
import LoginPage from "./Routes/LoginPage";
import RegisterPage from "./Routes/RegisterPage";
//clerk for login log out sercure routes
import { ClerkProvider } from "@clerk/clerk-react";
//host tost for notfication
import { Toaster } from "react-hot-toast";
//react query..
import {QueryClient,QueryClientProvider,} from '@tanstack/react-query'
const queryClient = new QueryClient()




// Import your  clerk Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/posts",
        element: <PostListPage />,
      },
      {
        path: "/:slug",
        element: <SinglePostPage />,
      },

      {
        path: "/write",
        element: <WritePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      

    ],
  },
]);

createRoot(document.getElementById("root")).render(

  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster position="top-center" />

      </QueryClientProvider>

    </ClerkProvider>
  </StrictMode>
);
