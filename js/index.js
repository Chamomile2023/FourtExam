const elForm=document.querySelector(".header__form");
const elUserInput=document.querySelector(".header__input");
const elPasswordInput=document.querySelector(".header_password");
const elModal=document.querySelector(".header__modal");
const elOverly=document.querySelector(".overly");

elForm.addEventListener("submit",function(evt){
    evt.preventDefault();

    const usernameValue=elUserInput.value;
    const passwordValue=elPasswordInput.value;

    fetch("https://reqres.in/api/login", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: usernameValue,
            password: passwordValue,
        })
    }).then(response=>response.json()).then(data=>{
        if(data?.token){
            window.localStorage.setItem('token', data.token);

            window.location.replace('basic.html')
        }
        else{
            const openModal=function(){
                elModal.classList.remove("hidden");
                elOverly.classList.remove("hidden");
            }
            const closeModal=function(){
                elModal.classList.add("hidden");
                elOverly.classList.add("hidden");
            }
            elForm.addEventListener("submit", openModal);
            elOverly.addEventListener("click", closeModal);

            document.addEventListener("keydown", function(evt){
                if(evt.metaKey===9){
                    closeModal();
                }
                console.log(evt);
            })
        }
    })
})