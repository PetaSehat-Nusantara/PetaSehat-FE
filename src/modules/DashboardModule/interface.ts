// Type definitions for form data
export interface InformasiUmumData {
  facilityName?: string;
  facilityType?: 'Rumah Sakit Umum' | 'Rumah Sakit Khusus' | 'Puskesmas' | 'Klinik';
  facilityClass?: 'Tipe A' | 'Tipe B' | 'Tipe C' | 'Tipe D';
  minCapacity?: number;
  maxCapacity?: number;
  services?: string[];
}

export interface KriteriaDemografiData {
  // Define based on your KriteriaDemografi form fields
  [key: string]: any;
}

export interface LokasiLahanData {
  // Define based on your LokasiLahan form fields
  [key: string]: any;
}

export interface KriteriaKeuanganData {
  // Define based on your KriteriaKeuangan form fields
  [key: string]: any;
}

export interface FormData {
  informasiUmum: InformasiUmumData;
  kriteriaDemografi: KriteriaDemografiData;
  lokasiLahan: LokasiLahanData;
  kriteriaKeuangan: KriteriaKeuanganData;
}

// Props for step components
export interface StepComponentProps {
  data: any;
  onDataChange: (data: any) => void;
  onNext: () => void;
  onPrev?: () => void;
  allData?: FormData;
}
