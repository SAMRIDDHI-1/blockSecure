// import React, { useState } from 'react';
// import { Shield, CheckCircle, Twitter, Github, Linkedin, ShieldCheck } from 'lucide-react';
// import { Header } from './components/Header';
// import { FileUpload } from './components/FileUpload';
// import { FileVerification } from './components/FileVerification';
// import { AuditTrail } from './components/AuditTrail';
// import { TamperDemo } from './components/TamperDemo';
// import { Stats } from './components/Stats';
// import { FileRecord } from './types';

// function App() {
//   const [uploadedFiles, setUploadedFiles] = useState<FileRecord[]>([]);

//   const handleFileUploaded = (record: FileRecord) => {
//     setUploadedFiles(prev => [...prev, record]);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
//       <Header />
      
//       <main className="container mx-auto px-6 py-8 space-y-8">
//         {/* Statistics */}
//         <Stats />

//         {/* Main Features Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           <FileUpload onFileUploaded={handleFileUploaded} />
//           <FileVerification />
//         </div>

//         {/* Audit Trail - Full Width */}
//         <AuditTrail />

//         {/* Tamper Detection Demo */}
//         <TamperDemo />

//         {/* Documentation Section */}
        
//       </main>

//       <footer className="bg-dark-900 border-t border-dark-700 py-12 px-4 glow-border-top">
//   <div className="max-w-7xl mx-auto">
//     {/* Main Footer Content */}
//     <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
      
//       {/* Brand Column */}
//       <div className="space-y-4">
//         <div className="flex items-center space-x-3">
//           <div className="bg-gradient-to-r from-neon-blue to-neon-purple p-2 rounded-lg glow-border-sm">
//             <Shield className="w-6 h-6 text-white" />
//           </div>
//           <span className="text-xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple">
//             BLOCKSECURE
//           </span>
//         </div>
//         <p className="text-metal-400 text-sm font-mono">
//           ENTERPRISE-GRADE_BLOCKCHAIN_SECURITY_FOR_DOCUMENT_INTEGRITY
//         </p>
//         <div className="flex space-x-4">
//           <a href="#" className="text-metal-500 hover:text-neon-blue transition-colors">
//             <Twitter className="w-5 h-5" />
//           </a>
//           <a href="#" className="text-metal-500 hover:text-radium-400 transition-colors">
//             <Github className="w-5 h-5" />
//           </a>
//           <a href="#" className="text-metal-500 hover:text-neon-purple transition-colors">
//             <Linkedin className="w-5 h-5" />
//           </a>
//         </div>
//       </div>

//       {/* Solutions Column */}
//       <div className="space-y-4">
//         <h3 className="text-metal-300 font-mono tracking-wider text-sm font-semibold border-b border-dark-700 pb-2">
//           SOLUTIONS
//         </h3>
//         <ul className="space-y-3">
//           <li><a href="#" className="text-metal-400 hover:text-neon-blue text-xs font-mono transition-colors">DOCUMENT_VERIFICATION</a></li>
//           <li><a href="#" className="text-metal-400 hover:text-neon-blue text-xs font-mono transition-colors">SECURE_FILE_STORAGE</a></li>
//           <li><a href="#" className="text-metal-400 hover:text-neon-blue text-xs font-mono transition-colors">BLOCKCHAIN_NOTARIZATION</a></li>
//           <li><a href="#" className="text-metal-400 hover:text-neon-blue text-xs font-mono transition-colors">AUDIT_TRAIL_SYSTEM</a></li>
//           <li><a href="#" className="text-metal-400 hover:text-neon-blue text-xs font-mono transition-colors">API_INTEGRATION</a></li>
//         </ul>
//       </div>

//       {/* Resources Column */}
//       <div className="space-y-4">
//         <h3 className="text-metal-300 font-mono tracking-wider text-sm font-semibold border-b border-dark-700 pb-2">
//           RESOURCES
//         </h3>
//         <ul className="space-y-3">
//           <li><a href="#" className="text-metal-400 hover:text-radium-400 text-xs font-mono transition-colors">DOCUMENTATION</a></li>
//           <li><a href="#" className="text-metal-400 hover:text-radium-400 text-xs font-mono transition-colors">API_REFERENCE</a></li>
//           <li><a href="#" className="text-metal-400 hover:text-radium-400 text-xs font-mono transition-colors">WHITEPAPER</a></li>
//           <li><a href="#" className="text-metal-400 hover:text-radium-400 text-xs font-mono transition-colors">CASE_STUDIES</a></li>
//           <li><a href="#" className="text-metal-400 hover:text-radium-400 text-xs font-mono transition-colors">SECURITY_AUDITS</a></li>
//         </ul>
//       </div>

