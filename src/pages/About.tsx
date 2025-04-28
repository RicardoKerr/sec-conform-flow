
import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto glass-panel p-6">
        <h1 className="text-2xl font-bold text-iso-accent mb-6 glow-text">About ISO Guardian</h1>
        
        <div className="space-y-6 text-iso-text">
          <section>
            <h2 className="text-xl font-semibold text-iso-accent mb-3">What is ISO Guardian?</h2>
            <p>
              ISO Guardian is an advanced AI assistant designed to help organizations navigate the complex
              requirements of ISO/IEC 27001 compliance. Our system provides interactive guidance through
              the entire compliance process, from initial assessment to final certification.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-iso-accent mb-3">About ISO/IEC 27001</h2>
            <p className="mb-3">
              ISO/IEC 27001 is the international standard for information security management. It provides a framework
              for establishing, implementing, maintaining, and continually improving an information security
              management system (ISMS).
            </p>
            <p>
              The standard helps organizations protect their information assets through the implementation of
              appropriate controls, based on their specific risks and needs.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-iso-accent mb-3">Our Features</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Interactive AI-driven compliance guidance</li>
              <li>Comprehensive risk assessment tools</li>
              <li>Document management and preparation</li>
              <li>Control implementation advice</li>
              <li>Audit preparation assistance</li>
              <li>Ongoing compliance monitoring</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
