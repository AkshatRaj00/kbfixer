'use client';

import { useState, useRef, ChangeEvent } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Upload,
  Download,
  Sparkles,
  Sliders,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export default function SignatureCleaner() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [threshold, setThreshold] = useState<number>(180);
  const [contrast, setContrast] = useState<number>(1.2);
  const [targetKb, setTargetKb] = useState<number>(20);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [fileSizeKb, setFileSizeKb] = useState<number | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const originalImageRef = useRef<HTMLImageElement | null>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        originalImageRef.current = img;
        setImageSrc(event.target?.result as string);
        processSignature(img, threshold, contrast, targetKb);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const processSignature = (
    img: HTMLImageElement,
    thresh: number,
    cont: number,
    targetSize: number
  ) => {
    const canvas = canvasRef.current || document.createElement('canvas');
    canvasRef.current = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      let gray = 0.299 * r + 0.587 * g + 0.114 * b;
      gray = (gray - 128) * cont + 128;

      if (gray > thresh) {
        data[i] = 255;
        data[i + 1] = 255;
        data[i + 2] = 255;
      } else {
        data[i] = 0;
        data[i + 1] = 0;
        data[i + 2] = 0;
      }
    }

    ctx.putImageData(imgData, 0, 0);

    let quality = 0.9;
    let dataUrl = canvas.toDataURL('image/jpeg', quality);
    let currentKb = Math.round((dataUrl.length * (3 / 4)) / 1024);

    while (currentKb > targetSize && quality > 0.1) {
      quality -= 0.1;
      dataUrl = canvas.toDataURL('image/jpeg', quality);
      currentKb = Math.round((dataUrl.length * (3 / 4)) / 1024);
    }

    setProcessedUrl(dataUrl);
    setFileSizeKb(currentKb);
  };

  const handleSliderChange = (newThreshold: number, newContrast: number) => {
    setThreshold(newThreshold);
    setContrast(newContrast);
    if (originalImageRef.current) {
      processSignature(originalImageRef.current, newThreshold, newContrast, targetKb);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-8 flex flex-col items-center">
      {/* Top Bar */}
      <div className="w-full flex items-center justify-between mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-black bg-white text-xs font-black uppercase tracking-wider hard-shadow hover:bg-black hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </Link>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-black bg-white text-[11px] font-black uppercase tracking-wider hard-shadow">
          <Sparkles className="w-3.5 h-3.5 text-black" /> Auto Background Remover
        </div>
      </div>

      {/* Header Section */}
      <div className="text-center w-full max-w-2xl mb-6">
        <h1 className="text-2xl sm:text-4xl font-black text-black tracking-tight uppercase mb-2">
          Signature <span className="bg-black text-white px-2 py-0.5">Clean-Up</span>
        </h1>
        <p className="text-xs sm:text-sm font-semibold text-black border-l-3 border-black pl-3 text-left">
          Remove yellow or gray page shadows, isolate ink to pure black on white, and hit the under-20KB limit instantly.
        </p>
      </div>

      {/* Main Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Upload & Preview */}
        <div className="border-3 border-black bg-white p-4 hard-shadow flex flex-col items-center justify-center min-h-[260px] relative">
          {!imageSrc ? (
            <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-black p-6 hover:bg-gray-50 transition-colors">
              <Upload className="w-8 h-8 mb-2 text-black" />
              <span className="text-xs font-black uppercase tracking-wider text-center">
                Upload Raw Signature Photo
              </span>
              <span className="text-[10px] text-gray-600 mt-1 font-bold">JPG, PNG supported</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          ) : (
            <div className="w-full flex flex-col items-center">
              <div className="w-full border-2 border-black bg-white p-2 flex items-center justify-center mb-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={processedUrl || imageSrc}
                  alt="Processed Signature"
                  className="max-h-[160px] object-contain"
                />
              </div>
              <div className="w-full flex items-center justify-between text-[11px] font-black uppercase">
                <span>Output: {fileSizeKb} KB</span>
                <label className="cursor-pointer underline text-gray-700 hover:text-black">
                  Change Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="border-3 border-black bg-white p-4 hard-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b-2 border-black pb-2 mb-4">
              <Sliders className="w-4 h-4 text-black" />
              <span className="text-xs font-black uppercase tracking-wider">Adjustment Tools</span>
            </div>

            {/* Threshold */}
            <div className="mb-4">
              <div className="flex justify-between text-[11px] font-bold uppercase mb-1">
                <span>Background Whiteness:</span>
                <span>{threshold}</span>
              </div>
              <input
                type="range"
                min="100"
                max="240"
                value={threshold}
                disabled={!imageSrc}
                onChange={(e) => handleSliderChange(Number(e.target.value), contrast)}
                className="w-full accent-black cursor-pointer"
              />
            </div>

            {/* Contrast */}
            <div className="mb-4">
              <div className="flex justify-between text-[11px] font-bold uppercase mb-1">
                <span>Ink Darkness:</span>
                <span>{contrast}x</span>
              </div>
              <input
                type="range"
                min="0.8"
                max="3"
                step="0.1"
                value={contrast}
                disabled={!imageSrc}
                onChange={(e) => handleSliderChange(threshold, Number(e.target.value))}
                className="w-full accent-black cursor-pointer"
              />
            </div>

            {/* Target Size */}
            <div className="mb-4">
              <div className="flex justify-between text-[11px] font-bold uppercase mb-1">
                <span>Target File Limit:</span>
                <span>{targetKb} KB</span>
              </div>
              <div className="flex gap-2">
                {[10, 20, 50].map((kb) => (
                  <button
                    key={kb}
                    type="button"
                    onClick={() => {
                      setTargetKb(kb);
                      if (originalImageRef.current) {
                        processSignature(originalImageRef.current, threshold, contrast, kb);
                      }
                    }}
                    className={`px-2 py-1 text-xs font-black uppercase border-2 border-black ${
                      targetKb === kb ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'
                    }`}
                  >
                    &lt; {kb}KB
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Download Action */}
          {processedUrl && (
            <a
              href={processedUrl}
              download="cleaned_signature.jpg"
              className="w-full min-h-[40px] border-2 border-black bg-black text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 hard-shadow hover:bg-white hover:text-black transition-colors"
            >
              <Download className="w-4 h-4" /> Download Cleaned Signature
            </a>
          )}
        </div>
      </div>

      {/* Trust Footer */}
      <div className="w-full border-2 border-black bg-white p-3 flex items-center justify-between text-[11px] font-bold uppercase hard-shadow">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-black" /> 100% Client-Side RAM Processing
        </span>
        <span className="flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-black" /> Zero Upload Delay
        </span>
      </div>
    </div>
  );
}