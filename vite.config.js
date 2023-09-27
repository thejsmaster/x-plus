"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vite_1 = require("vite");
// https://vitejs.dev/config/
exports.default = (0, vite_1.defineConfig)({
    build: {
        lib: {
            entry: "useX.js",
            name: "useXYZ",
            fileName: (format) => `useX.${format}.js`,
        },
        rollupOptions: {
            external: ["react"],
            output: {
                globals: {
                    react: "React",
                },
            },
        },
    },
});
