import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Info Konreg Kasulampua",
  description: "Konsultasi Regional PDRB Kalimantan, Sulawesi, Maluku, dan Papua",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={dmSans.className}>
        {children}
      </body>
    </html>
  );
}