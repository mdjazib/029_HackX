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
      "--base-color": "lch(3 3.33 72.23)",
      "--text-color": "lch(100 0 0)",
      "--accent-color": "lch(69.2 39.86 201.81)",
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
