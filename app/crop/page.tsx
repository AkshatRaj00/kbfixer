'use client';

import { useState, useRef, ChangeEvent } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Upload,
  Download,
  Crop,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Maximize2,
} from 'lucide-react';

interface Preset {
  label: string;
  width: number;
  height: number;
  maxKb: number;
  category: string;
}

const PRESETS: Preset[] = [
  { label: 'UPSC / SSC Photo', width: 200, height: 230, maxKb: 50, category: 'Photo' },
  { label: 'Standard Passport', width: 413, height: 531, maxKb: 100, category: 'Photo' },
  { label: 'SSC / IBPS Sign', width: 140, height: 60, maxKb: 20, category: 'Signature' },
  { label: 'GATE / NEET Sign', width: 280, height: 80, maxKb: 30, category: 'Signature' },
  { label: 'PAN Card Photo', width: 213, height: 213, maxKb: 50, category: 'Photo' },
  { label: 'Square 1:1 (ID)', width: 300, height: 300, maxKb: 50, category: 'Photo' },
];

export default function DimensionCropper() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<Preset>(PRESETS[0]);
  const [customWidth, setCustomWidth] = useState<number>(200);
  const [customHeight, setCustomHeight] = useState<number>(230);
  const [targetKb, setTargetKb] = useState<number>(50);

  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [outputMeta, setOutputMeta] = useState<{ width: number; height: number; kb: number } | null>(null);

  const originalImageRef = useRef<HTMLImageElement | null>(null);

  // 1. Image upload handler
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        originalImageRef.current = img;
        setImageSrc(event.target?.result as string);
        executeCropAndCompress(img, customWidth, customHeight, targetKb);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // 2. Preset selection handler
  const applyPreset = (preset: Preset) => {
    setSelectedPreset(preset);
    setCustomWidth(preset.width);
    setCustomHeight(preset.height);
    setTargetKb(preset.maxKb);

    if (originalImageRef.current) {
      executeCropAndCompress(originalImageRef.current, preset.width, preset.height, preset.maxKb);
    }
  };

  // 3. Exact aspect ratio cropping and binary compression engine
  const executeCropAndCompress = (
    img: HTMLImageElement,
    targetW: number,
    targetH: number,
    limitKb: number
  ) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = targetW;
    canvas.height = targetH;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Center-crop logic preserving aspect ratio
    const srcRatio = img.width / img.height;
    const targetRatio = targetW / targetH;

    let sx = 0,
      sy = 0,
      sWidth = img.width,
      sHeight = img.height;

    if (srcRatio > targetRatio) {
      sWidth = img.height * targetRatio;
      sx = (img.width - sWidth) / 2;
    } else {
      sHeight = img.width / targetRatio;
      sy = (img.height - sHeight) / 2;
    }

    ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, targetW, targetH);

    // Binary search loop to hit exact byte size limits
    let minQuality = 0.05;
    let maxQuality = 0.95;
    let optimalQuality = 0.85;
    let finalDataUrl = canvas.toDataURL('image/jpeg', optimalQuality);

    for (let i = 0; i < 6; i++) {
      const estimatedKb = Math.round((finalDataUrl.length * (3 / 4)) / 1024);
      if (estimatedKb > limitKb) {
        maxQuality = optimalQuality;
      } else {
        minQuality = optimalQuality;
      }
      optimalQuality = (minQuality + maxQuality) / 2;
      finalDataUrl = canvas.toDataURL('image/jpeg', optimalQuality);
    }

    const finalSizeKb = Math.round((finalDataUrl.length * (3 / 4)) / 1024);

    setProcessedUrl(finalDataUrl);
    setOutputMeta({
      width: targetW,
      height: targetH,
      kb: finalSizeKb,
    });
  };

  const handleCustomDimensionChange = (w: number, h: number, kb: number) => {
    setCustomWidth(w);
    setCustomHeight(h);
    setTargetKb(kb);
    if (originalImageRef.current) {
      executeCropAndCompress(originalImageRef.current, w, h, kb);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-8 flex flex-col items-center">
      {/* Navigation Bar */}
      <div className="w-full flex items-center justify-between mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-black bg-white text-xs font-black uppercase tracking-wider hard-shadow hover:bg-black hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </Link>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-black bg-white text-[11px] font-black uppercase tracking-wider hard-shadow">
          <Maximize2 className="w-3.5 h-3.5 text-black" /> Exact Pixel Lock
        </div>
      </div>

      {/* Header */}
      <div className="text-center w-full max-w-2xl mb-6">
        <h1 className="text-2xl sm:text-4xl font-black text-black tracking-tight uppercase mb-2">
          Dimension <span className="bg-black text-white px-2 py-0.5">& Aspect Crop</span>
        </h1>
        <p className="text-xs sm:text-sm font-semibold text-black border-l-3 border-black pl-3 text-left">
          Lock photos to exact portal dimensions (e.g. 200x230 px) and enforce target KB size with zero distortion.
        </p>
      </div>

      {/* Main Workspace */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Upload & Output Preview */}
        <div className="border-3 border-black bg-white p-4 hard-shadow flex flex-col items-center justify-center min-h-[280px] relative">
          {!imageSrc ? (
            <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-black p-6 hover:bg-gray-50 transition-colors">
              <Upload className="w-8 h-8 mb-2 text-black" />
              <span className="text-xs font-black uppercase tracking-wider text-center">
                Upload Target Image
              </span>
              <span className="text-[10px] text-gray-600 mt-1 font-bold">JPG, PNG, WEBP Supported</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          ) : (
            <div className="w-full flex flex-col items-center">
              <div className="border-2 border-black bg-white p-2 flex items-center justify-center mb-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={processedUrl || imageSrc}
                  alt="Processed Output"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '180px',
                    width: `${outputMeta?.width ? Math.min(outputMeta.width, 200) : 180}px`,
                    height: 'auto',
                  }}
                  className="object-contain border border-black"
                />
              </div>

              {outputMeta && (
                <div className="w-full bg-black text-white p-2 text-[11px] font-black uppercase flex items-center justify-around mb-2">
                  <span>Dimension: {outputMeta.width} × {outputMeta.height} px</span>
                  <span>Size: {outputMeta.kb} KB</span>
                </div>
              )}

              <label className="cursor-pointer text-[11px] font-black uppercase underline text-gray-700 hover:text-black">
                Change Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>

        {/* Controls & Presets */}
        <div className="border-3 border-black bg-white p-4 hard-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b-2 border-black pb-2 mb-3">
              <Crop className="w-4 h-4 text-black" />
              <span className="text-xs font-black uppercase tracking-wider">Exam & Govt Portal Presets</span>
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {PRESETS.map((p) => {
                const isActive = selectedPreset.label === p.label;
                return (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => applyPreset(p)}
                    className={`p-2 border-2 border-black text-left text-[11px] font-black uppercase hard-shadow transition-colors ${
                      isActive ? 'bg-black text-white' : 'bg-white hover:bg-gray-100 text-black'
                    }`}
                  >
                    <div>{p.label}</div>
                    <div className={`text-[9px] ${isActive ? 'text-gray-300' : 'text-gray-600'}`}>
                      {p.width}x{p.height}px • &lt;{p.maxKb}KB
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Custom Inputs */}
            <div className="border-2 border-black p-2.5 bg-gray-50 mb-3">
              <span className="text-[10px] font-black uppercase tracking-wider block mb-2 text-gray-700">
                Custom Dimension & Byte Target:
              </span>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[9px] font-black uppercase block">Width (px)</label>
                  <input
                    type="number"
                    value={customWidth}
                    onChange={(e) =>
                      handleCustomDimensionChange(Number(e.target.value), customHeight, targetKb)
                    }
                    className="w-full text-xs font-bold border-2 border-black p-1 bg-white"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase block">Height (px)</label>
                  <input
                    type="number"
                    value={customHeight}
                    onChange={(e) =>
                      handleCustomDimensionChange(customWidth, Number(e.target.value), targetKb)
                    }
                    className="w-full text-xs font-bold border-2 border-black p-1 bg-white"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase block">Max KB</label>
                  <input
                    type="number"
                    value={targetKb}
                    onChange={(e) =>
                      handleCustomDimensionChange(customWidth, customHeight, Number(e.target.value))
                    }
                    className="w-full text-xs font-bold border-2 border-black p-1 bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Download Button */}
          {processedUrl && (
            <a
              href={processedUrl}
              download={`fixed_${customWidth}x${customHeight}_${outputMeta?.kb}kb.jpg`}
              className="w-full min-h-[40px] border-2 border-black bg-black text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 hard-shadow hover:bg-white hover:text-black transition-colors mt-2"
            >
              <Download className="w-4 h-4" /> Download Exact Spec Image
            </a>
          )}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="w-full border-2 border-black bg-white p-3 flex items-center justify-between text-[11px] font-bold uppercase hard-shadow">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-black" /> Center-Cropped (Aspect Preserved)
        </span>
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-black" /> 100% In-Browser Memory
        </span>
      </div>
    </div>
  );
}