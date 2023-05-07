import mongoCollections from "../config/mongoCollections";
const payments = mongoCollections.payment;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

console.log("Inn data file for payment")
export async function savePayment(req, res) {
    console.log("Out of try")
    try {
        console.log("for stripe")
        console.log( req.body.amount)
        const payment = stripe.paymentIntents.create({
            amount: req.body.amount*100 ,
            currency: "USD",
            receipt_email: req.body.email,
            description: "Book My Nest",
            payment_method: req.body.id,
            confirm: true
          })
          // res.json({
          //     message: "Payment successful",
          //     success: true,
          //   })
           
        
    let body= req.body;
   // console.log(body)
      let dataToAdd = {
        paymentEmail: body.email,
        paymentAmount: body.amount,
        paymentDate:body.paymentDate,
        paymentID:body.id,
        createdBy: res.locals._id,
        createdAt: new Date(),
      };
      console.log("For mongodb")
      const paymentCollection = await payments();
      const newInsertInformation = await paymentCollection.insertOne(dataToAdd);
      if (newInsertInformation.insertedCount === 0) throw "Insert failed!";
      return res.success({
        message: "Property Inserted",
        success: true

      });
    } catch (e) {
            console.log("Error",e )
            res.json({
              message: "Payment failed",
              success: false
            })
      return res.error(500, e);

    }
  }