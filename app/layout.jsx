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
      "--base-color": "lch(18 5 80)",
      "--text-color": "lch(93 4 70)",
      "--accent-color": "lch(65 40 50)",
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
