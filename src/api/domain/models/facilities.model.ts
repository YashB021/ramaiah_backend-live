import { AppDataSource } from "../../config/db";
import { Facility } from "../entities/facilities.entities";
import { FacilitySpecialty } from "../entities/facility_specialties.entities";

const facilityRepo = AppDataSource.getRepository(Facility);

export const createFacilityApi = async (
    data: any, 
    callback: (error: any, result: any) => void
) => {
  try {
    const facility = facilityRepo.create(data);
    const savedFacility = await facilityRepo.save(facility);
    return callback(null, savedFacility);
  } catch (error) {
    return callback(error instanceof Error ? error.message : error, null);
  }
};

export const getFacilitysApi = async ( 
    callback: (error: any, result: any) => void
) => {
  try {
    const facilityRepo = AppDataSource.getRepository(Facility);
    const facilities = await facilityRepo.find({
      where: { is_active: true },
      relations: ["specialties"],
      order: { display_order: "ASC" }
    });
    return callback(null, facilities);
  } catch (error) {
    return callback(error instanceof Error ? error.message : error, null);
  }
};

export const getFacilityApi = async ( 
    id: number,
    callback: (error: any, result: any) => void
) => {
  try {
    const facilityRepo = AppDataSource.getRepository(Facility);
    const facility = await facilityRepo.findOne({
      where: { id },
      relations: ["specialties"]
    });
    if (!facility) return callback("Facility not found", null);
    return callback(null, facility);
  } catch (error) {
    return callback(error instanceof Error ? error.message : error, null);
  }
};


export const updateFacilityApi = async ( 
    id: number,
    reqBody:any,
    callback: (error: any, result: any) => void
) => {
  try {
    const facilityRepo = AppDataSource.getRepository(Facility);
    let facility = await facilityRepo.findOne({ where: { id }, relations: ["specialties"] });
    if (!facility) return callback("Facility not found", null);

    facilityRepo.merge(facility, reqBody); // Merge new data
    const updatedFacility = await facilityRepo.save(facility);
    return callback(null, updatedFacility);
  } catch (error) {
    return callback(error instanceof Error ? error.message : error, null);
  }
};


export const deleteFacilityApi = async ( 
    id: number,
    callback: (error: any, result: any) => void
) => {
  try {
    const facilityRepo = AppDataSource.getRepository(Facility);
    const facility = await facilityRepo.findOne({ where: { id } });
    if (!facility) return callback("Facility not found", null);

    await facilityRepo.remove(facility);
    return callback(null, { message: "Facility deleted successfully" });
  } catch (error) {
    return callback(error instanceof Error ? error.message : error, null);
  }
};


export const updateServiceFacility = async ( 
    reqBody: any,
    callback: (error: any, result: any) => void
) => {
  try {
    const { facility_id, specialty_id, content_block_id } = reqBody;

     if (!facility_id) {
      return callback("facility_id is required", null);
    }

    const facilitySpecialtyRepo = AppDataSource.getRepository(FacilitySpecialty);

    // Build dynamic where condition
    const whereCondition: any = { 
      facility_id,
      content_block_id 
    };
    if (specialty_id) whereCondition.specialty_id = specialty_id;

    // Check if record already exists
    let existing = await facilitySpecialtyRepo.findOne({ where: whereCondition });

    if (existing) {
      // Update record
      existing.content_block_id = content_block_id ?? existing.content_block_id;
      const updated = await facilitySpecialtyRepo.save(existing);
      return callback(null, { message: "FacilitySpecialty updated successfully", data: updated });
    } else {
      // Create new record
      const newRecord = facilitySpecialtyRepo.create({
        facility_id,
        specialty_id,
        content_block_id,
      });
      const saved = await facilitySpecialtyRepo.save(newRecord);
      return callback(null, { message: "FacilitySpecialty added successfully", data: saved });
    }
  } catch (error) {
    return callback(error instanceof Error ? error.message : error, null);
  }
};