import { ObjectId } from "mongodb";
import admin from "../config/firebase-config";
import mongoCollections from "../config/mongoCollections";
const users = mongoCollections.users;
const properties = mongoCollections.properties;
const bookings = mongoCollections.bookings;
export async function signup(req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token);
    let decodedToken = await admin.auth().verifyIdToken(token);
    // console.log(decodedToken);
    if (decodedToken) {
      let uid = decodedToken.uid;
      let email = decodedToken.email;
      let name;
      if (decodedToken.name) {
        name = decodedToken.name;
      } else {
        name = req.body.name;
      }
      // console.log(uid, email, name);
      const userCollection = await users();
      const exisiting_user = await userCollection.findOne({ email: email });
      // console.log(exisiting_user);
      if (exisiting_user) {
        const user = await userCollection.findOne({ email: email });
        if (!user) {
          throw `User not found`;
        }
        let set = {
          authToken: token,
        };
        const updateInfo = await userCollection.updateOne(
          { _id: user._id },
          {
            $set: set,
          }
        );
        if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
          throw "Update failed";
        return res.success(await userCollection.findOne({ email: email }));
      } else {
        try {
          let newUser = {
            authToken: token,
            email: email,
            name: name,
            createdDate: new Date(),
            role: req.body.role,
          };

          const newInsertInformation = await userCollection.insertOne(newUser);
          if (newInsertInformation.insertedCount === 0) throw "Insert failed!";
          return res.success(await userCollection.findOne({ email: email }));
        } catch (e) {
          return res.error(500, e);
        }
      }
    }
  } catch (e) {
    return res.send(e);
  }
}

export async function getAllBookings(req, res) {
  try {
    let id = req.params.id;
    const bookingCollection = await bookings();
    const booking = await bookingCollection
      .aggregate([
        {
          $match: { bookedBy: new ObjectId(id) },
        },
        {
          $lookup: {
            from: "properties",
            localField: "propertyId",
            foreignField: "_id",
            pipeline: [
              {
                $project: {
                  _id: 1,
                  propertyName: 1,
                  propertyAddress: 1,
                  propertyPrice: 1,
                },
              },
            ],
            as: "property",
          },
        },
      ])
      .toArray();
    return res.success(booking);
  } catch (e) {
    return res.error(500, e);
  }
}

export async function getAllMyBookings(req, res) {
  try {
    let id = req.params.id;
    const bookingCollection = await properties();
    const booking = await bookingCollection
      .aggregate([
        {
          $match: { createdBy: new ObjectId(id), isBooked: true },
        },
        {
          $lookup: {
            from: "bookings",
            localField: "_id",
            foreignField: "propertyId",
            pipeline: [
              {
                $project: {
                  _id: 1,
                  fName: 1,
                  lName: 1,
                  phone: 1,
                  email: 1,
                  startDate: 1,
                  endDate: 1,
                },
              },
            ],
            as: "bookingInfo",
          },
        },
      ])
      .toArray();
    return res.success(booking);
  } catch (e) {
    return res.error(500, e);
  }
}
