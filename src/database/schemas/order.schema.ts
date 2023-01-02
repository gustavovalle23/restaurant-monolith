import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
  status: String,
  customerId: String,
  customerAddress: String,
});
