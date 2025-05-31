import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const SideNusaInfo = () => {
  return (
    <div className="w-96 bg-gray-50 p-6">
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="nusa-info"
      >
        <AccordionItem value="isi-form">
          <AccordionTrigger>Isi Form Otomatis</AccordionTrigger>
          <AccordionContent>
            <p>Fitur pengisian otomatis dengan AI (mock content).</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="nusa-info">
          <AccordionTrigger>NusaInfo</AccordionTrigger>
          <AccordionContent>
            <p>Info tambahan terkait form atau produk (mock content).</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SideNusaInfo;
