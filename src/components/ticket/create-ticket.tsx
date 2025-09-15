"use client";
import React, { useEffect, useState } from "react";

export const CreateTicket = () => {
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setStatus("Submitting...");

    try {
      const res = await fetch("/api/gorgias", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setStatus("Ticket created successfully!");
      } else {
        setStatus("Failed to create ticket.");
      }
    } catch (err) {
      setStatus("Error sending request.");
    }
  };
  return (
    <div className="flex justify-center items-center pt-30">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-3xl w-full"
        encType="multipart/form-data"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Your Address"
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="phoneNumber"
          placeholder="Your phoneNumber"
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          className="border p-2 rounded"
          required
        />
        <textarea
          name="message"
          placeholder="Describe your issue..."
          className="border p-2 rounded"
          rows={4}
          required
        />
        <label htmlFor="upload-image">upload image</label>
        <input id="upload-image" name="uploadImage" type="file" multiple />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Submit Ticket
        </button>
        {status && <p>{status}</p>}
      </form>
    </div>
  );
};
