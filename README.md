# Photo Booth Manual
## Prerequisite

### Install NVM via Terminal
1. Open Terminal app
2. Execute below command
  ```sh
  ./install.sh
  ```

### Enable Accessibility for Terminal
1. Open System Preferences -> Security & Privacy
2. Select Accessibility
3. Enable Terminal
![Enable Accessibility](/assets/privacy.png)

### Install packages
```sh
npm install
```

## How to use

### To generate barcode tickets

  ```sh
  node gen-key.js --quota 100
  ```

  Parameters:  
  `--quota`: How many tickets you need

### To start

  ```sh
  node index.js
  ```
