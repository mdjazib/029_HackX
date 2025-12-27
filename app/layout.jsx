import { Inter, Libre_Caslon_Display } from "next/font/google";
import "./globals.sass";
import { Toaster } from "sonner";
import Authentication from "@/components/Authentication";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const caslon = Libre_Caslon_Display({
  variable: "--font-caslon",
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nice Panda",
  description: "Your Thoughts belong here.",
};

export default function RootLayout({ children }) {
  const theme = {
    dark: {
      "--base-color": "lch(12 4 260)",      // Deep charcoal with slight blue tone
      "--text-color": "lch(92 3 270)",      // Off-white with cool tone
      "--accent-color": "lch(68 35 140)",   // Vibrant sage green
    }
  }
  return (
    <html lang="en">
      <body className={`${inter.variable} ${caslon.variable}`} style={theme.dark}>
        <Toaster position="top-center" />
        <Authentication>
          {children}
        </Authentication>
      </body>
    </html>
  );
}
