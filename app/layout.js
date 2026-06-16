import { Manrope, Fragment_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import Cursor from "./components/Cursor";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const fragmentMono = Fragment_Mono({
  subsets: ["latin"],
  variable: "--font-fragment-mono",
  weight: ["400"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "Ronak Singh Inda | Software Engineer",
  description: "Computer Science Engineer specializing in full-stack web development, backend architectures, and end-to-end automation testing. Based in Bengaluru, Karnataka.",
  keywords: ["Ronak Singh Inda", "Software Engineer", "Developer Portfolio", "Full Stack Developer", "Firedesk SDE Intern", "QA Intern", "React.js", "Node.js", "PostgreSQL", "Playwright"],
  authors: [{ name: "Ronak Singh Inda" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${fragmentMono.variable} ${plusJakartaSans.variable}`}
    >
      <body>
        <div className="grain-overlay" />
        <Cursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
