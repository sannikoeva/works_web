function verify() {
    console.log("a, b, c")
    let a = parseInt(elementA.value);
    let b = parseInt(elementB.value);
    let c = parseInt(elementC.value);
    let m = parseInt(elementM.value);
    let k = parseInt(elementK.value);


    console.log(a, b, c, m, k)


   // ABC - коробка MK - дверь
   let min = Math.min(a, b, c)
   let midth = Math.max(m, k)
   let min1 = Math.min(m, k)
   //if ((a <= m && a <= k) || (b <= m && b <= k) || (c <= m && c <= k))//
   if ((min <= min1) && ((a <= midth) || (b <= midth) || (c <= midth)))
   {
    result = "Enter"
    check = true;
   }
   else {
        result = "No enter"
        check = false;
   }
   document.getElementById("result").value = result;
}

function send() {
    if (check) {
        document.getElementById("UserEnter").submit();
    } else {
        alert("Есть недостатки. Повторите ввод")
    }
}



let result;
let check;

const elementA = document.getElementById("a");
const elementB = document.getElementById("b");
const elementC = document.getElementById("c");
const elementM = document.getElementById("m");
const elementK = document.getElementById("k");



const elementVerify = document.getElementById("verify");
elementVerify.addEventListener('click', verify);

const elementSend = document.getElementById("send");
elementSend.addEventListener('click', send)
