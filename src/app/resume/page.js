"use client"; // Client-side rendering

import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { toJpeg } from "html-to-image";
import { saveAs } from "file-saver";
import { Suspense } from "react";

const Resume = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Default Name"; // Added fallback
  const qualification1 = searchParams.get("qualification1") || "N/A";
  const qualification2 = searchParams.get("qualification2") || "N/A";
  const experience1 = searchParams.get("experience1") || "No experience";
  const experience2 = searchParams.get("experience2") || "No experience";
  const skills = searchParams.get("skills") || "No skills listed";
  const about = searchParams.get("about") || "No description provided";

  const resumeRef = useRef(null);

  const handleDownload = () => {
    const contentHeight = resumeRef.current.scrollHeight;
    const contentWidth = resumeRef.current.scrollWidth;

    // Ensure the content is rendered fully and overflow is handled correctly
    resumeRef.current.style.overflow = "visible";

    toJpeg(resumeRef.current, {
      quality: 0.95,
      width: contentWidth,
      height: contentHeight,
      backgroundColor: "#ffffff", // Ensure the background color is set to avoid black areas
    })
      .then((dataUrl) => {
        saveAs(dataUrl, "resume.jpg");
      })
      .catch((error) => {
        console.error("Failed to export resume:", error);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div
        ref={resumeRef}
        style={{
          textAlign: "center",
          fontFamily: "Georgia, serif",
          backgroundColor: "#eef2f3",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            padding: "40px",
            border: "1px solid #ccc",
            borderRadius: "12px",
            width: "700px",
            margin: "20px auto",
            backgroundColor: "#ffffff",
            boxShadow: "0 8px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h1
            style={{
              color: "#2c3e50",
              fontSize: "36px",
              borderBottom: "2px solid #2980b9",
              display: "inline-block",
              paddingBottom: "10px",
            }}
          >
            {name}
          </h1>
          <h2
            style={{
              color: "#2980b9",
              fontSize: "24px",
              marginTop: "30px",
              textAlign: "left",
            }}
          >
            About
          </h2>
          <p
            style={{
              color: "#34495e",
              fontSize: "18px",
              lineHeight: "1.6",
              textAlign: "left",
            }}
          >
            {about}
          </p>
          <h2
            style={{
              color: "#2980b9",
              fontSize: "24px",
              marginTop: "30px",
              textAlign: "left",
            }}
          >
            Education
          </h2>
          <p
            style={{
              color: "#34495e",
              fontSize: "18px",
              lineHeight: "1.6",
              textAlign: "left",
            }}
          >
            {qualification1}
          </p>
          <p
            style={{
              color: "#34495e",
              fontSize: "18px",
              lineHeight: "1.6",
              textAlign: "left",
            }}
          >
            {qualification2}
          </p>
          <h2
            style={{
              color: "#2980b9",
              fontSize: "24px",
              marginTop: "30px",
              textAlign: "left",
            }}
          >
            Experience
          </h2>
          <p
            style={{
              color: "#34495e",
              fontSize: "18px",
              lineHeight: "1.6",
              textAlign: "left",
            }}
          >
            {experience1}
          </p>
          <p
            style={{
              color: "#34495e",
              fontSize: "18px",
              lineHeight: "1.6",
              textAlign: "left",
            }}
          >
            {experience2}
          </p>
          <h2
            style={{
              color: "#2980b9",
              fontSize: "24px",
              marginTop: "30px",
              textAlign: "left",
            }}
          >
            Skills
          </h2>
          <p
            style={{
              color: "#34495e",
              fontSize: "18px",
              lineHeight: "1.6",
              textAlign: "left",
            }}
          >
            {skills}
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          onClick={handleDownload}
          style={{
            width: "30%",
            marginTop: "25px",
            padding: "12px 25px",
            fontSize: "18px",
            color: "#fff",
            backgroundColor: "#2980b9",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.15)",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#1a5276")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#2980b9")}
        >
          Download as JPG
        </button>
      </div>
    </div>
  );
};

export default function ResumePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Resume />
    </Suspense>
  );
}
