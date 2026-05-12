const OWNER_WHATSAPP="8801581694019";

const menuBtn=document.getElementById("menuBtn");
const navMenu=document.getElementById("navMenu");

if(menuBtn&&navMenu){
  menuBtn.addEventListener("click",()=>navMenu.classList.toggle("active"));
  document.querySelectorAll(".nav-menu a").forEach(link=>{
    link.addEventListener("click",()=>navMenu.classList.remove("active"));
  });
}

function updateSelectedPrice(){
  const serviceName=document.getElementById("serviceName").value;
  const duration=document.getElementById("duration").value;
  const priceInput=document.getElementById("selectedPrice");

  if(!serviceName || !duration){
    priceInput.value="";
    return;
  }

  const prices=PRODUCT_PRICES[serviceName] || {};
  const price=prices[duration];

  if(price){
    priceInput.value="৳"+price;
  }else{
    priceInput.value="Not available for selected duration";
  }
}

function selectPackage(packageName){
  const select=document.getElementById("serviceName");
  select.value=packageName;
  updateSelectedPrice();
  document.getElementById("order").scrollIntoView({behavior:"smooth"});
}

function copyText(text){
  navigator.clipboard.writeText(text).then(()=>{
    alert("Payment number copied: "+text);
  }).catch(()=>{
    alert("Copy failed. Number: "+text);
  });
}

document.getElementById("serviceName").addEventListener("change", updateSelectedPrice);
document.getElementById("duration").addEventListener("change", updateSelectedPrice);

document.getElementById("orderForm").addEventListener("submit",function(event){
  event.preventDefault();

  const customerName=document.getElementById("customerName").value.trim();
  const customerPhone=document.getElementById("customerPhone").value.trim();
  const serviceName=document.getElementById("serviceName").value;
  const duration=document.getElementById("duration").value;
  const selectedPrice=document.getElementById("selectedPrice").value.trim();
  const gmail=document.getElementById("gmail").value.trim();
  const paymentMethod=document.getElementById("paymentMethod").value;
  const transactionId=document.getElementById("transactionId").value.trim();
  const paymentSender=document.getElementById("paymentSender").value.trim();
  const note=document.getElementById("note").value.trim();

  if(!customerName||!customerPhone||!serviceName||!duration){
    alert("Please fill all required fields.");
    return;
  }

  if(selectedPrice==="Not available for selected duration" || !selectedPrice){
    alert("This product is not available for selected duration. Please select correct duration.");
    return;
  }

  const orderDate=new Date().toLocaleString("en-BD",{
    timeZone:"Asia/Dhaka",
    dateStyle:"medium",
    timeStyle:"short"
  });

  const message=`New Order - Pritom Premium Zone-OOT

Order Time: ${orderDate}
Customer Name: ${customerName}
Phone/WhatsApp: ${customerPhone}
Selected Package: ${serviceName}
Duration: ${duration}
Price: ${selectedPrice}
Gmail/Email: ${gmail || "Not provided"}

Payment Method: ${paymentMethod}
Payment Type: Personal
Payment Status: Pending
Payment Number: 01581694019
Payment Sender Number: ${paymentSender || "Not provided"}
Transaction ID: ${transactionId || "Not provided"}

Additional Note: ${note || "No note"}

━━━━━━━━━━━━━━━━━━━━
MAIN WEBSITE:
www.pritompremiumzone.com
━━━━━━━━━━━━━━━━━━━━`;

  const whatsappURL=`https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL,"_blank");
});