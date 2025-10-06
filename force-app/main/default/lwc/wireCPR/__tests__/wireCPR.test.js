import { createElement } from "@lwc/engine-dom";
import WireCPR from "c/wireCPR";
import { CurrentPageReference } from "lightning/navigation";

const mockCurrentPageReference = require("./data/CurrentPageReference.json");

describe("c-wire-c-p-r", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("renders the current page reference in <pre> tag", () => {
    // Arrange
    const element = createElement("c-wire-c-p-r", {
      is: WireCPR
    });

    // Act
    document.body.appendChild(element);
    const preElement = element.shadowRoot.querySelector("pre");
    expect(preElement).not.toBeNull();

    CurrentPageReference.emit(mockCurrentPageReference);

    return Promise.resolve().then(() => {
      expect(preElement.textContent).toBe(
        JSON.stringify(mockCurrentPageReference, null, 2)
      );
    });
  });
});
