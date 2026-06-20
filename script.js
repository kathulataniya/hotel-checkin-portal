// ============================================
// 1. AUTH FUNCTIONS (Login, Signup, Logout)
// ============================================

// Signup Handler
function handleSignup(event) {
    event.preventDefault();
    
    let name = document.getElementById("fullName").value;
    let email = document.getElementById("signupEmail").value;
    let phone = document.getElementById("signupPhone").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    
    if(password !== confirmPassword) {
        alert("❌ Passwords do not match!");
        return;
    }
    
    if(password.length < 4) {
        alert("❌ Password must be at least 4 characters!");
        return;
    }
    
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let userExists = users.find(u => u.email === email);
    
    if(userExists) {
        alert("❌ Email already registered! Please login.");
        return;
    }
    
    let newUser = { name, email, phone, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    
    alert("✅ Signup Successful! Please login.");
    window.location.href = "login.html";
}

// Login Handler
function handleLogin(event) {
    event.preventDefault();
    
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;
    
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let validUser = users.find(u => u.email === email && u.password === password);
    
    if(validUser) {
        localStorage.setItem("loggedInUser", JSON.stringify({
            name: validUser.name,
            email: validUser.email,
            phone: validUser.phone
        }));
        
        alert("✅ Login Successful! Welcome " + validUser.name);
        window.location.href = "checkin.html";
    } else {
        alert("❌ Invalid Email or Password!");
    }
}

// Logout Function
function logout() {
    localStorage.removeItem("loggedInUser");
    alert("Logged out successfully!");
    window.location.href = "index.html";
}

// Auth Check - Call this on protected pages
function checkAuth() {
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if(!loggedInUser) {
        alert("Please login first!");
        window.location.href = "login.html";
    }
    return loggedInUser;
}


// ============================================
// 2. CHECK-IN FUNCTIONALITY
// ============================================

function handleCheckin(event) {
    event.preventDefault();
    
    let availableRooms = [101,102,103,201,202,203,204,301,302,303];
    let existingGuests = JSON.parse(localStorage.getItem("allGuests")) || [];
    let bookedRooms = existingGuests.map(g => g.room);
    let available = availableRooms.filter(r => !bookedRooms.includes(r));
    let randomRoom = available.length > 0 ? available[0] : 404;
    
    const guest = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        date: document.getElementById("date").value,
        guests: document.getElementById("guests").value,
        room: randomRoom,
        checkInTime: new Date().toLocaleString()
    };
    
    localStorage.setItem("guest", JSON.stringify(guest));
    
    existingGuests.push(guest);
    localStorage.setItem("allGuests", JSON.stringify(existingGuests));
    
    document.getElementById("assignedRoom").innerHTML = randomRoom;
    document.getElementById("successBox").classList.remove("d-none");
    
    setTimeout(() => {
        window.location.href = "room.html";
    }, 2000);
}

// Pre-fill check-in form with logged-in user data
function prefillCheckinForm() {
    let loggedInUser = checkAuth();
    if(loggedInUser && document.getElementById("name")) {
        document.getElementById("name").value = loggedInUser.name;
        document.getElementById("email").value = loggedInUser.email;
        document.getElementById("phone").value = loggedInUser.phone;
    }
}


// ============================================
// 3. ROOM DISPLAY FUNCTION
// ============================================

function displayRoomDetails() {
    let guest = JSON.parse(localStorage.getItem("guest"));
    if(guest) {
        if(document.getElementById("guestName")) {
            document.getElementById("guestName").innerHTML = guest.name;
        }
        if(document.getElementById("roomNumber")) {
            document.getElementById("roomNumber").innerHTML = guest.room;
        }
    } else {
        if(document.getElementById("guestName")) {
            document.getElementById("guestName").innerHTML = "No active check-in";
        }
        if(document.getElementById("roomNumber")) {
            document.getElementById("roomNumber").innerHTML = "Not assigned";
        }
    }
}


// ============================================
// 4. DIGITAL KEY FUNCTION
// ============================================

