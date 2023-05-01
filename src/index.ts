import { Components } from "gd-sprest-bs";
import { App } from "./app";
import { DataSource } from "./ds";
import Strings, { setContext } from "./strings";

// Styling
import "./styles.scss";

// Create the global variable for this solution
const GlobalVariable = {
    render: (el, context?, sourceUrl?: string) => {
        // See if the page context exists
        if (context) {
            // Set the context
            setContext(context, sourceUrl);
        }

        // Initialize the application
        DataSource.init().then(
            // Success
            () => {
                // Create the application
                new App(el);
            },

            // Error
            () => {
                // Render an error
                Components.Alert({
                    header: "Error Initializing App",
                    content: "Contact your administrator for help on this issue.",
                    type: Components.AlertTypes.Danger
                });

                // Log
                console.error("[" + Strings.ProjectName + "] Error initializing the solution.");
            }
        );
    }
};

// Make is available in the DOM
window[Strings.GlobalVariable] = GlobalVariable;

// Get the element and render the app if it is found
let elApp = document.querySelector("#" + Strings.AppElementId) as HTMLElement;
if (elApp) {
    // Render the application
    GlobalVariable.render(elApp);
}