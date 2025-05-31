import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
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
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  facilityName: z.string().min(2),
  facilityType: z.enum([
    'Rumah Sakit Umum',
    'Rumah Sakit Khusus',
    'Puskesmas',
    'Klinik',
  ]),
  facilityClass: z.enum(['Tipe A', 'Tipe B', 'Tipe C', 'Tipe D']),
  minCapacity: z.coerce.number().min(0),
  maxCapacity: z.coerce.number().min(0),
  services: z.array(z.string()).optional(),
});

type FormSchema = z.infer<typeof formSchema>;

const serviceOptions = [
  'IGD 24 Jam',
  'Radiologi Canggih',
  'Hemodialisa',
  'NICU',
  'Lainnya',
];

const InformasiUmum = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      facilityName: '',
      facilityType: 'Rumah Sakit Umum',
      facilityClass: 'Tipe A',
      minCapacity: 100,
      maxCapacity: 200,
      services: [],
    },
  });

  const onSubmit = (data: FormSchema) => {
    console.log(data);
  };

  return (
    <div className="flex bg-white rounded-lg shadow-sm">
      <div className="flex-1 p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Informasi Umum
              </h2>

              <FormField
                control={form.control}
                name="facilityName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Faskes</FormLabel>
                    <FormControl>
                      <Input placeholder="RS Daerah Jawa Tenggara" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4 mt-4">
                <FormField
                  control={form.control}
                  name="facilityType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipe Faskes</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih tipe" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Rumah Sakit Umum">
                            Rumah Sakit Umum
                          </SelectItem>
                          <SelectItem value="Rumah Sakit Khusus">
                            Rumah Sakit Khusus
                          </SelectItem>
                          <SelectItem value="Puskesmas">Puskesmas</SelectItem>
                          <SelectItem value="Klinik">Klinik</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="facilityClass"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kelas Faskes</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih kelas" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Tipe A">Tipe A</SelectItem>
                          <SelectItem value="Tipe B">Tipe B</SelectItem>
                          <SelectItem value="Tipe C">Tipe C</SelectItem>
                          <SelectItem value="Tipe D">Tipe D</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <FormField
                  control={form.control}
                  name="minCapacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kapasitas Kamar Minimum</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="maxCapacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kapasitas Kamar Maksimum</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="services"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mt-4 block">
                      Layanan Unggulan/Spesialisasi (opsional)
                    </FormLabel>
                    <div className="grid grid-cols-2 gap-2">
                      {serviceOptions.map((service) => (
                        <FormItem
                          key={service}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(service)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([
                                      ...(field.value || []),
                                      service,
                                    ])
                                  : field.onChange(
                                      field.value?.filter((s) => s !== service)
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {service}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit">Selanjutnya</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default InformasiUmum;
