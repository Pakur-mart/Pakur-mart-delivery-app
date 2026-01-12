import { useState } from "react";
import { useAuth } from "./hooks/use-auth";
import LoginPage from "./pages/login";
import DashboardPage from "./pages/dashboard";
import HistoryPage from "./pages/history";
import ProfilePage from "./pages/profile";
import EditProfile from "./pages/edit-profile";
import VehicleDetails from "./pages/vehicle-details";
import PaymentSettings from "./pages/payment-settings";
import Notifications from "./pages/notifications";
import HelpSupport from "./pages/help-support";
import { BottomNavigation } from "./components/bottom-navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export type Page = "dashboard" | "history" | "profile" | "edit-profile" | "vehicle-details" | "payment-settings" | "notifications" | "help-support";

function AppContent() {
  const { user, loading } = useAuth();
  useNotifications(); // Activate notifications logic
  const [activePage, setActivePage] = useState<Page>("dashboard");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  // Helper to sync tab bar state - map subpages to parent tab
  const getActiveTab = () => {
    if (["edit-profile", "vehicle-details", "payment-settings", "notifications", "help-support"].includes(activePage)) {
      return "profile"; // Keep profile tab active when in sub-menus
    }
    return activePage as "dashboard" | "history" | "profile";
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      {activePage === "dashboard" && <DashboardPage />}
      {activePage === "history" && <HistoryPage />}
      {activePage === "profile" && <ProfilePage onNavigate={setActivePage} />}

      {activePage === "edit-profile" && <EditProfile onBack={() => setActivePage("profile")} />}
      {activePage === "vehicle-details" && <VehicleDetails onBack={() => setActivePage("profile")} />}
      {activePage === "payment-settings" && <PaymentSettings onBack={() => setActivePage("profile")} />}
      {activePage === "notifications" && <Notifications onBack={() => setActivePage("profile")} />}
      {activePage === "help-support" && <HelpSupport onBack={() => setActivePage("profile")} />}

      <BottomNavigation
        activeTab={getActiveTab()}
        onTabChange={(tab) => setActivePage(tab)}
      />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