//       {/* Security Badge */}
//       <div className="space-y-4">
//         <h3 className="text-metal-300 font-mono tracking-wider text-sm font-semibold border-b border-dark-700 pb-2">
//           SECURITY_CERTIFIED
//         </h3>
//         <div className="bg-dark-800/80 border border-dark-700 rounded-lg p-4 glow-border-sm">
//           <div className="flex items-start space-x-3">
//             <ShieldCheck className="w-5 h-5 text-radium-400 mt-0.5 flex-shrink-0" />
//             <div>
//               <p className="text-xs text-metal-400 font-mono mb-2">PROTECTED_BY</p>
//               <div className="bg-dark-900 text-neon-purple px-3 py-1 rounded-full text-xs font-mono tracking-wider border border-dark-700 inline-block">
//                 TEAM_ASP_DEFENDERS
//               </div>
//               <p className="text-xs text-metal-500 mt-2 font-mono">
//                 QUANTUM-RESISTANT • ZERO-TRUST • SOC_2_TYPE_II
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>

//     {/* Bottom Footer */}
//     <div className="border-t border-dark-700 pt-8 flex flex-col md:flex-row justify-between items-center">
//       <div className="text-metal-600 text-xs font-mono mb-4 md:mb-0">
//         © {new Date().getFullYear()}_BLOCKSECURE_SYSTEMS,_INC._ALL_RIGHTS_RESERVED
//       </div>
      
//       <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
//         <a href="#" className="text-metal-500 hover:text-neon-blue text-xs font-mono transition-colors">PRIVACY_POLICY</a>
//         <a href="#" className="text-metal-500 hover:text-neon-blue text-xs font-mono transition-colors">TERMS_OF_SERVICE</a>
//         <a href="#" className="text-metal-500 hover:text-neon-blue text-xs font-mono transition-colors">SECURITY</a>
//         <a href="#" className="text-metal-500 hover:text-neon-blue text-xs font-mono transition-colors">COMPLIANCE</a>
//         <a href="#" className="text-metal-500 hover:text-neon-blue text-xs font-mono transition-colors">CONTACT</a>
//       </div>
//     </div>
//   </div>
// </footer>

//       <style>{`
//         .glow-blue {
//           box-shadow: 0 0 12px rgba(37, 99, 235, 0.6);
//         }
//         .glow-cyan {
//           box-shadow: 0 0 8px rgba(34, 211, 238, 0.4);
//         }
//       `}</style>
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import { Shield, Twitter, Github, Linkedin, ShieldCheck } from 'lucide-react';
import { Header } from './components/Header';
import { FileUpload } from './components/FileUpload';
import { FileVerification } from './components/FileVerification';
import { AuditTrail } from './components/AuditTrail';
import { TamperDemo } from './components/TamperDemo';
import { Stats } from './components/Stats';
import { FileRecord } from './types';

