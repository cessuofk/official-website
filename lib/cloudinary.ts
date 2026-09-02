// lib/cloudinary.ts - Helper to use Cloudinary URLs in CMS
// Copy this file to: lib/cloudinary.ts in your repo
// Data file: CESS_cloudinary_urls.json should be at repo root or public/
import mapping from '../CESS_cloudinary_urls.json';

export type CloudinaryImage = {
  local: string;
  public_id: string;
  url: string;
  bytes?: number;
};

const cloudinaryMapping: CloudinaryImage[] = mapping as CloudinaryImage[];

// Get Cloudinary URL by local path (e.g. "images/board/abbas.jpg")
export function getCloudinaryUrl(localPath: string): string {
  const normalized = localPath.replace(/^\//, '').replace(/^public\//, '');
  const found = cloudinaryMapping.find(m => m.local === normalized || m.local.endsWith(normalized));
  return found?.url || `/${normalized}`; // fallback to local
}

// Get all images in a folder (e.g. "images/board")
export function getCloudinaryUrlsByFolder(folder: string): CloudinaryImage[] {
  const normalized = folder.replace(/^\//, '').replace(/^public\//, '');
  return cloudinaryMapping.filter(m => m.local.startsWith(normalized));
}

// Example usage in Next.js component:
// import { getCloudinaryUrl } from '@/lib/cloudinary'
// <Image src={getCloudinaryUrl("images/board/abbas.jpg")} width={400} height={400} alt="Abbas" />
// Or with transformation: add /f_auto,q_auto/ after /upload/
// export function getOptimizedUrl(localPath: string, transform = "f_auto,q_auto,w_600") {
//   const url = getCloudinaryUrl(localPath);
//   return url.replace("/upload/", `/upload/${transform}/`);
// }

export default cloudinaryMapping;
