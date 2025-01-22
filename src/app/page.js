"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function HomePage() {
  const [formData, setFormData] = useState({
    name: "",
    about: "",
    qualification1: "",
    qualification2: "",
    experience1: "",
    experience2: "",
    skills: "",
  });

  const [genai, setGenai] = useState();
  const router = useRouter();
  const [output, setOutput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = new URLSearchParams(formData).toString();
    router.push(`/resume?${query}`);
  };

  const handleGenAiInput = (e) => {
    const inputText = e.target.value;
    console.log(inputText);

    const requestBody = {
      contents: [
        {
          parts: [{ text: inputText }],
        },
      ],
    };
    axios
      .post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCbY1iUOApSoDkGn2AMEqIaGOehLdh4FLs",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setOutput(
          formatResponse(
            response.data?.candidates?.[0]?.content?.parts?.[0]?.text
          )
        );
      });
  };

  const formatResponse = (response) => {
    if (!response) return "";

    return response
      .split("\n")
      .map((line, index) => {
        if (line.startsWith("**")) {
          // Bold headings
          return `<h2 key=${index} class="text-lg font-semibold mt-4">${line.replace(
            /\*\*/g,
            ""
          )}</h2>`;
        } else if (line.startsWith("*")) {
          // Bulleted list
          return `<li key=${index} class="ml-4 list-disc">${line.replace(
            /\*/g,
            ""
          )}</li>`;
        } else {
          // Regular paragraphs
          return `<p key=${index} class="text-sm mt-2">${line}</p>`;
        }
      })
      .join("");
  };

  useEffect(() => {}, [output]);

  return (
    <div className="min-h-screen flex flex-row bg-gray-50">
      <div className="flex-1 flex flex-col items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="flex flex-col justify-center items-center mb-5 top-[14px] p-10">
          <h1 className="text-5xl font-extrabold mb-6">
            Welcome to Resume Builder
          </h1>
          <p className="text-lg mb-8 text-center">
            Craft a professional resume in minutes. Fill in your details, and we
            handle the rest.
          </p>
          <p className="text-md font-light">Let’s get started!</p>
        </div>
        <div className="w-full flex h-full flex-col items-center text-black">
          <h1 className="text-white text-3xl font-bold">Generate AI response for your Resume</h1>
          <br/>
          <textarea
            name="genai"
            className="w-100 px-4 py-4 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 text-black"
            onChange={(e) => handleGenAiInput(e)}
            required
            label="Generate AI Response"
          />
          <br />
          <button
            className="bg-white px-3 rounded-lg text-purple-600 font-bold py-3"
            onClick={() => handleGenAiInput}
          >
            Generate
          </button>
          <br/>
          {output && (
            <div className="bg-white text-purple-400 p-10 m-4 max-h-80 overflow-auto rounded-lg shadow-md w-3/4">
              <div dangerouslySetInnerHTML={{ __html: output }} />
            </div>
          )}
        </div>
        <br />
      </div>
      <div className="bg-white shadow-lg rounded-lg p-8 flex-1 max-w-lg m-8">
        <h1 className="text-3xl font-semibold mb-6 text-gray-700">
          Resume Builder
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              About:
            </label>
            <textarea
              name="experience1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Name:
            </label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Qualification:
            </label>
            <input
              type="text"
              name="qualification1"
              placeholder="School Qualification"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="qualification2"
              placeholder="College Qualification"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-4 focus:ring focus:ring-blue-200"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Experience:
            </label>
            <textarea
              label="Experience 2"
              name="experience1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              onChange={handleChange}
              required
            />
            <textarea
              label="Experience 2"
              name="experience2"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-4 focus:ring focus:ring-blue-200"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Skills:
            </label>
            <textarea
              name="skills"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-600 focus:ring focus:ring-blue-300 transition"
          >
            Generate Resume
          </button>
        </form>
      </div>
    </div>
  );
}
