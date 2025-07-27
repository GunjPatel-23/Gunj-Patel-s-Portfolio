import React from 'react';
import { Download } from 'lucide-react';

const ResumeButton: React.FC = () => {
  const handleDownload = () => {
    // Create a temporary link element to trigger download
    // In a real implementation, you would link to your actual resume PDF
    const link = document.createElement('a');
    link.href = '#'; // Replace with actual resume PDF URL
    link.download = 'Gunj_Patel_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // For demo purposes, show an alert
    alert('Resume download would start here. Please add your actual resume PDF URL.');
  };

  return (
    <button
      onClick={handleDownload}
      className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 z-30 group"
      title="Download Resume"
    >
      <Download size={24} className="group-hover:animate-bounce" />
    </button>
  );
};

export default ResumeButton;