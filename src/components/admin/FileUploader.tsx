"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { UploadCloud, Check, AlertCircle, FileText, X } from "lucide-react";

interface FileUploaderProps {
  label?: string;
  value?: string;
  onChange: (url: string) => void;
  accept?: string;
  helperText?: string;
  customName?: string;
}

export default function FileUploader({
  label = "Upload Asset",
  value,
  onChange,
  accept = "image/png, image/jpeg, image/webp, image/svg+xml, application/pdf",
  helperText = "PNG, JPG, WEBP, or PDF up to 10MB",
  customName,
}: FileUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isImage = value && (value.endsWith(".png") || value.endsWith(".jpg") || value.endsWith(".jpeg") || value.endsWith(".webp") || value.endsWith(".svg"));
  const isPdf = value && value.endsWith(".pdf");

  const handleUpload = async (file: File) => {
    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      if (customName) {
        formData.append("customName", customName);
      }

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        onChange(data.url);
      } else {
        setError(data.error || "Upload failed");
      }
    } catch {
      setError("Network error during file upload");
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-xs font-mono uppercase text-[#999999] tracking-wider">
          {label}
        </label>
      )}

      {/* Preview Box if value exists */}
      {value ? (
        <div className="relative rounded-2xl p-3 bg-[#0B0C0E] border border-white/10 flex items-center justify-between gap-4 group">
          <div className="flex items-center gap-3 min-w-0">
            {isImage ? (
              <div className="relative w-16 h-12 rounded-xl overflow-hidden bg-black/50 border border-white/10 shrink-0">
                <Image src={value} alt="Preview" fill className="object-cover" />
              </div>
            ) : isPdf ? (
              <div className="w-12 h-12 rounded-xl bg-[#AA151B]/20 border border-[#AA151B]/30 flex items-center justify-center text-[#F1BF00] shrink-0">
                <FileText className="w-6 h-6" />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white shrink-0">
                <Check className="w-6 h-6 text-emerald-400" />
              </div>
            )}

            <div className="min-w-0">
              <p className="text-xs font-mono text-white truncate">{value}</p>
              <p className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 mt-0.5">
                <Check className="w-3 h-3" /> Live on disk
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-lg text-xs font-mono bg-white/5 hover:bg-[#F1BF00]/15 text-[#CAD5E2] hover:text-[#F1BF00] border border-white/10 transition-colors cursor-pointer"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="p-1.5 rounded-lg text-xs text-[#999999] hover:text-red-400 hover:bg-red-500/10 border border-white/5 transition-colors cursor-pointer"
              title="Remove file"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Dropzone Upload Trigger */
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative rounded-2xl border-2 border-dashed p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 ${
            dragActive
              ? "border-[#F1BF00] bg-[#F1BF00]/10"
              : "border-white/10 bg-[#0B0C0E]/60 hover:border-[#F1BF00]/50 hover:bg-[#12141A]"
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-[#F1BF00]/10 border border-[#F1BF00]/30 flex items-center justify-center text-[#F1BF00] mb-3">
            <UploadCloud className="w-6 h-6" />
          </div>

          <p className="text-xs font-semibold text-white mb-1">
            {uploading ? (
              <span className="text-[#F1BF00] animate-pulse">Uploading file to server...</span>
            ) : (
              <>
                <span className="text-[#F1BF00]">Click to browse</span> or drag and drop
              </>
            )}
          </p>
          <p className="text-[11px] font-mono text-[#999999]">{helperText}</p>

          {error && (
            <p className="text-xs text-red-400 mt-2 flex items-center gap-1 font-mono">
              <AlertCircle className="w-3.5 h-3.5" /> {error}
            </p>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleUpload(e.target.files[0]);
          }
        }}
        className="hidden"
      />
    </div>
  );
}

