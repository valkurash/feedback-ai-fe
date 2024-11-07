import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Feedback system",
  description: "Feedback Assistants API with OpenAI",
  icons: {
    icon: "/openai.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <a href={`/`}><img className="logo" src="/openai.svg" alt="OpenAI Logo" /></a>
        {children}
      </body>
    </html>
  );
}
