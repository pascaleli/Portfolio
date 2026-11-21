import { ImageResponse } from "next/og";
import { site } from "@/data/content";

export const dynamic = "force-static";
export const alt = `${site.name}: Cybersecurity Consultant & AppSec Pen Tester`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#f7f9fc",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(29,92,255,0.22), transparent 45%), radial-gradient(circle at 5% 95%, rgba(14,165,233,0.2), transparent 40%)",
          color: "#0b1b33",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, fontWeight: 700, color: "#1d5cff" }}>CYBERSECURITY · APPSEC · AI</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -2 }}>{site.name}</div>
          <div style={{ fontSize: 40, color: "#1d5cff", marginTop: 12 }}>Cybersecurity Consultant · AppSec Pen Tester</div>
          <div style={{ fontSize: 30, color: "#4a5a73", marginTop: 18 }}>Co-Founder & Lead Instructor @ ParoCyber · AI-augmented security</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#4a5a73" }}>
          <span>Accra, Ghana</span>
          <span>Security+ · ISC2 CC · CISSP candidate</span>
        </div>
      </div>
    ),
    size
  );
}
