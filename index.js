let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads") || '[]'); // Stacksnippets do not allow localStorage
const tabBtn = document.getElementById("tab-btn")
const iconEl = document.getElementById("icon")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function () {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a><i class="ri-close-circle-line delete"></i>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("click", function () {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function () {
    if (inputEl.value) {
        myLeads.push(inputEl.value)
        inputEl.value = ""
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    }
})

ulEl.addEventListener("click", function (e) {
    const tgt = e.target;
    if (tgt.classList.contains("delete")) {
        const task = tgt.closest("li");
        const url = task.querySelector("a").getAttribute("href"); // important
        const idx = myLeads.findIndex(item => item === url);
        myLeads.splice(idx, 1)
        console.log(myLeads)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        task.remove()
    }
})