function App() {
  const [uploadedFiles, setUploadedFiles] = useState<FileRecord[]>([]);

  const handleFileUploaded = (record: FileRecord) => {
    setUploadedFiles(prev => [...prev, record]);
  };

  return (
    <div className="min-h-screen bg-dark-900 text-metal-100">
      {/* Cyberpunk background elements */}
      <div className="fixed inset-0 -z-10 opacity-30">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMGZmYTAiIG9wYWNpdHk9IjAuMDUiPjxwYXRoIGQ9Ik0yMCAyMGgtNDB2NDBoNDB6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-radium-400 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-neon-blue rounded-full filter blur-3xl opacity-10"></div>
      </div>

      <Header />
      
      <main className="container mx-auto px-6 py-8 space-y-8">
        <Stats />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FileUpload onFileUploaded={handleFileUploaded} />
          <FileVerification />
        </div>
        <AuditTrail />
        <TamperDemo />
      </main>

      {/* Cyberpunk Footer */}
      <footer className="bg-dark-800 border-t border-dark-700 py-12 px-4 relative glow-border-top">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand Column */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-neon-blue to-neon-purple p-2 rounded-lg glow-border-sm">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple">
                  BLOCKSECURE
                </span>
              </div>
              <p className="text-metal-400 text-sm font-mono">
                ENTERPRISE-GRADE_BLOCKCHAIN_SECURITY
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-metal-500 hover:text-neon-blue transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-metal-500 hover:text-radium-400 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-metal-500 hover:text-neon-purple transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Solutions Column */}
            <div className="space-y-4">
              <h3 className="text-metal-300 font-mono tracking-wider text-sm font-semibold border-b border-dark-700 pb-2">
                SOLUTIONS
              </h3>
              <ul className="space-y-3">
                {['DOCUMENT_VERIFICATION', 'SECURE_FILE_STORAGE', 'BLOCKCHAIN_NOTARIZATION', 'AUDIT_TRAIL_SYSTEM', 'API_INTEGRATION'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-metal-400 hover:text-neon-blue text-xs font-mono transition-colors block">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Column */}
            <div className="space-y-4">
              <h3 className="text-metal-300 font-mono tracking-wider text-sm font-semibold border-b border-dark-700 pb-2">
                RESOURCES
              </h3>
              <ul className="space-y-3">
                {['DOCUMENTATION', 'API_REFERENCE', 'WHITEPAPER', 'CASE_STUDIES', 'SECURITY_AUDITS'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-metal-400 hover:text-radium-400 text-xs font-mono transition-colors block">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Security Badge */}
            <div className="space-y-4">
              <h3 className="text-metal-300 font-mono tracking-wider text-sm font-semibold border-b border-dark-700 pb-2">
                SECURITY_CERTIFIED
              </h3>
              <div className="bg-dark-700/80 border border-dark-600 rounded-lg p-4 glow-border-sm">
                <div className="flex items-start space-x-3">
                  <ShieldCheck className="w-5 h-5 text-radium-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-metal-400 font-mono mb-2">PROTECTED_BY</p>
                    <div className="bg-dark-800 text-neon-purple px-3 py-1 rounded-full text-xs font-mono tracking-wider border border-dark-600 inline-block">
                      TEAM_ASP_DEFENDERS
                    </div>
                    <p className="text-xs text-metal-500 mt-2 font-mono">
                      QUANTUM-RESISTANT • ZERO-TRUST • SOC_2_TYPE_II
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-dark-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-metal-600 text-xs font-mono mb-4 md:mb-0">
              © {new Date().getFullYear()}_BLOCKSECURE_SYSTEMS,_INC.
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {['PRIVACY_POLICY', 'TERMS_OF_SERVICE', 'SECURITY', 'COMPLIANCE', 'CONTACT'].map((item) => (
                <a key={item} href="#" className="text-metal-500 hover:text-neon-blue text-xs font-mono transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        :root {
          --neon-blue: #00f2ff;
          --neon-purple: #9600ff;
          --radium-400: #00ff88;
          --dark-900: #0a0f0d;
          --dark-800: #121a17;
          --dark-700: #1a2420;
          --dark-600: #24302a;
          --metal-100: #e0f0ea;
          --metal-300: #8a9e96;
          --metal-400: #6a7d75;
          --metal-500: #5e6d66;
          --metal-600: #3a4742;
        }
        
        body {
          background: 
            radial-gradient(circle at 20% 30%, var(--dark-900) 0%, #0a1a14 100%),
            linear-gradient(135deg, #0a1a14 0%, #0a0f0d 100%);
          background-attachment: fixed;
          color: var(--metal-100);
          min-height: 100vh;
        }
        
        .glow-border-sm {
          position: relative;
          border: 1px solid var(--dark-600);
        }
        
        .glow-border-sm::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, var(--neon-blue), var(--radium-400));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
        
        .glow-border-top {
          position: relative;
        }
        
        .glow-border-top::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, var(--neon-blue), var(--radium-400));
          box-shadow: 0 0 8px var(--radium-400);
        }
      `}</style>
    </div>
  );
}

export default App;