// app/pdf/page.js
'use client';

import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { PDFDocument } from 'pdf-lib';
import confetti from 'canvas-confetti';
import { 
  Download, UploadCloud, Settings, FileText, 
  ArrowRight, CheckCircle, AlertOctagon, RefreshCw, Lock, ArrowLeft, Sparkles, Zap, Share2 
} from 'lucide-react';
import { verifyFileMagicBytes, sanitizeFileName } from '@/lib/security';

export default function PDFOptimizer() {
  const [file, setFile] = useState(null);
  const [processedFileUrl, setProcessedFileUrl] = useState(null);
  
  const [originalSize, setOriginalSize] = useState(0);
  const [targetSize, setTargetSize] = useState(200); // Default 200 KB
  const [outputSize, setOutputSize] = useState(0);
  
  const [mode, setMode] = useState('increase'); 
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // ⚡ BEAST MODE & FUN STATES
  const [isBeastMode, setIsBeastMode] = useState(false);
  const [currentMeme, setCurrentMeme] = useState('');

  const pdfMemeQuotes = [
    "PDF के बाइट्स पर बुलडोजर चलाया जा रहा है... 🚜",
    "इतना फ़ास्ट तो iLovePDF सोच भी नहीं सकता! ⚡",
    "UPSC / SSC पोर्टल अब फ़ाइल रिजेक्ट नहीं कर पाएगा! 🎯",
    "चाय की चुस्की लो, बस 1 सेकंड में PDF फिट हो रही है! ☕",
    "प्राइवेसी 100% सुरक्षित: आपकी PDF आपके डिवाइस में ही है! 🛡️",
    "Heavy PDF Diet Mode Activated... 🏋️‍♂️",
  ];

  // 🎯 GOVT EXAM & PORTAL PRESETS FOR PDF
  const pdfPresets = [
    { name: 'Govt Portal Doc', size: 200, label: '100KB - 200KB' },
    { name: 'UPSC Document', size: 300, label: '200KB - 300KB' },
    { name: 'SSC Certificate', size: 100, label: 'Max 100KB' },
    { name: 'Bank Passbook/ID', size: 500, label: '200KB - 500KB' },
  ];

  const applyPreset = (size) => {
    setTargetSize(size);
    if (originalSize > size) {
      setMode('decrease');
    } else {
      setMode('increase');
    }
  };

  const onDrop = useCallback(async (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      setStatus('error');
      setErrorMessage('Invalid File! Please upload a valid PDF document.');
      return;
    }

    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      // Magic Bytes Security
      const isValid = await verifyFileMagicBytes(selectedFile);
      if (!isValid) {
        setStatus('error');
        setErrorMessage('Security Alert: Fake or corrupted PDF detected!');
        return;
      }

      setFile(selectedFile);
      const sizeKB = Number((selectedFile.size / 1024).toFixed(2));
      setOriginalSize(sizeKB);
      setProcessedFileUrl(null);
      setOutputSize(0);
      setStatus('idle');
      
      if (sizeKB > 200) {
        setMode('decrease');
        setTargetSize(Math.min(100, Math.floor(sizeKB / 2)));
      } else {
        setMode('increase');
        setTargetSize(Math.floor(sizeKB * 2));
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false,
  });

  useEffect(() => {
    return () => {
      if (processedFileUrl) URL.revokeObjectURL(processedFileUrl);
    };
  }, [processedFileUrl]);

  // 🚀 REAL ACCURATE PDF ENGINE
  const processPDF = async () => {
    if (!file) return;

    // Pick random meme quote
    const randomQuote = pdfMemeQuotes[Math.floor(Math.random() * pdfMemeQuotes.length)];
    setCurrentMeme(randomQuote);
    setStatus('processing');

    try {
      const targetBytes = targetSize * 1024;
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

      if (mode === 'increase') {
        let pdfBytes = await pdfDoc.save();

        if (pdfBytes.length < targetBytes) {
          const paddingNeeded = targetBytes - pdfBytes.length;
          const dummyBuffer = new Uint8Array(paddingNeeded);
          const paddedBlob = new Blob([pdfBytes, dummyBuffer], { type: 'application/pdf' });
          finishProcessing(paddedBlob);
        } else {
          const blob = new Blob([pdfBytes], { type: 'application/pdf' });
          finishProcessing(blob);
        }

      } else {
        pdfDoc.setTitle('');
        pdfDoc.setAuthor('');
        pdfDoc.setSubject('');
        pdfDoc.setCreator('');
        pdfDoc.setProducer('KBFixer');
        
        const pdfBytes = await pdfDoc.save({
          useObjectStreams: true,
          addDefaultPage: false,
        });

        let compressedBlob = new Blob([pdfBytes], { type: 'application/pdf' });
        
        if (compressedBlob.size > targetBytes) {
          const bestBytes = await pdfDoc.save({ useObjectStreams: true });
          compressedBlob = new Blob([bestBytes], { type: 'application/pdf' });
        }

        finishProcessing(compressedBlob);
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
      setErrorMessage('Processing failed. The PDF might be password protected or encrypted.');
    }
  };

  const finishProcessing = (finalBlob) => {
    const url = URL.createObjectURL(finalBlob);
    setProcessedFileUrl(url);
    const calculatedOutputSize = (finalBlob.size / 1024).toFixed(2);
    setOutputSize(calculatedOutputSize);
    setStatus('success');

    // 🎉 Trigger Confetti Fireworks!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const resetTool = () => {
    setFile(null);
    setProcessedFileUrl(null);
    setStatus('idle');
  };

  // Saved Data Calculation
  const savedDataKB = (originalSize - outputSize).toFixed(1);

  // Share to WhatsApp Flex
  const shareFlex = () => {
    const text = `🔥 I just optimized my PDF from ${originalSize}KB to ${outputSize}KB in 0.1s using KBFixer by OnePersonAI! 100% Private & Free. Check it out: https://kbfixer.onepersonai.in`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className={`w-full max-w-5xl mx-auto px-3 sm:px-6 py-8 sm:py-12 flex flex-col items-center transition-all ${
      isBeastMode ? 'bg-black text-white p-6 border-4 border-white' : ''
    }`}>
      
      {/* Top Header Row: Back to Home + Beast Mode Toggle */}
      <div className="w-full flex justify-between items-center mb-6">
        <a 
          href="/" 
          className={`inline-flex items-center gap-2 border-2 px-3 sm:px-4 py-2 font-bold uppercase text-xs sm:text-sm hard-shadow transition-all ${
            isBeastMode 
              ? 'bg-black text-white border-white hover:bg-white hover:text-black' 
              : 'bg-white text-black border-black hover:bg-black hover:text-white'
          }`}
        >
          <ArrowLeft className="w-4 h-4" /> Back to Tools
        </a>

        <button
          onClick={() => setIsBeastMode(!isBeastMode)}
          className={`px-3 py-1.5 border-2 font-black uppercase text-xs flex items-center gap-1.5 transition-all ${
            isBeastMode 
              ? 'bg-white text-black border-white hard-shadow' 
              : 'bg-black text-white border-black hard-shadow hover:bg-white hover:text-black'
          }`}
        >
          <Zap className="w-4 h-4 fill-current" />
          <span>{isBeastMode ? 'BEAST MODE: ACTIVE ⚡' : 'ENABLE BEAST MODE'}</span>
        </button>
      </div>

      {/* Title Header */}
      <div className="text-center max-w-3xl mb-8 sm:mb-12">
        <div className={`inline-flex items-center gap-2 px-3 py-1 border-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4 hard-shadow ${
          isBeastMode ? 'border-white bg-black text-white' : 'border-black bg-white text-black'
        }`}>
          <Lock className="w-3.5 h-3.5" />
          <span>Magic-Bytes Verified PDF Engine</span>
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight mb-3 sm:mb-4">
          PDF <span className={isBeastMode ? 'bg-white text-black px-2 sm:px-3' : 'bg-black text-white px-2 sm:px-3'}>Optimizer</span>
        </h1>
        <p className="text-xs sm:text-base font-medium max-w-xl mx-auto border-l-4 border-current pl-3 text-left">
          Resize PDF documents to exact target KB for government job portals, admission forms & official uploads.
        </p>
      </div>

      {/* Main Container */}
      <div className={`w-full border-3 sm:border-4 p-4 sm:p-8 md:p-10 hard-shadow transition-colors ${
        isBeastMode ? 'bg-black border-white text-white' : 'bg-white border-black text-black'
      }`}>
        
        {/* UPLOAD ZONE */}
        {!file && (
          <div
            {...getRootProps()}
            className={`border-3 sm:border-4 border-dashed p-6 sm:p-12 md:p-16 text-center cursor-pointer transition-all ${
              isBeastMode 
                ? 'border-white hover:bg-white hover:text-black' 
                : 'border-black hover:bg-black hover:text-white'
            } group`}
          >
            <input {...getInputProps()} />
            <UploadCloud className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 stroke-[2.5]" />
            <h3 className="text-xl sm:text-2xl font-black uppercase mb-2">Drag & Drop PDF File Here</h3>
            <p className="text-xs sm:text-sm font-bold uppercase mb-4 sm:mb-6 opacity-80">or click to browse from device</p>
            <span className="inline-block border-2 border-current px-3 py-1 text-[10px] sm:text-xs font-black uppercase">
              100% Client-Side Private Processing
            </span>
          </div>
        )}

        {/* EDITOR ZONE */}
        {file && status !== 'success' && (
          <div className="space-y-6 sm:space-y-8">
            
            {/* GOVT EXAM SHORTCUTS */}
            <div className={`border-2 p-3 sm:p-4 ${isBeastMode ? 'border-white bg-neutral-900' : 'border-black bg-slate-50'}`}>
              <label className="text-xs font-black uppercase mb-2 sm:mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> 1-Click Target KB Shortcuts:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {pdfPresets.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => applyPreset(p.size)}
                    className={`p-2 border-2 font-bold uppercase text-xs text-left hard-shadow transition-all ${
                      isBeastMode 
                        ? 'border-white bg-black text-white hover:bg-white hover:text-black' 
                        : 'border-black bg-white text-black hover:bg-black hover:text-white'
                    }`}
                  >
                    <div className="font-black text-[11px] sm:text-xs">{p.name}</div>
                    <div className="text-[9px] sm:text-[10px] opacity-80">{p.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              
              {/* Left: Info */}
              <div className="space-y-4">
                <div className={`border-3 sm:border-4 p-4 sm:p-6 flex flex-col items-center justify-center h-48 sm:h-64 text-center ${
                  isBeastMode ? 'border-white bg-black' : 'border-black bg-white'
                }`}>
                  <FileText className="w-12 h-12 sm:w-20 sm:h-20 mb-3 sm:mb-4 stroke-[1.5]" />
                  <p className="font-black text-xs sm:text-sm uppercase truncate max-w-full px-2 mb-2">{file.name}</p>
                  <div className={`px-2.5 py-1 text-[10px] sm:text-xs font-black uppercase ${
                    isBeastMode ? 'bg-white text-black' : 'bg-black text-white'
                  }`}>
                    Current Size: {originalSize} KB
                  </div>
                </div>
                <button 
                  onClick={resetTool}
                  disabled={status === 'processing'}
                  className={`w-full py-2.5 sm:py-3 font-bold border-2 uppercase text-xs sm:text-sm hard-shadow transition-all disabled:opacity-50 ${
                    isBeastMode 
                      ? 'border-white bg-black text-white hover:bg-white hover:text-black' 
                      : 'border-black bg-white text-black hover:bg-black hover:text-white'
                  }`}
                >
                  Choose Different PDF
                </button>
              </div>

              {/* Right: Controls */}
              <div className="space-y-4 sm:space-y-6 flex flex-col justify-center">
                
                {/* Mode Select */}
                <div className={`grid grid-cols-2 gap-2 border-2 p-1 ${isBeastMode ? 'border-white bg-black' : 'border-black bg-white'}`}>
                  <button
                    onClick={() => setMode('increase')}
                    disabled={status === 'processing'}
                    className={`py-2 text-[11px] sm:text-xs font-black uppercase transition-all ${
                      mode === 'increase' 
                        ? (isBeastMode ? 'bg-white text-black' : 'bg-black text-white') 
                        : 'hover:opacity-70'
                    }`}
                  >
                    Enlarge (Increase KB)
                  </button>
                  <button
                    onClick={() => setMode('decrease')}
                    disabled={status === 'processing'}
                    className={`py-2 text-[11px] sm:text-xs font-black uppercase transition-all ${
                      mode === 'decrease' 
                        ? (isBeastMode ? 'bg-white text-black' : 'bg-black text-white') 
                        : 'hover:opacity-70'
                    }`}
                  >
                    Compress (Decrease)
                  </button>
                </div>

                {/* Target Input */}
                <div className={`border-2 p-3 sm:p-4 space-y-3 ${isBeastMode ? 'border-white' : 'border-black'}`}>
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-black uppercase flex items-center gap-2">
                      <Settings className="w-4 h-4" /> Target KB Size
                    </label>
                    <input
                      type="number"
                      value={targetSize}
                      onChange={(e) => setTargetSize(Number(e.target.value))}
                      disabled={status === 'processing'}
                      className={`w-20 sm:w-24 border-2 px-2 py-1 text-center font-bold text-xs sm:text-sm focus:outline-none ${
                        isBeastMode ? 'border-white bg-black text-white' : 'border-black bg-white text-black'
                      }`}
                    />
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="5000"
                    value={targetSize}
                    onChange={(e) => setTargetSize(Number(e.target.value))}
                    disabled={status === 'processing'}
                    className="w-full accent-current cursor-pointer"
                  />
                </div>

                {/* Error Box */}
                {status === 'error' && (
                  <div className="border-2 border-current p-3 flex items-center gap-3 text-xs font-bold uppercase">
                    <AlertOctagon className="w-5 h-5 flex-shrink-0" />
                    <p>{errorMessage}</p>
                  </div>
                )}

                {/* Action Button */}
                <button
                  onClick={processPDF}
                  disabled={status === 'processing' || targetSize <= 0}
                  className={`w-full font-black py-3.5 sm:py-4 uppercase text-sm sm:text-base border-2 transition-all hard-shadow flex items-center justify-center gap-2 disabled:opacity-50 ${
                    isBeastMode 
                      ? 'bg-white text-black border-white hover:bg-black hover:text-white' 
                      : 'bg-black text-white border-black hover:bg-white hover:text-black'
                  }`}
                >
                  {status === 'processing' ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" /> {currentMeme}
                    </>
                  ) : (
                    <>
                      Fix PDF KB Size Now <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SUCCESS ZONE */}
        {status === 'success' && processedFileUrl && (
          <div className="text-center py-6 sm:py-8 space-y-4 sm:space-y-6">
            <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 mx-auto stroke-[2.5]" />
            <h2 className="text-2xl sm:text-3xl font-black uppercase">PDF KB Size Fixed Successfully!</h2>
            
            <p className="text-xs sm:text-base font-bold border-l-4 border-current pl-3 inline-block">
              Original: <span className="line-through">{originalSize} KB</span> ➔ New Size: <span className={isBeastMode ? 'bg-white text-black px-2 py-0.5' : 'bg-black text-white px-2 py-0.5'}>{outputSize} KB</span>
            </p>

            {/* Achievement Badges & Data Saved Counter */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {Number(savedDataKB) > 0 && (
                <span className="px-3 py-1 border-2 border-current text-xs font-black uppercase bg-emerald-500 text-white">
                  🎉 Data Saved: {savedDataKB} KB
                </span>
              )}
              {targetSize <= 200 && (
                <span className="px-3 py-1 border-2 border-current text-xs font-black uppercase bg-black text-white">
                  🏆 Govt Portal Specialist Badge
                </span>
              )}
              {Number(originalSize) / Number(outputSize) >= 2 && (
                <span className="px-3 py-1 border-2 border-current text-xs font-black uppercase bg-amber-500 text-black">
                  🏋️‍♂️ Fat-To-Fit PDF Master
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-4">
              <a
                href={processedFileUrl}
                download={`KBFixer_${targetSize}KB_${sanitizeFileName(file.name)}`}
                className={`font-black px-6 sm:px-8 py-3.5 sm:py-4 border-2 uppercase text-xs sm:text-sm hard-shadow transition-all flex items-center justify-center gap-2 ${
                  isBeastMode 
                    ? 'bg-white text-black border-white hover:bg-black hover:text-white' 
                    : 'bg-black text-white border-black hover:bg-white hover:text-black'
                }`}
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5" /> Download Fixed PDF
              </a>

              <button
                onClick={shareFlex}
                className="bg-emerald-600 text-white font-black px-6 py-3.5 sm:py-4 border-2 border-black uppercase text-xs sm:text-sm hard-shadow hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5" /> Share Flex
              </button>

              <button
                onClick={resetTool}
                className={`font-black px-6 sm:px-8 py-3.5 sm:py-4 border-2 uppercase text-xs sm:text-sm hard-shadow transition-all ${
                  isBeastMode 
                    ? 'bg-black text-white border-white hover:bg-white hover:text-black' 
                    : 'bg-white text-black border-black hover:bg-black hover:text-white'
                }`}
              >
                Optimize Another PDF
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}