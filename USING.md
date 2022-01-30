## Using Sponsor Template

Click on Use this template
![Logo](https://cdn.hashnode.com/res/hashnode/image/upload/v1631617252765/s_PLlBQ2K.png)

Now give your repository a name and you can give some additional details if you want.

![image.png](https://user-images.githubusercontent.com/76690419/150760062-9544119b-9d4e-47ac-8c32-5c9a9d47e5e0.png)

### Running the template

- Clone the repository you have been redirected to by

```
git clone url
```

- Installing the node modules

```
yarn install # yarn
npm install # npm
```

- Starting the server

```
npm run dev # yarn
yarn dev # npm
```

## Setting up stripe

Create a new file `.env.local` and copy the content of `.env.sample`. Go to [stripe](https://stripe.com/), sign up for an account then create a project. Click on developers in the header and get the api keys.

![Stripe](https://user-images.githubusercontent.com/76690419/150771610-bf352cf1-7ff1-40a2-9d80-ebeb59af3c18.png)

Copy the api keys and paste them in `.env.local` respectively. Restart your server-

```
npm run dev # yarn
yarn dev # npm
```

The app now works! Since this is in test mode, you can just use 4242 as the card.

## Making changes

To add your details go to the data.json file in the public folder and replace my data with yours.

To customize the colors go to `tailwind.config.js` and replace the existing colors with your brand colors.

After you have added all your data. Push the code to GitHub with these commands

```
git add .
git commit -m "your commit message"
git push
```

## Deploying

### Activating Stripe

Since we started stripe in test mode, click on "Activate Account", fill in your details and activate it.

- Go to [Vercel](https://vercel.com/dashboard)
- Sign up for an account
- Click on New project
- Import your repository
- Click skip while creating a team and then hit deploy
- After it is deployed click on go to dashboard
- Go to Environment Variables > Settings, and add the secret and private key. Make sure to use the production one to be able to accept payments.
- Your site is successfully deployed 🥳
- Now grab the URL and show it to world

![image.png](https://user-images.githubusercontent.com/76690419/150772794-5705ffd2-168c-4716-a4e5-df8703fe7ea2.png)
