## Documentation By:

Muhammad Hassaan Osmani

## Table of contents

<!-- toc -->

- [Getting Started](#getting-started)
- [React Component](#react-component)
- [The Component Lifecycle](#the-component-lifecycle)
- [User-defined Components](#user-defined-components)
- [JSON](#JSON)
  * [JSON in Objects of Arrays](#objects-of-arrays)
  * [JSON in Arrays of Objects](#json-in-arrays-of-objects)
  * [npm install](#npm-install)
  * [npm start](#npm-start)
  * [npm test](#npm-test)
  * [npm run build](#npm-run-build)
  * [npm run eject](#npm-run-eject)
  * [Create React App documentation](#create-react-app-documentation)

<!-- tocstop -->

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started

Clone the folder or download. Open Project folder and Navigate in Windows and type **code .**
Open Terminal and type npm start

## React Component

React lets you define components as classes or functions. Components defined as classes currently provide more features which are described in detail on this page. To define a React component class, you need to extend React.Component:

```
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

The only method you must define in a React.Component subclass is called render(). All the other methods described on this page are optional.

### The Component Lifecycle

Each component has several "lifecycle methods" that you can override to run code at particular times in the process.


### User-defined Components

There are two defined components named Photos and RandomPhotos
* In component Photos, we fetched information from **Data** directory, file named **photos_data**.
* In component RandomPhotos, the data is fetched using API's and there used **componentDidMount()** method where we used to set our states, if we used to set our state in **render()** method the application will be crashed.

### JSON in Objects of Arrays

```
state = {
    loading: true,
    person: null
};

async componentDidMount() {
    const url = "https://api.randomuser.me/";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    this.setState({ person: data.results[0], loading: false });
}

render() {
    if (this.state.loading) {
        return <div>loading...</div>;
    }

    if (!this.state.person) {
        return <div>didn't get a person</div>;
    }

    return (

        <div key={this.state.person.id.value} >
            <div>{this.state.person.name.title}</div>
            <div>{this.state.person.name.first} {this.state.person.name.last}</div>
            <img src={this.state.person.picture.large} alt="" />
        </div>
    
    );
}

```

### JSON

JSON: JavaScript Object Notation.
JSON is a syntax for storing and exchanging data.
JSON is text, written with JavaScript object notation.

**Sending Data**
If you have data stored in a JavaScript object, you can convert the object into JSON, and send it to a server:

```
var myObj = {name: "John", age: 31, city: "New York"};
var myJSON = JSON.stringify(myObj);
window.location = "demo_json.php?x=" + myJSON;
```

**Receiving Data**
If you receive data in JSON format, you can convert it into a JavaScript object:

```
var myJSON = '{"name":"John", "age":31, "city":"New York"}';
var myObj = JSON.parse(myJSON);
document.getElementById("demo").innerHTML = myObj.name;
```

### JSON in Arrays of Objects

```
state = {
    loading: true,
    person: null
};

async componentDidMount() {

    const url = "https://jsonplaceholder.typicode.com/photos/";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    this.setState({ person: data, loading: false });
}

render() {
    if (this.state.loading) {
        return <div>loading...</div>;
    }

    if (!this.state.person) {
        return <div>didn't get a person</div>;
    }

    return (

        <div className="photos_list">
            {this.state.person.map(new_data => (
                <section key={new_data.id}>
                    <h4>{new_data.title}</h4>
                    <a href={new_data.url}><img src={new_data.thumbnailUrl} alt="" /></a>
                </section>
            ))}
        </div>

    );
}

```

## Available Scripts

In the project directory, you can run:

### `npm install`

Install the dependencies in the local node_modules folder.

In global mode (i.e. with -g or --global appended to the command), it installs the current package context (ie, the current working directory) as a global package.

By default, npm install will install all modules listed as dependencies in package.json.

With the --production flag (or when the NODE_ENV environment variable is set to production), npm will not install modules listed in devDependencies.

NOTE: The --production flag has no particular meaning when adding a dependency to a project.

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
