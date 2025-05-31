'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react'; // Added useEffect
import { Resolver, useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  targetDemografiUtama: z
    .array(z.string())
    .min(1, 'Pilih setidaknya satu target demografi utama')
    .default([]),
  targetPendapatanPasien: z
    .array(z.string())
    .min(1, 'Pilih setidaknya satu target pendapatan pasien')
    .default([]),
});

export type FormSchema = z.infer<typeof formSchema>;

const demografiOptions = [
  'Keluarga dengan anak kecil',
  'Keluarga dengan remaja',
  'Keluarga dengan lansia',
  'Lainnya',
];

const pendapatanOptions = [
  'Rendah (< UMR wilayah)',
  'Menengah (1x - 3x UMR wilayah)',
  'Tinggi (> 3x UMR wilayah)',
];

interface KriteriaDemografiProps {
  initialData?: Partial<FormSchema>;
  onSubmit: (data: FormSchema) => void;
  onPrev: () => void;
}

const KriteriaDemografi: React.FC<KriteriaDemografiProps> = ({ initialData, onSubmit: onParentSubmit, onPrev }) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema) as Resolver<FormSchema>,
    defaultValues: initialData || {
      targetDemografiUtama: [],
      targetPendapatanPasien: [],
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form.reset]);

  const handleActualFormSubmit = (data: FormSchema) => {
    onParentSubmit(data);
  };

  return (
    <div className="flex bg-white rounded-lg shadow-sm">
      <div className="flex-1 px-6 py-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleActualFormSubmit)} className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                Kriteria Demografi & Pasar Target
              </h2>
              <div className="w-full h-[1px] bg-slate-300 mb-6" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <FormField
                  control={form.control}
                  name="targetDemografiUtama"
                  render={({ field }) => (
                    <FormItem>
                      <div className="mb-3">
                        <FormLabel className="text-base font-semibold text-gray-800">
                          Target Demografi Utama
                        </FormLabel>
                      </div>
                      <div className="space-y-2">
                        {demografiOptions.map((item) => (
                          <FormItem
                            key={item}
                            className="flex flex-row items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item)}
                                onCheckedChange={(checked) => {
                                  const currentValues = field.value || [];
                                  if (checked) {
                                    field.onChange([...currentValues, item]);
                                  } else {
                                    field.onChange(
                                      currentValues.filter(
                                        (value: string) => value !== item
                                      )
                                    );
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal text-sm text-gray-700 leading-snug">
                              {item}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </div>
                      <FormMessage className="mt-2" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="targetPendapatanPasien"
                  render={({ field }) => (
                    <FormItem>
                      <div className="mb-3">
                        <FormLabel className="text-base font-semibold text-gray-800">
                          Target Pendapatan Pasien
                        </FormLabel>
                      </div>
                      <div className="space-y-2">
                        {pendapatanOptions.map((item) => (
                          <FormItem
                            key={item}
                            className="flex flex-row items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item)}
                                onCheckedChange={(checked) => {
                                  const currentValues = field.value || [];
                                  if (checked) {
                                    field.onChange([...currentValues, item]);
                                  } else {
                                    field.onChange(
                                      currentValues.filter(
                                        (value: string) => value !== item
                                      )
                                    );
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal text-sm text-gray-700 leading-snug">
                              {item}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </div>
                      <FormMessage className="mt-2" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onPrev}
                className="px-6 py-2 rounded-lg" // Adjusted padding to match "Selanjutnya" better
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
                Kembali
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-[#34A853] to-[#2A75F0] hover:from-[#2F914C] hover:to-[#2565D1] text-white font-semibold py-2 px-6 rounded-lg flex items-center"
              >
                Selanjutnya
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

export default KriteriaDemografi;
