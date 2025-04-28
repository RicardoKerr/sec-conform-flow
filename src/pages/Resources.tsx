
import React from 'react';
import { Download } from 'lucide-react';

const Resources = () => {
  const resources = [
    {
      id: 1,
      title: 'ISO 27001 Implementation Guide',
      description: 'A step-by-step guide to implementing ISO 27001 in your organization.',
      type: 'PDF',
      size: '2.4 MB',
    },
    {
      id: 2,
      title: 'Risk Assessment Template',
      description: 'Standard template for conducting information security risk assessments.',
      type: 'XLSX',
      size: '1.8 MB',
    },
    {
      id: 3,
      title: 'Statement of Applicability Sample',
      description: 'Example SoA document with explanations and guidance.',
      type: 'DOCX',
      size: '1.2 MB',
    },
    {
      id: 4,
      title: 'Information Security Policy Template',
      description: 'Customizable template for your organization\'s security policy.',
      type: 'DOCX',
      size: '950 KB',
    },
    {
      id: 5,
      title: 'ISO 27001 Audit Checklist',
      description: 'Comprehensive checklist to prepare for certification audits.',
      type: 'PDF',
      size: '1.5 MB',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-iso-accent mb-8 text-center glow-text">ISO 27001 Resources</h1>
        
        <p className="text-iso-text mb-8 text-center max-w-2xl mx-auto">
          Access our collection of valuable resources to help your organization implement and maintain
          ISO/IEC 27001 compliance effectively.
        </p>
        
        <div className="grid gap-6">
          {resources.map(resource => (
            <div key={resource.id} className="glass-panel p-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-iso-accent">{resource.title}</h3>
                <p className="text-sm text-iso-text mt-1">{resource.description}</p>
                <div className="flex items-center mt-2 space-x-3">
                  <span className="text-xs py-1 px-2 rounded-full bg-iso-light bg-opacity-30 text-iso-text">
                    {resource.type}
                  </span>
                  <span className="text-xs text-iso-text/70">{resource.size}</span>
                </div>
              </div>
              
              <button 
                className="flex items-center justify-center h-10 w-10 rounded-full bg-iso-accent bg-opacity-10 hover:bg-opacity-20 text-iso-accent transition-colors"
                onClick={() => alert('In a real application, this would download the resource.')}
              >
                <Download className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;
