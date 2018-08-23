import SignaturePad from "signature_pad";

var dataStack = [];
var signaturePad = new SignaturePad(document.getElementById("signature-pad"), {
  backgroundColor: "rgba(255, 255, 255, 0)",
  penColor: "rgb(0,133,254)",
  dotSize: 10,
  minWidth: 10,
  maxWidth: 10,
  onEnd: function(e) {
    var src = signaturePad.toDataURL();
    dataStack.push(src);
    if (dataStack.length > 3) {
      signaturePad.off();
    }
  }
});
var cancelButton = document.getElementById("clear");
var undoButton = document.getElementById("undo");

cancelButton.addEventListener("click", function(event) {
  signaturePad.clear();
  dataStack = [];
  signaturePad.on();
});

undoButton.addEventListener("click", function(event) {
  var data = dataStack.pop();
  data = dataStack[dataStack.length - 1];
  if (dataStack.length < 4) {
    signaturePad.on();
  }
  signaturePad.clear();
  signaturePad.fromDataURL(data);
});
