import "./globals.css";

import type { Metadata } from "next";

import { css, cx } from "~styled-system/css";

import { inter, poppins } from "./fonts";

export const metadata: Metadata = {
    title: "Dynamic Globe",
    description:
        "3D globe with dynamic data visualization. Built with Three.js",
};

type RootLayoutProperties = Readonly<{
    children: React.ReactNode;
}>;

const body = css({
    overscrollBehavior: "none",
});

export default function RootLayout({ children }: RootLayoutProperties) {
    return (
        <html lang="en" className={cx(poppins.variable, inter.variable)}>
            <body className={body}>{children}</body>
        </html>
    );
}
