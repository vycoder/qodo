# Qodo - Quasar Todo

This project aims to help beginners and newcomers in learning how to use [Quasar Framework](https://quasar.dev) to build multi-platform apps. This is a relatively medium-size project, complete with a local client database (using [RxDB](https://rxdb.info)) that demonstrates how you can build your app for both Mobile and Desktop platform. Treat this project as a reference or a learning resource.

Check out the live `enFocus` version here:
   - Mobile - [Google Play](https://play.google.com/store/apps/details?id=com.nightowl.enfocus.app)
   - Desktop - [www.getenfocus.com](https://www.getenfocus.com)

## Getting Started
This project requires `yarn` and `@quasar/cli`, check docs for more details on [Quasar CLI Installation](https://quasar.dev/quasar-cli/installation). 

### Install the dependencies
```bash
yarn
```

### Setup environment variables
```bash
cp env.dev.example .env.dev #.env for production
```

#### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
# run as capacitor mode
quasar dev -m capacitor -T [android|ios]

# run as electron mode
quasar dev -m electron
```

#### Lint the files
```bash
yarn run lint
```

## Monetizing via AdMob and In-app Purchase
> WIP - Tutorial.

## Deployment
> WIP - Tutorial.

## Donate
You can buy my next beer or coffee if you ever find this project useful.
- [kofi](https://ko-fi.com/vycoder)
- [Paypal](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=VZ6MAQNE99TT2&source=url)
