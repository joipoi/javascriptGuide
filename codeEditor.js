class CodeEditor {
    constructor(elementId, options = {}) {
        this.editor = CodeMirror.fromTextArea(document.getElementById(elementId), {
            lineNumbers: true,
            mode: "javascript",
            theme: "monokai",
            autoCloseBrackets: true,
            viewportMargin: Infinity,  // This allows the editor to expand
            ...options
        });

        this.outputDiv = document.getElementById(options.outputId || "output");
        this.runButton = document.getElementById(options.runButtonId || "run-button");

        this.runButton.addEventListener("click", () => this.runCode());
    }

    setValue(code) {
        this.editor.setValue(code);
    }

    runCode() {
        this.outputDiv.innerHTML = "";
        const code = this.editor.getValue();
        
        const originalConsoleLog = console.log;
        console.log = (...args) => {
            this.outputDiv.innerHTML += "<p>" + args.join(" ") + "</p>";
            originalConsoleLog.apply(console, args);
        };
        
        try {
            eval(code);
        } catch (error) {
            console.log("Error: " + error.message);
        }
        
        console.log = originalConsoleLog;
    }
}
const menuItems = [
    { href: "intro.html", text: "Intro" },
    { href: "variablar.html", text: "Variablar" },
    { href: "funktioner.html", text: "Funktioner" },
    { href: "integer.html", text: "Integer" },
    { href: "string.html", text: "String" },
    { href: "array.html", text: "Array" },
    { href: "if-else.html", text: "If Else" },
    { href: "loops.html", text: "Loops" },
    { href: "html.html", text: "HTML" },
    { href: "events.html", text: "Events" }
];

function generateNavMenu() {
    const navMenu = document.createElement('nav');
    navMenu.id = 'navMenu';
    const currentIndex = getCurrentIndex();

    menuItems.forEach((item, index) => {
        const link = document.createElement('a');
        link.href = item.href;
        link.textContent = item.text;

        if (index === currentIndex) {
            link.classList.add('current');
        }

        navMenu.appendChild(link);
    });
    
    if (currentIndex > 0) {
        const prevButton = document.createElement('button');
        prevButton.innerHTML = '&laquo;';
        prevButton.className = 'nav-button';
        prevButton.onclick = () => navigateTo(menuItems[currentIndex - 1].href);
        navMenu.prepend(prevButton);
    }

    if (currentIndex < menuItems.length - 1) {
        const nextButton = document.createElement('button');
        nextButton.innerHTML = '&raquo;';
        nextButton.className = 'nav-button';
        nextButton.onclick = () => navigateTo(menuItems[currentIndex + 1].href);
        navMenu.appendChild(nextButton);
    }

    document.getElementById('navContainer').appendChild(navMenu);
}

function getCurrentIndex() {
    const currentPath = window.location.pathname.split('/').pop();
    return menuItems.findIndex(item => item.href === currentPath);
}

function navigateTo(href) {
    window.location.href = href;
}

// Call the function to generate the menu
generateNavMenu();