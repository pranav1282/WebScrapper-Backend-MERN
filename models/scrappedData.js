const mongoose = require("mongoose");

// Item Price: 2.71
// Amazon fees: £1.16
// Referral fees:  £0.41
// Closing Fees:   £0.75
// Variable Closing Fee:
// Fulfilment Cost:  £2.58
// FBA fulfilment fees:   £2.58
// Opaque bagging:   £0.35
// Tape:   £0.25
// Lable:   £0.15
// Bagging:   £0.35
// Bubble Wrap:   £0.45
// Storage cost:  £0.01
// Average inventory units stored: 1
// Estimated monthly units sold: 1
// Storage cost per unit sold:  £0.01
// Other costs:  £0.45
// Cost per unit:  £4.20

const scrappedData = mongoose.Schema(
  {
    itemPrice: {
      type: double,
    },
    password: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
