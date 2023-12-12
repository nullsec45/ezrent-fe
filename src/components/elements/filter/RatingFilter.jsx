import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { IoStar } from 'react-icons/io5';
import { IoStarOutline } from 'react-icons/io5';

export default function RatingFilter() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1" className="">
        <AccordionTrigger className="hover:no-underline">
          Rating
        </AccordionTrigger>
        <AccordionContent className="flex gap-8 lg:gap-2 justify-between items-center px-1">
          <div className="flex gap-4 lg:gap-1">
            <IoStar className="w-6 h-6 text-yellow-500" />
            <IoStar className="w-6 h-6 text-yellow-500" />
            <IoStar className="w-6 h-6 text-yellow-500" />
            <IoStar className="w-6 h-6 text-yellow-500" />
            <IoStarOutline className="w-6 h-6 text-yellow-500" />
          </div>
          <span className="font-bold text-xl">4.0+</span>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
