import "./globals.css";
import { Nunito } from "next/font/google";
import Navbar from "./components/Navbar/Navbar";
import ClientOnly from "./components/ClientOnly.tsx/ClientOnly";
import Modal from "./components/Modals/Modal";

export const metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={font.className}>
        <ClientOnly>
          <Modal isOpen title='Hi' actionLabel='Register' onClose={() => {}} onSubmit={() => {}} />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
