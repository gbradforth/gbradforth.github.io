import os
import json

def load_first_names(path=None):
    if path is None:
        path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "first-names.txt")
    names = set()
    try:
        with open(path, encoding="utf-8") as f:
            for line in f:
                name = line.strip().lower()
                if name:
                    names.add(name)
    except FileNotFoundError:
        # File missing -> use empty set
        pass
    return names

def load_ports(path=None):
    if path is None:
        path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "ports.json")
    ports = set()
    try:
        with open(path, encoding="utf-8") as f:
            data = json.load(f)
            if isinstance(data, dict):
                for key in ("ports", "items", "data"):
                    if key in data and isinstance(data[key], list):
                        data = data[key]
                        break
                else:
                    data = [data]
            for entry in data:
                if isinstance(entry, dict):
                    city = entry.get("CITY")
                    if city:
                        city_name = str(city).strip().lower()
                        if city_name:
                            ports.add(city_name)
    except (FileNotFoundError, json.JSONDecodeError):
        pass
    return ports

def load_cargo(path=None):
    if path is None:
        path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "cargo.txt")
    cargo_items = set()
    try:
        with open(path, encoding="utf-8") as f:
            for line in f:
                item = line.strip()
                if item and not item.endswith("--- IGNORE ---"):
                    cargo_items.add(item)
    except FileNotFoundError:
        pass
    return cargo_items

FIRST_NAMES = load_first_names()
PORTS = load_ports()
CARGO = load_cargo()

def main():
    # os.system("clear")
    print("All aboard the Good Ship Alice!")

    alphabet = "abcdefghijklmnopqrstuvwxyz"
    for letter in alphabet:
        cargo = input("The Good Ship Alice sets sail from port, carrying a cargo of " + letter.upper() + ": ").strip().lower()
        while True:
            if not cargo.startswith(letter):
                print("Error: Cargo must start with the letter " + letter.upper())
            elif cargo not in CARGO:
                print("Error: Cargo must be a valid cargo item.")
            else:
                break
            cargo = input("Carrying a cargo of " + letter.upper() + ": ").strip().lower()
        
        fromPort = input("Coming from a port beginning with " + letter.upper() + ": ").strip().lower()
        while True:
            if not fromPort.startswith(letter):
                print("Error: Port must start with the letter " + letter.upper())
            elif fromPort not in PORTS:
                print("Error: Port must be a valid port.")
            else:
                break
            fromPort = input("Coming from a port beginning with " + letter.upper() + ": ").strip().lower()

        toPort = input("Going to a port beginning with " + letter.upper() + ": ").strip().lower()
        while True:
            if toPort == fromPort:
                print("Error: Destination port must be different from origin port.")
            elif not toPort.startswith(letter):
                print("Error: Port must start with the letter " + letter.upper())
            elif toPort not in PORTS:
                print("Error: Port must be a valid port.")
            else:
                break
            toPort = input("Going to a port beginning with " + letter.upper() + ": ").strip().lower()

        captainName = input("The captain's name begins with " + letter.upper() + ": ").strip().lower()
        while True:
            if not captainName.startswith(letter):
                print("Error: Captain's name must start with the letter " + letter.upper())
            elif captainName not in FIRST_NAMES:
                print("Error: Captain's name must be a valid first name.")
            else:
                break
            captainName = input("The captain's name begins with " + letter.upper() + ": ").strip().lower()

if __name__ == "__main__":
    main()