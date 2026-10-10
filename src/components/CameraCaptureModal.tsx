import React, { useEffect, useRef, useState } from 'react';
import { Camera, RefreshCw, X, AlertCircle, Check, Sparkles } from 'lucide-react';

interface CameraCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (dataUrl: string, source: 'kamera') => void;
}

export const CameraCaptureModal: React.FC<CameraCaptureModalProps> = ({
  isOpen,
  onClose,
  onCapture,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [capturedPreview, setCapturedPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (isOpen && !capturedPreview) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen, facingMode, capturedPreview]);

  const startCamera = async () => {
    stopCamera();
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Kamera tidak disokong pada pelayar ini.');
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
      }
      setCameraActive(true);
    } catch (err: any) {
      console.warn('Camera access error:', err);
      setCameraActive(false);
      setCameraError(
        'Kamera langsung tidak dapat diakses atau kebenaran belum diberikan. Anda juga boleh guna butang "Buka Kamera Peranti" di bawah.'
      );
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setCameraActive(false);
  };

  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  const takeSnapshot = () => {
    if (!videoRef.current || !canvasRef.current) return;
    setIsProcessing(true);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      setCapturedPreview(dataUrl);
      stopCamera();
    }
    setIsProcessing(false);
  };

  const handleRetake = () => {
    setCapturedPreview(null);
    startCamera();
  };

  const handleConfirm = () => {
    if (capturedPreview) {
      onCapture(capturedPreview, 'kamera');
      setCapturedPreview(null);
      stopCamera();
      onClose();
    }
  };

  const handleFallbackFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setCapturedPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between text-white select-none">
      {/* Hidden file input for devices with native camera capture */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFallbackFileChange}
      />
      <canvas ref={canvasRef} className="hidden" />

      {/* Top Header */}
      <div className="p-4 flex items-center justify-between z-10 bg-black/40 backdrop-blur-sm">
        <button
          onClick={() => {
            stopCamera();
            setCapturedPreview(null);
            onClose();
          }}
          className="p-2 rounded-full hover:bg-white/10 active:scale-95 transition-all text-white"
          aria-label="Tutup Kamera"
        >
          <X className="w-6 h-6" />
        </button>

        <span className="text-sm font-medium tracking-wide text-white/90">
          {capturedPreview ? 'Semak Gambar Resit' : 'Kamera Resit Claim WhatsApp'}
        </span>

        {!capturedPreview && cameraActive && (
          <button
            onClick={toggleFacingMode}
            className="p-2 rounded-full hover:bg-white/10 active:scale-95 transition-all text-white"
            title="Tukar Kamera Depan/Belakang"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        )}
        {(capturedPreview || !cameraActive) && <div className="w-9" />}
      </div>

      {/* Viewport Content */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden bg-[#0b141a]">
        {capturedPreview ? (
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <img
              src={capturedPreview}
              alt="Pratonton Resit"
              className="max-h-full max-w-full object-contain rounded-lg shadow-2xl border border-white/10"
            />
            <div className="absolute top-6 left-6 right-6 flex items-center justify-center">
              <span className="bg-emerald-600/90 text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-md backdrop-blur-sm flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Gambar resit berjaya diambil
              </span>
            </div>
          </div>
        ) : cameraActive ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover md:object-contain"
            />
            {/* Viewfinder crosshairs for receipt framing */}
            <div className="absolute inset-8 md:inset-16 border-2 border-dashed border-white/50 rounded-2xl pointer-events-none flex flex-col justify-between p-4">
              <div className="flex justify-between">
                <div className="w-6 h-6 border-t-4 border-l-4 border-emerald-400 rounded-tl"></div>
                <div className="w-6 h-6 border-t-4 border-r-4 border-emerald-400 rounded-tr"></div>
              </div>
              <p className="text-center text-xs font-medium text-white/80 bg-black/60 py-1.5 px-3 rounded-full self-center backdrop-blur-sm">
                Sejajarkan resit minyak / tol / parking di dalam petak
              </p>
              <div className="flex justify-between">
                <div className="w-6 h-6 border-b-4 border-l-4 border-emerald-400 rounded-bl"></div>
                <div className="w-6 h-6 border-b-4 border-r-4 border-emerald-400 rounded-br"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center max-w-sm mx-auto flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Camera className="w-8 h-8" />
            </div>
            {cameraError ? (
              <div className="bg-red-500/10 border border-red-500/20 text-red-200 text-xs p-3 rounded-lg text-left flex gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                <span>{cameraError}</span>
              </div>
            ) : (
              <p className="text-white/80 text-sm">Menyambung ke kamera peranti...</p>
            )}

            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-3 px-4 bg-[#00a884] hover:bg-[#008f6f] active:scale-98 text-[#111b21] font-semibold rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-lg"
            >
              <Camera className="w-4 h-4" /> Buka Kamera Telefon
            </button>
            <button
              onClick={startCamera}
              className="text-xs text-white/60 hover:text-white underline"
            >
              Cuba Sambung Semula Kamera Live
            </button>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="p-6 bg-black/50 backdrop-blur-md flex items-center justify-around z-10">
        {capturedPreview ? (
          <div className="flex items-center justify-center gap-6 w-full max-w-xs mx-auto">
            <button
              onClick={handleRetake}
              className="flex-1 py-3 px-4 bg-white/10 hover:bg-white/20 active:scale-95 text-white font-medium rounded-full text-sm transition-all"
            >
              Ambil Semula
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 py-3 px-4 bg-[#25d366] hover:bg-[#20ba59] active:scale-95 text-[#111b21] font-bold rounded-full text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <Check className="w-4 h-4 stroke-[3]" /> Guna Foto
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-8 w-full">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-white/70 hover:text-white text-xs flex flex-col items-center gap-1 active:scale-95 transition-all"
            >
              <div className="p-2.5 rounded-full bg-white/10">
                <Camera className="w-5 h-5" />
              </div>
              <span>Native</span>
            </button>

            {/* Big Shutter button */}
            <button
              onClick={takeSnapshot}
              disabled={!cameraActive || isProcessing}
              className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center p-1.5 active:scale-90 transition-transform disabled:opacity-40"
              aria-label="Ambil Gambar Resit"
            >
              <div className="w-full h-full rounded-full bg-white active:bg-emerald-400 transition-colors shadow-inner" />
            </button>

            <div className="w-12" />
          </div>
        )}
      </div>
    </div>
  );
};
