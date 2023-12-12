import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { LuEye } from 'react-icons/lu';

export default function ProductDescriptionModal({ description }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="text-[11px] p-0 flex gap-1 items-center">
          <LuEye />
          <span>Lihat Deskripsi</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="z-[99999]">
        <AlertDialogHeader>
          <AlertDialogTitle>Deskripsi Produk</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Tutup</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
