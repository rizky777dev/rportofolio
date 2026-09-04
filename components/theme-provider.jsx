"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Membungkus next-themes. Kunci anti-flicker ada di 3 tempat:
 *  1. attribute="class"      -> hanya toggle class "dark" di <html>, tidak
 *                                pernah remount / reload apapun.
 *  2. defaultTheme="dark"    -> sesuai requirement proyek.
 *  3. enableSystem={false}   -> tidak ada mismatch antara preferensi OS
 *                                (server tidak tahu) vs client.
 * next-themes menyuntikkan inline <script> di <head> SEBELUM React
 * hydration, jadi tema yang benar sudah terpasang di <html> sebelum
 * byte pertama dirender oleh browser -> tidak ada flash tema salah.
 */
export function ThemeProvider({ children }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
}