function displayDigitalKey() {
    let guest = JSON.parse(localStorage.getItem("guest"));
    if(guest) {
        if(document.getElementById("roomNo")) {
            document.getElementById("roomNo").innerHTML = "Room Number : " + guest.room;
        }
        if(document.getElementById("guestName")) {
            document.getElementById("guestName").innerHTML = guest.name;
        }
    } else {
        if(document.getElementById("roomNo")) {
            document.getElementById("roomNo").innerHTML = "No active check-in";
        }
        if(document.getElementById("guestName")) {
            document.getElementById("guestName").innerHTML = "Please check in first";
        }
    }
}

function unlockDoor() {
    let guest = JSON.parse(localStorage.getItem("guest"));
    if(guest) {
        document.getElementById("unlockMsg").classList.remove("d-none");
        setTimeout(() => {
            document.getElementById("unlockMsg").classList.add("d-none");
        }, 2000);
    } else {
        alert("Please check in first to unlock door!");
    }
}


// ============================================
// 5. CHECKOUT FUNCTIONALITY
// ============================================

function handleCheckout(event) {
    event.preventDefault();
    
    let guest = JSON.parse(localStorage.getItem("guest"));
    
    document.getElementById("checkoutMsg").classList.remove("d-none");
    
    let checkedOut = JSON.parse(localStorage.getItem("checkedOutGuests")) || [];
    if(guest){
        guest.checkOutTime = new Date().toLocaleString();
        checkedOut.push(guest);
        localStorage.setItem("checkedOutGuests", JSON.stringify(checkedOut));
    }
    
    localStorage.removeItem("guest");
    
    setTimeout(() => {
        window.location.href = "history.html";
    }, 2000);
}

// Pre-fill checkout form
function prefillCheckoutForm() {
    let guest = JSON.parse(localStorage.getItem("guest"));
    if(guest) {
        if(document.getElementById("guestName")) {
            document.getElementById("guestName").value = guest.name;
        }
        if(document.getElementById("roomNo")) {
            document.getElementById("roomNo").value = guest.room;
        }
    }
}


// ============================================
// 6. PROFILE DISPLAY
// ============================================

function displayProfile() {
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    let guest = JSON.parse(localStorage.getItem("guest"));
    
    if(loggedInUser) {
        if(document.getElementById("name")) {
            document.getElementById("name").innerHTML = loggedInUser.name;
        }
        if(document.getElementById("email")) {
            document.getElementById("email").innerHTML = loggedInUser.email;
        }
        if(document.getElementById("phone")) {
            document.getElementById("phone").innerHTML = loggedInUser.phone;
        }
    }
    
    if(guest) {
        if(document.getElementById("room")) {
            document.getElementById("room").innerHTML = guest.room;
        }
        if(document.getElementById("date")) {
            document.getElementById("date").innerHTML = guest.date;
        }
    }
}


// ============================================
// 7. HISTORY DISPLAY
// ============================================

