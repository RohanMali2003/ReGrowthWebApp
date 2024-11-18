interface Medicine {
  id : string;
  medicineId: number;
  medicineName: string;
  medicinePack: number;
  medicineType: string;
  medicinePrice: number;
}

type CreateMedicinePayload = Omit<Medicine, 'medicineId' | 'id'>;