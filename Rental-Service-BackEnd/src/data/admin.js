import mongoCollections from "../config/mongoCollections";
const users = mongoCollections.users;
const properties = mongoCollections.properties;
const bookings = mongoCollections.bookings;
const payments = mongoCollections.payment;

export async function getUsers(req, res) {
  try {
    const userCollection = await users();
    let usersData = await userCollection.find({}).toArray();
    return res.success(usersData);
  } catch (e) {
    return res.error(e);
  }
}

export async function getProperties(req, res) {
  try {
    const propCollection = await properties();
    let propertiesData = await propCollection.find({}).toArray();
    return res.success(propertiesData);
  } catch (e) {
    return res.error(e);
  }
}

export async function getPayments(req, res) {
  try {
    const paymentsCollection = await payments();
    let paymentsData = await paymentsCollection.find({}).toArray();
    return res.success(paymentsData);
  } catch (e) {
    return res.error(e);
  }
}

export async function getBookings(req, res) {
  try {
    const bookingCollection = await bookings();
    let bookingsData = await bookingCollection.find({}).toArray();
    return res.success(bookingsData);
  } catch (e) {
    return res.error(e);
  }
}
