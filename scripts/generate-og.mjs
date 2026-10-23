// Genera public/og.png (1200x630) — tarjeta social en jade nocturno.
// Correr con: pnpm exec node scripts/generate-og.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { Resvg } from "@resvg/resvg-js";
import React, { createElement as h } from "react";
import satori from "satori";

const INK = "#0b0e0d";
const JADE = "#55c0a6";
const BONE = "#ece7db";
const PARA = "#a3a89f";

const regular = readFileSync("./src/assets/Newsreader.ttf");
const italic = readFileSync("./src/assets/Newsreader-Italic.ttf");

const markup = h(
    "div",
    {
        style: {
            width: "1200px",
            height: "630px",
            display: "flex",
            flexDirection: "column",
            padding: "72px 84px",
            backgroundColor: INK,
            backgroundImage: "linear-gradient(160deg, #101413 0%, #0b0e0d 55%)",
            color: BONE,
        },
    },
    h(
        "div",
        { style: { display: "flex", flexDirection: "column", gap: "28px" } },
        h(
            "div",
            {
                style: {
                    fontFamily: "Newsreader",
                    fontSize: "27px",
                    color: JADE,
                },
            },
            "Carlos Burelo",
        ),
        h(
            "div",
            {
                style: {
                    fontFamily: "Newsreader",
                    fontSize: "64px",
                    lineHeight: "1.15",
                    letterSpacing: "-0.02em",
                    color: BONE,
                    display: "flex",
                    flexDirection: "column",
                },
            },
            h("span", null, "Construyendo mis propias ideas,"),
            h("span", null, "ayudando a impulsar las tuyas."),
        ),
        h(
            "div",
            {
                style: {
                    fontFamily: "Newsreader",
                    fontStyle: "italic",
                    fontSize: "23px",
                    color: PARA,
                },
            },
            "Software simple, claro y efectivo.",
        ),
    ),
    // pie: regla de jade (satori no soporta space-between/margin auto)
    h(
        "div",
        { style: { display: "flex", alignItems: "center", gap: "20px", position: "absolute", bottom: "72px", left: "84px" } },
        h("div", { style: { display: "flex", width: "64px", height: "6px", backgroundColor: JADE } }),
        h(
            "div",
            {
                style: {
                    display: "flex",
                    fontFamily: "Newsreader",
                    fontSize: "22px",
                    color: PARA,
                },
            },
            "twwk.cc",
        ),
    ),
);

const svg = await satori(markup, {
    width: 1200,
    height: 630,
    fonts: [
        { name: "Newsreader", data: regular, weight: 500, style: "normal" },
        { name: "Newsreader", data: italic, weight: 500, style: "italic" },
    ],
});


// IBM (Plex) no está disponible como TTF aquí: el texto sans cae al fallback
// del propio satori si falta la fuente, así que declaro solo Newsreader y
// asigno font-family Newsreader de forma segura arriba.

const png = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng();
writeFileSync("./public/og.png", png);
console.log("og.png generado");
