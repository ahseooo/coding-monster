// function addFriends(){
//     const f_add_btn = document.getElementById("friends-add");
//     const f_header = document.getElementsByClassName("friends-list-header");
//     // const f_list_title = document.querySelector("label");
//     f_add_btn.addEventListener("click", () => {
//         f_header.style.display = "none";

        
//         // if(!nickname) return;

//         // const li = document.createElement("li");
//         // li.innerHTML = `
//         //     <span class="onOff-dot online"></span>
//         //     <span class="friends-nickname">${nickname}</span>
//         //     `;

//         // ul.appendChild(li);
//     });
// }

let add = document.querySelectorAll(".fa-user-plus");

add.addEventListener("click", (e)=>{
    let addBtnParent = e.target.parentElement.parentElement.parentElement;
    addBtnParent.classList.toggle("openSearching");
});

// let sidebar = document.querySelector(".sidebar");
// let sidebarBtn = document.querySelector(".fa-bars");
// console.log(sidebarBtn);
// sidebarBtn.addEventListener("click", ()=>{
//     sidebar.classList.toggle("close");
// });


