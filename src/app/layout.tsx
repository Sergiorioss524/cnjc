import "~/styles/globals.css";

import { Archivo, Fraunces, JetBrains_Mono } from "next/font/google";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Cámara Nacional de Juventud — Postulación",
  description:
    "Postula a la Cámara Nacional de Juventud (CNJ) Bolivia: empresarios, emprendedores, profesionales y universitarios.",
};

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600", "700"],
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${archivo.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body">
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
