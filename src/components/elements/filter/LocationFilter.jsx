'use client';

import * as React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cities } from '@/data/cities';

export default function LocationFilter({ location, setLocation }) {
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
          <LocationSelect location={location} setLocation={setLocation} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function LocationSelect({ location, setLocation }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full py-6 justify-between border-gray-300"
        >
          {location
            ? cities.find((city) => city.text.toLowerCase() === location)?.text
            : 'Pilih Kota...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Cari Kota..." />
          <CommandEmpty>Kota tidak ditemukan.</CommandEmpty>
          <CommandGroup className="max-h-96 overflow-y-auto">
            {cities.map((city) => (
              <CommandItem
                key={city.id}
                value={city.text}
                onSelect={(currentValue) => {
                  setLocation(currentValue === location ? '' : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    location === city.text ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {city.text}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
