import React, { useState } from 'react';
import { Shield } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Statistics */}
        <Stats />

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FileUpload onFileUploaded={handleFileUploaded} />
          <FileVerification />
        </div>

        {/* Audit Trail - Full Width */}
        <AuditTrail />

        {/* Tamper Detection Demo */}
        <TamperDemo />

        {/* Documentation Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Architecture & Documentation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Architecture</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Frontend Layer:</strong> React TypeScript application with modern UI/UX for file upload, verification, and audit trail visualization.
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Blockchain Layer:</strong> Smart contracts handle file hash storage, verification logic, and immutable transaction logging.
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Cryptography:</strong> SHA-256 hashing for file integrity, digital signatures for authentication, and tamper detection.
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Security:</strong> End-to-end encryption, access control, and non-repudiation through blockchain immutability.
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Use Cases</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <strong className="text-blue-900">Legal Contracts:</strong>
                  <p className="text-blue-700 mt-1">Ensure contract integrity and prevent unauthorized modifications with blockchain verification.</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <strong className="text-green-900">Healthcare Records:</strong>
                  <p className="text-green-700 mt-1">Secure patient data transfer with immutable audit trails and compliance tracking.</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                  <strong className="text-purple-900">Academic Certificates:</strong>
                  <p className="text-purple-700 mt-1">Verify educational credentials and prevent certificate fraud through blockchain notarization.</p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <strong className="text-orange-900">Document Notarization:</strong>
                  <p className="text-orange-700 mt-1">Provide timestamped, tamper-proof document validation for legal and business purposes.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Implementation</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Frontend Technologies</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• React 18 with TypeScript</li>
                  <li>• Tailwind CSS for styling</li>
                  <li>• Lucide React for icons</li>
                  <li>• Web Crypto API for hashing</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Blockchain Features</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Smart contract simulation</li>
                  <li>• Transaction logging</li>
                  <li>• Block hash generation</li>
                  <li>• Gas estimation</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Security Features</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• SHA-256 file hashing</li>
                  <li>• Digital signatures</li>
                  <li>• Tamper detection</li>
                  <li>• Access control</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-slate-900 text-white py-8 mt-16">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="bg-gradient-to-r from-blue-400 to-cyan-400 p-2 rounded-lg">
              <Shield className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold">BlockSecure</span>
          </div>
          <p className="text-slate-400 text-sm">
            Blockchain-powered file integrity and security system. Built for enterprise-grade document management.
          </p>
          <div className="mt-4 text-xs text-slate-500">
            Demo implementation • Production-ready architecture • Enterprise scalable
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;