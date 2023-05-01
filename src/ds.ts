import { Web } from "gd-sprest-bs";
import Strings from "./strings";

/**
 * The list information
 */
export interface IListInfo {
    description: string;
    itemCount: number;
    listType: string;
    title: string;
    url: string;
}

/**
 * Data Source
 */
export class DataSource {
    // List Information
    private static _lists: IListInfo[] = null;
    static get Lists(): IListInfo[] { return this._lists; }

    // Initialize the solution
    static init(): PromiseLike<void> {
        // Return a promise
        return new Promise((resolve, reject) => {
            // Clear the lists
            this._lists = [];

            // Load the lists
            Web(Strings.SourceUrl).Lists().query({
                Expand: ["RootFolder"]
            }).execute(lists => {
                // Parse the lists
                for (let i = 0; i < lists.results.length; i++) {
                    let list = lists.results[i];

                    // Add the list information
                    this._lists.push({
                        description: list.Description,
                        itemCount: list.ItemCount,
                        listType: list.EntityTypeName,
                        title: list.Title,
                        url: list.RootFolder.ServerRelativeUrl
                    });
                }

                // Resolve the request
                resolve();
            }, reject);
        });
    }
}