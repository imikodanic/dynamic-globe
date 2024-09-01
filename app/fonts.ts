import { Inter as InterFont, Poppins as PoppinsFont } from "next/font/google";

export const poppins = PoppinsFont({
    weight: ["400", "500", "600", "700"],
    display: "swap",
    subsets: ["latin"],
    variable: "--font-poppins",
});

export const inter = InterFont({
    weight: ["400", "500", "600", "700"],
    display: "swap",
    subsets: ["latin"],
    variable: "--font-inter",
});
