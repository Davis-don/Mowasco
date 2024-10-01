import axios from "axios";
export const sendSMS = async (req, res) => {
  try {
    const {
      amountPayable,
      receiptNumber,
      arrears,
      otherCharges,
      waterBill,
      consumption,
      formatCreatedAt,
      formatDeadlineDate,
      firstName,
      lastName,
      meterNumber,
      customerNumber,
        // custPhoneNumber
    } = req.body;

      const sendMessage = async () => {
        const toClientMessage = `Dear ${firstName} ${lastName}. Customer number ${customerNumber}. Meter no ${meterNumber}.Montly consumption for the month of ${formatCreatedAt} is : ${consumption} M3, Arrears :${arrears}, Other charges: ${otherCharges}, Water bill : ${waterBill}. The total amount is : ${amountPayable}. Receipt No. ${receiptNumber}. Please make payment before ${formatDeadlineDate} to avoid penalties.`
        const data = {
          apikey: process.env.TEXT_SMS_API_KEY,
          partnerID: process.env.TEXT_SMS_PARTNER_ID,
          message:toClientMessage ,
          shortcode: process.env.TEXT_SMS_SENDER_ID,
          mobile: process.env.PHONE_NUMBER,
        };
        return axios.post(process.env.TEXT_SEND_SMS_POST, data);
      };
    //   await sendMessage();
      res.status(200).json({ success: true, message: "successfull" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
