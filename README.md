# Manual
## Prerequisite

- [Node.js](https://nodejs.org/en/download/)
- Need to enable Accessibility for Terminal  
  ![Enable Accessibility](/assets/privacy.png)

## How to use
### To generate barcode tickets

  ```sh
  node gen-key.js --quota 100
  ```

  Parameters:
  - `--quota`: How many tickets you need

### To start

  ```sh
  node index.js --app 'dslrBooth' --duration 5s
  ```

  Parameters:
  - `--app`: Target app to open after the barcode valid
  - `--duration`: How long the target app need to operate (5s, 1m, ...)
