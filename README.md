# local.settings

A zero-dependency `process.env` loader for Microsoft Azure's `local.settings.json` file

## Install
```sh
# with npm
npm install localsettings

# or with Yarn
yarn add localsettings
```

## Usage
As early as possible in your application, require and configure localsettings

```sh
require('localsettings').config()
```

`process.env` now has the keys and values you defined in your `local.settings.json` file.

### Preload

You can use the `--require` (`-r`) [command line option](https://nodejs.org/api/cli.html#cli_r_require_module) to preload localsettings. By doing this, you do not need to require and load localsettings in your application code. This is the preferred approach when using `import` instead of `require`.

```bash
$ node -r localsettings/config your_script.js
```


