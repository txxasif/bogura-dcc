import { TopBar } from "./components/TopBar";
import { Header } from "./components/Header";
import { Nav } from "./components/Nav";
import { Marquee } from "./components/Marquee";
import { NoticeBoard } from "./components/NoticeBoard";
import { InfoCards } from "./components/InfoCards";
import { ServicesGrid } from "./components/ServicesGrid";
import { DengueFlyer } from "./components/DengueFlyer";
import { Officials } from "./components/Officials";
import { RightRail } from "./components/RightRail";
import { AdminMap } from "./components/AdminMap";
import { AdminIntro } from "./components/AdminIntro";
import { CitizenServices } from "./components/CitizenServices";
import { AwarenessCampaign } from "./components/AwarenessCampaign";
import { Footer } from "./components/Footer";
import { ComplaintModal } from "./components/ComplaintModal";
import { LoginModal } from "./components/LoginModal";
import { AdminDashboard, type Complaint } from "./components/AdminDashboard";
import { useState } from "react";
import bgPattern from "../imports/Screenshot_2026-06-10_at_9.51.24_PM.png";

const STRIP_WIDTH = "clamp(0px, calc((100vw - 1200px) / 2), 180px)";

function Strip({ side }: { side: "left" | "right" }) {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#edf4f0",
        flexShrink: 0,
        width: STRIP_WIDTH,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${bgPattern})`,
          backgroundRepeat: "repeat-y",
          backgroundSize: "100% auto",
          opacity: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          width: "1px",
          backgroundColor: "rgba(11,107,58,0.15)",
          [side === "left" ? "right" : "left"]: 0,
        }}
      />
    </div>
  );
}

export default function App() {
  const [complaintOpen, setComplaintOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  function handleComplaintSubmit(c: Complaint) {
    setComplaints((prev) => [c, ...prev]);
  }

  function handleUpdateComplaint(ref: string, status: Complaint["status"]) {
    setComplaints((prev) =>
      prev.map((c) => (c.ref === ref ? { ...c, status } : c)),
    );
  }

  // ── Admin dashboard (full-page replacement) ──────────────────────────────
  if (isAdmin) {
    return (
      <AdminDashboard
        complaints={complaints}
        onUpdateComplaint={handleUpdateComplaint}
        onLogout={() => setIsAdmin(false)}
      />
    );
  }

  // ── Public site ──────────────────────────────────────────────────────────
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily:
          "'Hind Siliguri', 'Noto Sans Bengali', system-ui, sans-serif",
      }}
    >
      <Strip side="left" />

      <div style={{ flex: 1, minWidth: 0, backgroundColor: "#f5f5f0" }}>
        <TopBar
          onComplaintOpen={() => setComplaintOpen(true)}
          onLoginOpen={() => setLoginOpen(true)}
        />
        <Header />
        <Nav />
        <Marquee />
        <AdminIntro />

        <main className="max-w-[1180px] mx-auto px-3 py-4 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4">
          <div>
            <NoticeBoard />
            <ServicesGrid />
            <div className="mt-4" />
            <CitizenServices />
            <AwarenessCampaign />
            <InfoCards />
            <DengueFlyer />
          </div>
          <div className="space-y-3">
            <Officials />
            <RightRail />
          </div>
        </main>

        <AdminMap />
        <Footer />
      </div>

      <Strip side="right" />

      {/* Modals */}
      <ComplaintModal
        open={complaintOpen}
        onClose={() => setComplaintOpen(false)}
        onSubmit={handleComplaintSubmit}
      />
      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSuccess={() => setIsAdmin(true)}
      />
    </div>
  );
}
