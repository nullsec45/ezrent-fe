import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';

export default function PriceFilter() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1" className="">
        <AccordionTrigger className="hover:no-underline">
          Harga
        </AccordionTrigger>
        <AccordionContent className="flex gap-8 justify-between px-1">
          <div className="space-y-2">
            <span className="text-gray-400">Min</span>
            <Input
              type="number"
              placeholder="Terendah"
              className="max-w-[150px]"
              min="0"
            />
          </div>
          <div className="space-y-2 text-end">
            <span className="text-gray-400">Maks</span>
            <Input placeholder="Tertinggi" className="max-w-[150px]" min="0" />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
