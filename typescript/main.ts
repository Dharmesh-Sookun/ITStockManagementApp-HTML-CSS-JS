let employees = [{
    id: 1,
    firstName: "Dharmesh",
    middleName: "Kumar",
    lastName: "Sookun",
    address: "Riviere du Poste"
},{
    id: 2,
    firstName: "John",
    middleName: "",
    lastName: "Doe",
    address: "Curepipe"
},{
    id: 3,
    firstName: "Jane",
    middleName: "",
    lastName: "Doe",
    address: "Port Louis"
}];

let equipments = {
    1: {
        name: "Desktop PC",
        quantity: 100
    },
    2: {
        name: "Laptop",
        quantity: 50
    },
    3: {
        name: "Mouse",
        quantity: 100
    }
}

let employeeEquipment = {};

const assignEquipmentEl = document.querySelector("#assign-stock") as HTMLElement;
const generateReportEl = document.querySelector("#generate-report") as HTMLElement;
const assignEquipmentLiEl = document.querySelector("#assign-stock-li") as HTMLElement;
const generateReportLiEl = document.querySelector("#generate-reports-li") as HTMLElement;
let isOnAssignEquipment = true;

const employeeTableContent = document.querySelector(".table .table-content") as HTMLElement;


function goToAssignEquipment(){
generateReportEl.style.display = "none";
generateReportLiEl.style.color = "black";
assignEquipmentEl.style.display = "block";
assignEquipmentLiEl.style.color = "#c60021";
isOnAssignEquipment = true;
}

function goToGenerateReports(){
    assignEquipmentEl.style.display = "none";
    assignEquipmentLiEl.style.color = "black";
    generateReportEl.style.display = "block";
    generateReportLiEl.style.color = "#c60021";
    isOnAssignEquipment = false;
}

document.addEventListener('DOMContentLoaded', (event) => {
    goToAssignEquipment();
});

assignEquipmentLiEl.addEventListener("click", ()=>{   
    if(!isOnAssignEquipment)
        goToAssignEquipment();
});

generateReportLiEl.addEventListener("click", ()=>{
    if(isOnAssignEquipment)
        goToGenerateReports();
});

employees.forEach(employee => {
    employeeTableContent.innerHTML += `
            <div class="table-row">
            <div class="table-data">${employee.id}</div>
            <div class="table-data">${employee.firstName}</div>
            <div class="table-data">${employee.middleName}</div>
            <div class="table-data">${employee.lastName}</div>
            <div class="table-data">${employee.address}</div>
            <div class="table-data">
                <button class="assign-equipment-btn">Assign Equipment</button>
                <button class="view-assign-equipment-btn">View Assigned Equipments</button>
            </div>
        </div>
    `;
})


