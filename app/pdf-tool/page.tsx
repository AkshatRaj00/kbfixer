'use client';

import { useState, useRef, ChangeEvent, useEffect } from 'react';
import Link from 'next/link';
import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import {
  ArrowLeft,
  Upload,
  Download,
  FileText,
  Layers,
  Scissors,
  Trash2,
  ShieldCheck,
  Zap,
  CheckCircle2,
  AlertCircle,
  Eye,
  XCircle,
} from 'lucide-react';

interface PdfPagePreview {
  pageNumber: number; // 1-indexed
  thumbnailUrl: string;
  selected: boolean;
}

interface MergeFileItem {
  id: string;
  file: File;
  name: string;
  sizeKb: number;
  thumbnailUrl: string;
  pageCount: number;
}

export default function PdfInteractiveTool() {
  const [mode, setMode] = useState<'split' | 'merge'>('split');
  
  // Merge state
  const [mergeFiles, setMergeFiles] = useState<MergeFileItem[]>([]);
  
  // Split / Visual Page Organiser state
  const [splitFile, setSplitFile] = useState<File | null>(null);
  const [splitFileName, setSplitFileName] = useState<string>('');
  const [pages, setPages] = useState<PdfPagePreview[]>([]);
  const [loadingPages, setLoadingPages] = useState<boolean>(false);

  // Global processing & status
  const [processing, setProcessing] = useState<boolean>(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [outputMeta, setOutputMeta] = useState<{ name: string; sizeKb: number } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Setup PDF.js worker
  useEffect(() => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
  }, []);

  // Helper to render a PDF page to Canvas and generate Data URL
  const renderThumbnail = async (page: any, scale: number = 0.35): Promise<string> => {
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    if (ctx) {
      await page.render({ canvasContext: ctx, viewport }).promise;
      return canvas.toDataURL('image/jpeg', 0.8);
    }
    return '';
  };

  // 1. Upload for Split / Page Extraction (Visual Page Grid)
  const handleSplitUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    setLoadingPages(true);
    setPages([]);
    setDownloadUrl(null);
    setSplitFile(file);
    setSplitFileName(file.name);

    try {
      const buffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(buffer) });
      const pdf = await loadingTask.promise;

      const loadedPages: PdfPagePreview[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const thumb = await renderThumbnail(page, 0.4);
        loadedPages.push({
          pageNumber: i,
          thumbnailUrl: thumb,
          selected: true, // Selected by default (keep)
        });
      }

      setPages(loadedPages);
    } catch (err: any) {
      setErrorMsg('Failed to parse PDF document. It might be password-protected or corrupted.');
    } finally {
      setLoadingPages(false);
    }
  };

  // Toggle single page inclusion in Split mode
  const togglePageSelection = (pageNumber: number) => {
    setPages((prev) =>
      prev.map((p) =>
        p.pageNumber === pageNumber ? { ...p, selected: !p.selected } : p
      )
    );
    setDownloadUrl(null);
  };

  // Select all or deselect all pages
  const setAllPagesSelection = (select: boolean) => {
    setPages((prev) => prev.map((p) => ({ ...p, selected: select })));
    setDownloadUrl(null);
  };

  // 2. Upload for Merge (Visual File Cards)
  const handleMergeUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setErrorMsg(null);
    const newItems: MergeFileItem[] = [];

    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      if (f.type !== 'application/pdf' && !f.name.endsWith('.pdf')) continue;

      try {
        const buffer = await f.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(buffer) });
        const pdf = await loadingTask.promise;
        const firstPage = await pdf.getPage(1);
        const thumb = await renderThumbnail(firstPage, 0.35);

        newItems.push({
          id: `${f.name}-${Date.now()}-${i}`,
          file: f,
          name: f.name,
          sizeKb: Math.round(f.size / 1024),
          thumbnailUrl: thumb,
          pageCount: pdf.numPages,
        });
      } catch (err) {
        console.error('PDF Thumbnail Error:', err);
      }
    }

    setMergeFiles((prev) => [...prev, ...newItems]);
    setDownloadUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Remove file from merge list
  const removeMergeFile = (id: string) => {
    setMergeFiles((prev) => prev.filter((f) => f.id !== id));
    setDownloadUrl(null);
  };

  // 3. Execute Split & Extraction using pdf-lib
  const executeSplitExtraction = async () => {
    if (!splitFile) return;

    const selectedPages = pages.filter((p) => p.selected);
    if (selectedPages.length === 0) {
      setErrorMsg('Please keep at least one page selected.');
      return;
    }

    setProcessing(true);
    setErrorMsg(null);

    try {
      const buffer = await splitFile.arrayBuffer();
      const srcDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const newPdf = await PDFDocument.create();

      const pageIndices = selectedPages.map((p) => p.pageNumber - 1);
      const copiedPages = await newPdf.copyPages(srcDoc, pageIndices);
      copiedPages.forEach((p) => newPdf.addPage(p));

      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      setDownloadUrl(url);
      setOutputMeta({
        name: `extracted_${selectedPages.length}_pages.pdf`,
        sizeKb: Math.round(blob.size / 1024),
      });
    } catch (err: any) {
      setErrorMsg('Failed to extract selected pages.');
    } finally {
      setProcessing(false);
    }
  };

  // 4. Execute Merge using pdf-lib
  const executeMerge = async () => {
    if (mergeFiles.length < 2) {
      setErrorMsg('Please upload at least 2 PDF files to merge.');
      return;
    }

    setProcessing(true);
    setErrorMsg(null);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const item of mergeFiles) {
        const buffer = await item.file.arrayBuffer();
        const srcDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
        const copiedPages = await mergedPdf.copyPages(srcDoc, srcDoc.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedBytes = await mergedPdf.save();
      const blob = new Blob([mergedBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      setDownloadUrl(url);
      setOutputMeta({
        name: 'merged_document.pdf',
        sizeKb: Math.round(blob.size / 1024),
      });
    } catch (err) {
      setErrorMsg('Merge failed. One or more files are invalid or corrupted.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 sm:py-8 flex flex-col items-center">
      {/* Top Bar */}
      <div className="w-full flex items-center justify-between mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-black bg-white text-xs font-black uppercase tracking-wider hard-shadow hover:bg-black hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </Link>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-black bg-white text-[11px] font-black uppercase tracking-wider hard-shadow">
          <Eye className="w-3.5 h-3.5 text-black" /> Visual Page Inspector
        </div>
      </div>

      {/* Header */}
      <div className="text-center w-full max-w-2xl mb-6">
        <h1 className="text-2xl sm:text-4xl font-black text-black tracking-tight uppercase mb-2">
          PDF <span className="bg-black text-white px-2 py-0.5">Visual Engine</span>
        </h1>
        <p className="text-xs sm:text-sm font-semibold text-black border-l-3 border-black pl-3 text-left">
          Preview every single page, delete unwanted sheets with one click, and merge or extract directly in your browser.
        </p>
      </div>

      {/* Mode Selector */}
      <div className="flex gap-2 mb-6 w-full max-w-md">
        <button
          type="button"
          onClick={() => {
            setMode('split');
            setDownloadUrl(null);
            setErrorMsg(null);
          }}
          className={`flex-1 min-h-[40px] flex items-center justify-center gap-2 border-3 border-black text-xs font-black uppercase tracking-wider hard-shadow transition-colors ${
            mode === 'split' ? 'bg-black text-white' : 'bg-white hover:bg-gray-100 text-black'
          }`}
        >
          <Scissors className="w-4 h-4" /> Visual Page Remover
        </button>
        <button
          type="button"
          onClick={() => {
            setMode('merge');
            setDownloadUrl(null);
            setErrorMsg(null);
          }}
          className={`flex-1 min-h-[40px] flex items-center justify-center gap-2 border-3 border-black text-xs font-black uppercase tracking-wider hard-shadow transition-colors ${
            mode === 'merge' ? 'bg-black text-white' : 'bg-white hover:bg-gray-100 text-black'
          }`}
        >
          <Layers className="w-4 h-4" /> Visual Merge
        </button>
      </div>

      {/* Workspace */}
      <div className="w-full border-3 border-black bg-white p-4 sm:p-6 hard-shadow mb-6">
        {mode === 'split' ? (
          /* VISUAL SPLIT / REMOVE PAGES */
          <div>
            {!splitFile ? (
              <label className="w-full flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-black p-8 hover:bg-gray-50 transition-colors">
                <Upload className="w-8 h-8 mb-2 text-black" />
                <span className="text-xs font-black uppercase tracking-wider">
                  Upload PDF to Inspect & Remove Pages
                </span>
                <span className="text-[10px] text-gray-600 mt-1 font-bold">
                  All pages will be rendered as visual thumbnails
                </span>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleSplitUpload}
                  className="hidden"
                />
              </label>
            ) : (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b-2 border-black gap-2 mb-4">
                  <div>
                    <div className="text-xs font-black uppercase truncate max-w-sm">{splitFileName}</div>
                    <div className="text-[10px] font-bold text-gray-600">
                      Total: {pages.length} Pages • Selected to keep: {pages.filter((p) => p.selected).length}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setAllPagesSelection(true)}
                      className="px-2 py-1 text-[10px] font-black uppercase border-2 border-black bg-white hover:bg-gray-100"
                    >
                      Select All
                    </button>
                    <button
                      type="button"
                      onClick={() => setAllPagesSelection(false)}
                      className="px-2 py-1 text-[10px] font-black uppercase border-2 border-black bg-white hover:bg-gray-100"
                    >
                      Clear All
                    </button>
                    <label className="cursor-pointer px-2.5 py-1 text-[10px] font-black uppercase border-2 border-black bg-black text-white hover:bg-white hover:text-black transition-colors">
                      Change File
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleSplitUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {loadingPages ? (
                  <div className="py-12 flex flex-col items-center justify-center">
                    <div className="w-6 h-6 border-3 border-black border-t-transparent animate-spin rounded-full mb-2" />
                    <span className="text-xs font-black uppercase tracking-wider">
                      Rendering Visual Thumbnails in RAM...
                    </span>
                  </div>
                ) : (
                  <div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 max-h-[460px] overflow-y-auto p-1 mb-4">
                      {pages.map((p) => (
                        <div
                          key={p.pageNumber}
                          onClick={() => togglePageSelection(p.pageNumber)}
                          className={`relative border-2 border-black p-2 cursor-pointer transition-all flex flex-col items-center justify-between ${
                            p.selected
                              ? 'bg-white hard-shadow ring-2 ring-black'
                              : 'bg-gray-200 opacity-50 grayscale'
                          }`}
                        >
                          <div className="absolute top-1.5 right-1.5 z-10">
                            {p.selected ? (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  togglePageSelection(p.pageNumber);
                                }}
                                className="w-5 h-5 bg-red-600 text-white flex items-center justify-center border border-black hover:scale-110 transition-transform"
                                title="Click to remove this page"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  togglePageSelection(p.pageNumber);
                                }}
                                className="w-5 h-5 bg-black text-white flex items-center justify-center border border-black"
                                title="Click to keep this page"
                              >
                                +
                              </button>
                            )}
                          </div>

                          <div className="w-full h-[150px] flex items-center justify-center overflow-hidden bg-white border border-gray-300 mb-2">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={p.thumbnailUrl}
                              alt={`Page ${p.pageNumber}`}
                              className="w-full h-full object-contain"
                            />
                          </div>

                          <div className="w-full flex items-center justify-between text-[10px] font-black uppercase px-1">
                            <span>Page {p.pageNumber}</span>
                            <span className={p.selected ? 'text-green-700' : 'text-red-600 font-bold'}>
                              {p.selected ? 'Keep' : 'Removed'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      disabled={processing || pages.filter((p) => p.selected).length === 0}
                      onClick={executeSplitExtraction}
                      className="w-full min-h-[42px] border-2 border-black bg-black text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 hard-shadow hover:bg-white hover:text-black transition-colors"
                    >
                      {processing ? 'Processing Document...' : `Export PDF (${pages.filter((p) => p.selected).length} Pages)`}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* VISUAL MERGE */
          <div>
            <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-4">
              <span className="text-xs font-black uppercase tracking-wider">
                Files Queue ({mergeFiles.length})
              </span>
              <label className="cursor-pointer px-3 py-1.5 border-2 border-black bg-black text-white text-[11px] font-black uppercase tracking-wider hard-shadow hover:bg-white hover:text-black transition-colors flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5" /> Add More PDFs
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf"
                  multiple
                  onChange={handleMergeUpload}
                  className="hidden"
                />
              </label>
            </div>

            {mergeFiles.length === 0 ? (
              <label className="w-full flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-black p-8 hover:bg-gray-50 transition-colors">
                <Upload className="w-8 h-8 mb-2 text-black" />
                <span className="text-xs font-black uppercase tracking-wider">
                  Upload PDFs to Preview & Merge
                </span>
                <span className="text-[10px] text-gray-600 mt-1 font-bold">
                  Preview first page thumbnails before merging
                </span>
                <input
                  type="file"
                  accept="application/pdf"
                  multiple
                  onChange={handleMergeUpload}
                  className="hidden"
                />
              </label>
            ) : (
              <div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 max-h-[380px] overflow-y-auto p-1 mb-4">
                  {mergeFiles.map((item, idx) => (
                    <div
                      key={item.id}
                      className="relative border-2 border-black p-2 bg-white hard-shadow flex flex-col items-center justify-between"
                    >
                      <button
                        type="button"
                        onClick={() => removeMergeFile(item.id)}
                        className="absolute top-1.5 right-1.5 w-5 h-5 bg-red-600 text-white flex items-center justify-center border border-black hover:scale-110 transition-transform z-10"
                        title="Remove from merge"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>

                      <div className="w-full h-[130px] flex items-center justify-center bg-gray-50 border border-gray-300 mb-2 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.thumbnailUrl}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="w-full text-left">
                        <div className="text-[10px] font-black uppercase truncate">{item.name}</div>
                        <div className="text-[9px] font-bold text-gray-600">
                          #{idx + 1} • {item.pageCount} Pgs • {item.sizeKb} KB
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {mergeFiles.length >= 2 && (
                  <button
                    type="button"
                    disabled={processing}
                    onClick={executeMerge}
                    className="w-full min-h-[42px] border-2 border-black bg-black text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 hard-shadow hover:bg-white hover:text-black transition-colors"
                  >
                    {processing ? 'Merging in RAM...' : `Merge All ${mergeFiles.length} PDFs into One`}
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Error Alert */}
        {errorMsg && (
          <div className="mt-3 p-2.5 border-2 border-black bg-red-100 flex items-center gap-2 text-red-900 text-xs font-bold">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-700" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Output & Download Section */}
        {downloadUrl && outputMeta && (
          <div className="mt-4 p-3 border-2 border-black bg-green-50 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-black shrink-0" />
              <div>
                <div className="text-xs font-black uppercase">{outputMeta.name}</div>
                <div className="text-[10px] font-bold text-gray-600">
                  Ready • {outputMeta.sizeKb} KB
                </div>
              </div>
            </div>
            <a
              href={downloadUrl}
              download={outputMeta.name}
              className="w-full sm:w-auto px-4 py-2 border-2 border-black bg-black text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 hard-shadow hover:bg-white hover:text-black transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Download PDF
            </a>
          </div>
        )}
      </div>

      {/* Trust Badges */}
      <div className="w-full border-2 border-black bg-white p-3 flex items-center justify-between text-[11px] font-bold uppercase hard-shadow">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-black" /> 100% In-Browser Rendering & Manipulation
        </span>
        <span className="flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-black" /> Instant Zero-Upload Pipeline
        </span>
      </div>
    </div>
  );
}