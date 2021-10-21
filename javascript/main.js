var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var employees = [{
        id: 1,
        firstName: "Dharmesh",
        middleName: "Kumar",
        lastName: "Sookun",
        address: "Riviere du Poste"
    }, {
        id: 2,
        firstName: "John",
        middleName: "",
        lastName: "Doe",
        address: "Curepipe"
    }, {
        id: 3,
        firstName: "Jane",
        middleName: "",
        lastName: "Doe",
        address: "Port Louis"
    }];
var equipments = {
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
};
var futureStock = {
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
};
var employeeEquipment = {};
var assignEquipmentEl = document.querySelector("#assign-stock");
var generateReportEl = document.querySelector("#generate-report");
var assignEquipmentLiEl = document.querySelector("#assign-stock-li");
var generateReportLiEl = document.querySelector("#generate-reports-li");
var isOnAssignEquipment = true;
var employeeTableContent = document.querySelector(".table .table-content");
function goToAssignEquipment() {
    generateReportEl.style.display = "none";
    generateReportLiEl.style.color = "black";
    assignEquipmentEl.style.display = "block";
    assignEquipmentLiEl.style.color = "#c60021";
    isOnAssignEquipment = true;
}
function goToGenerateReports() {
    assignEquipmentEl.style.display = "none";
    assignEquipmentLiEl.style.color = "black";
    generateReportEl.style.display = "block";
    generateReportLiEl.style.color = "#c60021";
    isOnAssignEquipment = false;
}
document.addEventListener('DOMContentLoaded', function (event) {
    goToAssignEquipment();
});
assignEquipmentLiEl.addEventListener("click", function () {
    if (!isOnAssignEquipment)
        goToAssignEquipment();
});
generateReportLiEl.addEventListener("click", function () {
    if (isOnAssignEquipment)
        goToGenerateReports();
});
employees.forEach(function (employee) {
    employeeTableContent.innerHTML += "\n            <div class=\"table-row\">\n            <div id=\"employeeID\">" + employee.id + "</div>\n            <div>" + employee.firstName + "</div>\n            <div>" + employee.middleName + "</div>\n            <div>" + employee.lastName + "</div>\n            <div>" + employee.address + "</div>\n            <div>\n                <button class=\"assign-equipment-btn\">Assign Equipment</button>\n                <button class=\"view-assign-equipment-btn\">View Assigned Equipments</button>\n            </div>\n        </div>\n    ";
});
var assignEquipmentBtns = document.querySelectorAll(".assign-equipment-btn");
var assignEquipmentPopup = document.querySelector(".assign-equipment-popup");
var hiddenEmployeeIdInput = document.querySelector("#employeeId");
assignEquipmentBtns.forEach(function (assignEquipmentBtn) {
    assignEquipmentBtn.addEventListener("click", function (e) {
        var current = e.target;
        var mainParent = current.parentElement.parentElement;
        var id = mainParent.querySelector("#employeeID").innerHTML;
        hiddenEmployeeIdInput.value = id;
        assignEquipmentPopup.style.display = "block";
    });
});
var equipmentsDropdown = document.querySelector("#equipment-select");
var closeAssignEquipmentPopup = document.querySelector(".close");
for (var equipmentId in equipments) {
    if (equipments[equipmentId].quantity > 0) {
        equipmentsDropdown.innerHTML += "\n        <option value=" + equipmentId + ">" + equipments[equipmentId].name + "</option>\n    ";
    }
}
closeAssignEquipmentPopup.addEventListener("click", function () {
    assignEquipmentPopup.style.display = "none";
});
var assignEquipmentForm = document.querySelector(".form-container");
var equipmentQuantityInput = document.querySelector("#equipment-quantity");
var errorMessageEl = document.querySelector(".error");
assignEquipmentForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var equipmentId = +equipmentsDropdown.value;
    var equipmentQuantity = +equipmentQuantityInput.value;
    var employeeId = +hiddenEmployeeIdInput.value;
    if (equipmentId == 0) {
        errorMessageEl.innerHTML = "Please select an equipment";
        errorMessageEl.style.display = "block";
    }
    if (equipmentQuantity <= 0) {
        errorMessageEl.innerHTML = "Quantity must be greater than 0";
        errorMessageEl.style.display = "block";
    }
    else if (equipments[equipmentId] && equipmentQuantity > equipments[equipmentId].quantity) {
        errorMessageEl.innerHTML = "The number of " + equipments[equipmentId].name + " currently in stock is " + equipments[equipmentId].quantity;
        errorMessageEl.style.display = "block";
    }
    else {
        equipments[equipmentId].quantity -= equipmentQuantity;
        // if(employeeEquipment[employeeId]){
        //     if(employeeEquipment[employeeId].get(equipmentId)){
        //         employeeEquipment[employeeId].set(equipmentId, { equipmentQuantity, dateAssigned: new Date().toLocaleDateString()});
        //     }
        // }else{
        //     employeeEquipment[employeeId] = new Map().set(equipmentId, { equipmentQuantity, dateAssigned: new Date().toLocaleDateString()});
        // }
        if (employeeEquipment[employeeId]) {
            employeeEquipment[employeeId] = __spreadArray(__spreadArray([], employeeEquipment[employeeId], true), [[equipmentId, equipmentQuantity, new Date()]], false);
        }
        else {
            employeeEquipment[employeeId] = [[equipmentId, equipmentQuantity, new Date()]];
        }
        assignEquipmentPopup.style.display = "none";
        equipmentsDropdown.value = "";
        equipmentQuantityInput.value = "";
    }
});
var viewAssignEquipmentsBtns = document.querySelectorAll(".view-assign-equipment-btn");
var viewAssignEquipmentPopup = document.querySelector(".view-assign-equipment-popup");
var viewAssignEquipmentPopupBoy = document.querySelector(".popup-body");
var closeViewAssignEquipmentPopup = document.querySelector("#close-view-assign-equipment-popup");
viewAssignEquipmentsBtns.forEach(function (viewAssignEquipmentsBtn) {
    viewAssignEquipmentsBtn.addEventListener("click", function (e) {
        viewAssignEquipmentPopupBoy.innerHTML = "";
        var current = e.target;
        var mainParent = current.parentElement.parentElement;
        var employeeId = +mainParent.querySelector("#employeeID").innerHTML;
        var equipmentsAssigned = employeeEquipment[employeeId];
        viewAssignEquipmentPopup.style.display = "block";
        if (equipmentsAssigned) {
            // equipmentsAssigned.forEach((value, key) => {
            //     viewAssignEquipmentPopupBoy.innerHTML += `
            //     <div>${key}</div>
            //     <div>${equipments[key].name}</div>
            //     <div>${value.equipmentQuantity}</div>
            //     <div>${value.dateAssigned}</div>
            //     `;
            // });
            equipmentsAssigned.forEach(function (equipment) {
                viewAssignEquipmentPopupBoy.innerHTML += "\n                <div>" + equipment[0] + "</div>\n                <div>" + equipments[equipment[0]].name + "</div>\n                <div>" + equipment[1] + "</div>\n                <div>" + equipment[2].toLocaleDateString() + "</div>\n                ";
            });
        }
    });
});
closeViewAssignEquipmentPopup.addEventListener("click", function () {
    viewAssignEquipmentPopup.style.display = "none";
});
var reportTypeSelect = document.querySelector("#reportType");
var reportSection = document.querySelector("#report-section");
reportTypeSelect.addEventListener("change", function (e) {
    var target = e.target;
    var value = target.value;
    switch (value) {
        case "equipmentReport":
            showEquipmentReport();
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
});
var equipmentTableTemplate = "\n<div class=\"table\">\n<div class=\"equipment-report-table-header\">\n    <div class=\"header-item\">\n        <p class=\"header-text\">Equipment Id</p>\n    </div>\n    <div class=\"header-item\">\n        <p class=\"header-text\">Equipment Name</p>\n    </div>\n    <div class=\"header-item\">\n        <p class=\"header-text\">Quantity</p>\n    </div>\n</div>\n<div id=\"equipment-content\" class=\"table-content\"></div>\n</div>";
function showEquipmentReport() {
    reportSection.innerHTML = equipmentTableTemplate;
    var equipmentContent = document.querySelector("#equipment-content");
    for (var id in equipments) {
        equipmentContent.innerHTML += "\n        <div class=\"equipment-table-row\">\n            <div>" + id + "</div>\n            <div>" + equipments[id].name + "</div>\n            <div>" + equipments[id].quantity + "</div>\n        </div>\n        ";
    }
}
function showInStockReport() {
    reportSection.innerHTML = equipmentTableTemplate;
    var equipmentContent = document.querySelector("#equipment-content");
    for (var id in equipments) {
        if (equipments[id].quantity > 0) {
            equipmentContent.innerHTML += "\n            <div class=\"equipment-table-row\">\n                <div>" + id + "</div>\n                <div>" + equipments[id].name + "</div>\n                <div>" + equipments[id].quantity + "</div>\n            </div>\n            ";
        }
    }
}
function showFutureStockReport() {
    reportSection.innerHTML = "\n        <div class=\"table\">\n            <div class=\"table-header\">\n                <div class=\"header-item\">\n                    <p class=\"header-text\">Equipment Id</p>\n                </div>\n                <div class=\"header-item\">\n                    <p class=\"header-text\">Equipment Name</p>\n                </div>\n                <div class=\"header-item\">\n                    <p class=\"header-text\">Quantity</p>\n                </div>\n                <div class=\"header-item\">\n                    <p class=\"header-text\">Order Date</p>\n                </div>                \n                <div class=\"header-item\">\n                    <p class=\"header-text\">Shipment Date</p>\n                </div>\n                <div class=\"header-item\">\n                    <p class=\"header-text\">Arrives In</p>\n                </div>                \n            </div>\n            <div id=\"equipment-content\" class=\"table-content\"></div>\n        </div>\n    ";
    var content = document.querySelector("#equipment-content");
    for (var id in futureStock) {
        content.innerHTML += "\n            <div class=\"table-row\">\n                <div>" + id + "</div>\n                <div>" + futureStock[id].name + "</div>\n                <div>" + futureStock[id].quantity + "</div>\n                <div>" + futureStock[id].orderDate.toLocaleDateString() + "</div>\n                <div>" + futureStock[id].shipmentDate.toLocaleDateString() + "</div>\n                <div>\n                    " + (Math.ceil((futureStock[id].shipmentDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24))) + " days\n                </div>\n            </div>\n        ";
    }
}
