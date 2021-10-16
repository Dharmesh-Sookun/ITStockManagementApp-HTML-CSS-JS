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
        quantity: 100,
    },
    2: {
        name: "Laptop",
        quantity: 0,
    },
    3: {
        name: "Mouse",
        quantity: 100
    },

    4: {
        name: "Headset",
        quantity: 0
    },

    5: {
        name: "Docking station",
        quantity: 100
    }
}

let futureStock = {
    1: {
        name: "Laptop P1",
        quantity: 100,
        orderDate: new Date("06/29/2021"),
        shipmentDate: new Date("12/25/2021")
    },
    2: {
        name: "Monitor",
        quantity: 50,
        orderDate: new Date("08/15/2021"),
        shipmentDate: new Date("10/30/2021")
    },
    3: {
        name: "Keyboard",
        quantity: 75,
        orderDate: new Date("09/05/2021"),
        shipmentDate: new Date("10/25/2021")
    },
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

const assignEquipmentBtns = document.querySelectorAll(".assign-equipment-btn");
const assignEquipmentPopup = document.querySelector(".assign-equipment-popup") as HTMLElement;
const hiddenEmployeeIdInput = document.querySelector("#employeeId") as HTMLInputElement;

assignEquipmentBtns.forEach(assignEquipmentBtn => {
    assignEquipmentBtn.addEventListener("click", (e)=> {
        const current = e.target as HTMLElement;
        const mainParent = current.parentElement.parentElement;
        const id = mainParent.querySelector(".table-data").innerHTML;
        hiddenEmployeeIdInput.value = id;
        assignEquipmentPopup.style.display = "block";
    })
})


const equipmentsDropdown = document.querySelector("#equipment-select") as HTMLSelectElement;
const closeAssignEquipmentPopup = document.querySelector(".close");

for(const equipmentId in equipments){
    if(equipments[equipmentId].quantity > 0){
        equipmentsDropdown.innerHTML += `
        <option value=${equipmentId}>${equipments[equipmentId].name}</option>
    `;
    }
}

closeAssignEquipmentPopup.addEventListener("click", ()=> {
    assignEquipmentPopup.style.display = "none";
})

const assignEquipmentForm = document.querySelector(".form-container");
const equipmentQuantityInput = document.querySelector("#equipment-quantity") as HTMLInputElement;
const errorMessageEl = document.querySelector(".error") as HTMLElement;

assignEquipmentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const equipmentId = +equipmentsDropdown.value;
    const equipmentQuantity = +equipmentQuantityInput.value;
    const employeeId = +hiddenEmployeeIdInput.value;
    if(equipmentId == 0){
        errorMessageEl.innerHTML = "Please select an equipment";
        errorMessageEl.style.display = "block";
    }

    if(equipmentQuantity <= 0){
        errorMessageEl.innerHTML = "Quantity must be greater than 0";
        errorMessageEl.style.display = "block";
    }else if(equipments[equipmentId] &&equipmentQuantity > equipments[equipmentId].quantity){
        errorMessageEl.innerHTML = `The number of ${equipments[equipmentId].name} currently in stock is ${equipments[equipmentId].quantity}`;
        errorMessageEl.style.display = "block";
    }else {
        equipments[equipmentId].quantity -= equipmentQuantity;
        if(employeeEquipment[employeeId]){
            if(employeeEquipment[employeeId].get(equipmentId)){
                employeeEquipment[employeeId].set(equipmentId, { equipmentQuantity, dateAssigned: new Date().toLocaleDateString()});
            }
        }else{
            employeeEquipment[employeeId] = new Map().set(equipmentId, { equipmentQuantity, dateAssigned: new Date().toLocaleDateString()});
        }

        assignEquipmentPopup.style.display = "none";
        equipmentsDropdown.value = "";
        equipmentQuantityInput.value = "";
    }
    
})

const viewAssignEquipmentsBtns = document.querySelectorAll(".view-assign-equipment-btn");
const viewAssignEquipmentPopup = document.querySelector(".view-assign-equipment-popup") as HTMLElement;
const viewAssignEquipmentPopupBoy = document.querySelector(".popup-body");
const closeViewAssignEquipmentPopup = document.querySelector("#close-view-assign-equipment-popup");

