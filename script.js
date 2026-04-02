// new cards show krna hai, data local storage mein save karna hai
// localStorage se hi cards ko show krna hai
// buttons ko handle krna hai
// filters ko handle krna he 

//..{
// sabse phele plus ka button click hoga isliye js me plus ke btn ko select kiya 
let AddNote = document.querySelector("#add-note");


// ye hmne form container ko select kiya take EventListener me hmm isko show krwa ske kiuke ye statically hide hua he 
let FormContainer = document.querySelector(".form-container");

// Aur user form click nahi krta aur close ka button daba deta he tw form hide hojana chaye tw isliye close button select krna chaye 
let formClose = document.querySelector(".close-Form");

// ye hmne note container ko select kiya take EventListener me hmm isko hide krwa ske kiuke ye statically show hua he 
let NoteContainer = document.querySelector(".note-wrapper");

//..}

//......................{ ALl Variables and DOC Selections

// khali array bnaya jisme hmm form se data isme bhare ge mtlb object ek ek bnde ka 
// // const tasks=[];



const upbtn = document.querySelector("#Upbtn");
const downbtn = document.querySelector("#Downbtn");

// Select the form itself
const form = FormContainer.querySelector('form');

// Select individual input fields
const imageUrlInput = form.querySelector('input[type="text"][placeholder*="photo"]');
const fullNameInput = form.querySelector('input[type="text"][placeholder*="full name"]');
const homeTownInput = form.querySelector('input[type="text"][placeholder*="home town"]');
const purposeInput = form.querySelector('input[type="text"][placeholder*="Quick appointment note"]');

// Select all category radio buttons
const categoryRadios = form.querySelectorAll('input[name="category"]');

// Select buttons
const createBtn = form.querySelector('.create-btn');
const closeBtn = form.querySelector('.close-Form');

// console.log(imageUrlInput, fullNameInput, homeTownInput, purposeInput, categoryRadios, createBtn, closeBtn);
//...............................................}


//..Code starts Here..........

function getpreviousCards() {
    let getalldata = JSON.parse(localStorage.getItem("tasks"));
    if (getalldata !== null) {
        getalldata.forEach((cardsdata) => {
            showCallcards(cardsdata);
        })
    }
}

function saveToLocalStorage(obj) {
    // obj me jo values aygi wo form me jo data diya hoga wo obj me save hua hoga 

    // phele purane localStorage data nikalo 
    if (localStorage.getItem("tasks") === null) { //shru me hoga hi khali 
        let oldTask = []; //user ki list bnani he khali  jisme users ayge object ki trha
        oldTask.push(obj); //object ko array me dala 
        localStorage.setItem("tasks", JSON.stringify(oldTask))  //phir hmne array ko localStorage me bhej diya stringyfy() krke 
        showCallcards(obj)
    }
    else {
        let oldTask = localStorage.getItem("tasks"); //ye hmne ek var me localstorage se key save ki jiski value array he uske andar 0 index pe ek obj he 
        oldTask = JSON.parse(oldTask); //phir hmne us string array ko pare krke actual array bna ke wapis variable me save kiya 
        oldTask.push(obj) //ab jab oldTask ek array bngya tw hmne usme wapis se sek obj dal diya 
        showCallcards(obj)
        localStorage.setItem("tasks", JSON.stringify(oldTask)) //phir dobara new user ko daal diya 
    }

}
getpreviousCards();


// AddNote pe hmne Event listener lagaya click ka mtlb jese hi click ho tw listener kam kre jisme hmm form ko show krwaye ge aur note container ko hide krde ge 
AddNote.addEventListener("click", () => {
    FormContainer.style.display = "initial";
    NoteContainer.style.display = "none";

})

// formClose pe hmne Event listener lagaya click ka mtlb jese hi click ho tw listener kam kre jisme hmm form ko hide krwaye ge aur note container ko show krde ge 
formClose.addEventListener("click", () => {
    FormContainer.style.display = "none";
    NoteContainer.style.display = "initial";
    NoteContainer.style.display = "flex";

})


// imageUrlInput field pe jb space dale ge tw wo bh submit hojae gi joke wrong he isliye trim() use kre ge jo shru aur end se space remove krdegaw
//     if(
//         imageUrlInput.value.trim()!=="" &&
//         fullNameInput.value.trim()!=="" &&
//         homeTownInput.value.trim()!=="" &&
//     ){

