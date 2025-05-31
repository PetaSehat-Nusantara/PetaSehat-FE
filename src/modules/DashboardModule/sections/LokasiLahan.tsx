'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Autocomplete,
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';
import { MapPin } from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import * as z from 'zod';

// Google Maps libraries to load
const libraries: Array<'places' | 'geometry'> = ['places', 'geometry'];

// Form validation schema
const searchFormSchema = z.object({
  province: z.string().optional(),
  city: z.string().optional(),
  district: z.string().optional(),
  areaPreferences: z.array(z.string()).default([]),
  landPreferences: z.array(z.string()).default([]),
  accessibilityPreferences: z.array(z.string()).default([]),
  environmentalPreferences: z.array(z.string()).default([]),
});

type SearchFormValues = z.infer<typeof searchFormSchema>;

// Property marker interface
interface PropertyMarker {
  id: string;
  position: { lat: number; lng: number };
  title: string;
  type: 'apartment' | 'house' | 'complex';
  price: string;
  size: string;
  description: string;
}

// Sample property data
const sampleProperties: PropertyMarker[] = [
  {
    id: '1',
    position: { lat: -6.1751, lng: 106.865 },
    title: 'Central Jakarta Apartment',
    type: 'apartment',
    price: 'Rp 2.5M/month',
    size: '65 m²',
    description: 'Modern apartment in central business district',
  },
  {
    id: '2',
    position: { lat: -6.2615, lng: 106.7809 },
    title: 'South Jakarta Villa',
    type: 'house',
    price: 'Rp 850M',
    size: '200 m²',
    description: 'Luxury villa with private garden',
  },
  {
    id: '3',
    position: { lat: -6.1389, lng: 106.813 },
    title: 'North Jakarta Complex',
    type: 'complex',
    price: 'Rp 1.2M/month',
    size: '85 m²',
    description: 'Family-friendly residential complex',
  },
  {
    id: '4',
    position: { lat: -6.2297, lng: 106.9758 },
    title: 'East Jakarta Residence',
    type: 'house',
    price: 'Rp 650M',
    size: '150 m²',
    description: 'Cozy family home near schools',
  },
];

// Indonesian location data
const indonesianProvinces = [
  { value: 'jakarta', label: 'DKI Jakarta' },
  { value: 'west-java', label: 'Jawa Barat' },
  { value: 'central-java', label: 'Jawa Tengah' },
  { value: 'east-java', label: 'Jawa Timur' },
  { value: 'banten', label: 'Banten' },
];

const jakartaCities = [
  { value: 'central-jakarta', label: 'Jakarta Pusat' },
  { value: 'south-jakarta', label: 'Jakarta Selatan' },
  { value: 'north-jakarta', label: 'Jakarta Utara' },
  { value: 'west-jakarta', label: 'Jakarta Barat' },
  { value: 'east-jakarta', label: 'Jakarta Timur' },
];

const jakartaDistricts = [
  { value: 'menteng', label: 'Menteng' },
  { value: 'kemang', label: 'Kemang' },
  { value: 'kelapa-gading', label: 'Kelapa Gading' },
  { value: 'kuningan', label: 'Kuningan' },
  { value: 'senayan', label: 'Senayan' },
];

interface LokasiLahanProps {
  initialData?: Partial<SearchFormValues>;
  onSubmit: (data: SearchFormValues) => void;
  onPrev: () => void;
}

