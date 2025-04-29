import WAValidator from "multicoin-address-validator";
const validateAddress = (address: any) => {
  return WAValidator.validate(address, "Sonic");
};

export {
  validateAddress,
};
