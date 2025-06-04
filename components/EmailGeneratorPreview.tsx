import React, { useState, useEffect } from 'react';

const EmailGeneratorPreview: React.FC = () => {
  const [step, setStep] = useState(0);
  const [showEmail, setShowEmail] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prevStep) => (prevStep + 1) % 4);
      if (step === 2) {
        setShowEmail(true);
      } else {
        setShowEmail(false);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [step]);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Email Generator Preview</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Prompt</label>
        <input
          type="text"
          value="Following up on the initial escrow deposit that was due yesterday."
          readOnly
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Dropdown Selection</label>
        <select
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          disabled
        >
          <option>Option 1</option>
          <option>Option 2</option>
        </select>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={() => setStep((prevStep) => (prevStep + 1) % 4)}
      >
        Generate
      </button>
      {showEmail && (
        <div className="mt-4 p-4 border border-gray-300 rounded-md">
          <h3 className="font-bold">Generated Email:</h3>
          <p>Dear [Recipient],</p>
          <p>I hope this message finds you well. I am writing to follow up on the initial escrow deposit that was due yesterday. Please let me know if you need any further assistance.</p>
          <p>Best regards,<br />[Your Name]</p>
          <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md">Send</button>
        </div>
      )}
    </div>
  );
};

export default EmailGeneratorPreview; 