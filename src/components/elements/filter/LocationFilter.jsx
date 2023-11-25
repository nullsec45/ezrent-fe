import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import SelectMenu from '../input/SelectMenu';

export default function LocationFilter() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1" className="">
        <AccordionTrigger className="hover:no-underline">
          Lokasi
        </AccordionTrigger>
        <AccordionContent>
          <SelectMenu placeholder="Pilih Lokasi" fullWidth />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