// }
form.addEventListener("submit", (evtObj) => {
    evtObj.preventDefault();

    // Regex patterns
    const imageUrlRegex = /^https?:\/\/.+\.(jpg|jpeg|png|gif)(\?.*)?$|^https?:\/\/.+\?.*$/i;
    const fullNameRegex = /^[A-Za-z ]{2,}$/;
    const homeTownRegex = /^[A-Za-z\s-]{2,}$/;
    const purposeRegex = /^[\w\s.,'-]{5,}$/;

    // Input values
    const imageUrlValue = imageUrlInput.value.trim();
    const fullNameValue = fullNameInput.value.trim();
    const homeTownValue = homeTownInput.value.trim();
    const purposeValue = purposeInput.value.trim();

    // Validation
    let selected = false;
    categoryRadios.forEach((cat) => {
        // console.dir(cat);
        if (cat.checked) {
            selected = cat.value
        }

    })
    if (!imageUrlRegex.test(imageUrlValue)) {
        alert("Please enter a valid Image URL (png, jpg, jpeg, gif)");
        return;
    }
    if (!fullNameRegex.test(fullNameValue)) {
        alert("Please enter a valid Full Name (letters and spaces only)");
        return;
    }
    if (!homeTownRegex.test(homeTownValue)) {
        alert("Please enter a valid Home Town (letters, spaces or hyphens only)");
        return;
    }
    if (!purposeRegex.test(purposeValue)) {
        alert("Please enter a valid Purpose (at least 5 characters)");
        return;
    }
    if (!selected) {
        alert("Please select a category (one of them)");
        return;
    }

    // If all valid
    // alert("Form Submitted Successfully!");
    saveToLocalStorage({
        imageUrl: imageUrlValue,
        fullName: fullNameValue,
        purpose: purposeValue,
        homeTown: homeTownValue,
        category: selected,
        bookings: 1
    })
    form.reset();
    setTimeout(() => {
        FormContainer.style.display = "none";
    }, 100)
    NoteContainer.style.display = "initial";
    NoteContainer.style.display = "flex";


});

function showCallcards(arg) {

    // parent container jahan card add hoga
    const Stack = document.querySelector(".stack");

    // card
    const noteCard = document.createElement("div");
    noteCard.classList.add("note-card");

    // image
    const img = document.createElement("img");
    img.src = arg.imageUrl;

    // name
    const name = document.createElement("h3");
    name.innerText = arg.fullName;

    // info - hometown
    const info1 = document.createElement("div");
    info1.classList.add("info");

    const span1a = document.createElement("span");
    span1a.innerText = "Home town";

    const span1b = document.createElement("span");
    span1b.innerText = arg.homeTown;

    info1.append(span1a, span1b);

    // info - bookings
    const info2 = document.createElement("div");
    info2.classList.add("info");

    const span2a = document.createElement("span");
    span2a.innerText = "Purpose";

    const span2b = document.createElement("span");
    span2b.innerText = arg.purpose;

    info2.append(span2a, span2b);

    // actions
    const actions = document.createElement("div");
    actions.className = "actions";

    const callBtn = document.createElement("button");
    callBtn.className = "call";
    callBtn.innerText = "📞 Call";

    const msgBtn = document.createElement("button");
    msgBtn.className = "msg";
    msgBtn.innerText = "Message";

    actions.append(callBtn, msgBtn);

    // assemble card
    noteCard.append(img, name, info1, info2, actions);

    // add to DOM
    Stack.prepend(noteCard);

}


upbtn.addEventListener("click", () => {
    const stack=document.querySelector(".stack");
    const cards = stack.querySelectorAll(".note-card");
    let fillarr=[...cards];
    let first=fillarr.shift()
    fillarr.push(first);
    stack.innerHTML="";
    fillarr.forEach((items)=>{
        stack.appendChild(items)
    })
});

downbtn.addEventListener("click", () => {
    const stack=document.querySelector(".stack");
    const cards = document.querySelectorAll(".note-card");
    let fillarr=[...cards];
    let last=fillarr.pop();
    fillarr.unshift(last);
    stack.innerHTML="";
    fillarr.forEach((items)=>{
        stack.appendChild(items);
    })
});