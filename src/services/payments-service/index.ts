import { AddressEnrollment } from "@/protocols";
import { getAddress } from "@/utils/cep-service";
import { notFoundError } from "@/errors";
//import addressRepository, { CreateAddressParams } from "@/repositories/address-repository";
//import enrollmentRepository, { CreateEnrollmentParams } from "@/repositories/enrollment-repository";
//import { exclude } from "@/utils/prisma-utils";
//import { Address, Enrollment } from "@prisma/client";

async function ui(cep: string): Promise<AddressEnrollment> {
  const result = await getAddress(cep);

  if (!result) {
    throw notFoundError(); 
  }

  const {
    bairro,
    localidade,
    uf,
    complemento,
    logradouro
  } = result;

  const address = {
    bairro,
    cidade: localidade,
    uf,
    complemento,
    logradouro
  };

  return address;
}
 
const paymentsService = {
  ui
};

export default paymentsService;
