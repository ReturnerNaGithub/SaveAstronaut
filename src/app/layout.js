import "./globals.css";
import { Inter } from "next/font/google";
import { Web3ModalProvider } from "../context/Web3Modal.jsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Returner",
  description: "My developer app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3ModalProvider>{children}</Web3ModalProvider>
      </body>
    </html>
  );
}
