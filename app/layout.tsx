import type { Metadata } from "next";
import { Inter, League_Spartan } from "next/font/google";
import "./globals.css";
import { OverViewProvider } from "./_providers/overViewContext";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Ensure styles load first
import { config } from "@fortawesome/fontawesome-svg-core";
import dynamic from "next/dynamic";
import Script from "next/script";
import ExamViewProvider from "./_providers/examViewContext";
config.autoAddCss = false;

const spartan = League_Spartan({
  subsets: ["latin"],
  variable: "--font-spartan",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "IT Legend",
  description: "This is a task for IT legend company",
  icons: ["/images/IT LEGEND logo-02.png"],
  authors: {
    name: "ali shahin",
  },
  keywords: ["next js", "react", "typeScript", "it legend"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const Navbar = dynamic(() => import("./_components/Layout/nav"), {
    ssr: true,
    loading: () => <p>Loading ...</p>,
  });
  const Footer = dynamic(() => import("./_components/Layout/footer"), {
    ssr: true,
    loading: () => <p>Loading ...</p>,
  });
  return (
    <html lang="en" className={`${inter.variable} ${spartan.variable}`}>
      <body>
        <Navbar />
        <ExamViewProvider>
          <OverViewProvider>{children}</OverViewProvider>
        </ExamViewProvider>
        <Footer />
      </body>
      <Script src="https://thirdparty.com/script.js" strategy="lazyOnload" />
    </html>
  );
}
