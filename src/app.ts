import { Components } from "gd-sprest-bs";
import { DataSource, IListInfo } from "./ds";

/**
 * Main Application
 */
export class App {
    private _el: HTMLElement = null;

    // Constructor
    constructor(el: HTMLElement) {
        // Save the input
        this._el = el;

        // Render the application
        this.render();
    }

    // Generates the list information for the card
    private generateListCard(list: IListInfo): Components.ICardProps {
        return {
            body: [
                {
                    content: `
                        <h5 class="card-title">${list.title}</h5>
                        <p class="card-text">${list.description}</p>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Item Count: ${list.itemCount}</li>
                                <li class="list-group-item">List Type: ${list.listType}</li>
                            </ul>
                        </p>
                    `
                }
            ],
            footer: {
                onRender: (el) => {
                    // Render the actions
                    Components.TooltipGroup({
                        el,
                        isSmall: true,
                        tooltips: [
                            {
                                content: "This will open the list in a new tab.",
                                btnProps: {
                                    className: "btn-view",
                                    text: "View",
                                    onClick: () => {
                                        // Open the list in a new tab
                                    }
                                }
                            },
                            {
                                className: "btn-settings",
                                content: "This will open the list settings in a new tab.",
                                btnProps: {
                                    text: "Settings",
                                    onClick: () => {
                                        // Open the settings in a new tab
                                    }
                                }
                            }
                        ]
                    });
                }
            }
        };
    }

    // Main render method
    private render() {
        let cards: Components.ICardProps[] = [];

        // Parse the lists
        for (let i = 0; i < DataSource.Lists.length; i++) {
            // Add the card information
            cards.push(this.generateListCard(DataSource.Lists[i]));
        }

        // Render the cards
        Components.CardGroup({
            el: this._el,
            cards
        });
    }
}