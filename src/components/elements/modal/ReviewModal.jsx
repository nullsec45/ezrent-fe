'use client';

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
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { api } from '@/utils/axios';
import { toast } from '@/components/ui/use-toast';
import { FaStar } from 'react-icons/fa6';
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';

export default function ReviewModal({ order }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSendReview = async () => {
    try {
      for (const product of order.products) {
        await api.post(`/products/${product.productId}/reviews`, {
          rating,
          comment,
        });
      }

      toast({
        title: 'Ulasan Anda berhasil terkirim',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Ulasan Anda gagal terkirim, silahkan coba lagi',
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" className="px-8 py-6">
          Beri Ulasan
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="z-[99999]">
        <AlertDialogHeader>
          <AlertDialogTitle>Beri Ulasan</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex gap-2 mb-3">
              <FaStar
                className={twMerge(
                  'w-7 h-7 cursor-pointer',
                  rating >= 1 && 'text-yellow-500'
                )}
                onClick={() => setRating(1)}
              />
              <FaStar
                className={twMerge(
                  'w-7 h-7 cursor-pointer',
                  rating >= 2 && 'text-yellow-500'
                )}
                onClick={() => setRating(2)}
              />
              <FaStar
                className={twMerge(
                  'w-7 h-7 cursor-pointer',
                  rating >= 3 && 'text-yellow-500'
                )}
                onClick={() => setRating(3)}
              />
              <FaStar
                className={twMerge(
                  'w-7 h-7 cursor-pointer',
                  rating >= 4 && 'text-yellow-500'
                )}
                onClick={() => setRating(4)}
              />
              <FaStar
                className={twMerge(
                  'w-7 h-7 cursor-pointer',
                  rating >= 5 && 'text-yellow-500'
                )}
                onClick={() => setRating(5)}
              />
            </div>
            <div>
              <Textarea
                id="review"
                name="review"
                placeholder="Tuliskan Ulasan Anda disini, Ceritakan pengalaman Anda ketika menggunakan barang yang Anda sewa"
                className="w-full text-black"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={handleSendReview}>
            Kirim Ulasan
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
