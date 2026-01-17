const fs = require("fs");
const pathModule = require("path");

function loadFirstNames(path) {
  if (!path) {
    path = pathModule.join(__dirname, "first-names.txt");
  }
  const names = new Set();
  try {
    const data = fs.readFileSync(path, { encoding: "utf-8" });
    data.split("\n").forEach((line) => {
      const name = line.trim().toLowerCase();
      if (name) {
        names.add(name);
      }
    });
  } catch (err) {
    // File missing -> use empty set
  }
  return names;
}

function loadPorts(filePath) {
  if (!filePath) {
    filePath = pathModule.join(__dirname, "ports.json");
  }
  const ports = new Set();
  try {
    const data = JSON.parse(fs.readFileSync(filePath, { encoding: "utf-8" }));
    let entries = data;
    if (typeof data === "object" && !Array.isArray(data)) {
      for (const key of ["ports", "items", "data"]) {
        if (Array.isArray(data[key])) {
          entries = data[key];
          break;
        }
      }
      if (!Array.isArray(entries)) {
        entries = [data];
      }
    }
    for (const entry of entries) {
      if (typeof entry === "object" && entry !== null) {
        const city = entry["CITY"];
        if (city) {
          const cityName = String(city).trim().toLowerCase();
          if (cityName) {
            ports.add(cityName);
          }
        }
      }
    }
  } catch (err) {
    // File missing or JSON error -> use empty set
  }
  return ports;
}

function loadCargo(filePath) {
  if (!filePath) {
    filePath = pathModule.join(__dirname, "cargo.txt");
  }
  const cargoItems = new Set();
  try {
    const data = fs.readFileSync(filePath, { encoding: "utf-8" });
    data.split("\n").forEach((line) => {
      const item = line.trim();
      if (item && !item.endsWith("--- IGNORE ---")) {
        cargoItems.add(item);
      }
    });
  } catch (err) {
    // File missing -> use empty set
  }
  return cargoItems;
}

FIRST_NAMES = loadFirstNames();
PORTS = loadPorts();
CARGO = loadCargo();

class Message {
  constructor(text, sender) {
    this.text = text;
    this.sender = sender;
  }
}

const messages = [];
messages.push(
  new Message("Ahoy! Welcome aboard the Good Ship Alice.", "Alice")
);
messages.push(new Message("Hello there", "user"));

const messagesDiv = document.getElementById("chatbox");
messages.forEach((message) => {
  const div = document.createElement("div");
  div.className = "message" + (message.sender === "alice" ? " alice" : " user");
  div.textContent = message.text;
  messagesDiv.appendChild(div);
});
