# This repository contains the Full Stack Open course part-10 exercises

All exercises are saved in a separate commit.

## Exercise 10.1: initializing the application

Initialize your application with Expo command-line interface and set up the development environment either using an emulator or Expo's mobile app. It is recommended to try both and find out which development environment is the most suitable for you. The name of the application is not that relevant. You can, for example, go with rate-repository-app.

To submit this exercise and all future exercises you need to [create a new GitHub repository](https://github.com/new). The name of the repository can be for example the name of the application you initialized with expo init. If you decide to create a private repository, add GitHub user [mluukkai](https://github.com/mluukkai) as a [repository collaborator](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-access-to-your-personal-repositories/inviting-collaborators-to-a-personal-repository). The collaborator status is only used for verifying your submissions.

Now that the repository is created, run `git init` within your application's root directory to make sure that the directory is initialized as a Git repository. Next, to add the created repository as the remote run `git remote add origin git@github.com:<YOURGITHUBUSERNAME>/<NAMEOFYOUR_REPOSITORY>.git` (remember to replace the placeholder values in the command). Finally, just commit and push your changes into the repository and you are all done.

## Exercise 10.2: setting up the ESLint

Set up ESLint in your project so that you can perform linter checks by running `npm run lint`. To get most of linting it is also recommended to integrate ESLint with your editor.

## Exercise 10.3: the reviewed repositories list

In this exercise, we will implement the first version of the reviewed repositories list. The list should contain the repository's full name, description, language, number of forks, number of stars, rating average and number of reviews. Luckily React Native provides a handy component for displaying a list of data, which is the [FlatList](https://reactnative.dev/docs/flatlist) component.

Implement components `RepositoryList` and `RepositoryItem` in the components directory's files _RepositoryList.jsx_ and _RepositoryItem.jsx_. The RepositoryList component should render the `FlatList` component and `RepositoryItem` a single item on the list (hint: use the `FlatList` component's [renderItem](https://reactnative.dev/docs/flatlist#required-renderitem) prop). Use this as the basis for the RepositoryList.jsx file:

```jsx
import { FlatList, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const repositories = [
  {
    id: 'jaredpalmer.formik',
    fullName: 'jaredpalmer/formik',
    description: 'Build forms in React, without the tears',
    language: 'TypeScript',
    forksCount: 1589,
    stargazersCount: 21553,
    ratingAverage: 88,
    reviewCount: 4,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
  },
  {
    id: 'rails.rails',
    fullName: 'rails/rails',
    description: 'Ruby on Rails',
    language: 'Ruby',
    forksCount: 18349,
    stargazersCount: 45377,
    ratingAverage: 100,
    reviewCount: 2,
    ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
  },
  {
    id: 'django.django',
    fullName: 'django/django',
    description: 'The Web framework for perfectionists with deadlines.',
    language: 'Python',
    forksCount: 21015,
    stargazersCount: 48496,
    ratingAverage: 73,
    reviewCount: 5,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
  },
  {
    id: 'reduxjs.redux',
    fullName: 'reduxjs/redux',
    description: 'Predictable state container for JavaScript apps',
    language: 'TypeScript',
    forksCount: 13902,
    stargazersCount: 52869,
    ratingAverage: 0,
    reviewCount: 0,
    ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
  },
];

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      // other props
    />
  );
};

export default RepositoryList;
```

_Do not_ alter the contents of the `repositories` variable, it should contain everything you need to complete this exercise. Render the `RepositoryList` component in the `Main` component which we previously added to the _Main.jsx_ file. The reviewed repository list should roughly look something like this:

![Exercise 10.3 - Reviewed repositories list](assets/5.jpg)

## Exercise 10.4: the app bar

We will soon need to navigate between different views in our application. That is why we need an [app bar](https://m2.material.io/components/app-bars-top) to display tabs for switching between different views. Create a file AppBar.jsx in the components folder with the following content:

```jsx
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    // ...
  },
  // ...
});

const AppBar = () => {
  return <View style={styles.container}>{/* ... */}</View>;
};

export default AppBar;
```

Now that the `AppBar` component will prevent the status bar from overlapping the content, you can remove the `marginTop` style we added for the `Main` component earlier in the Main.jsx file. The AppBar component should currently contain a tab with the text "`Repositories`". Make the tab [pressable](https://reactnative.dev/docs/pressable) by using the Pressable component but you don't have to handle the `onPress` event in any way. Add the `AppBar` component to the Main component so that it is the uppermost component on the screen. The `AppBar` component should look something like this:

![Exercise 10.4 - App bar](assets/6.jpg)

## Exercise 10.5: polished reviewed repositories list

The current version of the reviewed repositories list looks quite grim. Modify the _RepositoryItem_ component so that it also displays the repository author's avatar image. You can implement this by using the [Image](https://reactnative.dev/docs/image) component. Counts, such as the number of stars and forks, larger than or equal to 1000 should be displayed in thousands with the precision of one decimal and with a "k" suffix. This means that for example fork count of 8439 should be displayed as "8.4k". Also, polish the overall look of the component so that the reviewed repositories list looks something like this:

![Exercise 10.5 - Polished reviewed repositories list](assets/7.jpg)

In the image, the `Main` component's background color is set to `#e1e4e8` whereas `RepositoryItem` component's background color is set to `white`. The language tag's background color is `#0366d6` which is the value of the `colors.primary` variable in the theme configuration. Remember to exploit the `Text` component we implemented earlier. Also when needed, split the `RepositoryItem` component into smaller components.

## Exercise 10.6: the sign-in view

We will soon implement a form, that a user can use to _sign in_ to our application. Before that, we must implement a view that can be accessed from the app bar. Create a file _SignIn.jsx_ in the components directory with the following content:

```jsx
import Text from './Text';

const SignIn = () => {
  return <Text>The sign-in view</Text>;
};

export default SignIn;
```

Set up a route for this `SignIn` component in the Main component. Also, add a tab with the text "Sign in" to the app bar next to the "Repositories" tab. Users should be able to navigate between the two views by pressing the tabs (hint: you can use the React router's [Link](https://reactrouter.com/en/6.4.5/components/link-native) component).
