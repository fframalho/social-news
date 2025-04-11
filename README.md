# Social News

This app was created using 

```
npx create-react-router@latest
```

as mentioned in this [React doc](https://react.dev/learn/creating-a-react-app).


## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.


### Unit Testing

Run unit tests using:

```bash
npm test
```
Launches the test runner in the interactive watch mode.


If you want to check these tests' coverage, run:

```bash
npm run coverage
```

### E2E Testing

Before running the Cypress tests, you need to start the development server with a different command from the one mentioned above:

```bash
npm run dev:e2e-test
```

Run cypress E2E tests on the console:

``` 
npx cypress run
```

OR

Open cypress in the interactive GUI. 
*Saves snapshots of each step and allows for step by step visual debugging.*:

```
npx cypress open
```


## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.


