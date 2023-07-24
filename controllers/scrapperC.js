// const userModel = require("../models/user");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const SECRET_KEY = "NOTESAPI";
const puppeteer = require("puppeteer");

const scrapperC = async (req, res) => {
  const productName = req.body.productName;

  (async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // visiting URL
    await page.goto(
      "https://sellercentral.amazon.in/fba/profitabilitycalculator/"
    );

    // continue as guest
    await page.waitForSelector(
      "#root > kat-modal > div > kat-button.spacing-top-small"
    );
    await page.click("#root > kat-modal > div > kat-button.spacing-top-small");

    //   selecting country
    const dropdown = await page.$("#katal-id-54");

    // typing product
    const inputElement = await page.evaluateHandle(() => {
      const shadowRoot = document.querySelector(
        "#ProductSearchInput > kat-input"
      ).shadowRoot;
      return shadowRoot.querySelector("#katal-id-4");
    });

    await inputElement.type(productName); //B07NRMMG3G

    // clicking search
    // await page.waitForTimeout(1000);
    const searchButton = await page.evaluateHandle(() => {
      const shadowRoot = document.querySelector(
        "#ProductSearchInput > kat-button"
      ).shadowRoot;
      return shadowRoot.querySelector("button");
    });

    await searchButton.click();

    // item price
    await page.waitForSelector(
      "#ProgramCard > div.program-card-box-under > div.program-card-box-top > div.revenue-section > div > div > div > kat-input-group > kat-input"
    );

    //   const itemPrice = await page.evaluate(() => {
    //     const inputElement = document
    //       .querySelector(
    //         "#ProgramCard > div.program-card-box-under > div.program-card-box-top > div.revenue-section > div > div > div > kat-input-group > kat-input"
    //       )
    //       .shadowRoot.querySelector("#katal-id-9");
    //     const currency = document.querySelector(
    //       "#ProgramCard > div.program-card-box-under > div.program-card-box-top > div.revenue-section > div > div > div > kat-input-group > kat-label"
    //     ).text;
    //     console.log("Item price:", currency + inputElement.value);
    //     return inputElement.value;
    //   });

    //   // amazon fees and breakage
    //   const amazonFees = await page.evaluate(() => {
    //     const inputElement = document.querySelector(
    //       "#ProgramCard > div.program-card-box-under > div.program-card-box-top > div.cost-section > div > kat-expander:nth-child(1) > div:nth-child(1) > kat-label"
    //     );

    //     console.log("Amazon fees: ", inputElement.text);
    //     return inputElement.text;
    //   });

    //   //   referralFees
    //   const referralFees = await page.evaluate(() => {
    //     const inputElement = document.querySelector(
    //       "#ProgramCard > div.program-card-box-under > div.program-card-box-top > div.cost-section > div > kat-expander:nth-child(1) > div.section-expander-content > div:nth-child(1) > kat-label"
    //     );
    //     console.log("Referral fees: ", inputElement.text);
    //     return inputElement.text;
    //   });

    async function evaluateAndLogInputField(selector, label) {
      const result = await page.evaluate(
        (selector, label) => {
          const inputElement = document.querySelector(selector);
          console.log(label, inputElement.value);
          // res.send(lable);
          return inputElement.value;
        },
        selector,
        label
      );
      // res.write("Hello");
      return result;
    }

    async function evaluateAndLog(selector, label) {
      const result = await page.evaluate(
        (selector, label) => {
          const inputElement = document.querySelector(selector);
          console.log(label, inputElement.innerText);
          return inputElement.innerText;
        },
        selector,
        label
      );

      return result;
    }

    const array = [];
    // itemPrice
    const itemPrice = await evaluateAndLogInputField(
      "#ProgramCard > div.program-card-box-under > div.program-card-box-top > div.revenue-section > div > div > div > kat-input-group > kat-input",
      "Item Price:"
    );
    array.push({ itemPrice: itemPrice });

    // amazonFees
    const amazonFees = await evaluateAndLog(
      "#ProgramCard > div.program-card-box-under > div.program-card-box-top > div.cost-section > div > kat-expander:nth-child(1) > div:nth-child(1) > kat-label",
      "Amazon fees:"
    );
    array.push({ amazonFees: amazonFees });

    // referralFees
    const referralFees = await evaluateAndLog(
      "#ProgramCard > div.program-card-box-under > div.program-card-box-top > div.cost-section > div > kat-expander:nth-child(1) > div.section-expander-content > div:nth-child(1) > kat-label",
      "Referral fees:"
    );
    // res.write(referralFees + "\n");
    array.push({ referralFees: referralFees });

    // closing Fee
    const closingFees = await evaluateAndLog(
      "#ProgramCard > div.program-card-box-under > div.program-card-box-top > div.cost-section > div > kat-expander:nth-child(1) > div.section-expander-content > div:nth-child(2) > kat-label",
      "Closing Fees: "
    );
    array.push({ closingFees: closingFees });

    // Variable Closing Fee
    const variableClosingFees = await evaluateAndLog(
      "#ProgramCard > div.program-card-box-under > div.program-card-box-top > div.cost-section > div > kat-expander:nth-child(1) > div.section-expander-content > div:nth-child(3) > kat-label",
      "Variable Closing Fee: "
    );
    array.push({ variableClosingFees: variableClosingFees });

    //   Fulfilment Cost
    const fulfilmentCost = await evaluateAndLog(
      "#ProgramCard > div.program-card-box-under > div.program-card-box-top > div.cost-section > div > kat-expander:nth-child(2) > div:nth-child(1) > kat-label",
      "Fulfilment Cost: "
    );
    array.push({ fulfilmentCost: fulfilmentCost });

    //  FBA fulfilment fees
    const FBAfulfilmentCost = await evaluateAndLog(
      "#ProgramCard > div.program-card-box-under > div.program-card-box-top > div.cost-section > div > kat-expander:nth-child(2) > div.section-expander-content > div.input-block.input-block-padding-plus > kat-label",
      "FBA fulfilment fees: "
    );
    array.push({ FBAfulfilmentCost: FBAfulfilmentCost });

    //   Opaque bagging
    const opaqueBagging = await evaluateAndLog(
      "#ProgramCard > div.program-card-box-under > div.program-card-box-top > div.cost-section > div > kat-expander:nth-child(2) > div.section-expander-content > div:nth-child(2) > div.service-addon-box > div:nth-child(1) > kat-label",
      "Opaque bagging: "
    );
    array.push({ opaqueBagging: opaqueBagging });

    //   tape
    const tape = await evaluateAndLog(
      "#ProgramCard > div.program-card-box-under > div.program-card-box-top > div.cost-section > div > kat-expander:nth-child(2) > div.section-expander-content > div:nth-child(2) > div.service-addon-box > div:nth-child(2) > kat-label",
      "Tape: "
    );
    array.push({ tape: tape });

    // lable
    const lable = await evaluateAndLog(
      "#ProgramCard > div.program-card-box-under > div.program-card-box-top > div.cost-section > div > kat-expander:nth-child(2) > div.section-expander-content > div:nth-child(2) > div.service-addon-box > div:nth-child(3) > kat-label",
      "Lable: "
    );
    array.push({ lable: lable });

    // bagging
    const bagging = await evaluateAndLog(
      "#ProgramCard > div.program-card-box-under > div.program-card-box-top > div.cost-section > div > kat-expander:nth-child(2) > div.section-expander-content > div:nth-child(2) > div.service-addon-box > div:nth-child(4) > kat-label",
      "Bagging: "
    );
    array.push({ bagging: bagging });

    // bubble wrap
    const bubbleWrap = await evaluateAndLog(
      "#ProgramCard > div.program-card-box-under > div.program-card-box-top > div.cost-section > div > kat-expander:nth-child(2) > div.section-expander-content > div:nth-child(2) > div.service-addon-box > div:nth-child(5) > kat-label",
      "Bubble Wrap: "
    );
    array.push({ bubbleWrap: bubbleWrap });

    //   storage cost
    const storagCost = await evaluateAndLog(
      "#ProgramCard > div.program-card-box-under > div.program-card-box-top > div.cost-section > div > kat-expander:nth-child(3) > div:nth-child(1) > kat-label",
      "Storage cost: "
    );
    array.push({ storagCost: storagCost });

    //Average inventory units stored
    const averageInventoryUnitsStored = await evaluateAndLogInputField(
      "#ProgramCard > div.program-card-box-under > div.program-card-box-top > div.cost-section > div > kat-expander:nth-child(3) > div.section-expander-content > div:nth-child(3) > kat-input",
      "Average inventory units stored:"
    );
    array.push({ averageInventoryUnitsStored: averageInventoryUnitsStored });

    //Estimated monthly units sold
    const estimatedMonthlyUnitsSold = await evaluateAndLogInputField(
      "#ProgramCard > div.program-card-box-under > div.program-card-box-top > div.cost-section > div > kat-expander:nth-child(3) > div.section-expander-content > div:nth-child(4) > kat-input",
      "Estimated monthly units sold:"
    );
    array.push({ estimatedMonthlyUnitsSold: estimatedMonthlyUnitsSold });

    //Storage cost per unit sold
    const storageCostPerUnitSold = await evaluateAndLog(
      "#ProgramCard > div.program-card-box-under > div.program-card-box-top > div.cost-section > div > kat-expander:nth-child(3) > div.section-expander-content > div:nth-child(5) > kat-label",
      "Storage cost per unit sold: "
    );
    array.push({ storageCostPerUnitSold: storageCostPerUnitSold });

    //   Other costs
    const otherCosts = await evaluateAndLog(
      "#ProgramCard > div.program-card-box-under > div.program-card-box-top > div.cost-section > div > kat-expander:nth-child(4) > div:nth-child(1) > kat-label",
      "Other costs: "
    );
    array.push({ otherCosts: otherCosts });

    //cost per unit
    const costPerUnit = await evaluateAndLog(
      "#ProgramCard > div.program-card-box-under > div.program-card-box-bottom > div > div.profit-section-content > div:nth-child(1) > kat-label",
      "Cost per unit: "
    );
    array.push({ costPerUnit: costPerUnit });

    res.send(array);

    //   await page.waitForTimeout(5000);
    //   await browser.close();
  })();
};

module.exports = {
  scrapperC,
};