const LokasiLahan: React.FC<LokasiLahanProps> = ({
  initialData = {},
  onSubmit,
  onPrev,
}) => {
  const [selectedMarker, setSelectedMarker] = useState<PropertyMarker | null>(
    null
  );
  const [mapCenter, setMapCenter] = useState({ lat: -6.2088, lng: 106.8456 });
  const [mapZoom, setMapZoom] = useState(11);
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema) as Resolver<SearchFormValues>,
    defaultValues: {
      province: '',
      city: '',
      district: '',
      areaPreferences: [],
      landPreferences: [],
      accessibilityPreferences: [],
      environmentalPreferences: [],
    },
  });

  // Map styling to match the design
  const mapStyles = useMemo(
    () => [
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#e8f4f8' }],
      },
      {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [{ color: '#f8f9fa' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#ffffff' }, { weight: 1.2 }],
      },
      {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [{ color: '#ffffff' }, { weight: 1 }],
      },
      {
        featureType: 'road.local',
        elementType: 'geometry',
        stylers: [{ color: '#ffffff' }, { weight: 0.8 }],
      },
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'simplified' }],
      },
      {
        featureType: 'administrative',
        elementType: 'labels.text',
        stylers: [{ color: '#666666' }],
      },
    ],
    []
  );

  // Map options
  const mapOptions = useMemo(
    () => ({
      styles: mapStyles,
      disableDefaultUI: false,
      zoomControl: true,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: true,
      gestureHandling: 'greedy',
    }),
    [mapStyles]
  );

  // Get marker icon based on property type
  const getMarkerIcon = useCallback((type: PropertyMarker['type']) => {
    if (typeof window === 'undefined' || !window.google?.maps) {
      return undefined;
    }
    // Check if Google Maps is loaded
    if (!window.google?.maps) {
      return undefined;
    }

    const colors = {
      apartment: 'FF6B6B',
      house: '4ECDC4',
      complex: '45B7D1',
    };

    return {
      url: `data:image/svg+xml;charset=UTF-8,%3csvg width='32' height='32' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z' fill='%23${colors[type]}'/%3e%3c/svg%3e`,
      scaledSize: new window.google.maps.Size(32, 32),
      anchor: new window.google.maps.Point(16, 32),
    };
  }, []);

  const onLoad = useCallback((map: google.maps.Map) => {
    // Map loaded successfully
  }, []);

  const onAutocompleteLoad = (
    autocompleteInstance: google.maps.places.Autocomplete
  ) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry?.location) {
        const newCenter = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setMapCenter(newCenter);
        setMapZoom(15);
      }
    }
  };

  const handleCheckboxChange = (
    field: keyof Pick<
      SearchFormValues,
      | 'areaPreferences'
      | 'landPreferences'
      | 'accessibilityPreferences'
      | 'environmentalPreferences'
    >,
    value: string,
    checked: boolean
  ) => {
    const currentValues = form.getValues(field) || [];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter((item) => item !== value);
    form.setValue(field, newValues);
  };
  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form.reset]);

  const handleSubmit = (data: SearchFormValues) => {
    onSubmit(data);
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: libraries,
    language: 'id',
  });

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-4 rounded-lg shadow-md bg-[#fff]">
      {/* Header */}
      <div className="flex flex-col justify-center space-x-2 mb-4">
        <h1 className="text-lg text-left font-semibold">Lokasi dan Lahan</h1>
        <div className="h-[1px] mt-4 bg-slate-300 w-full" />
      </div>

      {/* Map Section */}
      <Card className="mb-6 p-0">
        <CardContent className="p-0">
          <div className="relative">
            <div className="h-80 w-full overflow-hidden">
              {isLoaded && (
                <GoogleMap
                  mapContainerStyle={{ width: '100%', height: '100%' }}
                  center={mapCenter}
                  zoom={mapZoom}
                  onLoad={onLoad}
                  options={mapOptions}
                >
                  {/* Property Markers */}
                  {sampleProperties.map((property) => (
                    <Marker
                      key={property.id}
                      position={property.position}
                      title={property.title}
                      icon={getMarkerIcon(property.type)}
                      onClick={() => setSelectedMarker(property)}
                    />
                  ))}

                  {/* Info Window */}
                  {selectedMarker && (
                    <InfoWindow
                      position={selectedMarker.position}
                      onCloseClick={() => setSelectedMarker(null)}
                    >
                      <div className="p-3 max-w-xs">
                        <h3 className="font-semibold mb-2 flex items-center">
                          <MapPin className="w-4 h-4 mr-1 text-blue-500" />
                          {selectedMarker.title}
                        </h3>
                        <div className="space-y-1 text-sm">
                          <p>
                            <span className="font-medium">Price:</span>{' '}
                            {selectedMarker.price}
                          </p>
                          <p>
                            <span className="font-medium">Size:</span>{' '}
                            {selectedMarker.size}
                          </p>
                          <p>
                            <span className="font-medium">Type:</span>{' '}
                            {selectedMarker.type}
                          </p>
                          <p className="text-gray-600">
                            {selectedMarker.description}
                          </p>
                        </div>
                      </div>
                    </InfoWindow>
                  )}
                </GoogleMap>
              )}
            </div>

            {/* Map Controls Overlay */}
            <div className="absolute top-2 left-2 space-y-3 min-w-64 z-10">
              <div className="space-y-2 flex gap-2">
                <Select
                  onValueChange={(value) => form.setValue('province', value)}
                >
                  <SelectTrigger className="h-9 text-sm bg-[#fff]">
                    <SelectValue placeholder="Pilih Provinsi" />
                  </SelectTrigger>
                  <SelectContent>
                    {indonesianProvinces.map((province) => (
                      <SelectItem
                        key={province.value}
                        value={province.value}
                        className="bg-[#fff]"
                      >
                        {province.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select onValueChange={(value) => form.setValue('city', value)}>
                  <SelectTrigger className="h-9 text-sm bg-[#fff]">
                    <SelectValue placeholder="Pilih Kabupaten/Kota" />
                  </SelectTrigger>
                  <SelectContent>
                    {jakartaCities.map((city) => (
                      <SelectItem key={city.value} value={city.value}>
                        {city.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  onValueChange={(value) => form.setValue('district', value)}
                >
                  <SelectTrigger className="h-9 text-sm bg-[#fff]">
                    <SelectValue placeholder="Pilih Kecamatan/Kelurahan (Opsional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {jakartaDistricts.map((district) => (
                      <SelectItem key={district.value} value={district.value}>
                        {district.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3 z-10">
              <div className="text-xs font-medium mb-2">Property Types</div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <span className="text-xs">Apartments</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
                  <span className="text-xs">Houses</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-xs">Complexes</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preferences Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Area Preferences */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Preferensi Area</h3>
              <div className="space-y-2">
                {[
                  { id: 'metropolitan', label: 'Area Metropolitan/Urban' },
                  { id: 'suburban', label: 'Area Suburban' },
                  { id: 'rural', label: 'Area Pedesaan' },
                ].map((item) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={item.id}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(
                          'areaPreferences',
                          item.id,
                          checked as boolean
                        )
                      }
                    />
                    <label htmlFor={item.id} className="text-sm cursor-pointer">
                      {item.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Land Preferences */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Preferensi Lahan</h3>
              <div className="space-y-2">
                {[
                  { id: 'empty-land', label: 'Lahan kosong' },
                  {
                    id: 'with-building',
                    label: 'Lahan dengan bangunan (akan dirobohkan/direnovasi)',
                  },
                  { id: 'either', label: 'Lainnya' },
                ].map((item) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={item.id}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(
                          'landPreferences',
                          item.id,
                          checked as boolean
                        )
                      }
                    />
                    <label htmlFor={item.id} className="text-sm cursor-pointer">
                      {item.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Accessibility Preferences */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">
                Preferensi Aksesibilitas
              </h3>
              <div className="space-y-2">
                {[
                  { id: 'main-road', label: 'Dekat jalan utama/provinsi' },
                  {
                    id: 'public-transport',
                    label: 'Dekat akses transportasi publik',
                  },
                  { id: 'residential', label: 'Dekat permukiman' },
                ].map((item) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={item.id}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(
                          'accessibilityPreferences',
                          item.id,
                          checked as boolean
                        )
                      }
                    />
                    <label htmlFor={item.id} className="text-sm cursor-pointer">
                      {item.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Environmental Preferences */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">
                Preferensi Lingkungan & Kondisi Lahan
              </h3>
              <div className="space-y-2">
                {[
                  { id: 'flood-free', label: 'Bebas riwayat banjir' },
                  { id: 'stable-soil', label: 'Kondisi tanah stabil' },
                  {
                    id: 'clean-water',
                    label: 'Dekat sumber air bersih memadai',
                  },
                  {
                    id: 'disaster-free',
                    label:
                      'Tidak berada di zona rawan bahaya (misal: gunung api aktif, jalur pipa gas besar)',
                  },
                ].map((item) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={item.id}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(
                          'environmentalPreferences',
                          item.id,
                          checked as boolean
                        )
                      }
                    />
                    <label htmlFor={item.id} className="text-sm cursor-pointer">
                      {item.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-between">
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
              className="bg-teal-600 hover:bg-teal-700 text-white px-8"
            >
              Selanjutnya →
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LokasiLahan;
