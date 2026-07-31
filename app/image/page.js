// app/image/page.js
'use client';

import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import confetti from 'canvas-confetti';
import { 
  Download, UploadCloud, Settings, 
  ArrowRight, CheckCircle, AlertOctagon, RefreshCw, Lock, Sparkles, FileImage, Zap, Share2
} from 'lucide-react';
import { verifyFileMagicBytes, sanitizeFileName } from '@/lib/security';

export default function ImageFixer() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [processedFileUrl, setProcessedFileUrl] = useState(null);
  
  const [originalSize, setOriginalSize] = useState(0);
  const [targetSize, setTargetSize] = useState(20);
  const [outputSize, setOutputSize] = useState(0);
  const [outputFormat, setOutputFormat] = useState('image/jpeg');
  
  const [mode, setMode] = useState('decrease'); 
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // ⚡ BEAST MODE & FUN STATES
  const [isBeastMode, setIsBeastMode] = useState(false);
  const [currentMeme, setCurrentMeme] = useState('');

  const memeQuotes = [
    "SSC के सर्वर को बेवकूफ बनाया जा रहा है... 🤫",
    "इतना फ़ास्ट तो iLovePDF सोच भी नहीं सकता! ⚡",
    "सरकारी बाबू भी खुश हो जाएंगे यह फोटो देखकर... 🎯",
    "चाय की चुस्की लो, बस 1 सेकंड में KB फिक्स हो रहा है! ☕",
    "प्राइवेसी 100% सुरक्षित: आपकी फाइल आपके डिवाइस में ही है! 🛡️",
    "Data Diet Mode Activated... 🏋️‍♂️",
  ];

  const presets = [
    { name: 'SSC Photo', size: 30, format: 'image/jpeg', label: '20KB - 50KB' },
    { name: 'UPSC Sign', size: 15, format: 'image/jpeg', label: '10KB - 20KB' },
    { name: 'Bank Doc', size: 150, format: 'image/jpeg', label: '100KB - 200KB' },
    { name: 'Passport Size', size: 40, format: 'image/jpeg', label: 'Max 50KB' },
  ];

  const applyPreset = (preset) => {
    setTargetSize(preset.size);
    setOutputFormat(preset.format);
    setMode('decrease');
  };

  const onDrop = useCallback(async (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      setStatus('error');
      setErrorMessage('Invalid File! Please upload JPG, PNG, or WEBP.');
      return;
    }

    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      const isValid = await verifyFileMagicBytes(selectedFile);
      if (!isValid) {
        setStatus('error');
        setErrorMessage('Security Alert: Corrupted or fake image binary detected!');
        return;
      }

      setFile(selectedFile);
      const sizeKB = Number((selectedFile.size / 1024).toFixed(2));
      setOriginalSize(sizeKB);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      
      setProcessedFileUrl(null);
      setOutputSize(0);
      setStatus('idle');
      
      if (sizeKB > 50) {
        setMode('decrease');
        setTargetSize(Math.min(30, Math.floor(sizeKB / 2)));
      } else {
        setMode('increase');
        setTargetSize(Math.floor(sizeKB * 2));
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    multiple: false,
  });

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (processedFileUrl) URL.revokeObjectURL(processedFileUrl);
    };
  }, [previewUrl, processedFileUrl]);

  // 🚀 ENGINE PROCESSING WITH FUN ELEMENTS
  const processImage = async () => {
    if (!file) return;
    
    // Pick random meme quote
    const randomQuote = memeQuotes[Math.floor(Math.random() * memeQuotes.length)];
    setCurrentMeme(randomQuote);
    setStatus('processing');

    try {
      const targetBytes = targetSize * 1024;

      if (mode === 'decrease') {
        const img = new Image();
        img.src = previewUrl;

        await new Promise((resolve) => (img.onload = resolve));

        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');

        let width = img.width;
        let height = img.height;

        let bestBlob = null;
        let minDiff = Infinity;

        for (let scale = 1.0; scale >= 0.1; scale -= 0.08) {
          canvas.width = Math.floor(width * scale);
          canvas.height = Math.floor(height * scale);
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          let minQ = 0.01;
          let maxQ = 0.98;
          let iterations = 0;

          while (minQ <= maxQ && iterations < 12) {
            iterations++;
            const midQ = (minQ + maxQ) / 2;

            const blob = await new Promise((res) =>
              canvas.toBlob(res, outputFormat, midQ)
            );

            if (!blob) break;

            const currentSize = blob.size;

            if (currentSize <= targetBytes) {
              const diff = targetBytes - currentSize;
              if (diff < minDiff) {
                minDiff = diff;
                bestBlob = blob;
              }
              minQ = midQ + 0.02;
            } else {
              maxQ = midQ - 0.02;
            }
          }

          if (bestBlob && bestBlob.size <= targetBytes && (targetBytes - bestBlob.size) / 1024 < 3) {
            break;
          }
        }

        if (bestBlob) {
          finishProcessing(bestBlob);
        } else {
          canvas.width = Math.floor(width * 0.15);
          canvas.height = Math.floor(height * 0.15);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const fallbackBlob = await new Promise((res) =>
            canvas.toBlob(res, outputFormat, 0.05)
          );
          finishProcessing(fallbackBlob);
        }

      } else {
        const reader = new FileReader();
        reader.onload = function (e) {
          const img = new Image();
          img.src = e.target.result;
          img.onload = function () {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            canvas.toBlob(
              (blob) => {
                if (blob.size < targetBytes) {
                  const paddingSize = targetBytes - blob.size;
                  const dummyBuffer = new Uint8Array(paddingSize);
                  const paddedBlob = new Blob([blob, dummyBuffer], { type: outputFormat });
                  finishProcessing(paddedBlob);
                } else {
                  finishProcessing(blob);
                }
              },
              outputFormat,
              1.0
            );
          };
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
      setErrorMessage('Processing failed. Try setting a slightly higher KB target.');
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
    setPreviewUrl(null);
    setProcessedFileUrl(null);
    setStatus('idle');
  };

  const getFileExtension = () => {
    if (outputFormat === 'image/png') return 'png';
    if (outputFormat === 'image/webp') return 'webp';
    return 'jpg';
  };

  // Saved Data Calculation
  const savedDataKB = (originalSize - outputSize).toFixed(1);

  // Share to WhatsApp Flex
  const shareFlex = () => {
    const text = `🔥 I just compressed my image from ${originalSize}KB to ${outputSize}KB in 0.1s using KBFixer by OnePersonAI! Zero upload, 100% Private. Check it out: https://kbfixer.onepersonai.in`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className={`w-full max-w-5xl mx-auto px-4 py-12 flex flex-col items-center transition-all ${
      isBeastMode ? 'bg-black text-white p-6 border-4 border-white' : ''
    }`}>
      
      {/* Beast Mode Toggle */}
      <div className="w-full flex justify-end mb-4">
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
      <div className="text-center max-w-3xl mb-10">
        <div className={`inline-flex items-center gap-2 px-3 py-1 border-2 text-xs font-bold uppercase tracking-widest mb-4 hard-shadow ${
          isBeastMode ? 'border-white bg-black text-white' : 'border-black bg-white text-black'
        }`}>
          <Lock className="w-4 h-4" />
          <span>Magic-Bytes & Precision Engine</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight mb-4">
          Image <span className={isBeastMode ? 'bg-white text-black px-3' : 'bg-black text-white px-3'}>KB Fixer</span>
        </h1>
        <p className="text-base sm:text-lg font-medium max-w-xl mx-auto border-l-4 border-current pl-3 text-left">
          Compress, convert format, and resize photo to exact target KB for SSC, UPSC, and Bank Govt forms.
        </p>
      </div>

      {/* Main Container */}
      <div className={`w-full border-4 p-6 sm:p-10 hard-shadow transition-colors ${
        isBeastMode ? 'bg-black border-white text-white' : 'bg-white border-black text-black'
      }`}>
        
        {/* UPLOAD ZONE */}
        {!file && (
          <div
            {...getRootProps()}
            className={`border-4 border-dashed p-10 sm:p-16 text-center cursor-pointer transition-all ${
              isBeastMode 
                ? 'border-white hover:bg-white hover:text-black' 
                : 'border-black hover:bg-black hover:text-white'
            } group`}
          >
            <input {...getInputProps()} />
            <UploadCloud className="w-16 h-16 mx-auto mb-6 stroke-[2.5]" />
            <h3 className="text-2xl font-black uppercase mb-2">Drag & Drop Image Here</h3>
            <p className="text-sm font-bold uppercase mb-6 opacity-80">or click to browse from device</p>
            <span className="inline-block border-2 border-current px-4 py-1 text-xs font-black uppercase">
              JPG, PNG, WEBP (Supports Extreme Downscaling to 10KB)
            </span>
          </div>
        )}

        {/* EDITOR ZONE */}
        {file && status !== 'success' && (
          <div className="space-y-8">
            
            {/* GOVT EXAM PRESETS */}
            <div className={`border-2 p-4 ${isBeastMode ? 'border-white bg-neutral-900' : 'border-black bg-slate-50'}`}>
              <label className="text-xs font-black uppercase mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> 1-Click Govt Exam Shortcuts:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {presets.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => applyPreset(p)}
                    className={`p-2 border-2 font-bold uppercase text-xs text-left hard-shadow transition-all ${
                      isBeastMode 
                        ? 'border-white bg-black text-white hover:bg-white hover:text-black' 
                        : 'border-black bg-white text-black hover:bg-black hover:text-white'
                    }`}
                  >
                    <div className="font-black">{p.name}</div>
                    <div className="text-[10px] opacity-80">{p.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Preview */}
              <div className="space-y-4">
                <div className={`border-4 p-4 flex flex-col items-center justify-center h-64 relative ${
                  isBeastMode ? 'border-white bg-black' : 'border-black bg-white'
                }`}>
                  <img src={previewUrl} alt="Preview" className="max-h-full object-contain" />
                  <div className={`absolute bottom-3 px-3 py-1 text-xs font-black uppercase ${
                    isBeastMode ? 'bg-white text-black' : 'bg-black text-white'
                  }`}>
                    Current: {originalSize} KB
                  </div>
                </div>
                <button 
                  onClick={resetTool}
                  disabled={status === 'processing'}
                  className={`w-full py-3 font-bold border-2 uppercase text-sm hard-shadow transition-all disabled:opacity-50 ${
                    isBeastMode 
                      ? 'border-white bg-black text-white hover:bg-white hover:text-black' 
                      : 'border-black bg-white text-black hover:bg-black hover:text-white'
                  }`}
                >
                  Choose Different Image
                </button>
              </div>

              {/* Controls */}
              <div className="space-y-6 flex flex-col justify-center">
                
                {/* Mode Select */}
                <div className={`grid grid-cols-2 gap-2 border-2 p-1 ${isBeastMode ? 'border-white bg-black' : 'border-black bg-white'}`}>
                  <button
                    onClick={() => setMode('decrease')}
                    disabled={status === 'processing'}
                    className={`py-2 text-xs font-black uppercase transition-all ${
                      mode === 'decrease' 
                        ? (isBeastMode ? 'bg-white text-black' : 'bg-black text-white') 
                        : 'hover:opacity-70'
                    }`}
                  >
                    Compress (Decrease)
                  </button>
                  <button
                    onClick={() => setMode('increase')}
                    disabled={status === 'processing'}
                    className={`py-2 text-xs font-black uppercase transition-all ${
                      mode === 'increase' 
                        ? (isBeastMode ? 'bg-white text-black' : 'bg-black text-white') 
                        : 'hover:opacity-70'
                    }`}
                  >
                    Enlarge (Increase)
                  </button>
                </div>

                {/* Target Input */}
                <div className={`border-2 p-4 space-y-3 ${isBeastMode ? 'border-white' : 'border-black'}`}>
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-black uppercase flex items-center gap-2">
                      <Settings className="w-4 h-4" /> Target KB Size
                    </label>
                    <input
                      type="number"
                      value={targetSize}
                      onChange={(e) => setTargetSize(Number(e.target.value))}
                      disabled={status === 'processing'}
                      className={`w-24 border-2 px-2 py-1 text-center font-bold text-sm focus:outline-none ${
                        isBeastMode ? 'border-white bg-black text-white' : 'border-black bg-white text-black'
                      }`}
                    />
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="2000"
                    value={targetSize}
                    onChange={(e) => setTargetSize(Number(e.target.value))}
                    disabled={status === 'processing'}
                    className="w-full accent-current cursor-pointer"
                  />
                </div>

                {/* Format Selector */}
                <div className={`border-2 p-3 flex justify-between items-center ${isBeastMode ? 'border-white' : 'border-black'}`}>
                  <label className="text-xs font-black uppercase flex items-center gap-2">
                    <FileImage className="w-4 h-4" /> Export Format
                  </label>
                  <select
                    value={outputFormat}
                    onChange={(e) => setOutputFormat(e.target.value)}
                    disabled={status === 'processing'}
                    className={`border-2 px-2 py-1 text-xs font-bold uppercase focus:outline-none cursor-pointer ${
                      isBeastMode ? 'border-white bg-black text-white' : 'border-black bg-white text-black'
                    }`}
                  >
                    <option value="image/jpeg">JPG / JPEG (Best for Forms)</option>
                    <option value="image/png">PNG (Lossless)</option>
                    <option value="image/webp">WEBP (Web Compact)</option>
                  </select>
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
                  onClick={processImage}
                  disabled={status === 'processing' || targetSize <= 0}
                  className={`w-full font-black py-4 uppercase text-base border-2 transition-all hard-shadow flex items-center justify-center gap-2 disabled:opacity-50 ${
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
                      Fix Image KB Now <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SUCCESS ZONE */}
        {status === 'success' && processedFileUrl && (
          <div className="text-center py-8 space-y-6">
            <CheckCircle className="w-16 h-16 mx-auto stroke-[2.5]" />
            <h2 className="text-3xl font-black uppercase">Image Size Fixed Perfectly!</h2>
            
            <p className="text-base font-bold border-l-4 border-current pl-3 inline-block">
              Original: <span className="line-through">{originalSize} KB</span> ➔ New Size: <span className={isBeastMode ? 'bg-white text-black px-2 py-0.5' : 'bg-black text-white px-2 py-0.5'}>{outputSize} KB</span>
            </p>

            {/* Achievement Badges & Data Saved Counter */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {Number(savedDataKB) > 0 && (
                <span className="px-3 py-1 border-2 border-current text-xs font-black uppercase bg-emerald-500 text-white">
                  🎉 Data Saved: {savedDataKB} KB
                </span>
              )}
              {targetSize <= 50 && (
                <span className="px-3 py-1 border-2 border-current text-xs font-black uppercase bg-black text-white">
                  🏆 Govt Exam Specialist Badge
                </span>
              )}
              {Number(originalSize) / Number(outputSize) >= 2 && (
                <span className="px-3 py-1 border-2 border-current text-xs font-black uppercase bg-amber-500 text-black">
                  🏋️‍♂️ Fat-To-Fit Master Badge
                </span>
              )}
            </div>

            {/* Download & Share Flex Actions */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <a
                href={processedFileUrl}
                download={`KBFixer_${targetSize}KB_${sanitizeFileName(file.name.split('.')[0])}.${getFileExtension()}`}
                className={`font-black px-8 py-4 border-2 uppercase text-sm hard-shadow transition-all flex items-center justify-center gap-2 ${
                  isBeastMode 
                    ? 'bg-white text-black border-white hover:bg-black hover:text-white' 
                    : 'bg-black text-white border-black hover:bg-white hover:text-black'
                }`}
              >
                <Download className="w-5 h-5" /> Download Fixed Image (.{getFileExtension().toUpperCase()})
              </a>

              <button
                onClick={shareFlex}
                className="bg-emerald-600 text-white font-black px-6 py-4 border-2 border-black uppercase text-sm hard-shadow hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
              >
                <Share2 className="w-5 h-5" /> Share Flex
              </button>

              <button
                onClick={resetTool}
                className={`font-black px-8 py-4 border-2 uppercase text-sm hard-shadow transition-all ${
                  isBeastMode 
                    ? 'bg-black text-white border-white hover:bg-white hover:text-black' 
                    : 'bg-white text-black border-black hover:bg-black hover:text-white'
                }`}
              >
                Fix Another Image
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}