// File: src/router.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import VerticalShortcutLanding from "./VerticalShortcutLanding.tsx";
import ApplicationFormWrapper from "./components/form/ApplicationFormWrapper.tsx";
import VSExampleComponent from "./components/VSExampleComponent.tsx";
import AnimatedButtonsDemo from "./components/marble-buttons/AnimatedButtonsDemo.tsx";
import { DirectTest } from "./components/DirectTest.tsx";
import { DirectClassTest } from "./components/DirectClassTest.tsx";
import VSModalShowcase from "./components/VSModalShowcase.tsx";
import {
  VSPainPoints,
  VSCharts,
  ConnectEverything,
} from "./components/sections";
import CalendlyDemo from "./components/Calendly/CalendlyDemo.tsx";
import ThemeStyleGuide from "./components/ThemeStyleGuide.tsx";
import ModalImplementation from "./Qualification_components/modal-implementation.tsx";
import TiaPreview from "./Qualification_components/tia-preview.tsx";
import ModuleHUDShowcase from "./components/sections/ModuleHUDShowcase.tsx";
import ThemeVisualizer from "./components/Color-theme-display.tsx";
import Layout from "./components/Layout";
import DebugPage from "./pages/DebugPage";
import NotFound from "./pages/NotFoundPage";

// Define the router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <VerticalShortcutLanding /> },
      { path: "landing", element: <VerticalShortcutLanding /> },
      { path: "application-form", element: <ApplicationFormWrapper /> },
      { path: "example", element: <VSExampleComponent /> },
      { path: "marble-buttons", element: <AnimatedButtonsDemo /> },
      { path: "modals", element: <VSModalShowcase /> },
      { path: "painpoints", element: <VSPainPoints /> },
      { path: "charts", element: <VSCharts /> },
      { path: "calendly", element: <CalendlyDemo /> },
      { path: "style-guide", element: <ThemeStyleGuide /> },
      { path: "qualification", element: <ModalImplementation /> },
      { path: "tia-qualification", element: <TiaPreview /> },
      { path: "modulehud", element: <ModuleHUDShowcase /> },
      { path: "theme-visualizer", element: <ThemeVisualizer /> },
      { path: "connect-everything", element: <ConnectEverything /> },
      { path: "debug", element: <DebugPage /> },
    ],
  },
]);

// Export the RouterProvider with our configuration
export function AppRouter() {
  return <RouterProvider router={router} />;
}
