import { FileRecord, DigitalSignature } from '../types';

export class CryptoUtils {
  // Generate SHA-256 hash from file
  static async generateFileHash(file: File): Promise<string> {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Generate random blockchain transaction ID
  static generateTransactionId(): string {
    return '0x' + Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Generate block hash
  static generateBlockHash(data: string): string {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    
    // Simple hash simulation (in real implementation, use proper cryptographic hash)
    let hash = 0;
    for (let i = 0; i < dataBuffer.length; i++) {
      const char = dataBuffer[i];
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    return '0x' + Math.abs(hash).toString(16).padStart(64, '0');
  }

  // Simulate digital signature generation
  static async generateDigitalSignature(
    data: string, 
    privateKey: string, 
    signer: string
  ): Promise<DigitalSignature> {
    // In real implementation, use actual cryptographic signing
    const signature = await this.simulateSign(data + privateKey);
    
    return {
      signer,
      signature,
      timestamp: Date.now(),
      publicKey: this.generatePublicKey(privateKey)
    };
  }

  // Simulate signature generation
  private static async simulateSign(data: string): Promise<string> {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return 'sig_' + hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 64);
  }

  // Generate public key from private key (simulation)
  private static generatePublicKey(privateKey: string): string {
    return 'pub_' + privateKey.substring(0, 64);
  }

  // Verify digital signature
  static async verifySignature(
    data: string, 
    signature: DigitalSignature
  ): Promise<boolean> {
    // In real implementation, use actual cryptographic verification
    const expectedSig = await this.simulateSign(data + signature.publicKey.replace('pub_', ''));
    return signature.signature === expectedSig;
  }

  // Generate tampered version of file for demo
  static simulateFileTampering(originalContent: string): string {
    const tamperPoints = [
      () => originalContent.replace(/a/g, 'b'),
      () => originalContent + ' [TAMPERED]',
      () => originalContent.substring(10),
      () => originalContent.split('').reverse().join('')
    ];
    
    const randomTamper = tamperPoints[Math.floor(Math.random() * tamperPoints.length)];
    return randomTamper();
  }
}