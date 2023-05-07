import { ObjectId } from "mongodb";
import mongoCollections from "../config/mongoCollections";
const properties = mongoCollections.properties;
const bookings = mongoCollections.bookings;
const payments = mongoCollections.payment;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import * as S3 from "../services/s3";

export async function addNewProperty(req, res) {
  try {
    let files = req.files;
    let body = req.body;
    let imageUrls = [];
    for (let i = 0; i < files.length; i++) {
      console.log("Adding Images to S3");
      let uploadData = await S3.uploadFile(files[i]);
      imageUrls.push(uploadData.Location);
    }
    let dataToAdd = {
      propertyName: body.propertyName,
      propertyAddress: {
        addressOne: body.addressOne,
        addressTwo: body.addressTwo,
        city: body.city,
        state: body.state,
        zip: body.zip,
      },
      propertyPrice: body.price,
      bedrooms: body.bedrooms,
      bathrooms: body.bathrooms,
      propertyImages: imageUrls,
      utilities: {
        gas: body.gas,
        water: body.water,
        electricity: body.electricity,
        heat: body.heat,
        ac: body.ac,
      },
      amenities: {
        pet: body.pet,
        laundry: body.laundry,
        parking: body.parking,
      },
      personalInfo: {
        firstName: body.fName,
        lastName: body.lName,
        email: body.email,
        phone: body.phone,
        role: body.role,
      },
      latitude: {
        latitude: body.latitude,
      },
      longitude: {
        longitude: body.longitude,
      },
      isBooked: false,
      createdBy: res.locals._id,
      createdAt: new Date(),
    };
    const propertyCollection = await properties();
    const newInsertInformation = await propertyCollection.insertOne(dataToAdd);
    if (newInsertInformation.insertedCount === 0) throw "Insert failed!";
    return res.success({
      message: "Property Inserted",
    });
  } catch (e) {
    return res.error(500, e);
  }
}

export async function getMyProperties(req, res) {
  try {
    let id = req.params.userId;
    const propertyCollection = await properties();

    const propertiesData = await propertyCollection
      .find({ createdBy: new ObjectId(id) })
      .toArray();

    return res.success(propertiesData);
  } catch (e) {
    return res.error(500, e);
  }
}

export async function getAllProperties(req, res) {
  try {
    let searchParam = req.query.search;
    let findFilter = {};
    let filter = {};
    if (searchParam) {
      filter.zip = {
        $regex: `${searchParam}`,
        $options: "i",
      };
      filter.city = {
        $regex: `${searchParam}`,
        $options: "i",
      };
      filter.state = {
        $regex: `${searchParam}`,
        $options: "i",
      };
      findFilter = {
        $or: [
          { "propertyAddress.city": filter.city },
          { "propertyAddress.state": filter.state },
          { "propertyAddress.zip": filter.zip },
        ],
      };
    }
    const propertyCollection = await properties();
    const propertiesData = await propertyCollection
      .find({ isBooked: false }, findFilter)
      .toArray();
    return res.success(propertiesData);
  } catch (e) {
    return res.error(500, e);
  }
}

export async function getPropertyDetail(req, res) {
  try {
    let id = req.params.id;
    const propertyCollection = await properties();
    const propertiesData = await propertyCollection.findOne({
      _id: new ObjectId(id),
    });
   // console.log(propertiesData)
    return res.success(propertiesData);
  } catch (e) {
    return res.error(500, e);
  }
}


export async function bookProperty(req, res) {
  try {
    let id = req.params.id;
    const propertyCollection = await properties();
    const propertiesData = await propertyCollection.findOne({
      _id: new ObjectId(id),
    });
    let body = req.body;
    // console.log(body);
    // let paymentId = new ObjectId();
    // let paymentBody = body.paymentInfo;
    // paymentBody._id = paymentId;
    // paymentBody.paymentBy = res.locals._id;
    // paymentBody.amount = propertiesData.propertyPrice;
    // paymentBody.paymentDate = new Date();
    // const paymentCollection = await payments();
    // const newPaymentInformation = await paymentCollection.insertOne(
    //   paymentBody
    // );
    // if (newPaymentInformation.insertedCount === 0) throw "Insert failed!";
    console.log("Hey",body.paymentId)
    let dataToInsert = {
      fName: body.fName,
      lName: body.lName,
      phone: body.phone,
      email: body.email,
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
     // paymentId: paymentId,
      // propertyId: id,
      paymentId: body.paymentId,
      propertyId: new ObjectId(id),
      bookedBy: res.locals._id,
      bookedDate: new Date(),
    };
    
    const bookingCollection = await bookings();
    const newbookingInformation = await bookingCollection.insertOne(
      dataToInsert
    );
    if (newbookingInformation.insertedCount === 0) throw "Insert failed!";

    const updateInfo = await propertyCollection.updateOne(
      { _id: propertiesData._id },
      {
        $set: {
          isBooked: true,
        },
      }
    );
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
      throw "Update failed";
    return res.success({
      message: "Property Inserted",
    });
  } catch (e) {
    return res.error(500, e);
  }
}
