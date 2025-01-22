"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = new URLSearchParams(formData).toString();
    router.push(`/resume?${query}`);
  };

  return (
    <div className="min-h-screen flex flex-row bg-gray-50">
      <div className="flex-1 flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white p-10">
        <h1 className="text-5xl font-extrabold mb-6">Welcome to Resume Builder</h1>
        <p className="text-lg mb-8 text-center">Craft a professional resume in minutes. Fill in your details, and we handle the rest.</p>
        <p className="text-md font-light">Let’s get started!</p>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8 flex-1 max-w-lg m-8">
        <h1 className="text-3xl font-semibold mb-6 text-gray-700">Resume Builder</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-2">About:</label>
            <textarea
              name="experience1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-2">Name:</label>
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
              name="experience1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              onChange={handleChange}
              required
            />
            <textarea
              name="experience2"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-4 focus:ring focus:ring-blue-200"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-2">Skills:</label>
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
