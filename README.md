# Plan-hi

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
**yarn dev**
```

Open localhost:3000 on your browser.

## File Structure

When building plan-hi, I was taking my previous experience and learning new methods to create this app. That is why I use some parts from fauna.js in the services folder.

### services

This consists of a function to login, register, and the secret for CRUD functions using FaunaDB as the database.

### Pages

This folder consists of the main pages that you would see

### Components

This folder contains components that the pages would use such as the Navbar and the login/register components in the **enter** page.

### Pages/api

This contains apis used for CRUD functions.

This was something that I wanted to try out. This is why CRUD functions are not in the Fauna.js service (except for logging in and registering).



## Bugs

Rather than having a traditional calendar view with a grid-like view, I chose to keep the parts that users pay attention to-that being the events and the days of the week.

Keep in mind though that when you are creating a new event or editing an event, data is pulled from the url to the browser in order to set the current date (though the date can be changed). The method I used to pull the data is through NextJS's useRouter api. For some reason, when the browser is refreshed, the data is lost, so please try not to refresh. I am working on fixing this bug.



You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
