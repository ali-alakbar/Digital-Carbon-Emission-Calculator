/*
Digital Emissions Calculation 
Reference: https://sustainablewebdesign.org/calculating-digital-emissions/

System Segments of Digital Emissions
- Usage of Consumer Device
  -> New users interacting with product/service (52%)
  -> Returning users interacting with product/service (25%)
- Data transfer accross network (14%)
- Energy data center uses (15%)
- Production of hardware (19%)

*Approach used below does not account for all variables of a digital product/service.
*/

/* 
  Energy per visit in kWh (E):
  E = [Data Transfer per Visit (new visitors) in GB x Annual End User Traffic x 0.75] +
      [Data Transfer per Visit (returning visitors) in GB x Annual End User Traffic x 0.25 x 0.02]
  *Annual End User Traffic: 0.81 kWh/GB or 0.81 TWh/EB
  *Returning Users is assumed to load 2% of data.
*/
export function calculateEnergyPerVisit(
  newDataTransfer,
  returningDataTransfer
) {
  return (
    newDataTransfer * 0.81 * 0.75 + returningDataTransfer * 0.81 * 0.25 * 0.02
  );
}

/* 
  Emissions per visit in grams CO2 (C):
  C = E x  carbon factor
  *Carbon factor: 442 g/kWh
 */
export function calculateEmissionPerVisit(
  newDataTransfer,
  returningDataTransfer
) {
  const energy = calculateEnergyPerVisit(
    newDataTransfer,
    returningDataTransfer
  );
  return energy * 442;
}

/* 
  Annual energy in kWh (AE):
  AE = E x Monthly Visitors x 12
*/
export function calculateAnnualEnergy(
  newDataTransfer,
  returningDataTransfer,
  monthlyVisitors
) {
  const energy = calculateEnergyPerVisit(
    newDataTransfer,
    returningDataTransfer
  );
  return energy * monthlyVisitors * 12;
}

/* 
  Annual emissions in grams CO2e (AC):
  AC = C x Monthly Visitors x 12
*/
export function calculateAnnualEmission(
  newDataTransfer,
  returningDataTransfer,
  monthlyVisitors
) {
  const emission = calculateEmissionPerVisit(
    newDataTransfer,
    returningDataTransfer
  );
  return emission * monthlyVisitors * 12;
}
