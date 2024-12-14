let express = require("express");
let cors = require("cors");

let app = express();
const port = 3000;

let discountRate = 10;
let taxRate = 5;
let loyaltyRate = 2;

app.use(cors());

app.get("/cart-total",  (req, res)=>{
  let newItemPrice= parseFloat(req.query.newItemPrice);
  let cartTotal=parseFloat(req.query.cartTotal);
  cartTotal=cartTotal+newItemPrice;
  res.send(cartTotal.toString());
});

app.get("/membership-discount", (req, res)=>{
 let cartTotal=parseFloat(req.query.cartTotal);
 let isMember=req.query.isMember==="true";
 if(isMember){
 cartTotal= cartTotal-cartTotal/10;
 }
 res.send(cartTotal.toString());
});

app.get("/calculate-tax", (req, res)=>{
let cartTotal = parseFloat(req.query.cartTotal);
let tax=(cartTotal*taxRate)/100;
res.send(tax.toString());
});

app.get("/estimate-delivery", (req, res)=>{
let shippingMethod= req.query.shippingMethod;
let distance = parseFloat(req.query.distance);
let days;
if(shippingMethod==="express"){
days= distance/100;
}else if(shippingMethod==="standard"){
days= distance/50;
}
res.send(days.toString());
});

app.get("/shipping-cost", (req, res)=>{
  let weight= parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCost= (weight * distance * 10)/100;
  res.send(shippingCost.toString());
  });

  app.get("/loyalty-points", (req, res)=>{
    let purchaseAmount= parseFloat(req.query.purchaseAmount);
    let loyaltyPoints= purchaseAmount * loyaltyRate;
    res.send(loyaltyPoints.toString());
    });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
