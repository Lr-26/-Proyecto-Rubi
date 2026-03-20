import React, { useState } from 'react';
import { storage } from '../firebase/config';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Upload, Loader2, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
    onImageUploaded: (url: string) => void;
    currentImage?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUploaded, currentImage }) => {
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(currentImage || null);
    const [dragActive, setDragActive] = useState(false);

    const handleFile = (file: File) => {
        if (!file) return;

        // Create preview
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        setIsUploading(true);
        const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(p);
            },
            (error) => {
                console.error("Upload error:", error);
                setIsUploading(false);
                alert("Error al subir imagen");
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    onImageUploaded(downloadURL);
                    setIsUploading(false);
                    setProgress(0);
                });
            }
        );
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
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
            handleFile(e.dataTransfer.files[0]);
        }
    };

    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">Imagen del Producto</label>

            <div
                className={`relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-all cursor-pointer bg-gray-50 hover:bg-gray-100 ${dragActive ? 'border-premium-gold bg-yellow-50' : 'border-gray-300'}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleChange}
                    accept="image/*"
                />

                {isUploading ? (
                    <div className="w-full max-w-xs text-center">
                        <Loader2 className="animate-spin h-8 w-8 text-premium-gold mx-auto mb-2" />
                        <p className="text-sm text-gray-500 mb-2">Subiendo... {Math.round(progress)}%</p>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div className="bg-premium-gold h-1.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                ) : preview ? (
                    <div className="relative w-full aspect-square max-h-64 rounded-lg overflow-hidden group">
                        <img src={preview} alt="Preview" className="w-full h-full object-contain" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-white font-medium flex items-center">
                                <Upload size={18} className="mr-2" /> Cambiar Imagen
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="text-center">
                        <div className="bg-white p-3 rounded-full shadow-sm inline-block mb-3">
                            <ImageIcon className="h-6 w-6 text-gray-400" />
                        </div>
                        <p className="text-sm font-medium text-gray-700">Haz clic o arrastra una imagen</p>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG hasta 5MB</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageUpload;
