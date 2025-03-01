const lenghtSlider = document.querySelector(".pass-lenght input");
const options = document.querySelectorAll(".option input");
const copyIcon = document.querySelector(".input-box span");
const passwordInput = document.querySelector(".input-box input");

const passIndicator = document.querySelector(".pass-indicator");
const generateBtn = document.querySelector(".generate-btn");

const characters = {
    lowercase: "qwertyuiopğüasdfghjklşizxcvbnmöç",
    uppercase: "QWERTYUIOPĞÜASDFGHJKLŞİZXCVBNMÖÇ",
    numbers: "0123456789",
    symbols: "!$%&é+[](){}-,_<>@|",
}

const generatePassword = ()=>{
    let staticPassword = "",
    randomPassword= "",
    excludeDuplicate = false,
    passLenght = lenghtSlider.value;

    options.forEach((option) => {
        if(option.checked){

            if(option.id !=="exc-duplicate" && option.id !== "spaces"){
                staticPassword += characters[option.id];
            }
            else if (option.id ==="spaces") {
                staticPassword +=` ${staticPassword}`;
            }
            else{
                excludeDuplicate = true;
            }

        }
    });


    for(let i=0;i<passLenght;i++){
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];

        if(excludeDuplicate){
            !randomPassword.includes(randomChar) || randomChar === " " ? (randomPassword +=randomChar) : i--;
        }

        else{
            randomPassword += randomChar;
        }
    }

    passwordInput.value = randomPassword;

};

const updatePassIndicator = ()=>{
    passIndicator.id = lenghtSlider.value <=8 ? "weak": lenghtSlider.value<=16 ? "medium" : "strong";
};

const updateSlider = ()=>{
    document.querySelector(".pass-lenght span").textContent = lenghtSlider.value;

    generatePassword();

    updatePassIndicator();
}

updateSlider();

const copyPassword = ()=>{
    navigator.clipboard.writeText(passwordInput.value);
}

copyIcon.addEventListener("click", copyPassword);
lenghtSlider.addEventListener("input",updateSlider);
generateBtn.addEventListener("click",generatePassword);
