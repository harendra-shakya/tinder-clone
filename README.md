I Built a Tinder clone in under 24 hours.

I challenged myself yesterday to build a Tinder clone in under 24 hours, and if I failed, I'd work on a client project for free and do 1000 pushups as a punishment.

The Google authentication was challenging. After trying 3 different libraries, it consumed most of my time, but I successfully completed the challenge despite having only 3 hours of sleep and skipping lunch. :)

## How I built this

Here's a description of the functionalities used to build the Tinder clone:

1. **React Native and Expo:**
   React Native and Expo were used as the primary framework and development tools for building the Tinder clone. React Native allowed for cross-platform development, while Expo provided additional features and ease of development.

2. **Firebase:**
   Firebase was used as the backend and database solution for the Tinder clone. It offered real-time database capabilities, user authentication with Google Authentication, and other useful features for building a dynamic app.

3. **Tailwind-rn:**
   Tailwind-rn is a utility-first styling library for React Native. It simplifies the process of creating responsive and visually appealing UI components by providing a wide range of pre-defined styles.

4. **Swipable Tinder Cards (React Native Swiper):**
   The Swipable Tinder Cards component, implemented using React Native Swipable, allowed users to swipe left or right, simulating the Tinder card swiping experience. This functionality enabled users to like or dislike potential matches.

5. **Google Authentication:**
   Google Authentication was integrated into the app, allowing users to sign in using their Google accounts. This feature provided a convenient and secure way for users to access the app.

6. **1-1 Messaging:**
   The app included a 1-1 messaging feature, which allowed users who had matched with each other to communicate privately. This functionality facilitated real-time messaging and interaction between users.

7. **useContract API:**
   The useContract API was utilized to manage and handle the communication between the frontend and Firebase, making it easier to access and manage data from the backend. It is being used in `useAuth` hook.

8. **Expo Image Picker:**
   Expo Image Picker was used to enable users to pick and upload images to their profiles. This feature allowed users to personalize their profiles with images and create engaging user experiences.

9. You can find other small tools and libraries in `package.json`.

Overall, this Tinder clone leveraged a combination of powerful technologies and functionalities to replicate the core features of the popular dating app, providing users with a seamless and enjoyable matchmaking experience.

## Getting Started

1. `git clone https://github.com/harendra-shakya/tinder-clone.git`

1. **Hide the API key in an environment (env) file:** The repository may contain sensitive API keys or credentials. Make sure not to expose them in the code directly. Instead, store them in a separate `.env` file and add that file to your `.gitignore` to prevent accidental commits.

1. **Be cautious with pushed variables:** During development, I might have accidentally pushed some variables with sensitive information. Please double-check and ensure that no sensitive information is exposed in the commits.

I am working on a tight deadline, and I need to build this project within 24 hours that's why I pushed some vars by mistake.

Install dependencies

```bash
yarn install
```

Start expo server

```bash
yarn start
```

Launch the development apps

```bash
# start android app
yarn android

# start ios app
yarn ios

# start web app
yarn web
```

Use _Tailwind-rn_

```bash
# start Tailwind class generator (in watch mode)
yarn dev:tailwind

# build Tailwind classes
yarn build:tailwind
```

## Project Structure

```
project
|-- public                    ℹ️ keep your static resource files
|-- src
|   |-- common
|   |   |-- components
|   |   |   |-- elements      ℹ️ keep your state-less components
|   |   |   |                 ℹ️ keep your state-full components
|   |   |-- hoc
|   |   |-- hooks
|   |   |-- layouts
|   |   |-- types
|   |-- modules
|   |-- screens
|   |-- services
|   |-- styles
|   |-- utils
|   |   |-- constants         ℹ️ keep your constants
|   |   |                     ℹ️ keep your util functions
```

If you have any questions or concerns, feel free to reach out.

Happy coding!
