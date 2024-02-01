import React from "react";
import About from "../components/About";
import Header from "../components/Header";
import { Box } from "@mui/material";
export default function AboutPage() {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
    }}>
      <div>
        <Header />
      </div>
      <div>
        <About />
      </div>
    </div>
  );
}
