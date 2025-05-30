const themeSelector = document.querySelector("select")
const logoImage = document.querySelector("img")

function applyTheme(theme){
    if (theme === "dark") {
        document.body.classList.add("dark");
        logoImage.src = "images/byui-logo_white.png"
        
        
    } else {
        document.body.classList.remove("dark");
        logoImage.src = "images/byui-logo_blue.png"
    }
}

themeSelector.addEventListener("change", (event) => {
    applyTheme(event.target.value)
});