function loadHistory(searchTerm = "") {
    let allGuests = JSON.parse(localStorage.getItem("allGuests")) || [];
    let checkedOut = JSON.parse(localStorage.getItem("checkedOutGuests")) || [];
    let allHistory = [...allGuests, ...checkedOut];
    
    let uniqueHistory = [];
    let seen = new Set();
    for(let guest of allHistory.reverse()) {
        if(!seen.has(guest.email + guest.room)) {
            seen.add(guest.email + guest.room);
            uniqueHistory.push(guest);
        }
    }
    
    let filtered = uniqueHistory.filter(g => 
        g.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    let html = "";
    filtered.forEach(g => {
        let status = g.checkOutTime ? 
            '<span class="badge bg-secondary">Checked Out</span>' : 
            '<span class="badge bg-success">Active</span>';
        html += `<tr>
            <td>${g.name}</td>
            <td>${g.room}</td>
            <td>${g.date}</td>
            <td>${status}</td>
        </tr>`;
    });
    
    let table = document.getElementById("historyTable");
    if(table) {
        table.innerHTML = html || `<tr><td colspan="4" class="text-center">No records found</td></tr>`;
    }
}

// Setup search listener
function setupHistorySearch() {
    let searchInput = document.getElementById("searchInput");
    if(searchInput) {
        searchInput.addEventListener("input", function(e) {
            loadHistory(e.target.value);
        });
    }
}


// ============================================
// 8. INVOICE DISPLAY
// ============================================

function displayInvoice() {
    let guest = JSON.parse(localStorage.getItem("guest"));
    let loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    
    if(guest){
        if(document.getElementById("guestName")) {
            document.getElementById("guestName").innerHTML = guest.name;
        }
        if(document.getElementById("roomNo")) {
            document.getElementById("roomNo").innerHTML = guest.room;
        }
    } else if(loggedUser){
        if(document.getElementById("guestName")) {
            document.getElementById("guestName").innerHTML = loggedUser.name;
        }
        if(document.getElementById("roomNo")) {
            document.getElementById("roomNo").innerHTML = "No active booking";
        }
    }
    
    if(document.getElementById("invoiceDate")) {
        document.getElementById("invoiceDate").innerHTML = new Date().toLocaleDateString();
    }
    if(document.getElementById("invNum")) {
        document.getElementById("invNum").innerHTML = Math.floor(Math.random() * 1000);
    }
}


// ============================================
// 9. ADMIN DASHBOARD
// ============================================

function loadAdminData() {
    let allGuests = JSON.parse(localStorage.getItem("allGuests")) || [];
    let activeGuest = JSON.parse(localStorage.getItem("guest"));
    
    let activeGuests = [...allGuests];
    if(activeGuest && !activeGuests.find(g => g.email === activeGuest.email)) {
        activeGuests.push(activeGuest);
    }
    
    if(document.getElementById("totalGuests")) {
        document.getElementById("totalGuests").innerHTML = activeGuests.length;
    }
    if(document.getElementById("occupiedRooms")) {
        document.getElementById("occupiedRooms").innerHTML = activeGuests.length;
    }
    if(document.getElementById("availableRooms")) {
        document.getElementById("availableRooms").innerHTML = 30 - activeGuests.length;
    }
    
    let today = new Date().toISOString().split('T')[0];
    let todayCount = activeGuests.filter(g => g.date === today).length;
    if(document.getElementById("todayCheckins")) {
        document.getElementById("todayCheckins").innerHTML = todayCount;
    }
    
    let recentHtml = "";
    let recent = [...activeGuests].reverse().slice(0, 5);
    recent.forEach(g => {
        recentHtml += `<tr>
            <td>${g.name}</td>
            <td>${g.room}</td>
            <td><span class="badge bg-success">Checked In</span></td>
        </tr>`;
    });
    
    let table = document.getElementById("recentGuestsTable");
    if(table) {
        table.innerHTML = recentHtml || '<tr><td colspan="3" class="text-center">No guests yet</td></tr>';
    }
}


// ============================================
// 10. PAGE INITIALIZATION
// ============================================

// Run appropriate functions based on which page we're on
document.addEventListener("DOMContentLoaded", function() {
    let page = window.location.pathname.split("/").pop();
    
    switch(page) {
        case "signup.html":
            let signupForm = document.getElementById("signupForm");
            if(signupForm) signupForm.addEventListener("submit", handleSignup);
            break;
            
        case "login.html":
            let loginForm = document.getElementById("loginForm");
            if(loginForm) loginForm.addEventListener("submit", handleLogin);
            break;
            
        case "checkin.html":
            checkAuth();
            prefillCheckinForm();
            let checkinForm = document.getElementById("checkinForm");
            if(checkinForm) checkinForm.addEventListener("submit", handleCheckin);
            break;
            
        case "room.html":
            checkAuth();
            displayRoomDetails();
            break;
            
        case "key.html":
            checkAuth();
            displayDigitalKey();
            break;
            
        case "checkout.html":
            checkAuth();
            prefillCheckoutForm();
            let checkoutForm = document.getElementById("checkoutForm");
            if(checkoutForm) checkoutForm.addEventListener("submit", handleCheckout);
            break;
            
        case "profile.html":
            checkAuth();
            displayProfile();
            break;
            
        case "history.html":
            checkAuth();
            loadHistory();
            setupHistorySearch();
            break;
            
        case "invoice.html":
            checkAuth();
            displayInvoice();
            break;
            
        case "admin.html":
            loadAdminData();
            break;
            
        case "index.html":
            // No auth required for home page
            break;
    }
});