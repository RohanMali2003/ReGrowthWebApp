interface Medicine {
  medicineId: string;
  medicineName: string;
  medicineType: string;
  medicinePack: number;
  quantity: number;
}

type CreateMedicinePayload = Omit<Medicine, 'medicineId'>;