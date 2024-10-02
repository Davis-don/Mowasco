import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllCustomers = async (req, res) => {
  try {
    const getCustomers = await prisma.customers.findMany({
      select: {
        cust_id: true,
        custNumber: true,
        custFirstName: true,
        custLastName: true,
        custID: true,
        custPhoneNumber: true,
        custConnectionType: true,
        custStatus: true,
        meters: true,
        meters: {
          include: {
            zones: true,
            water_reading: true,
          },
        },
      },
    });

    if (getCustomers != null) {
      res.status(200).json({
        success: true,
        message: "Customers found successfully.",
        data: getCustomers,
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

export const getSingleCustomer = async (req, res) => {
  try {
    const { cust_id } = req.params;
    const checkID = await prisma.customers.findUnique({
      where: { cust_id: cust_id },
      include: {
        meters: true,
        meters: {
          include: {
            zones: true,
            water_reading:true
          },
        },
      },
    });

    if (checkID) {
      res.status(200).json({
        success: true,
        message: "Customer has been found.",
        data: checkID,
      });
    } else {
      res.status(500).json({ success: true, message: "Customer not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTotalCustomersPerZone = async (req, res) => {
  try {
    const zoneCustomerCounts = await prisma.zones.findMany({
      select: {
        zoneName: true, // Get the zone name
        meter: {
          select: {
            customer: true, // Include customer details
          },
        },
      },
    });

    // Then you can process the result to count the customers per zone.
    const counts = zoneCustomerCounts.map((zone) => ({
      zoneName: zone.zoneName,
      customerCount: zone.meter.length, // Count the customers based on the meters
    }));

    res.status(200).json({
      success: true,
      message: "zones found successfully",
      data: counts,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createCustomer = async (req, res) => {
  try {
    const {
      custFirstName,
      custLastName,
      custID,
      custPhoneNumber,
      custConnectionType,
    } = req.body;

    const createCustomer = await prisma.customers.create({
      data: {
        custFirstName,
        custLastName,
        custID,
        custPhoneNumber,
        custConnectionType,
      },
    });

    if (createCustomer != null) {
      res.status(200).json({
        success: true,
        message: "Customer created successfully.",
        data: createCustomer,
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
export const updateCustomer = async (req, res) => {
  try {

    const customerDetails = req.body;

    const customerFields = [  
      'custFirstName',
        'custLastName',
        'custID',
        'custPhoneNumber',
        'custConnectionType',
        'custStatus'
      ]
    const {cust_id} = req.params;

    // define an object to store those fields.
    let updates = {}

    // loop through the req.body to update changes items.

  for (let changes in customerDetails) {
     if(customerFields.includes(changes)){
      updates[changes]= customerDetails[changes]
     }
  }
  // check user to update details.
  const updateUser = await prisma.customers.update({
    where:{cust_id}, 
    data:updates
  })

  if (updateUser){
    res.status(200).json({success: true, message: 'Customer details updated successfully.'})
  }

  } catch (error) {
    res.status(500).json({success:false, message: error.message})
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const { cust_id } = req.params;
    const checkID = await prisma.customers.findUnique({
      where: { cust_id: cust_id },
    });

    if (checkID) {
      await prisma.customers.delete({
        where: { cust_id: cust_id },
      });
      res
        .status(200)
        .json({ success: true, message: "Customer has been deleted." });
    } else {
      res.status(500).json({ success: true, message: "Customer not found" });
    }

    // res.status(200).json({success: true, message: 'Customer has been deleted successfully.'})
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