viewAssignEquipmentsBtns.forEach(viewAssignEquipmentsBtn => {
    viewAssignEquipmentsBtn.addEventListener("click", (e) => {
        viewAssignEquipmentPopupBoy.innerHTML = "";
        const current = e.target as HTMLElement;
        const mainParent = current.parentElement.parentElement;
        const employeeId = +mainParent.querySelector(".table-data").innerHTML;
        const equipmentsAssigned = employeeEquipment[employeeId];
        viewAssignEquipmentPopup.style.display = "block";
        if(equipmentsAssigned){
            equipmentsAssigned.forEach((value, key) => {
                viewAssignEquipmentPopupBoy.innerHTML += `
                <div>${key}</div>
                <div>${equipments[key].name}</div>
                <div>${value.equipmentQuantity}</div>
                <div>${value.dateAssigned}</div>
                `;
            });
        }
    })
});

closeViewAssignEquipmentPopup.addEventListener("click", () => {
    viewAssignEquipmentPopup.style.display = "none";
})

const reportTypeSelect = document.querySelector("#reportType") as HTMLSelectElement;
const reportSection = document.querySelector("#report-section") as HTMLElement;

reportTypeSelect.addEventListener("change", (e: Event) => {
    const target = e.target as HTMLSelectElement;
    const value = target.value;

    switch(value){
        case "equipmentReport":
            showEquipmentReport()
            break;
        case "inStockReport":
            showInStockReport();
            break;
        case "futureStockReport":
            showFutureStockReport();
            break;

        default:
            reportSection.innerHTML = "";
            break;
    }
})

const equipmentTableTemplate = `
<div class="table">
<div class="equipment-report-table-header">
    <div class="header-item">
        <p class="header-text">Equipment Id</p>
    </div>
    <div class="header-item">
        <p class="header-text">Equipment Name</p>
    </div>
    <div class="header-item">
        <p class="header-text">Quantity</p>
    </div>
</div>
<div id="equipment-content" class="table-content"></div>
</div>`;

function showEquipmentReport(){
    reportSection.innerHTML = equipmentTableTemplate;
    const equipmentContent = document.querySelector("#equipment-content");
    for(const id in equipments){
        equipmentContent.innerHTML += `
        <div class="equipment-table-row">
            <div class="table-data">${id}</div>
            <div class="table-data">${equipments[id].name}</div>
            <div class="table-data">${equipments[id].quantity}</div>
        </div>
        `
    }
}

function showInStockReport(){
    reportSection.innerHTML = equipmentTableTemplate;
    const equipmentContent = document.querySelector("#equipment-content");
    for(const id in equipments){
        if(equipments[id].quantity > 0)
        {
            equipmentContent.innerHTML += `
            <div class="equipment-table-row">
                <div class="table-data">${id}</div>
                <div class="table-data">${equipments[id].name}</div>
                <div class="table-data">${equipments[id].quantity}</div>
            </div>
            `;
        }
    }
}

function showFutureStockReport(){
    reportSection.innerHTML = `
        <div class="table">
            <div class="table-header">
                <div class="header-item">
                    <p class="header-text">Equipment Id</p>
                </div>
                <div class="header-item">
                    <p class="header-text">Equipment Name</p>
                </div>
                <div class="header-item">
                    <p class="header-text">Quantity</p>
                </div>
                <div class="header-item">
                    <p class="header-text">Order Date</p>
                </div>                
                <div class="header-item">
                    <p class="header-text">Shipment Date</p>
                </div>
                <div class="header-item">
                    <p class="header-text">Arrives In</p>
                </div>                
            </div>
            <div id="equipment-content" class="table-content"></div>
        </div>
    `;

    const content = document.querySelector("#equipment-content");
    for(const id in futureStock){
        content.innerHTML += `
            <div class="table-row">
                <div class="table-data">${id}</div>
                <div class="table-data">${futureStock[id].name}</div>
                <div class="table-data">${futureStock[id].quantity}</div>
                <div class="table-data">${futureStock[id].orderDate.toLocaleDateString()}</div>
                <div class="table-data">${futureStock[id].shipmentDate.toLocaleDateString()}</div>
                <div class="table-data">
                    ${
                      (Math.ceil((futureStock[id].shipmentDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24)))
                    } days
                </div>
            </div>
        `;
    }
}



