import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllReadings = async (req, res) => {
  try {
    const getMeters = await prisma.water_Reading.findMany({
      select: {
        meter_id: true,
        meter: true,
        meter: {
          include: {
            customer: true,
          },
        },
        reading_id: true,
        currentReading: true,
        prevReading: true,
        consumption: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    if (getMeters != null) {
      res.status(200).json({
        success: true,
        message: "All readings have been found successfully.",
        data: getMeters,
      });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Something went wrong." });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllReadingsForOneMeter = async (req, res) => {
  try {
    const { meter_id } = req.params;

    const findReading = await prisma.water_Reading.findMany({
      where: { meter_id },
      orderBy: { createdAt: "desc" },
      include: {
        meter: true,
        meter: {
          include: {
            billing: true,
            customer: true,
          },
        },
      },
    });

    if (findReading != null) {
      res.status(200).json({
        success: true,
        message: "Meter reading has been found successfully.",
        data: findReading,
      });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Something went wrong. no details" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const totalAmountConsumed = async (req, res) => {
  try {
    // find the latest month.
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const totalAmountConsumed = await prisma.water_Reading.aggregate({
      _sum: {
        consumption: true,
      },
      where: {
        createdAt: {
          gte: startOfMonth,
          // lte:endOfMonth
        },
      },
    });

    if (totalAmountConsumed != null) {
      res.status(200).json({
        success: true,
        message: "Total amount computed successfully.",
        data: totalAmountConsumed._sum.consumption,
      });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Something went wrong." });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const zonalTotalConsumption = async (req, res) => {
  try {
    const total = await prisma.zones.findMany({
      select: {
        zoneName: true,
        meter: {
          select: {
            water_reading: {
              select: {
                consumption: true,
              },
            },
          },
        },
      },
    });

    //     const consumptionByZone = total.map((zone) => {
    //       const totalConsumption = zone.meter.reduce((total, meter) => {
    //       //   const meterConsumption = meter.water_reading.reduce((meterTotal, reading) => meterTotal + Number(reading.consumption), 0
    //       //   )
    //       //   return total + meterConsumption
    //       //
    //       return total + meter.water_reading.map((readingSum, reading) => {
    //         const _consumption = parseFloat(reading.consumption)

    //         if (isNaN(_consumption)){
    //           return readingSum;
    //         }
    // console.log('reading sum',readingSum)
    //         console.log('reading consumption', parseInt(reading._consumption))
    //         return readingSum + (reading.consumption)
    //       }, 0)
    //       },0
    //       )
    //         console.log(zone)
    //         console.log(totalConsumption)
    //       return {
    //         zoneName: zone.zoneName,
    //         totalConsumption

    //       }
    //     })

    const consumptionByZone = total.map((zone) => {
      const totalConsumption = zone.meter.reduce((total, meter) => {
        // Use reduce to sum the readings for each meter
        const meterConsumption = meter.water_reading.reduce(
          (readingSum, reading) => {
            const _consumption = parseFloat(reading.consumption); // Parse consumption as a float

            if (isNaN(_consumption)) {
              console.error(`Invalid consumption: ${reading.consumption}`);
              return readingSum; // Skip invalid readings
            }

            console.log("reading sum", readingSum);
            console.log("reading consumption", _consumption);
            return readingSum + _consumption;
          },
          0,
        );

        return total + meterConsumption; // Accumulate consumption for each meter
      }, 0); // Initial value of total is 0

      console.log("zone", zone);
      console.log("totalConsumption", totalConsumption);
      return {
        zoneName: zone.zoneName,
        totalConsumption: totalConsumption.toFixed(2), // Format to two decimal places
      };
    });
    if (consumptionByZone) {
      res.status(200).json({
        success: true,
        message: "Total consumption per zone found successfully.",
        data: consumptionByZone,
      });
    } else {
      res.status(500).json({
        success: true,
        message: "Something went wrong.",
        data: consumptionByZone,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSigleReading = async (req, res) => {
  try {
    const { meter_id } = req.params;

    const findReading = await prisma.water_Reading.findFirst({
      where: { meter_id },
      orderBy: { createdAt: "desc" },
      include: {
        meter: true,
        meter: {
          include: {
            customer: true,
          },
        },
      },
    });

    if (findReading != null) {
      res.status(200).json({
        success: true,
        message: "Meter reading has been found successfully.",
        data: findReading,
      });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Something went wrong. no details" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "it is here" });
  }
};

export const recordReading = async (req, res) => {
  try {
    const { currentReading, meter_id } = req.body;

    const lastReading = await prisma.water_Reading.findFirst({
      where: { meter_id: meter_id },
      orderBy: { createdAt: "desc" },
    });

    let amountConsumed = 0;
    if (lastReading) {
      amountConsumed = currentReading - lastReading.currentReading;
    } else {
      amountConsumed = currentReading;
    }

    const createReading = await prisma.water_Reading.create({
      data: {
        currentReading,
        prevReading: lastReading ? lastReading.currentReading : 0,
        consumption: amountConsumed,
        meter: {
          connect: { meter_id: meter_id },
        },
      },
    });

    if (createReading != null) {
      res.status(200).json({
        success: true,
        message: "Water reading recorded.",
        data: createReading,
      });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Something went wrong." });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteReading = async (req, res) => {
  try {
    const { reading_id } = req.params;
    const findReading = await prisma.water_Reading.findUnique({
      where: { reading_id },
    });

    if (findReading != null) {
      await prisma.water_Reading.delete({
        where: { reading_id },
      });
      res.status(200).json({
        success: true,
        message: "Meter reading deleted successfully.",
      });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Something went wrong." });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
