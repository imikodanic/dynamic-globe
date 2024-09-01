import { defineConfig } from "@pandacss/dev";

export default defineConfig({
    // Whether to use css reset
    preflight: true,

    // Where to look for your css declarations
    include: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],

    // Files to exclude
    exclude: [],

    // Useful for theme customization
    theme: {
        extend: {
            tokens: {
                colors: {
                    "electric-400": { value: "#1E42A2" },
                    "electric-300": { value: "#0058ff" },
                    "electric-200": { value: "#5192ff" },
                    midnight: { value: "#01041a" },
                    metal: { value: "#6c7285" },
                    "deep-metal": { value: "#353544" },
                    cloud: { value: "#9ea2bd" },
                    fog: { value: "#f6f7fa" },
                    space: { value: "#11152f" },
                },
                fonts: {
                    poppins: { value: "var(--font-poppins), sans-serif" },
                    inter: { value: "var(--font-inter), sans-serif" },
                },
            },
        },
    },

    // The output directory for your css system
    outdir: "styled-system",

    jsxFramework: "react",

    jsxStyleProps: "minimal",
});
