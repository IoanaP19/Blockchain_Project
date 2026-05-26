The **MultiversX dApp Template SC Interactor**, built using [React.js](https://reactjs.org/) and [Typescript](https://www.typescriptlang.org/).
It's a basic implementation of [@multiversx/sdk-dapp](https://www.npmjs.com/package/@multiversx/sdk-dapp), providing the basics for MultiversX authentication and TX signing for any smart contract based on an ABI file and a contract address at your choice.


## Requirements

- Node.js version 16.20.0+
- Npm version 8.19.4+

## Getting Started

The dapp is a client side only project and is built using the [Create React App](https://create-react-app.dev) scripts.

### Instalation and running

### Step 1. Install modules

From a terminal, navigate to the project folder and run:

```bash
yarn install
```

### Step 2. Running in development mode

In the project folder run:

```bash
yarn start:devnet
yarn start:testnet
yarn start:mainnet
```

This will start the React app in development mode, using the configs found in the `vite.config.ts` file.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Step 3. Build for testing and production use

A build of the app is necessary to deploy for testing purposes or for production use.
To build the project run:

```bash
yarn build:devnet
yarn build:testnet
yarn build:mainnet
```
### Step 4. Configure ABI and contract address

Replace the ABI file in `src/contracts` folder.\
In `src/config/config.devnet.ts` (or `config.mainnet.ts` or `config.testnet.ts`) replace the import with your ABI file.\
In the same file, replace in `contractAddress` with your contract address.

### Step 5 (Optional). Configure your whitelist endpoints

This will set the endpoints you will be able to interact with on the page.\
If you don't set any endpoints in the whitelist, you will see all the available endpoints of the contract.

In `whitelistEndpoints` add the endpoints you want to see:\
`name` is the endpoint's name from the ABI file\
`title` is at your choice, the title you want to appear for each endpoint

!The endpoints will appear in the order you add them in the whitelist.

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

One can contribute by creating _pull requests_, or by opening _issues_ for discovered bugs or desired features.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
