'use client';

import React, { useEffect } from 'react'; // Added useEffect
import { Resolver, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { FormData } from '../interface';

const formSchema = z
  .object({
    estimasiAnggaranMinimum: z.coerce
      .number({ invalid_type_error: 'Masukkan angka yang valid' })
      .min(0, 'Anggaran minimum tidak boleh negatif')
      .default(4000000000), // Default from schema
    estimasiAnggaranMaksimum: z.coerce
      .number({ invalid_type_error: 'Masukkan angka yang valid' })
      .min(0, 'Anggaran maksimum tidak boleh negatif')
      .default(12000000000), // Default from schema
    targetWaktuPembangunan: z
      .string()
      .min(1, 'Target waktu pembangunan harus dipilih')
      .default('2 tahun'), // Default from schema
    targetROI: z.coerce
      .number()
      .min(0, 'ROI minimal 0%')
      .max(100, 'ROI maksimal 100%')
      .default(40), // Default from schema
  })
  .refine(
    (data) => data.estimasiAnggaranMaksimum >= data.estimasiAnggaranMinimum,
    {
      message:
        'Anggaran maksimum harus lebih besar atau sama dengan anggaran minimum',
      path: ['estimasiAnggaranMaksimum'],
    }
  );

type FormSchemaType = z.infer<typeof formSchema>;

interface KriteriaKeuanganProps {
  initialData?: Partial<FormSchemaType>;
  onSubmit: (data: FormSchemaType) => void;
  onPrev: () => void;
  allData?: FormData;
}

const constructionTimeOptions = [
  '6 bulan',
  '1 tahun',
  '1.5 tahun',
  '2 tahun',
  '2.5 tahun',
  '3 tahun',
  '> 3 tahun',
];

// Component's own preferred defaults, mirroring Zod schema defaults for clarity
const componentDefaultValues: FormSchemaType = {
  estimasiAnggaranMinimum: 4000000000,
  estimasiAnggaranMaksimum: 12000000000,
  targetWaktuPembangunan: '2 tahun',
  targetROI: 40,
};

const KriteriaKeuangan: React.FC<KriteriaKeuanganProps> = ({
  initialData,
  onSubmit: onParentSubmit,
  onPrev,
  allData, // Accepted, can be used if needed
}) => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema) as Resolver<FormSchemaType>,
    defaultValues: {
      ...componentDefaultValues, // Start with component defaults
      ...(initialData && Object.keys(initialData).length > 0
        ? initialData
        : {}), // Override with initialData if it's not empty
    },
  });

  useEffect(() => {
    // If initialData from props changes (e.g., navigating back to a filled step),
    // reset the form to reflect those parent-provided values.
    // If initialData is empty/undefined, it resets using component defaults.
    form.reset({
      ...componentDefaultValues,
      ...(initialData && Object.keys(initialData).length > 0
        ? initialData
        : {}),
    });
    // You can use allData here if needed, e.g.:
    if (allData) {
      console.log("All form data available in KriteriaKeuangan:", allData);
    }
  }, [initialData, form.reset]); // allData can be added if its change should trigger a reset or other logic

  const handleActualFormSubmit = (data: FormSchemaType) => {
    onParentSubmit(data);
  };

  return (
    <div className="flex bg-white rounded-lg shadow-sm">
      <div className="flex-1 px-6 py-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleActualFormSubmit)}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1.5">
                Kriteria Keuangan & Proyeksi
              </h2>
              <div className="w-full h-[1px] bg-slate-300 mb-6" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FormField
                  control={form.control}
                  name="estimasiAnggaranMinimum"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estimasi Anggaran Minimum</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                            Rp
                          </span>
                          <Input
                            type="number"
                            placeholder="4000000000"
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value === ''
                                  ? undefined
                                  : +e.target.value
                              )
                            }
                            className="pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="estimasiAnggaranMaksimum"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estimasi Anggaran Maksimum</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                            Rp
                          </span>
                          <Input
                            type="number"
                            placeholder="12000000000"
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value === ''
                                  ? undefined
                                  : +e.target.value
                              )
                            }
                            className="pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="targetWaktuPembangunan"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Target Waktu Pembangunan</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value} // Controlled component
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih target waktu" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {constructionTimeOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="targetROI"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target ROI (Return on Investment)</FormLabel>
                    <div className="flex items-center space-x-2 mt-1">
                      <FormControl>
                        <Input
                          type="number"
                          value={field.value === undefined ? '' : field.value} // Handle undefined for controlled input
                          onChange={(e) => {
                            const rawVal = e.target.value;
                            if (rawVal === '') {
                              field.onChange(undefined); // Allow clearing the input
                              return;
                            }
                            let val = parseInt(rawVal, 10);
                            if (isNaN(val)) return; // Or handle differently if needed
                            if (val < 0) val = 0;
                            if (val > 100) val = 100;
                            field.onChange(val);
                          }}
                          placeholder="40"
                          className="w-24 text-center"
                        />
                      </FormControl>
                      <span className="text-gray-700">%</span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-between mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={onPrev}
                className="px-6 py-2 rounded-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
                Kembali
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-[#34A853] to-[#2A75F0] hover:from-[#2F914C] hover:to-[#2565D1] text-white font-semibold py-2 px-6 rounded-lg flex items-center"
              >
                Selesai {/* Changed from "Selanjutnya" as it's the last step */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-5 h-5 ml-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default KriteriaKeuangan;
